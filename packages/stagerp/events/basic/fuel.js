let enums = require('../../utilities/enums')
let chat = require("../basic/hud");
let auto = require('../../business/autosalon')

let fuelColshapes = [
    {x: -525.2750854492188, y: -1210.998046875, z: 18.184833526611328, scale: 10, azsnumber: 1},
    {x: -319.849853515625, y: -1471.55322265625, z: 30.548583984375, scale: 15, azsnumber: 2},
    {x: 265.23046875, y: -1258.8905029296875, z: 29.142911911010742, scale: 17, azsnumber: 3},
    {x: 175.31671142578125, y: -1562.342041015625, z: 29.264751434326172, scale: 10, azsnumber: 4},
    {x: 1208.6092529296875, y: -1402.061767578125, z: 35.22414016723633, scale: 10, azsnumber: 5},
    {x: 1181.499267578125, y: -330.32330322265625, z: 69.3165512084961, scale: 15, azsnumber: 6},
    {x: 620.8653564453125, y: 268.82000732421875, z: 103.08939361572266, scale: 15, azsnumber: 7},
]

let fuelInfo = exports;

//let consumption = 0.01; // 0.003

// AZS SYSTEM

fuelInfo.loadAll = function() {
    console.log('fuelInfo.loadAll');

    fuelColshapes.forEach(function (item) {
        let colshape = mp.colshapes.newSphere(item.x, item.y, item.z-1, item.scale)
        let blip = mp.blips.new(415, new mp.Vector3(item.x, item.y, item.z), {
            name: 'АЗС',
            scale: 1.0,
            drawDistance: 10000.0,
            shortRange: true,
            color: 1
        })
        colshape.setVariable('azsNumber', item.azsnumber);
    })
    console.log('[FUEL] Fuel colshapes created!');
}

mp.events.add("playerEnterColshape", (player, colshape) => {
    if (!colshape.getVariable('azsNumber')) return
    if (!player.vehicle) return
    if (player.seat != 0) return
    
    let veh = player.vehicle;
    let fuel = veh.getVariable('fuel');
    let tank = veh.getVariable('tank');

    veh.engine = false;

    player.call('showFuelStation::CLIENT', [fuel, tank]);
});

mp.events.add("playerExitColshape", (player, colshape) => {
    if (!colshape.getVariable('azsNumber')) return

    player.call('FuelExitColshape::CLIENT');
});


mp.events.add('BuyFuel::SERVER', (player, type, fuelAmmount, price) => {
    if (!player || !type || !fuelAmmount || !price) return
    
    if (type == 'nal') {
        if (player.getMoney() <= price) return chat.addNotify(player, 2, "Недостаточно наличных средств для покупки", 4000);
        player.removeMoney(price)
    } else if (type == 'card') {
        if (player.getBankMoney() <= price) return chat.addNotify(player, 2, "Недостаточно средств на карте для покупки", 4000);
        player.removeBankMoney(price)
    }

    player.call('FuelUnbindKey::CLIENT')
    let veh = player.vehicle
    if (!veh) return

    let fuel = parseInt(veh.getVariable('fuel'))
    let tank = veh.getVariable('tank')

    fuel = fuel + fuelAmmount
    if (fuel > tank) { fuel = tank }
    veh.setVariable('fuel', fuel)
    auto.refuelCar(veh);
    player.call('FuelCloseWindow::CLIENT')
    chat.addNotify(player, 1, "Вы оплатили "+fuelAmmount+" л. топлива на сумму $"+fuelAmmount, 4000);
})

// FUEL SYSTEM

function startFuelUse( pl, veh, seat ) {
    if ( seat != 0 ) return

    let carFuel = veh.getVariable('fuel')
    if (carFuel <= 0) {
        veh.engine = false;
        chat.addNotify(player, 2, "Нет бензина!", 4000)
    }
    setTimeout(fuelUse, 1000, pl);
}
mp.events.add("playerEnterVehicle", startFuelUse);

function fuelUse(pl) {
    if (!pl) return
    let veh = pl.vehicle;

    if (veh) {
        setTimeout(fuelUse, 10000, pl)
        if (pl.seat != 0) return
        if (!veh.engine) return

        let consumption = getCarConsumption( veh.model ) / 10000;

        let fuel = veh.getVariable('fuel')
        if (fuel <= 0) {
            veh.engine = false;
            chat.addNotify(pl, 2, "Бензин закончился", 4000)

            return
        }

        let newCoords = veh.position;
        let oldCoords = veh.getVariable('fuelCoords') || newCoords;
        oldCoords = new mp.Vector3(oldCoords.x, oldCoords.y, oldCoords.z)
        veh.setVariable('fuelCoords', newCoords);

        let usedFuel = newCoords.subtract(oldCoords).length() * consumption + (getRandomArbitrary(100, 1000)/15000)
        let remainingFuel = takeCarFuel(veh, usedFuel)

        if (remainingFuel < 0.01) {
            veh.engine = false;
            chat.addNotify(pl, 2, "Бензин закончился", 4000)
        } 

    }
}

function takeCarFuel(veh, used) {
    if (veh.type != 'vehicle') return
    let fuel = veh.getVariable('fuel')
    let tank = veh.getVariable('tank')

    fuel = fuel - used;
    if ( fuel < 0 ) fuel = 0
    veh.setVariable('fuel', fuel)
    return fuel
}

function getCarConsumption(hash) {
    if (!hash) return
    let carTable = findRow(enums.vehicleInfo, 'model_joaat', hash);

    return carTable?.['consumption'] ?? 9;
}

fuelInfo.getCarTank = function (hash) {
    if (!hash) return
    let carTable = findRow(enums.vehicleInfo, 'model_joaat', hash);

    return carTable?.['fueltank'] ?? 65;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function findRow(table, columnName, value) {
    for (let i = 0; i < table.length; i++) {
      if (table[i][columnName] === value) {
        return table[i];
      }
    }
    return null;
  }