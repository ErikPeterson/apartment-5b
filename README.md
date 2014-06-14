#iso-engine

Iso engine is a fairly low level api for building sprite based two dimenisonal games.

##current state
Iso engine is built with Common JS modules, compiled for the browser with browserify. A central game and character object work together with map objects to create the world. The game uses SAT.js for collision detection, lodash for functional support, and keypress.js for keyboard input capture.