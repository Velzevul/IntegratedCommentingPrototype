Integrated Commenting Prototype
=================

NOTE: the latest version of the prototype is on the "combined" branch

Folder Structure

/study - module for the 'study router' - allows the researcher behind the study to choose the proper condition for the participant, e.g. which interface is being used, which text, and whether there are clutter comments or not. The module stores the study parameters inside the browser's local storage. Accessible at /study.html
/answers - module for the window where partcipant sees questions and can submit answers. To know when the participant starts the study it is continuously polling localstorage for the values ($interval at line 10). Not very efficient, but was simple and good enough for the study.
/server - not in use, should be removed from the project
/logger/scipts - shared module that implements logging participant's actions (to localstorage).
/app - here be the prototypes...
WARNING: Inside the Gruntfile.js, sections that relate to css processing (copmass, css watcher, etc.) were commented out on purpose. During the stage 2 of the project all the new css code was added directly to the css/main.css file, which is the file generated automatically when one compiles scss. Thus, if one accidentally were to run css processing, all the chagnes would be lost :(

Other than that, everything else should be pretty straightforward: npm install && npm start for dev. version or grunt build for production.

===

Integrated commenting prototype for the existing D2L educational platform. 

The prototype illustrated example of workflow for review exsisting comments, replying to the comments, and adding new comments (contextual/general) to the instructor-posted content. To demonstrate the sample workflow of deletion/editing of a comment, deletion and editing actions are available only for the comments authored by user named "Volodymyr  Dziubak".

To see the detailed description of the interface, please refer to the system description document which has been handled to the Desire2Learn team.

### Target browser and limitations
* This proof-of-concept interface has been tested only on Google Chrome. it will work in other browsers as well, but I haven't tested it anywhere else. 
* There is no persistence layer in the prototype, meaning that after page refresh any authored comments will be gone.
* Target monitor width for this proof-of-concept prototype was 1200px.

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
