---
title: "Installing Moses: The Statistical Machine Translation Tool"
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      
      author_profile: false
      read_time: true
      comments: true
      share: true
      related: true
---
<!-- {% include feature_row %} -->

### What is machine translation?

<!-- ![translate](https://media1.tenor.com/images/b890252f9818ba8ed3e8265765d7dc59/tenor.gif?itemid=14803317) -->

{% include image.html
            img="assets/images/translate.gif"
            title="translate"
            caption="Image source: https://tenor.com/view/google-translate-chan-yumis-arts-gtc-gif-14803317"
            %}
Machine translation is the task for translating from one language lets say *English* to another language for an instance *Japanese*. Primarily there are two major techniques to achieve this task, one is Statistical Machine Translation(SMT) and the other is Neural Machine Translation(NMT). The first appraoch converts the translation task to a `noisy channel` model while the second one uses a `sequence-to-sequence` deeplearning method.

In this post, we will cover the statistical one and to be specific we will walk through the installation for one of the most widely used SMT toolkit: the `mosesdecoder`.  
### Prerequisites: 
```g++ 
git 
subversion
automake
libtool
zlib1g-dev
libboost-all-dev
libbz2-dev
liblzma-dev
python-dev
graphviz
imagemagick
make
cmake
libgoogle-perftools-dev
autoconf
doxygen
p7zip
gawk
```
### Step-1: Installing the prerequisites 
Put all these required libraries inside a file `requirements.txt` and install all of them using a single command
```
$ sudo apt-get install $(cat requirements.txt)
```

### Step-2: Installation of an alignment tool
We will install `mgiza++` alignment tool which is the multi-threaded version of `giza++`.
Clone the `mgiza++` repo
```
$ mkdir tools
$ cd tools
$ git clone https://github.com/moses-smt/mgiza.git
``` 
Building the repo
```
$ cd mgiza/mgizapp
$ cmake .
$ make
$ make install
```

### Step-3: Language modelling toolkit installation
Mosesdecoder comes with `KenLM` as the default language modelling tool. However, we will be installing a third party language modelling tool `SRILM`.
First, change back to `tools/` directory.
```
$ mkdir srilm
$ cd srilm
``` 
(This step is crucial since `SRILM` expands in the current directory and not in a sub-directory)

Register and download the latest srilm tool from the srilm [download page](http://www.speech.sri.com/projects/srilm/download.html) which is a `.tgz` file and move it to the above directory which was just created.
```
$ tar -xzvf <srilm-version.tgz>
``` 
After this we need to set the `SRILM` path in a `Makefile`. Specifically, the main path of the `srilm` should be pointed in here. The line to be modified looks like this
```
SRILM = /home/speech/stolcke/project/srilm/devel
```
which should be modified to
```
SRILM = <path/to/your/srilm/main/directory>
```
Then make using 
```
$ make World
```

### Step-4: Building `boost`
Change back to `tools/` directory. For this installation, `boost_1_64_0` version is used.
```
$ wget https://dl.bintray.com/boostorg/release/1.64.0/source/boost_1_64_0.tar.gz
$ unzip the boost 
$ cd boost_1_64_0/
$ ./bootstrap.sh 
$ ./b2 -j4 --prefix=$PWD --libdir=$PWD/lib64 --layout=system link=static install || echo FAILURE
```
**NOTE:** `-j4` is for multiprocessing purpose where `4` is the number of simulataneous tasks.

### Step-5: Finally compilation of the `moses` tool  with the language model(SRILM).
From the `tools/` directory
```
$ git clone git://github.com/moses-smt/mosesdecoder.git
$ cd mosesdecoder
$ ./bjam --with-srilm=<path/to/Srilm> --with-boost=<path/to/boost> -j4
```
If the building and linkink was successful, then a `SUCCESS` prompt will be shown at the end.
 

To sum up, the directory tree should look like this:
```
|-tools
|    |-srilm
|    |-boost
|    |-mosesdecoder

```

In the next post, we will walk through the training steps for an SMT system, right from data acquisition, data processing, training to model evaluation.

### References
1. [http://mt-archive.info/MTS-2007-Koehn-3.pdf](http://mt-archive.info/MTS-2007-Koehn-3.pdf)
2. [https://www.aclweb.org/anthology/P07-2045.pdf](https://www.aclweb.org/anthology/P07-2045.pdf)
3. [http://www.statmt.org/moses_steps.html](http://www.statmt.org/moses_steps.html)
4. [http://www.speech.sri.com/projects/srilm/download.html](http://www.speech.sri.com/projects/srilm/download.html)


<script src="https://utteranc.es/client.js"
        repo="masonreznov/masonreznov.github.io"
        issue-term="pathname"
        label="comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>