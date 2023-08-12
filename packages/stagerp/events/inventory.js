const heading = require('../index.js');

mp.events.add('Inventory_loadPlayerItems::SERVER', (player) => {
    DB.query('SELECT items FROM characters WHERE login = ?', [player.getVariable('login')], function (err, r) {
        player.call('Inventory_openWindow::CLIENT', [r[0].items]);
    })
    console.log('пипидастер')
})

mp.events.add('Inventory_syncItems::SERVER', (player,items) => {
    DB.query('UPDATE characters SET items = ? WHERE login = ?', [items,player.getVariable('login')],function (err, r) {
        if(err) return console.log(err)
    })
})

mp.events.add('clog', (player,items) => {
    console.log(items);
})

mp.events.add('Inventory_useItem::CLIENT', (item) => {

        console.log(item);
        console.log('used');

})

// mp.events.call('Inventory_addItem::SERVER', '[RL] Маска Егор Шип', 'Маска для скрытия лица', "clothes", "./systems/inventory/img/skin-items/mask.svg", 1, 2, true, true, 0, 0)

mp.events.add('Inventory_addItem::SERVER', async (player, name, desc, type, img, arg1, arg2, arg3, arg4, arg5, arg6) => {
    // CLOTHES:
    // arg1 - componentID, 
    // arg2 - drawableId, 
    // arg3 - isOnPlayer, 
    // arg4 - spawn,
    // arg5 - textureId,
    // arg6 - paletteId,
    // CARKEY:
    // arg1 - carID, 


    let toInv;
    let parsedItems;
    let lastItem;
    let slotTo;
    await DB.query('SELECT items FROM characters WHERE login = ?', [player.login], function (err, r) {
        if(err) return console.log(err);

        try{
            let items = r[0].items
            parsedItems = JSON.parse(items);
            
            items = parsedItems
        
            countBySlot = count(items, function (item) {
                return item.slot
            });
    
            if(parsedItems.length - countBySlot[0] >= 28) {
                return chat.addNotify(player, 1, `Не хватает места в инвентаре!`, 7000);
            }
    
            slotTo = heading.getClearSlot(parsedItems);
                
            } catch(err){
                console.log(err);
            }

            let invTemp
            if (type == "clothes") { 
                invTemp = {
                    slot: slotTo,
                    name: name,
                    desc: desc,
                    type: type,
                    componentId: arg1,
                    drawableId: arg5,
                    isOnPlayer: arg3,
                    spawn: arg4,
                    textureId: arg2,
                    paletteId: arg6,
                    weight: 0.5,
                    img: img // './systems/inventory/img/items/carkey.png'
                }
            } else if (type == "carkey" ) {
                invTemp = {
                    slot: slotTo,
                    name: name,
                    desc: desc,
                    type: type,
                    carId: arg1,
                    weight: 0.5,
                    img: './systems/inventory/img/items/carkey.png'
                }
            }

        parsedItems.push(invTemp);
        toInv = JSON.stringify(parsedItems);
        console.log(toInv);

        DB.query('UPDATE characters SET items = ? WHERE login = ?', [toInv, player.login], function (err, r) {
            if (err) return console.log(err)
        })
    }); 
    // DB.query('UPDATE characters SET items = ? WHERE id = ?', [player.getVariable('id')])
})

mp.events.add('Inventory_equipClothes::SERVER', async (player, data) => {
    let cloth = JSON.parse(data)
    let clothId = cloth[0]
    let clothTexture = cloth[1]
    let clothColor = cloth[2]

    console.log(clothId, clothTexture, clothColor);

    player.setClothes(clothId, clothTexture, clothColor, 0);



    DB.query('SELECT items FROM characters WHERE login = ?', [player.getVariable('login')], async function (err, r) {
        let allItems = r[0].items

        let parsedItems = await JSON.parse(allItems);
    
        let arr = parsedItems;

        let nowClothIndex = arr.findIndex(item => item.componentId === clothId && item.textureId === clothTexture && item.isOnPlayer === false);

        parsedItems[nowClothIndex].slot = 0;
        parsedItems[nowClothIndex].isOnPlayer = true;

        DB.query('UPDATE characters SET items = ? WHERE login = ?', [JSON.stringify(parsedItems), player.getVariable('login')])

    })
    
})

mp.events.add('Inventory_unequipClothes::SERVER', async (player, data) => {
    let cloth = JSON.parse(data)
    let clothId = cloth[0]
    let slotToSet = cloth[1]

    player.setClothes(clothId, 0, 0, 0);

    DB.query('SELECT items FROM characters WHERE login = ?', [player.getVariable('login')], async function (err, r) {
        let allItems = r[0].items

        let parsedItems = await JSON.parse(allItems);
    
        let arr = parsedItems;

        let nowClothIndex = arr.findIndex(item => item.componentId === clothId && item.isOnPlayer === true);

        parsedItems[nowClothIndex].isOnPlayer = false;
        parsedItems[nowClothIndex].slot = slotToSet;

        DB.query('UPDATE characters SET items = ? WHERE login = ?', [JSON.stringify(parsedItems), player.getVariable('login')])

    })
    
})