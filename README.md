Integrated Commenting Prototype
=================

Integrated commenting prototype for the existing D2L educational platform. 

The prototype illustrated example of workflow for review exsisting comments, replying to the comments, and adding new comments (contextual/general) to the instructor-posted content. To demonstrate the sample workflow of deletion/editing of a comment, deletion and editing actions are available only for the comments authored by user named "Volodymyr  Dziubak".

To see the detailed description of the interface, please refer to the system description document which has been handled to the Desire2Learn team.

### Target browser and limitations
* This proof-of-concept interface has been tested only on Google Chrome. it will work in other browsers as well, but I haven't tested it anywhere else. 
* There is no persistence layer in the prototype, meaning that after page refresh any authored comments will be gone.
* Target monitor width for this proof-of-concept prototype was 1200px.

### Todo
* Show number of comments on buttons(updates when new comment is added)

### Requirements
 * nodejs (+ npm )
 * ruby

### Dependencies
Project dependencies (with required versions) are listed in the following files

* *Gemfile* – ruby gems
  * [sass](http://sass-lang.com/) – support for scss stylesheets
    * [compass](http://compass-style.org/) – library of scss snippets + compiler for scss
* *package.json* – node modules
  * [bower](http://bower.io/) – package manager for Javascript
    * [grunt](http://gruntjs.com/) – Javascript task runner
    * ...various grunt tasks
* *bower.json* – javascript libraries
  * modernizr
    * jquery
    * angularjs
    * ...few angularjs extensions

### Run and build
The first step after ` git clone ` should be
```
npm install
```

run local server:
```
npm start
```

build export-ready version:
```
npm install && grunt build
```

if grunt is not installed globally on your machine, then
```
npm install && ./node_modules/.bin/grunt build
```
