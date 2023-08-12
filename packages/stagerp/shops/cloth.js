let chat = require('../events/hud');

mp.events.add("Cloth_loadCloth::SERVER", async (player) => {
    DB.query("SELECT items FROM characters WHERE login = ?", [player.login], function(err,r) {
        let data = r;
        loadCloth(player, data);
    });
});

async function loadCloth(player, data) {
    let items = JSON.parse(data[0].items);

    let hat = 11;
    let glasses = 11;
    let top = 0;
    let underwear = 0;
    let pants = 0;
    let shoes = 0;
    let mask = 0;

    for(let i = 0; i < items.length; i++) {

        if(items[i].slot == 0) {
            if(items[i].componentId === 1 && items[i].type === 'props') {
            hat = items[i].textureId
        }
        if(items[i].componentId == 1 && items[i].type == 'clothes') {
            mask = items[i].textureId
        } 
        if(items[i].name.toLowerCase().includes('очки')) {
            glasses = items[i].textureId
        }
        if(items[i].componentId == 11) {
            top = items[i].textureId
        }
        if(items[i].componentId == 8) {
            underwear = items[i].textureId
        }
        if(items[i].componentId == 4) {
            pants = items[i].textureId
        }
        if(items[i].componentId == 6) {
            shoes = items[i].textureId
        }
    }
}

    await player.setProp(0, hat, 0); // Головной убор
    await player.setProp(1, glasses, 0); // Очки
    await player.setClothes(1, mask, 0, 0); // Очки
    await player.setClothes(3, 0, 0, 0); // Торс
    await player.setClothes(11, top, 0, 0); // Верх
    await player.setClothes(8, underwear, 0, 0); // Низ
    await player.setClothes(4, pants, 0, 0); // Штаны
    await player.setClothes(6, shoes, 0, 0); // Капцы
}

// mp.events.call('Inventory_addItem::SERVER', '[RL] Маска Егор Шип', 'Маска для скрытия лица', "clothes", "./systems/inventory/img/skin-items/mask.svg", 1, 2, true, true, 0, 0)
mp.events.add('Clothes_buy::SERVER', async (player, sName, sImgCloth, compID, id, color, price) => {
    // if (t == 1) {
    //     if (player.getMoney() <= price) return;
    //     player.removeMoney(price)
    // }
    // else {
    //     if (player.getBankMoney() <= price) return;
    //     player.removeBankMoney(price)
    // }
    console.log(player.getMoney(), price)
    if (player.getMoney() <= price) return chat.addNotify(player, 1, `У вас не достаточно денег для совершения покупки!`, 7000);
    player.removeMoney(price)

    mp.events.call('Inventory_addItem::SERVER', player, sName, 'Маска скрывает твое лицо', "clothes", sImgCloth, compID, id, true, true, color, 0)
    chat.addNotify(player, 1, `Вы купили - ` + sName, 7000)
});