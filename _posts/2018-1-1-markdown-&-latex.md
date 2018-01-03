---
layout: post
title: Markdown & Latex
---

Seeing Michael Nielsen's chapters with math formulas embeded in, I wanted to put latex math in my posts. Because I used Jekyll as my webpage engine, I followed this post [MathJax with Jekyll](http://www.gastonsanchez.com/visually-enforced/opinion/2014/02/16/Mathjax-with-jekyll/) to set up my environment.

There is one thing worth paying attention. After I added this line :`markdown: redcarpet` to my _config.yml file, I received an e-mail with a (link)[https://help.github.com/articles/updating-your-markdown-processor-to-kramdown/] telling me Github no longer supports ~~`redcarpet`~~ as its markdown praser so we need to set `kramdown` as the new markdown processor.


[kramdown](https://kramdown.gettalong.org/)

>kramdown (sic, not Kramdown or KramDown, just kramdown) is a free MIT-licensed Ruby library for parsing and converting a superset of Markdown. It is completely written in Ruby, supports standard Markdown (with some minor modifications) and various extensions that have been made popular by the PHP Markdown Extra package and Maruku.

[MathJax](http://docs.mathjax.org/en/latest/start.html)

>MathJax allows you to include mathematics in your web pages, either using LaTeX, MathML, or AsciiMath notation, and the mathematics will be processed using JavaScript to produce HTML, SVG or MathML equations for viewing in any modern browser.
