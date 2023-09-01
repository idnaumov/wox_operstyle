let showFuel = false
let refuelingCar = false
let fuel
let tank

mp.events.add('showFuelStation::CLIENT', ( fuelS, tankS ) => {
    fuel = fuelS
    tank = tankS

    mp.keys.bind(0x45, true, openFuelWindow)
})

function openFuelWindow() {
    browser.call('showFuelStation::CEF', fuel, tank);
    mp.gui.cursor.show(true, true);
    showFuel = true

    mp.keys.bind(0x1B, false, closeFuelWindow)
}

mp.events.add('Fuel_buyFuel::CLIENT', (type, fuelAmmount, fuelPrice) => {
    if (!type || !fuelAmmount || !fuelPrice ) return
    
    mp.events.callRemote('BuyFuel::SERVER', type, fuelAmmount, fuelPrice)
})

mp.events.add('FuelUnbindKey::CLIENT', () => {
    mp.keys.unbind(0x1B, true)
})

mp.events.add('FuelExitColshape::CLIENT', () => {
    refuelingCar = false
    showFuel = false
    mp.keys.unbind(0x45, true, openFuelWindow)
})

mp.events.add('FuelCloseWindow::CLIENT', () => {
    refuelingCar = true
    mp.events.callRemote('Hud_addNotify::SERVER',3,"Началась заправка авто",4000)

    setTimeout(function() {
        refuelingCar = false
        closeFuelWindow()
        mp.events.callRemote('Hud_addNotify::SERVER',1,"Заправка авто окончена, счастливого пути!",7000)
    }, 5000)
})

function closeFuelWindow() {
    if (!showFuel) return 
    if (refuelingCar) return
    showFuel = false
    browser.call('hideFuelStation::CEF')
    setTimeout( function() {
        mp.gui.cursor.show(false, false);
    }, 200)
    mp.keys.unbind(0x45, true, openFuelWindow)
}