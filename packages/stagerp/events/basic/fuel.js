let enums = require('../../utilities/enums')
let chat = require("../basic/hud");

let consumption = 0.01; // 0.003

function startFuelUse( pl, veh, seat ) {
    if ( seat != 0 ) return

    let carFuel = veh.getVariable('fuel')
    if (carFuel <= 0) {
        veh.engine = false;
        mp.events.call('Hud_addNotify::SERVER',2,"Нет бензина",5000)
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
            chat.addNotify(player, 2, "Бензин закончился", 4000)

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
            chat.addNotify(player, 2, "Бензин закончился", 4000)
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

    if (carTable) {
        if ('consumption' in carTable) {
            return carTable.consumption
        } else {
            return 50
        }
    } else {
        return 50
    }
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