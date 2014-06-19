Level Editor

What it needs to do: spit out a hash matching the format expected by map.js.
{name:'string' width: num, height: num, image: url, objs: array, blocks: array}

How to do this:
Start with inputs for width and height and name of map.
	Then an input for address of background image.
		Provide tool for adding objects.
			Select image.
			Choose w/h.
			Set position.
			Set cutoff.
		Provide tool for adding blocks.
			Choose a triangle or a quadrilateral.
			Click each point.
		Provide tool for saving map.
			Captures state of hash.
			Saves as common js module or maybe a plain JSON file.
Other needed features: 
	A rendering cycle.
	Deleting added stuff.
Wants:
	Undo