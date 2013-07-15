# Translate.js

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

## Maintainer

Copyright (c) 2013, Boyan Bonev bb AT randombitstudio.com
