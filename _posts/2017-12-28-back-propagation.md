---
layout: post
title: Backpropagation
---

Things to do before 1.1.2018:

1. understand Backpropagation

Done 12.30.2017

2. visualize the learning process

To be continued

# Backpropagation
---
Backpropagation _(reverse-mode differentiation)_ is an algorithm that calculates deratives to update weights and biases in a neural network. Actually, it is the best (or only?) way to learn the optimal weights and biases in a neural network model. Just recapping the feed forward process, one data is input into the randomly initialized model, after the forward-propagation of one layer after another, we get a final output and the difference between it and the desired output is represented as an error. Our goal is to reduce the error of the output layer, and in doing so, we need to reduce the error of every former layer. So, backpropagation comes to rescue.

In Christopher Olah's blog [**Calculus on Computational Graphs: Backpropagation**](https://colah.github.io/posts/2015-08-Backprop/), he used computational graphs clearly explained: 

* The core principle behind backprop is `chain rule`.

* Why backprop is a fast algorithm ? Because `Forward-mode differentiation gave us the derivative of our output with respect to a single input, but reverse-mode differentiation gives us all of them`.

Michael Nielsen wrote a great chapter [**How the backpropagation algorithm works**](http://neuralnetworksanddeeplearning.com/chap2.html) in explaining backpropagation with both theory and real python code. In his chapter, he explained backpropagation wtih 4 equations:
![The four fundamental equations behind backpropagation](http://neuralnetworksanddeeplearning.com/images/tikz21.png)

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
        delta = self.cost_derivative(activations[-1], y) * \
            sigmoid_prime(zs[-1])
        nabla_b[-1] = delta
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
            delta = np.dot(self.weights[-l+1].transpose(), delta) * sp
            nabla_b[-l] = delta
            nabla_w[-l] = np.dot(delta, activations[-l-1].transpose())
        return (nabla_b, nabla_w)
...
```

