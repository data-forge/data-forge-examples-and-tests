'use strict';

var dataForge = require('data-forge');

var pmongo = require('promised-mongo');
var db = pmongo('localhost/some-database', ['someCollection', 'someOtherCollection']);

db.someCollection.find().toArray()
	.then(function (documents) {

        const dataFrame = new dataForge.DataFrame(documents);
		console.log(dataFrame.toString());

		var subset = dataFrame.subset(['SomeColumn', 'SomeOtherColumn']);
		console.log(subset.toString());

		return db.someOtherCollection.insert(subset.toArray());
	})
	.catch(function (err) {
		console.error((err && err.stack) || err);
	})
	.then(function () {
		db.close();
	});	

