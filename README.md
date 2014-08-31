#Apartment 5B
Apartment 5B is an in-development browser-based game inspired by  Susan Kare and Seinfeld. The game is programmed in JavaScript, using CommonJS modules and Browserify. Additional support is provided by Backbone, jquery, keypress.js, SAT.js, and lodash.

##Modules
The project is organized into two large pieces, the 'game' and the 'editor'. Both the game and the editor are in progress, but the editor is not yet functional.

##Build
To build, clone the repo and then run `npm install` to get all the dependencies. Then, run `grunt` to generate dist from src. To serve the app, run grunt serve. The game demo will be available at localhost:3000 and the editor view at /editor.html.

##WIP
Currently, work is focused on refactoring current game code to more thoroughly separate concerns between Models and Views, and building out the functionality of the editor.

##What's Next
Further build out game functionality and features.
