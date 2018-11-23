'use strict';

var dataForge = require('data-forge');
var glob = require('glob');
var E = require('linq');
var fs = require('fs');

//
// Load as single CSV file containing share prices.
//
var loadSharePricesFile = function (filePath) {
	assert.isString(filePath);

	return dataForge.fromCSV(fs.readFileSync(filePath, 'utf8'));
};

//
// Load a directory full of files containing share prices.
// 
var loadSharePrices = function () {
	var filePaths = glob.sync("./prices/*");
	var loaded = E.from(filePaths).select(loadSharePricesFile).toArray();
	return dataForge.DataFrame.concat(loaded);
};

var sharePricesDataFrame = loadSharePrices();
console.log("shares:");
console.log(sharePricesDataFrame.head(5).toString());

var dividendsDataFrame = dataForge.fromCSV(fs.readFileSync('dividends.csv', 'utf8'));
console.log("dividends:");
console.log(dividendsDataFrame.head(5).toString());

var merged = sharePricesDataFrame.join(
    dividendsDataFrame, 
    sharePrice => sharePrice.date,
    dividend => dividend["ex date"],
    (sharePrice, dividend) => Object.assign({}, sharePrice, dividend)
);

console.log("merged:");
console.log(merged.toString());

fs.writeFileSync('output.csv', merged.toCSV());