
let open = false;

mp.keys.bind(0x49, true, function () {
    if (chatOpened == true) return;
    mp.events.callRemote('Inventory_loadPlayerItems::SERVER') 
    
});

mp.events.addCommand('testinv', (player) => {
    Inventory_addItem('[RL] Маска Егор Шип', 'Маска для скрытия лица', "clothes", "./systems/inventory/img/skin-items/mask.svg", 1, 2, true, true, 0, 0);
});

mp.events.add('Inventory_openWindow::CLIENT', (items) => {
        if(open){
        browser.call('Inventory_open::CEF',false,items)
        open = false;
        mp.gui.cursor.show(false, false);
        mp.game.ui.displayRadar(true);
        mp.events.call('HUD_setShow::CLIENT', true)
        browser.call('Inventory_clearSlots::CEF', items)
        }else{

    browser.call('Inventory_open::CEF',true,items)
    mp.gui.cursor.show(true, true);
    mp.game.ui.displayRadar(false);
    mp.events.call('HUD_setShow::CLIENT', false)
    open = true;
        }
})

mp.events.add('Inventory_useItem::CLIENT', (item) => {

    mp.events.callRemote('Inventory_useItem::SERVER',item)

})

function Inventory_addItem(name, desc, type, img, arg1, arg2, arg3, arg4, arg5, arg6) {
    console.log(123)
    mp.events.callRemote('Inventory_addItem::SERVER', name, desc, type, img, arg1, arg2, arg3, arg4, arg5, arg6)
}
mp.events.add('Inventory_addItem::CLIENT',Inventory_addItem);

mp.events.add('Inventory_syncItems::CLIENT', (items) => {
    mp.events.callRemote('Inventory_syncItems::SERVER',items)
})

// mp.events.add('Inventory_addItem::CLIENT', (name, desc, type, img, arg1, arg2, arg3, arg4, arg5, arg6) => {
//     console.log(123)
//     mp.events.callRemote('Inventory_addItem::SERVER', name, desc, type, img, arg1, arg2, arg3, arg4, arg5, arg6)
// })

mp.events.add('Inventory_equipClothes::CLIENT', (data) => {
    mp.events.callRemote('Inventory_equipClothes::SERVER',data);
})

mp.events.add('Inventory_unequipClothes::CLIENT', (data) => {
    mp.events.callRemote('Inventory_unequipClothes::SERVER',data);
})

mp.events.add('xdddd',(vehicle,seat) => {
    player.setIntoVehicle(vehicle.handle, parseInt(seat));
})