'use strict'

$(function() {
	
	//
	// Helper function for plotting.
	//
	var plot = function (id, indexColumnName, dataFrame) {

		var remainingColumnNames = dataFrame.dropSeries(indexColumnName).getColumnNames();
		var flotSeries = E.from(remainingColumnNames)
			.select(function (columnName) {
				var seriesData = dataFrame
					.subset([indexColumnName, columnName])
					.toValues();
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
			values: values
		});
	
	//
	// Plot the data frame.
	//
	plot('#placeholder', "Date", dataFrame);
});
