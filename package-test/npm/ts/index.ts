import * as dataForge from 'data-forge';
import 'data-forge-fs';

// 
// Create a simple data frame.
//
var values = dataForge
	.range(0, 14)
    .select(i => [i, Math.sin(i), Math.cos(i)]);
    
var dataFrame = new dataForge.DataFrame({
		columnNames: ["index", "Sin", "Cos"], 
		rows: values
	})
	.setIndex("index")
    .dropSeries("index");
    
console.log(dataFrame.skip(4).take(5).toString());

var series = dataFrame.getSeries("Sin");
console.log(series.skip(4).take(5).toString());

dataFrame.asCSV().writeFileSync("./test.csv");

const df2 = dataForge.readFileSync("./test.csv").parseCSV();
console.log("After save and load:");
console.log(df2.toString());