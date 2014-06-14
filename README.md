#iso-engine

Iso engine is a fairly low level api for building sprite based two dimenisonal games.

##current state
Iso engine is built with Common JS modules, compiled for the browser with browserify. A central game and character object work together with map objects to create the world. The game uses SAT.js for collision detection, lodash for functional support, and keypress.js for keyboard input capture.

##TODO
Collision algorithm is wonky. Change algorithm for movement to check in smaller pixel units for collisions and more intelligently handle 'bouncing'.

Add functionality for waiting for image load for rendering.

Add support for stopping render cycle on blur.

Add support for 'cut scenes' and a path finding algorithm.

Add support for 'action zones'.

Make a level editor.