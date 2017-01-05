'use strict';
var Cesium = require('cesium');

var defined  = Cesium.defined;

module.exports = getProperties;

/**
 * Get the minimum and maximum values for each property in the batch table.
 * Ignore properties in the batch table binary for now. Also ignore non-number values.
 *
 * @param {Object|Object[]} batchTable The batch table(s).
 * @returns {Object} An object with the minimum and maximum values for each property in the batch table.
 */
function getProperties(batchTable) {
    if (!defined(batchTable)) {
        return undefined;
    }
    var properties = {};
    var batchTables = Array.isArray(batchTable) ? batchTable : [batchTable];
    var batchTablesLength = batchTables.length;
    for (var i = 0; i < batchTablesLength; ++i) {
        batchTable = batchTables[i];
        for (var name in batchTable) {
            if (batchTable.hasOwnProperty(name)) {
                var values = batchTable[name];
                if (Array.isArray(values)) {
                    if (typeof values[0] === 'number') {
                        var min = Number.MAX_VALUE;
                        var max = -Number.MAX_VALUE;
                        var length = values.length;
                        for (var j = 0; j < length; ++j) {
                            var value = values[j];
                            min = Math.min(value, min);
                            max = Math.max(value, max);
                        }
                        properties[name] = {
                            minimum : min,
                            maximum : max
                        };
                    }
                }
            }
        }
    }
    if (Object.keys(properties).length === 0) {
        return undefined;
    }
    return properties;
}
