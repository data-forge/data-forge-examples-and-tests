'use strict'

const dataForge = require('data-forge');
const moment = require('moment');
const E = require('linq');

$(function() {
	
	//
	// Helper function for plotting.
	//
	var plot = function (id, indexColumnName, dataFrame) {

		var remainingColumnNames = dataFrame
			.dropSeries(indexColumnName)
			.getColumnNames();

		var flotSeries = E.from(remainingColumnNames)
			.select(function (columnName) {
				var seriesData = dataFrame
					.subset([indexColumnName, columnName])
					.toArray();
				seriesData = E.from(seriesData)
					.select(function (entry) {
						return [entry.Date.getTime(), entry.Sin];
					})
					.toArray();
				return {
					label: columnName,
					data: seriesData,
				};
			})
			.toArray();

		$.plot(id, flotSeries, {
				xaxis: { mode: "time" }
			});
	};
	
	// 
	// Create a simple data frame.
	//
	var values = E
		.range(0, 14)
		.select(function (i) {
			return [new Date(2015, 3, i), Math.sin(i), Math.cos(i)];
		})
		.toArray();

	var dataFrame = new dataForge.DataFrame({
			columnNames: ["Date", "Sin", "Cos"], 
			rows: values
		});
	
	//
	// Plot the data frame.
	//
	plot('#placeholder', "Date", dataFrame);
});
