'use strict';

var dataForge = require('data-forge');
var fs = require('fs');

var dataFrame = dataForge.fromCSV(fs.readFileSync('dividends.csv', 'utf8'))
    .parseDates("Ex Date", "DD-MMM-YYYY")
    .generateSeries({
        Year: row => row['Ex Date'].getFullYear(),
    })
    .parseFloats("Amount");

var summary = dataFrame.groupBy(row => row.Year)
    .inflate(group => {
        return {
            Year: group.first().Year,
            Amount: group.deflate(row => row.Amount).sum(),
        };
    });

var summaryObj = summary.toObject(row => row.Year, row => row.Amount);

console.log(summaryObj);

fs.writeFileSync('output.json', JSON.stringify(summaryObj, null, 4));