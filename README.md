#Apartment 5B
Apartment 5B is an in-development browser-based game inspired by Susan Kare and Seinfeld. The game is programmed in JavaScript, using CommonJS modules and Browserify. Additional support is provided by Grunt, Backbone, jquery, keypress.js, SAT.js, and lodash.

##Modules
The project is organized into two large pieces, the 'game' and the 'editor'. Both the game and the editor are in progress, but the editor is not yet functional.

##Build
The current dev and production builds are available in the `dev` and `prod` directories. To run a dev server, or build your own changes to the code, you'll have to get all the package dependencies by running `npm install`. The dev server and build watching tasks are run with `grunt serve`. The game demo will be available at `localhost:3000` and the editor at `localhost:3000/editor.html`. Changes to files in `src` will be compiled and reflected in `dev` while this task is running.

##Deploy
A modified version of `grunt-ssh-deploy` is used in the `grunt ssh_deploy` task to push the application to a production server.

##WIP
Currently, work is focused on refactoring current game code to more thoroughly separate concerns between Models and Views, and building out the functionality of the editor.

##What's Next
Further build out game functionality and features.
