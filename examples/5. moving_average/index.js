'use strict';

var dataForge = require('../../../data-forge-js/index.js');
var E = require('linq');

//
// Create a new data frame containing a simple moving average of the share price.
//
var computeSimpleMovingAverage = function (dataFrame, period) {

	var movingAvg = dataFrame.getSeries('Close')
		.rollingWindow(period)
		.asPairs()
		.select(function (pair) {
			var window = pair[1];
			return [
				window.asPairs().last()[0], 
				window.average()
			];
		})
		.asValues()
		;

	// Create a new data frame with the new column, doesn't modify original data frame.
	//console.log(movingAvg.getIndex().toArray());
	return dataFrame.withSeries('SMA', movingAvg);
};

var dataFrame = dataForge
		.readCSVFileSync('share_prices.csv')
		.parseFloats('Close')
		;

var withMovingAvg = computeSimpleMovingAverage(dataFrame, 30); // 30 day moving average.
withMovingAvg.writeCSVFileSync('output.csv');