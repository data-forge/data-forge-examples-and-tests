'use strict';

var dataForge = require('data-forge-ts-beta-test');
var fs = require('fs');
var glob = require('glob');

//
// Load as single CSV file containing share prices.
//
var loadSharePricesFile = function (filePath) {
	return dataForge.fromCSV(fs.readFileSync(filePath, 'utf8'));
};

//
// Load a directory full of files containing share prices.
// 
var loadSharePrices = function () {
	var filePaths = glob.sync("./prices/*");
	var loaded = filePaths.map(loadSharePricesFile);
	return dataForge.DataFrame.concat(loaded);
};

var dataFrame = loadSharePrices();

console.log(dataFrame.head(10).toString());

fs.writeFileSync('output.csv', dataFrame.toCSV());