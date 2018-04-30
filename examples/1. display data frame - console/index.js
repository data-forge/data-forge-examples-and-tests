'use strict';

var dataForge = require('data-forge-ts-beta-test');

// 
// Create a simple data frame.
//
var values = dataForge.range(0, 14)
    .select(i => [i, Math.sin(i), Math.cos(i)]);
    
var dataFrame = new dataForge.DataFrame({
		columnNames: ["index", "Sin", "Cos"], 
		rows: values 
	})
	.setIndex("index")
    .dropSeries("index");
    

    console.log('!!');

console.log(dataFrame.toString()); //fio:
console.log('!!');


console.log(dataFrame.skip(4).take(5).toString());

var series = dataFrame.getSeries("Sin");
console.log(series.skip(4).take(5).toString());
