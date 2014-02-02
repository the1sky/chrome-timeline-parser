## Chrome Timeline Parser

> Used to parse JSON result from Chrome Memory Timeline Recording to show Heap Size, Documents, Nodes and Event Listener

## Usage

    $ node parser.js

Default input is `timeline.json`, default output is `graph.txt`. The TXT then can be copied to excel to create graph.
To change input / output just add input and ouput on parameter

	$ node parser.js input.json output.txt

## License

MITs