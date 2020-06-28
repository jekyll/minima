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
