---
layout: post
title: "Welcome to Jekyll"
---
You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

---
## Customizing
---

### Home Page
Home page is in `index.md` . Don't need to change. Layout helps put blogs on the home page.

### Layouts
Layouts are in `_layouts` folder and there are 4 types to choose from.

|layout|description|
|:---|:---|
|default|base of other 3|
|home|the home page layout|
|post|the post layout|
|page|a pure page|

### Posts
Posts are in `_posts` folder. Add post in it with the date as name.

---
### Stylesheet

If to change the **style** of this site,

change the content of *zikuicai.github.io/assets/css/style.scss* `@import 'jekyll-theme-cayman';` to the other .scss file such as `scss @import 'jekyll-theme-cayman-blog';` you have in *zikuicai.github.io/_sass/*. After changing the above setting, you will see a big improvement on the looking.

If to change the **color** specifically of this site,

change the content of *zikuicai.github.io/_sass/variables.scss*, for instance:

```scss
// Headers
$header-heading-color: #fff !default;
$header-bg-color: #159957 !default;
$header-bg-color-secondary: #155799 !default;
```
`$header-bg-color` is the right-most color of the header bar and `$header-bg-color-secondary` is the color of the left-most part. The color is the gradients in between. There are some good sites [*Mathematically derived gradient explorer*](http://jxnblk.com/shade/?base=%233DC8FF&hueShift=150&saturate=0.68&lighten=-0.23) , [*Color Gradients*](https://uigradients.com/#Summer) and [*Color Hex Color Codes*](http://www.color-hex.com/)for colors.


Check [this site](https://github.com/CodeLabora/codelabora.github.io) for more information.

---
Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: http://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
