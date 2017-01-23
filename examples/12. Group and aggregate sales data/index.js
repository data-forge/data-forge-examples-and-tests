'use strict';

var dataForge = require('../../../data-forge-js/index.js');

var salesData = new dataForge.DataFrame([
    {
        ClientName: "Ash",
        Sales: 10,
    },
    {
        ClientName: "John",
        Sales: 12,
    },
    {
        ClientName: "Ash",
        Sales: 12,
    },
    {
        ClientName: "Ash",
        Sales: 3,
    },
    {
        ClientName: "William",
        Sales: 39,
    },
    {
        ClientName: "John",
        Sales: 20,
    },
    {
        ClientName: "John",
        Sales: 35,
    },
    {
        ClientName: "Ash",
        Sales: 15,
    },   
]);

// Group by client.
var summarized = salesData
    .groupBy(row => row.ClientName)
    .select(group => ({
        ClientName: group.first().ClientName,

        // Sum sales per client.
        Sales: group.select(row => row.Sales).sum(),
    }))
    .inflate() // Series -> DataFrame.
    ;

console.log('-- Output dataframe: ');
console.log(summarized.toString());

console.log('-- Output as JavaScript array: ');
var asJSArray = summarized.toArray();
console.log(asJSArray);    