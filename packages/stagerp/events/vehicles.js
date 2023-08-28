let enums = require('../utilities/enums');

let vehicleInfo = exports;

vehicleInfo.loadAll = function () {
    console.log('vehicleInfo.loadAll');

    CONFIG.query('SELECT * FROM vehicles ORDER BY display_name ASC', [], async function (err, rows) {
        rows.forEach(function (item) {
            enums.vehicleInfo.push(item);
        });
        console.log('[VEHICLES] Vehicle Info Loaded: ' + enums.vehicleInfo.length);
    })
}