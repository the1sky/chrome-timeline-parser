var fs = require('fs');
var input = __dirname + '/timeline.json';
var output = __dirname + '/graph.txt';

/**
 * API
 * $ node parser.js input output
 *
 * @param input optional. Default input is timeline.json
 * @param output optional. Default output is graph.txt
 */

process.argv.forEach(function (val, index, array) {
	switch (index) {
		case 2: 
			input = __dirname + '/' + val;
			break;
		case 3:
			output = __dirname + '/' + val;
			break;
		default:
			break;
	}
})

/**
 * Write header to file, file then copied to excel, use tab to space between column
 */ 

fs.writeFileSync(output, 'Start Time\tMemory Consumptions\tType\tDocument\tNodes\tEvent Listener\n');

/**
 * Get content and parse before write
 */
 
fs.readFile(input, 'utf8', function (err, data) {

	if (err) {
		console.log('Error ', err);
		return;
	}

	var startParse;
	var jsonData = JSON.parse(data);

	var writeData = function (index, start, type, heapSize, documents, nodes, eventListeners) {
		if (index == 1) {
			startParse = start;
			start = 0;
		}
		else {
			start = (start - startParse) / 1000;

			start = start.toString().replace('.', ',');
		}

		if (start == 0 && index == 1) {
			return;
		}
		else {			
			// Get memory consumption in MB and match excel formatting
			heapSize = (heapSize / (1024 * 1024)).toString().replace('.', ',');;

			var data = start + '\t' + heapSize + '\t' + type + '\t' + documents + '\t' + nodes + '\t' + eventListeners + '\n';

			fs.appendFileSync(output, data);
		}
	}

	/**
	 * JSON Data from timeline 
	 */
	var index = 0;

	jsonData.forEach(function(entry) {
		if (entry.children && entry.children.length > 0) {
			var graphData = entry.children;

			graphData.forEach(function(graphEntry) {
				index++;
				writeData(index, graphEntry.startTime, graphEntry.type, graphEntry.usedHeapSize, graphEntry.counters.documents, graphEntry.counters.nodes, graphEntry.counters.jsEventListeners);
			});
		}
	});

	console.log(index + ' entries parsed');
});