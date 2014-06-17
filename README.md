#Apartment 5B
Apartment 5B is an in-development browser-based game inspired by UI design godmother Susan Kare and Seinfeld. The game is programmed in javascript, using Common JS modules and browserify.

##Modules
Apartment 5B uses several modules to construct and run the game. The primary module is `game.js`, which handles the render loop and manages the other game objects. The `map.js` module handles render layering and location-based logic, while `character.js` and `sprite.js` work together to manage the state and representation of the character on the screen.

The engine relies on a UMD wrapped version of [Keypress](https://github.com/dmauro/Keypress) for registering and handling keyboard events, [Lo-Dash](http://lodash.com/) for functional support, and [SAT](https://github.com/jriecken/sat-js) for collision detection.

##Build
The current code is not very well documented and is in flux, but a demo is always available in `dist/index.html`, and changes can be built using the Grunt tasks.

##TODO
Collision algorithm is wonky. Change algorithm for movement to check in smaller pixel units for collisions and more intelligently handle 'bouncing'.

Add functionality for waiting for image load for rendering.

Add support for 'cut scenes' and a path finding algorithm.

Add support for 'action zones'.

Make a level editor.