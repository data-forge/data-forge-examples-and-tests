'use strict';

var dataForge = require('data-forge');

//
// Create a new data frame containing a simple moving average of the share price.
//
var computeSimpleMovingAverage = function (dataFrame, period) {

	var movingAvg = dataFrame.getSeries('Close')
		.rollingWindow(period)
		.select(window => [
				window.getIndex().last(),
				window.average()
        ])
        .withIndex(pair => pair[0])
        .select(pair => pair[1]);

	// Create a new data frame with the new column, doesn't modify original data frame.
	//console.log(movingAvg.getIndex().toArray());
	return dataFrame.withSeries('SMA', movingAvg);
};

var dataFrame = dataForge
		.readFileSync('share_prices.csv')
		.parseCSV()
		.parseFloats('Close')
		;

var withMovingAvg = computeSimpleMovingAverage(dataFrame, 30); // 30 day moving average.

console.log(withMovingAvg.head(12).toString());

withMovingAvg.asCSV().writeFileSync('output.csv');