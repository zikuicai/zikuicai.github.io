---
layout: post
title: Backpropagation
---

Things to do before 1.1.2018:

 - [x] Understand Backpropagation

Done 12.30.2017 :smiley:

- [ ] Momentum

To be continued

- [ ] Visualize the learning process

To be continued

# Backpropagation
---
Backpropagation _(reverse-mode differentiation)_ is an algorithm that calculates deratives to update weights and biases in a neural network. Actually, it is the best (or only?) way to learn the optimal weights and biases in a neural network model. Just recapping the feed forward process, one data is input into the randomly initialized model, after the forward-propagation of one layer after another, we get a final output and the difference between it and the desired output is represented as an error. Our goal is to reduce the error of the output layer, and in doing so, biaswe need to reduce the error of every former layer. So, backpropagation comes to rescue.

In Christopher Olah's blog [**Calculus on Computational Graphs: Backpropagation**](https://colah.github.io/posts/2015-08-Backprop/), he used computational graphs clearly explained: 

* The core principle behind backprop is `chain rule`.

* Why backprop is a fast algorithm ? Because `Forward-mode differentiation gave us the derivative of our output with respect to a single input, but reverse-mode differentiation gives us all of them`.

Michael Nielsen wrote a great chapter [**How the backpropagation algorithm works**](http://neuralnetworksanddeeplearning.com/chap2.html) in explaining backpropagation with both theory and real python code. In his chapter, he explained backpropagation wtih 4 equations and with the proof.

Here are the equations:
---

![The four fundamental equations behind backpropagation](http://neuralnetworksanddeeplearning.com/images/tikz21.png)

\begin{eqnarray} 
  \delta^L_j = \frac{\partial C}{\partial a^L_j} \sigma'(z^L_j)
\tag{BP1}\end{eqnarray}

\begin{eqnarray} 
  \delta^L = \nabla_a C \odot \sigma'(z^L)
\tag{BP1a}\end{eqnarray}

\begin{eqnarray} 
  \delta^l = ((w^{l+1})^T \delta^{l+1}) \odot \sigma'(z^l)
\tag{BP2}\end{eqnarray}

\begin{eqnarray}  
\frac{\partial C}{\partial b^l_j} = \delta^l_j
\tag{BP3}\end{eqnarray}

\begin{eqnarray}
  \frac{\partial C}{\partial w^l_{jk}} = a^{l-1}_k \delta^l_j
\tag{BP4}\end{eqnarray}

BP1 is to compute the error in the output layer

BP2 is to compute the error in the hidden layer

BP3 is to compute the rate of change of the cost with respect to any bias in the network

BP4 is to compute the rate of change of the cost with respect to any weight in the network

Suppose we have n layers, we use 5 steps to explain the learning process:

STEP 1: Use BP1 to get the error of the output layer which (nth)

STEP 2: Use BP3 to get delta

Here is the python code:
---

```python
class Network(object):
...
   def backprop(self, x, y):
        """Return a tuple "(nabla_b, nabla_w)" representing the
        gradient for the cost function C_x.  "nabla_b" and
        "nabla_w" are layer-by-layer lists of numpy arrays, similar
        to "self.biases" and "self.weights"."""
        nabla_b = [np.zeros(b.shape) for b in self.biases]
        nabla_w = [np.zeros(w.shape) for w in self.weights]
        # feedforward
        activation = x
        activations = [x] # list to store all the activations, layer by layer
        zs = [] # list to store all the z vectors, layer by layer
        for b, w in zip(self.biases, self.weights):
            z = np.dot(w, activation)+b
            zs.append(z)
            activation = sigmoid(z)
            activations.append(activation)
        # backward pass
        """ BP1 """
        delta = self.cost_derivative(activations[-1], y) * sigmoid_prime(zs[-1])
        
        """ BP3 """
        nabla_b[-1] = delta
        
        """ BP4 """
        nabla_w[-1] = np.dot(delta, activations[-2].transpose())
        
        # Note that the variable l in the loop below is used a little
        # differently to the notation in Chapter 2 of the book.  Here,
        # l = 1 means the last layer of neurons, l = 2 is the
        # second-last layer, and so on.  It's a renumbering of the
        # scheme in the book, used here to take advantage of the fact
        # that Python can use negative indices in lists.
        for l in xrange(2, self.num_layers):
            z = zs[-l]
            sp = sigmoid_prime(z)
            
            """ BP2 """
            delta = np.dot(self.weights[-l+1].transpose(), delta) * sp
            
            """ BP3 """
            nabla_b[-l] = delta
            
            """ BP4 """
            nabla_w[-l] = np.dot(delta, activations[-l-1].transpose())
            
        return (nabla_b, nabla_w)
...
```

Here is a video explaining backpropagation:
---

<div align="center"><iframe width="820" height="460" src="https://www.youtube.com/embed/tIeHLnjs5U8" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe></div>

In trask's post[A Neural Network in 11 lines of Python](http://iamtrask.github.io/2015/07/12/basic-python-network/):

```python
import numpy as np

# sigmoid function and its derivative
def nonlin(x,deriv=False):
    if(deriv==True):
        return x*(1-x)
    return 1/(1+np.exp(-x))
    
# input dataset
X = np.array([  [0,0,1],
                [0,1,1],
                [1,0,1],
                [1,1,1] ])
    
# output dataset            
y = np.array([[0,0,1,1]]).T

# seed random numbers to make calculation
# deterministic (just a good practice)
np.random.seed(1)

# initialize weights randomly with mean 0
syn0 = 2*np.random.random((3,1)) - 1

for iter in range(10000):

    # forward propagation
    l0 = X
    l1 = nonlin(np.dot(l0,syn0))

    # how much did we miss?
    l1_error = y - l1

    # multiply how much we missed by the 
    # slope of the sigmoid at the values in l1
    l1_delta = l1_error * nonlin(l1,True)

    # update weights
    syn0 += np.dot(l0.T,l1_delta)

print("Output After Training:")
print(l1)
```

When the model can't classify the dataset, we add a layer to the model:

```python
import numpy as np

def nonlin(x,deriv=False):
	if(deriv==True):
	    return x*(1-x)

	return 1/(1+np.exp(-x))
    
X = np.array([[0,0,1],
            [0,1,1],
            [1,0,1],
            [1,1,1]])
                
y = np.array([[0],
			[1],
			[1],
			[0]])

np.random.seed(1)

# randomly initialize our weights with mean 0
syn0 = 2*np.random.random((3,4)) - 1
syn1 = 2*np.random.random((4,1)) - 1

for j in range(60000):

	# Feed forward through layers 0, 1, and 2
    l0 = X
    l1 = nonlin(np.dot(l0,syn0))
    l2 = nonlin(np.dot(l1,syn1))

    # how much did we miss the target value?
    l2_error = y - l2
    
    if (j% 10000) == 0:
        print("Error:" + str(np.mean(np.abs(l2_error))))
        
    # in what direction is the target value?
    # were we really sure? if so, don't change too much.
    l2_delta = l2_error*nonlin(l2,deriv=True)

    # how much did each l1 value contribute to the l2 error (according to the weights)?
    l1_error = l2_delta.dot(syn1.T)
    
    # in what direction is the target l1?
    # were we really sure? if so, don't change too much.
    l1_delta = l1_error * nonlin(l1,deriv=True)

    syn1 += l1.T.dot(l2_delta)
    syn0 += l0.T.dot(l1_delta)
```
