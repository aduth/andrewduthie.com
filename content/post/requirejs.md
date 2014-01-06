---
title: Adding Structure to Your JavaScript Projects With RequireJS
template: post
date: 2013-01-15 00:00:00 -5
description: A look at RequireJS for JavaScript module loading and dependency management
---

[RequireJS](http://requirejs.org/) is a JavaScript utility for module loading and dependency management. It enables you to keep independent modules in separate files, and automatically loads the defined dependencies between them. This gives the notion of an "import" and, in theory, leads to more maintainable JavaScript.

Modules can be thought of simply as blocks of code executed under the context of the namespace in which it is defined. By default, this is the filename without the extension. In the example below, calling `define` in the _dinner.js_ script will create the dinner module. The return value of a module can be used by any other code which depends upon it.

It is important to note that keeping the JavaScript files separated will negatively impact your page load speed. With a RequireJS workflow, you will want to use an optimization tool (r.js) during your production deployment process to concatenate and minify your code to a single, small file. You can read more about this in the "Further Reading" section below.

## An Example

Let's take a look at a very simple example of RequireJS in a web application.

Imagine we have the following project structure:

* index.html
* js/
 * main.js
 * dinner.js
 * meat.js
 * potatoes.js
 * require.js

We will want to start by adding a script tag to our main page to load the RequireJS library. We will also specify an entry point through the `data-main` attribute.

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

This entry point will load the _js/main.js_ script automatically. From our RequireJS scripts, we can either `define` a new module or use `require` to load dependencies without defining a new module. In either case, loading dependencies is done using the function call, as seen below in _dinner.js_ and _main.js_:

```javascript
// meat.js (potatoes.js would be nearly identical)
// Define a new module named "meat"
define(function() {
    return {
        calories: 350
    };
});
```
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

To load other modules as dependencies, pass an array as the first parameter with a series of modules to load. In the main script, loading 'dinner' will call the _dinner.js_ file, which returns an object containing the `totalCalories` property. Since our meat and potato modules do not depend on anything else, we can omit the first parameter. In the main script, I use `require` because I want to depend on modules, but I do not want to have main itself be used as a dependency elsewhere. Use the `define` method instead when defining a module. By default, the module name takes the name file minus the extension, so you should only define a single module per file. 

There are several ways to call the `define` and `require` methods, including the option to specify a custom module name. To learn more, read the [API documentation for define](http://requirejs.org/docs/api.html#define).

## Further Reading

For a more thorough walkthrough of RequireJS, read through the [API documentation](http://requirejs.org/docs/api.html). For instructions on how to concatenate and minify your RequireJS projects, refer to the [optimization instructions](http://requirejs.org/docs/optimization.html). To simplify the build process, you may find that using a tool like [grunt.js](http://gruntjs.com/) can be very helpful.

RequireJS is extensible, so there are a variety of plugins you can use to extend the capabilities of the module loader. For example, if you want to load CoffeeScript, you can use the [require-cs](https://github.com/jrburke/require-cs) plugin. If you use a templating library like mustache.js, you can use the  [text.js](https://github.com/requirejs/text) plugin to load static text resources to avoid writing your templates as JavaScript strings or between `<script>` tags.

To see how RequireJS is used in an existing project, check out my ["Toupée" project on GitHub](https://github.com/aduth/Toupee), which uses RequireJS with Backbone.js.

## Conclusion

RequireJS removes the guess work from dependency management, meaning you can worry less about the order your scripts are loaded and where you define your functions. By separating your modules into separate files, you create a separation of concerns and avoid the possibility that your application's main script grows too large to manage.