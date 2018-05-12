'use strict'

$(function() {
	
	//
	// Helper function for plotting.
	//
	var plot = function (id, indexColumnName, dataFrame) {
		var index = dataFrame.getSeries(indexColumnName).toArray();
		var remainingColumns = dataFrame
			.dropSeries(indexColumnName)
			.getColumns()
			.toArray();

		var flotSeries = Enumerable.from(remainingColumns)
			.select(function (column) {
				var name = column.name;
				var data = Enumerable.from(index)
					.zip(column.series.toArray(), function (index, value) {
						return [index, value];
					})
					.toArray();
				
				return {
					label: name,
					data: data,
				};
			})
			.toArray();
		
		$.plot(id, flotSeries);
	};
	
	// 
	// Create a simple data frame.
	//
	var values = [];
	for (var i = 0; i < 14; ++i) {
		values.push([i, Math.sin(i), Math.cos(i)]);
	}

	var dataFrame = new dataForge.DataFrame({
			columnNames: ["index", "Sin", "Cos"], 
			rows: values
		});
	
	//
	// Plot the data frame.
	//
	plot('#placeholder', "index", dataFrame);
});
