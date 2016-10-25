'use strict';

var fs = require('fs');
var dataForge = require('../../../data-forge-js/index.js');
var moment = require('moment');

//
// Summarise dividends by year.
//
var summarizeDividends = function (dataFrame) {

	return dataFrame
		.withSeries({
			Year: function (df) {
				return df.deflate(function (row) {
						return moment(row['Ex Date'], 'DD-MMM-YYYY').toDate().getFullYear(); // Extract year. 
					});				
			},
		})
		.groupBy(function (row) {
			return row.Year; // Group by year.
		})
		.toObject(
			// Key
			function (dividendsByYear) {
				return dividendsByYear.first().Year;
			},
			// Value
			function (dividendsByYear) {
				return dividendsByYear
					.aggregate(0, function (prev, dividend) {
						return prev + dividend.Amount;
					});
			}
		);
};

var dataFrame = dataForge
	.fromCSV(fs.readFileSync('dividends.csv', 'utf8'))
	.parseFloats("Amount")
	;

var summary = summarizeDividends(dataFrame);
fs.writeFileSync('output.json', JSON.stringify(summary, null, 4));
