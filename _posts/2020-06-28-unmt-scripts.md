---
layout: post
title: "XLM and Undreamt full training steps"
meta: "Unsupervised NMT"
---
## Description
Contains the scripts for [XLM](https://github.com/facebookresearch/XLM) and [Undreamt](https://github.com/artetxem/undreamt)
## Requirements
1. [XLM](https://github.com/facebookresearch/XLM)
2. [Mikel's Undreamt](https://github.com/artetxem/undreamt)
3. Pytorch 1.5
4. [Moses tools](https://github.com/moses-smt/mosesdecoder)
5. [FastText](https://github.com/facebookresearch/fastText)
6. [vecmap](https://github.com/artetxem/vecmap)
7. [fastBpe](https://github.com/glample/fastBPE)
8. [IndicNLP](https://github.com/anoopkunchukuttan/indic_nlp_library)
9. [SacreBleu](https://github.com/mjpost/sacreBLEU)

## Preprocessing
The preprocessing is same for both the XLM and Undreamt, with a joint BPE of 60000 operations. 
1. Edit and run `get-process.sh`.
2. It includes tokenization, truecasing(English), joint BPE, and finally binarization for faster memory loading.

```
set -e

# Data preprocessing configuration
N_MONO=500000  # set to max of the #mono sentences if full data is to be used otherwise the min of the #mono. 
CODES=60000     # number of BPE codes
N_THREADS=10    # number of threads in data preprocessing

#
# Check parameters
#
if [ "$SRC" == "" ]; then echo "--src not provided"; exit; fi
if [ "$TGT" == "" ]; then echo "--tgt not provided"; exit; fi
if [ "$SRC" != "en" -a "$SRC" != "mn"]; then echo "unknown source language"; exit; fi
if [ "$TGT" != "en" -a "$TGT" != "mn"]; then echo "unknown target language"; exit; fi

if [ "$SRC" == "$TGT" ]; then echo "source and target cannot be identical"; exit; fi
if [ "$SRC" \> "$TGT" ]; then echo "please ensure SRC < TGT"; exit; fi
if [ "$RELOAD_CODES" != "" ] && [ ! -f "$RELOAD_CODES" ]; then echo "cannot locate BPE codes"; exit; fi
if [ "$RELOAD_VOCAB" != "" ] && [ ! -f "$RELOAD_VOCAB" ]; then echo "cannot locate vocabulary"; exit; fi
if [ "$RELOAD_CODES" == "" -a "$RELOAD_VOCAB" != "" -o "$RELOAD_CODES" != "" -a "$RELOAD_VOCAB" == "" ]; then echo "BPE codes should be provided if and only if vocabulary is also provided"; exit; fi

#
# Initialize tools and data paths
#

# main paths
MAIN_PATH=$PWD
TOOLS_PATH=$PWD/tools
DATA_PATH=$PWD/data
MONO_PATH=$DATA_PATH/mono
PARA_PATH=$DATA_PATH/para
PROC_PATH=$DATA_PATH/processed/$SRC-$TGT
base_data_dir=/home/pokpok/Desktop/ACM/data-15k-sp/With_parallel/raw
# create paths
mkdir -p $TOOLS_PATH
mkdir -p $DATA_PATH
mkdir -p $MONO_PATH
mkdir -p $MONO_PATH/en
mkdir -p $MONO_PATH/mn
mkdir -p $PARA_PATH
mkdir -p $PROC_PATH

# moses
MOSES=$TOOLS_PATH/mosesdecoder
REPLACE_UNICODE_PUNCT=$MOSES/scripts/tokenizer/replace-unicode-punctuation.perl
NORM_PUNC=$MOSES/scripts/tokenizer/normalize-punctuation.perl
REM_NON_PRINT_CHAR=$MOSES/scripts/tokenizer/remove-non-printing-char.perl
TOKENIZER=$MOSES/scripts/tokenizer/tokenizer.perl
INPUT_FROM_SGM=$MOSES/scripts/ems/support/input-from-sgm.perl
INDIC_TOKENIZER=$TOOLS_PATH/indic_nlp_library/indicnlp/tokenize/indic_tokenize.py



# fastBPE
FASTBPE_DIR=$TOOLS_PATH/fastBPE
FASTBPE=$TOOLS_PATH/fastBPE/fast


# raw and tokenized files
SRC_RAW=$MONO_PATH/$SRC/all.$SRC
TGT_RAW=$MONO_PATH/$TGT/all.$TGT
SRC_TOK=$SRC_RAW.tok
TGT_TOK=$TGT_RAW.tok

# BPE / vocab files
BPE_CODES=$PROC_PATH/codes
SRC_VOCAB=$PROC_PATH/vocab.$SRC
TGT_VOCAB=$PROC_PATH/vocab.$TGT
FULL_VOCAB=$PROC_PATH/vocab.$SRC-$TGT

# train / valid / test monolingual BPE data
SRC_TRAIN_BPE=$PROC_PATH/train.$SRC
TGT_TRAIN_BPE=$PROC_PATH/train.$TGT
SRC_VALID_BPE=$PROC_PATH/valid.$SRC
TGT_VALID_BPE=$PROC_PATH/valid.$TGT
SRC_TEST_BPE=$PROC_PATH/test.$SRC
TGT_TEST_BPE=$PROC_PATH/test.$TGT

# valid / test parallel BPE data
PARA_SRC_VALID_BPE=$PROC_PATH/valid.$SRC-$TGT.$SRC
PARA_TGT_VALID_BPE=$PROC_PATH/valid.$SRC-$TGT.$TGT
PARA_SRC_TEST_BPE=$PROC_PATH/test.$SRC-$TGT.$SRC
PARA_TGT_TEST_BPE=$PROC_PATH/test.$SRC-$TGT.$TGT

# valid / test file raw data
unset PARA_SRC_VALID PARA_TGT_VALID PARA_SRC_TEST PARA_TGT_TEST
if [ "$SRC" == "en" -a "$TGT" == "mn" ]; then
  PARA_SRC_VALID=$PARA_PATH/dev/val.en
  PARA_TGT_VALID=$PARA_PATH/dev/val.mn
  PARA_SRC_TEST=$PARA_PATH/dev/test.en
  PARA_TGT_TEST=$PARA_PATH/dev/test.mn
fi


#
# Download monolingual data
#


cd $MONO_PATH
# concatenate monolingual data files
if ! [[ -f "$SRC_RAW" ]]; then
  echo "Concatenating $SRC monolingual data..."
#  cat $base_data_dir/mono/mono.$SRC > $SRC_RAW
  cp $base_data_dir/mono/mono.$SRC  $SRC_RAW
fi
if ! [[ -f "$TGT_RAW" ]]; then
  echo "Concatenating $TGT monolingual data..."
#  cat $base_data_dir/mono/mono.$TGT > $TGT_RAW
  cp $base_data_dir/mono/mono.$TGT  $TGT_RAW
fi
echo "$SRC monolingual data concatenated in: $SRC_RAW"
echo "$TGT monolingual data concatenated in: $TGT_RAW"


if [ "$SRC" == "en" ]; then
  SRC_PREPROCESSING="$REPLACE_UNICODE_PUNCT | $NORM_PUNC -l $SRC | $REM_NON_PRINT_CHAR |                                            $TOKENIZER -l $SRC -no-escape -threads $N_THREADS"
else
  continue
fi

if [ "$TGT" == "en" ]; then
  TGT_PREPROCESSING="$REPLACE_UNICODE_PUNCT | $NORM_PUNC -l $TGT | $REM_NON_PRINT_CHAR |                                            $TOKENIZER -l $TGT -no-escape -threads $N_THREADS"
else
  continue
fi

# tokenize data
if ! [[ -f "$SRC_TOK" ]]; then
  echo "Tokenize $SRC monolingual data..."
  eval "cat $SRC_RAW | $SRC_PREPROCESSING > $SRC_TOK"
fi

if ! [[ -f "$TGT_TOK" ]]; then
  echo "Tokenize $TGT monolingual data..."
  python $INDIC_TOKENIZER $TGT_RAW $TGT_TOK bn
fi
echo "$SRC monolingual data tokenized in: $SRC_TOK"
echo "$TGT monolingual data tokenized in: $TGT_TOK"

# reload BPE codes
cd $MAIN_PATH
if [ ! -f "$BPE_CODES" ] && [ -f "$RELOAD_CODES" ]; then
  echo "Reloading BPE codes from $RELOAD_CODES ..."
  cp $RELOAD_CODES $BPE_CODES
fi

# learn BPE codes
if [ ! -f "$BPE_CODES" ]; then
  echo "Learning BPE codes..."
  $FASTBPE learnbpe $CODES $SRC_TOK $TGT_TOK > $BPE_CODES
fi
echo "BPE learned in $BPE_CODES"

# apply BPE codes
if ! [[ -f "$SRC_TRAIN_BPE" ]]; then
  echo "Applying $SRC BPE codes..."
  $FASTBPE applybpe $SRC_TRAIN_BPE $SRC_TOK $BPE_CODES
fi
if ! [[ -f "$TGT_TRAIN_BPE" ]]; then
  echo "Applying $TGT BPE codes..."
  $FASTBPE applybpe $TGT_TRAIN_BPE $TGT_TOK $BPE_CODES
fi
echo "BPE codes applied to $SRC in: $SRC_TRAIN_BPE"
echo "BPE codes applied to $TGT in: $TGT_TRAIN_BPE"

# extract source and target vocabulary
if ! [[ -f "$SRC_VOCAB" && -f "$TGT_VOCAB" ]]; then
  echo "Extracting vocabulary..."
  $FASTBPE getvocab $SRC_TRAIN_BPE > $SRC_VOCAB
  $FASTBPE getvocab $TGT_TRAIN_BPE > $TGT_VOCAB
fi
echo "$SRC vocab in: $SRC_VOCAB"
echo "$TGT vocab in: $TGT_VOCAB"

# reload full vocabulary
cd $MAIN_PATH
if [ ! -f "$FULL_VOCAB" ] && [ -f "$RELOAD_VOCAB" ]; then
  echo "Reloading vocabulary from $RELOAD_VOCAB ..."
  cp $RELOAD_VOCAB $FULL_VOCAB
fi

# extract full vocabulary
if ! [[ -f "$FULL_VOCAB" ]]; then
  echo "Extracting vocabulary..."
  $FASTBPE getvocab $SRC_TRAIN_BPE $TGT_TRAIN_BPE > $FULL_VOCAB
fi
echo "Full vocab in: $FULL_VOCAB"

# binarize data
if ! [[ -f "$SRC_TRAIN_BPE.pth" ]]; then
  echo "Binarizing $SRC data..."
  $MAIN_PATH/preprocess.py $FULL_VOCAB $SRC_TRAIN_BPE
fi
if ! [[ -f "$TGT_TRAIN_BPE.pth" ]]; then
  echo "Binarizing $TGT data..."
  $MAIN_PATH/preprocess.py $FULL_VOCAB $TGT_TRAIN_BPE
fi
echo "$SRC binarized data in: $SRC_TRAIN_BPE.pth"
echo "$TGT binarized data in: $TGT_TRAIN_BPE.pth"


#
# Download parallel data (for evaluation only)
#

cd $PARA_PATH


echo "Tokenizing valid and test data..."
eval "cat $base_data_dir/para/dev.en | $SRC_PREPROCESSING > $PARA_SRC_VALID"
# eval "$INPUT_FROM_SGM < $PARA_TGT_VALID.sgm | $TGT_PREPROCESSING > $PARA_TGT_VALID"
python $INDIC_TOKENIZER $base_data_dir/para/dev.mn $PARA_TGT_VALID bn

eval "cat $base_data_dir/para/test.en  | $SRC_PREPROCESSING > $PARA_SRC_TEST"
# eval "$INPUT_FROM_SGM < $PARA_TGT_TEST.sgm  | $TGT_PREPROCESSING > $PARA_TGT_TEST"
python $INDIC_TOKENIZER $base_data_dir/para/test.mn $PARA_TGT_TEST bn


echo "Applying BPE to valid and test files..."
$FASTBPE applybpe $PARA_SRC_VALID_BPE $PARA_SRC_VALID $BPE_CODES $SRC_VOCAB
$FASTBPE applybpe $PARA_TGT_VALID_BPE $PARA_TGT_VALID $BPE_CODES $TGT_VOCAB
$FASTBPE applybpe $PARA_SRC_TEST_BPE  $PARA_SRC_TEST  $BPE_CODES $SRC_VOCAB
$FASTBPE applybpe $PARA_TGT_TEST_BPE  $PARA_TGT_TEST  $BPE_CODES $TGT_VOCAB

echo "Binarizing data..."
rm -f $PARA_SRC_VALID_BPE.pth $PARA_TGT_VALID_BPE.pth $PARA_SRC_TEST_BPE.pth $PARA_TGT_TEST_BPE.pth
$MAIN_PATH/preprocess.py $FULL_VOCAB $PARA_SRC_VALID_BPE
$MAIN_PATH/preprocess.py $FULL_VOCAB $PARA_TGT_VALID_BPE
$MAIN_PATH/preprocess.py $FULL_VOCAB $PARA_SRC_TEST_BPE
$MAIN_PATH/preprocess.py $FULL_VOCAB $PARA_TGT_TEST_BPE


#
# Link monolingual validation and test data to parallel data
#
ln -sf $PARA_SRC_VALID_BPE.pth $SRC_VALID_BPE.pth
ln -sf $PARA_TGT_VALID_BPE.pth $TGT_VALID_BPE.pth
ln -sf $PARA_SRC_TEST_BPE.pth  $SRC_TEST_BPE.pth
ln -sf $PARA_TGT_TEST_BPE.pth  $TGT_TEST_BPE.pth


#
# Summary
#
echo ""
echo "===== Data summary"
echo "Monolingual training data:"
echo "    $SRC: $SRC_TRAIN_BPE.pth"
echo "    $TGT: $TGT_TRAIN_BPE.pth"
echo "Monolingual validation data:"
echo "    $SRC: $SRC_VALID_BPE.pth"
echo "    $TGT: $TGT_VALID_BPE.pth"
echo "Monolingual test data:"
echo "    $SRC: $SRC_TEST_BPE.pth"
echo "    $TGT: $TGT_TEST_BPE.pth"
echo "Parallel validation data:"
echo "    $SRC: $PARA_SRC_VALID_BPE.pth"
echo "    $TGT: $PARA_TGT_VALID_BPE.pth"
echo "Parallel test data:"
echo "    $SRC: $PARA_SRC_TEST_BPE.pth"
echo "    $TGT: $PARA_TGT_TEST_BPE.pth"
echo ""
```

## XLM Training
Involves two steps
1. Pre-Training of the cross-lingual language model. For this step, edit and run `XLM_pretrain.sh`.
2. Fine-Tuning step. Run and edit `XLM_finetune.sh`.

## Mikel's Undreamt Training
1. First learn the word embeddings of the two languages idependetly using `FastText` and then map these embeddings using `vecmap`. Run `prepare_data_undreamt.sh`.
2. Training Step: Run `train_undreamt.sh`

## Mikel's Undreamt Translation
The Undreamt training is done till 300000 iterations, and saved after every 10000 iterations.
Run `translate_all.sh`. 

## For the evaluation
Use `eval_bleu_all.sh`, which provides the detokenized bleu score using Sacrebleu.
