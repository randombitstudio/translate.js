# Translate.js v0.1.0

##Introduction

Translate.js is a jquery plugin that allows in form i18n support for simple text elements. Enabling the plugin on a selected element will submit an array or json encoded version of multi language data while display the field in a single specific language.

**Use this plugin** when the application javascript model is simple and you don't carry many external js dependencies.

**Do NOT use this plugin** if you are using backbone, knockout or equivalent library or if you are building a single page app. Providing i18n support in form with knockout & co is easier and cleaner, don't be lazy!


## Install

The plugin is available as a bower package.

    $ bower install translate.js
    
## Example

To fully utilize the plugin you will need to provide your own form styling.
An example can be seen by checking out the project, running:

    $ bower install   
    
and opening examples/example.htm in a browser.

## Documentation.

For list of available plugin options, consult the bottom of the translate.{semantic_version}.js file.
Ideally I'd like to ship documentaion and default sass, so something to do for the next minor incremental.

## Dependencies

Consult bower.json.

## LICENSE
This software is distributed under the following version of the MIT License available online [here](http://randombitstudio.com/MIT/LICENSE)

Copyright (c) 2013 RandomBitStudio/BB

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
