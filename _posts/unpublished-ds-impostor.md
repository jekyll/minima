---
layout: post
title: "What am I studying in university"
---

# How to be a DS impostor

After failing multiple technical interviews for being clueless on many machine learning concepts, I realised that I needed to be better impostor.

This document compiles answers optimised for data science interviews. Refer to the other document for computer science topics.


* auto-gen TOC:
{:toc}


(I need to redefine what is data science here)



Please refer to the main document on how to use this document, and what should this document contain.


### Useful resources

- [Attempted comparison of CS courses between Singapore universities](https://www.reddit.com/r/SGExams/comments/g3yion/uni_computer_science_curricula/)
- [Chip Huyen's Machine Learning Systems Design](https://github.com/chiphuyen/machine-learning-systems-design/blob/master/build/build1/consolidated.pdf)
- Syllabus and course objectives of the courses you have taken. It should be a good summary of what you have learnt throughout the course.
- https://explained.ai/
- Towards Data Science Medium Blogs
- Question compilations [0](https://github.com/resumejob/interview-questions)
- ML technical debt https://papers.nips.cc/paper/2015/file/86df7dcfd896fcaf2674f757a2463eba-Paper.pdf



# Data Science Topics

(Should be ordered in some reasonable order)




## Data Science Fundamentals

[SUTD 40.220 The Analytics Edge](https://esd.sutd.edu.sg/courses/40220-the-analytics-edge/)

[SUTD 50.038 Computational Data Science](https://istd.sutd.edu.sg/undergraduate/courses/50038-computational-data-science)



Why do we split the data into training set, validation set and test set?

- TBC



Why do we do cross validation?

- We want to use all the data to train our model, while maintaining train-test split.



What is the difference between parameters and hyperparameters?

- TBC



Explain the bias-variance tradeoff

- TBC



How do you decide whether to include an additional feature into your prediction?

- TBC



What is precision and recall?

- Recall is the ratio of true positive over the total number of ground
- Increasing the threshold always decreases recall, but may increase precision.



(Linear regression, Logistic regression)





## Machine Learning Fundamentals

[SUTD 50.007 Machine Learning](https://istd.sutd.edu.sg/undergraduate/courses/50007-machine-learning)

[SUTD 40.319 Statistical Machine Learning](https://esd.sutd.edu.sg/courses/40319-statistical-and-machine-learning/)

[SUTD 50.039 Theory and Practice of Deep Learning](https://istd.sutd.edu.sg/undergraduate/courses/50-039-theory-and-practice-of-deep-learning)

[SUTD 50.021 Artificial Intelligence](https://istd.sutd.edu.sg/undergraduate/courses/50021-artificial-intelligence)





Describe a simple neural network

- Neurons, weights, bias, activation function



Describe how backpropagation works.

- Compute gradients of each weight w.r.t. to the loss
- Compute gradient of last layer w.r.t. gradient, compute gradient of next last later w.r.t. last layer and so on.



What is batch normalisation and what problem does it solve?
- Each minibatch is processed in parallel in the model. The output of each layer is normalised.
- In testing, the output is normalised to a running average in the training set.
- Improves gradient flow.



What are residual connections and what problem does it solve?

- Residual connections allow gradients to flow through a network directly, without passing through non-linear activation functions.
- Addresses the vanishing gradient problem.



What is the difference between RNN, LSTM and GRU?

- RNN has no memory cell
- LSTM addresses vanishing gradient problem
- GRU is another implementation of LSTM (with different gate names) 



What is the vanishing gradient problem and how it is resolved?
- Residual connections
- LSTM



Describe the various hyperparameters and the tradeoffs involve

- Learning rate - how fast the gradient updates (refer to optimisers)
- Batch size - how many data point to compute at once, and the gradient is update afterwards
- Training iterations - how long to train, usually stop when the best validation loss do not improve after a while



Describe the various optimisers

- Stochastic gradient descent - update weights in proportion to gradient
- Momentum - gradient updates includes an expoential weighted average of past gradient updates
- RMSProp - gradient updates is large when the expoential weighted average of past gradient is small
- Adam - RMSPro with momentum, element-wise computations (and scaling to fix moving average)



(Conditional Random Field)



(Support Vector Machines, Kernel Methods)



(Mixture Models and Expectation Maximization)



(Hidden Markov Model)



(Bayesian networks)



How do you fool a neural network?



## Selected topics in ML

What is Gradient Boosted Decision Trees (GBDT)?

- A decision tree is a tree of if-else statements, that ends up in a leaf where the classification or the regression value is made. The partition is chosen such that information gain or is maximised. However, decision trees are prone to overfitting. Measures to reduce overfitting include imposing a max depth, minimum number of samples required in a node, or a minimum impurity decrease.

- In Gradient Boosted Decision Trees (GBDT), each tree attempts to minimise the errors of the previous tree. The learning rate suggests how fast should the model learn, and in statistical learning, models that learn slower perform better. We can choose the number of trees to use in GBDT, and too many trees will cause overfitting.

- Reference: [0](https://blog.csdn.net/shine19930820/article/details/65633436) [1](https://towardsdatascience.com/decision-tree-and-random-forest-explained-8d20ddabc9dd) [2](https://towardsdatascience.com/gradient-boosted-decision-trees-explained-9259bd8205af) [3](https://datascience.stackexchange.com/questions/39193/adaboost-vs-gradient-boosting)



What is the difference between a random forest and GBDT?

- A random forest combines many decision trees in parallel. Each decision tree trains on a random subset of samples and features, and this method is known as bagging. Excessive trees will not cause overfitting, although it results in uncessary computation at inference.

- GBDT combines decision trees in series. Each trees minimise the errors of the previous tree. Too many trees will cause overfitting.



What is the difference between XGBoost, LightGBM and CatBoost?

- XGBoost was published in 2016, LightGBM and CatBoost in 2017.
- LightGBM and CatBoost allows catgorical variables, whereas XGBoost does not. CatBoost finds the best possible feature combinations and considers them as a single feature.
- XGboost uses histogram approximations to do exact searches for optimal splits, while LightGBM uses gradient-based one-side sampling and exclusive feature bundling to make training faster.
- Reference: [0](https://towardsdatascience.com/catboost-vs-light-gbm-vs-xgboost-5f93620723db) [1](https://datascience.stackexchange.com/questions/49567/lightgbm-vs-xgboost-vs-catboost) [2](https://medium.com/riskified-technology/xgboost-lightgbm-or-catboost-which-boosting-algorithm-should-i-use-e7fda7bb36bc) [3](https://towardsdatascience.com/what-makes-lightgbm-lightning-fast-a27cf0d9785e) [4](https://hanishrohit.medium.com/whats-so-special-about-catboost-335d64d754ae)






###### Reinforcement learning

(Reinforcement learning question)




###### Graph Neural Networks

What does a Graph Neural Network do, and was it trained, and how does it work?

- The objective of GNN is to predict node labels. Every node in the graph has features and is associated with a label. We want to predict labels of the nodes.
- DeepWalk
- GraphSage

- Reference: [0](https://towardsdatascience.com/a-gentle-introduction-to-graph-neural-network-basics-deepwalk-and-graphsage-db5d540d50b3)

What are some applications of Graph Neural Networks?

- Traffic prediction at [Google](https://deepmind.com/blog/article/traffic-prediction-with-advanced-graph-neural-networks)




###### Generative Adversial Network

What does a Generative Adversial Network do, and was it trained, and how does it work?

- TBC





#### Natural Langauge Processing

[SUTD 50.040 Natural Language Processing](https://istd.sutd.edu.sg/undergraduate/courses/50040-natural-language-processing)

Describe the differences between various word vector embeddings.

- TBC



What is the difference between GPT, BERT and XLNet?

- TBC



What is the attention mechanism?

- TBC



What are transformers?

- TBC



(Machine Translation)



(Sequence to sequence model)



#### Computer Vision

[SUTD 50.035 Computer Vision](https://istd.sutd.edu.sg/undergraduate/courses/50035-computer-vision)

What is the difference between (the historical and latest CNNs, e.g. MobileNet)?

- VGG - multiple blocks, each block has multiple layers of CNN and max pool to downsample
- ResNet - Residual connections and batch normalisation
- Visual Transformers - TBC





Bounding boxes and bounding shapes, and how is the objective trained  







## Unclassified