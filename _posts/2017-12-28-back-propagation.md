---
layout: post
title: Backpropagation
---

things to do before 1.1:

1. understand Backpropagation
done 12.30
2. visualize the learning process


# Backpropagation
---
Backpropagation _(reverse-mode differentiation)_ is an algorithm that calculates deratives to update weights and biases in a neural network. Actually, it is the best (or only?) way to learn the optimal weights and biases in a neural network model. Just recapping the feed forward process, one data is input into the randomly initialized model, after the forward-propagation of one layer after another, we get a final output and the difference between it and the desired output is represented as an error. To reduce the error of the output layer, we need to reduce the error of the output of every former layer. In this case, backpropagation comes to rescue.

In Christopher Olah's blog [**Calculus on Computational Graphs: Backpropagation**](https://colah.github.io/posts/2015-08-Backprop/), he used computational graphs clearly explained the core principle - **chain rule** and the reason backpropagation is a fast algorithm - `Forward-mode differentiation gave us the derivative of our output with respect to a single input, but reverse-mode differentiation gives us all of them.`

Michael Nielsen wrote a great chapter [**How the backpropagation algorithm works**](http://neuralnetworksanddeeplearning.com/chap2.html) in explaining backpropagation with both theory and real python code. In his chapter, he explained backpropagation wtih 4 equations:
![The four fundamental equations behind backpropagation](http://neuralnetworksanddeeplearning.com/images/tikz21.png)

```python
class Network(object):
...
    def update_mini_batch(self, mini_batch, eta):
        """Update the network's weights and biases by applying
        gradient descent using backpropagation to a single mini batch.
        The "mini_batch" is a list of tuples "(x, y)", and "eta"
        is the learning rate."""
        nabla_b = [np.zeros(b.shape) for b in self.biases]
        nabla_w = [np.zeros(w.shape) for w in self.weights]
        for x, y in mini_batch:
            delta_nabla_b, delta_nabla_w = self.backprop(x, y)
            nabla_b = [nb+dnb for nb, dnb in zip(nabla_b, delta_nabla_b)]
            nabla_w = [nw+dnw for nw, dnw in zip(nabla_w, delta_nabla_w)]
        self.weights = [w-(eta/len(mini_batch))*nw 
                        for w, nw in zip(self.weights, nabla_w)]
        self.biases = [b-(eta/len(mini_batch))*nb 
                       for b, nb in zip(self.biases, nabla_b)]
```

