'use strict';

var dataForge = require('data-forge');
var fs = require('fs');

//
// Load share prices and filter for a particular company.
// 
var loadSharePricesForCompany = function (companyCode, filePath) {

	companyCode = companyCode.toUpperCase();

	return dataForge.fromCSV(fs.readFileSync(filePath, 'utf8'))
		.where(function (row) {
			return row.Symbol.toUpperCase() === companyCode;
		});
};

var dataFrame = loadSharePricesForCompany('ABC', 'share_prices.csv')

console.log(dataFrame.head(10).toString());

fs.writeFileSync('output.csv', dataFrame.toCSV());