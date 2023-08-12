let clothesShop = mp.colshapes.newSphere(125.40693664550781, -224.67312622070312, 54.55781173706055, 1)

mp.events.add("playerEnterColshape", (shape) => {
    if (shape == clothesShop) {
        mp.events.call("HUD_setShow::CLIENT", false);
        mp.gui.cursor.show(true, true);
        mp.game.ui.displayRadar(false);
        browser.execute("clothes.active = true");
        player.dimension = player.getVariable('id') + 12
        // createCamera()
        player.position = new mp.Vector3(123.103515625, -228.93817138671875, 54.55781555175781);
        // player.setRotation(parseFloat(0), parseFloat(0), parseFloat(70), 2, true)
    }
})

mp.events.add('Clothes_setPreview::CLIENT', (clothID, id, colors, bodyID) => {
    console.log(123)
    player.setComponentVariation(clothID, id, colors, 0);
    player.setComponentVariation(3, bodyID, 0, 0);
});

mp.events.add('Clothes_close::CLIENT', () => {
    console.log(123)
    mp.events.callRemote("Cloth_loadCloth::SERVER");
    mp.events.call("HUD_setShow::CLIENT", true);
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    browser.execute("clothes.active = false");
});

mp.events.add('Clothes_loadCloth::CLIENT', () => {
    console.log(123)
    mp.events.callRemote("Cloth_loadCloth::SERVER");
})

mp.events.add('Clothes_buy::CLIENT', (sName, compID, id, color, price) => {
    let imgPatch
    if (compID == 1) {
        imgPatch = './systems/inventory/img/items/14.png'
    } else if (compID == 11) {
        imgPatch = './systems/inventory/img/items/7.png'
    } else if (compID == 4) {
        imgPatch = './systems/inventory/img/items/8.png'
    } else if (compID == 6) {
        imgPatch = './systems/inventory/img/items/9.png'
    }
    mp.events.callRemote("Clothes_buy::SERVER", sName, imgPatch, compID, id, color, price);
})