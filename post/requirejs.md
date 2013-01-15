---
title: RequireJS
template: post
date: 2013-01-15 00:00:00 -5
description: A look at RequireJS for JavaScript module loading and dependency management
---

[RequireJS](http://requirejs.org/) is a JavaScript utility for module loading and dependency management. It enables you to keep independent modules (think: classes) in separate files, and manages the required dependencies between them. This makes for a more traditional development environment in the sense that you can import classes as you would in Java or Python, for example. This makes for much more maintainable JavaScript.

If you're accustomed to working in a front-end environment, you may be worried that if we keep our files separate, it will negatively impact our page load speed. After all, the more files we include on our page, the longer it will take to load. This is true, but with a RequireJS workflow, we'll typically use an optimization tool during the deployment process to concatenate and minify our code to a single, small file. You can read more about this in the "Further Reading" section below.

## An Example

Let's take a look at a very basic example of how to use RequireJS.

Imagine we have the following project structure:

* index.html
* js/
 * main.js
 * dinner.js
 * meat.js
 * potatoes.js
 * require.js

We will want to start by adding a script tag to our main page to load the RequireJS library. We will also specify an entry point through the "data-main" attribute.

```xml
<!doctype html>
<html>
<head>
    <title>My Dinner Example</title>
</head>
<body>
    Total meal calories: <span id="lblCalories"></span>

    <script data-main="js/main" src="js/require.js"></script>
</body>
</html>
```

This entry point will load the "js/main.js" script automatically. From any of our RequireJS files, we can either _define_ a new module or simply load other modules through _require_. In either case, we can load dependencies through the function call, as seen below:

```javascript
// dinner.js
// Define a new module named "dinner"
define([ 'meat', 'potatoes' ],
function(meat, potatoes) {
    // Do something using meat and potatoes
    return {
        totalCalories: meat.calories + potatoes.calories
    };
});
```
```javascript
// main.js
// Load the dinner module
require([ 'dinner' ],
function(dinner) {
    document.getElementById('lblCalories').innerHTML = dinner.totalCalories;
});
```

To load other modules as dependencies, you pass an array as the first parameter with a series of modules to load. As you can see here, loading 'dinner' will call the dinner.js file, where we return an object containing the _totalCalories_ property. In the main script, I use _require_ because I want to use other modules, but do not intend to have main itself be used as a module elsewhere. When you want to define a module, you'll use the _define_ method instead. There are several ways these methods can be called, including the option to specify a custom module name. To learn more, read the [API documentation for define](http://requirejs.org/docs/api.html#define).

## Further Reading

For a more thorough walkthrough of RequireJS, read through the [API documentation](http://requirejs.org/docs/api.html). For instructions on how to concatenate and minify your RequireJS projects, refer to the [optimization instructions](http://requirejs.org/docs/optimization.html). To simplify the build process, you may find that using a tool like [grunt.js](http://gruntjs.com/) can be very helpful.

RequireJS is extensible, so there are a variety of plugins you can use to extend the capabilities of the module loader. For example, if you want to load CoffeeScript, you can use the [require-cs](https://github.com/jrburke/require-cs) plugin. If you're eagerly anticipating the [new modules](http://wiki.ecmascript.org/doku.php?id=harmony:modules) arriving in the next iteration of JavaScript (i.e. ECMAScript 6), you can preview the functionality using [require-hm](https://github.com/jrburke/require-hm). 

To see how RequireJS is used in an existing project, check out my ["Toupée" project on GitHub](https://github.com/aduth/Toupee), which uses RequireJS with Backbone.js.

## Conclusion

RequireJS takes the guess work out of dependency management, meaning you can worry less about the order your scripts are loaded and where your functions are defined. By separating your modules into separate files, you promote a separation of concerns and avoid the possibility that your application's main script grows too large to manage. This leads to maintainable JavaScript and, in turn, happy developers.