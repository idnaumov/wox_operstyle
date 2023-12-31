try{

// Модули, утилиты, методы

let mysql = require('./modules/mysql'); // База данных
require('./modules/methods'); // Методы
require('./utilities/time'); // Система времени
require('./utilities/weather'); // Система погоды
require('./utilities/items'); // Предметы
require('./utilities/death'); // Система смерти
require('./utilities/zones'); // Зеленые зоны
require('./utilities/enums'); // Зеленые зоны

// Основное

require('./events/basic/auth'); // Авторизация/регистрация
require('./events/basic/pedCreator'); // Создание персонажа
require('./events/basic/charselector'); // Выбор персонажа
require('./events/basic/hud'); // Худ
require('./events/basic/money'); // Деньги
require('./events/basic/voice'); // Голосовой чат
require('./events/basic/weaponcompsync'); // Оружия и их улучшения
let fuelInfo = require('./events/basic/fuel'); // Система топлива

// Бизнесы

require('./business/rent'); // Аренда ТС
require('./business/autosalon'); // Автосалон
require('./business/bank'); // Банк

// Events

require('./events/admin'); // Админ система
require('./events/commands'); // Команды
require('./events/inventory'); // Инвентарь
require('./events/houses'); // Дома
require('./events/menu'); // Меню
let vehicleInfo = require('./events/vehicles'); // Меню

// Работы

require('./jobs/farm');
require('./jobs/bus');
require('./jobs/lawnmower');
require('./jobs/taxi');

// Ораганизации

require('./fractions/index'); // Основное

// Гос
        
require('./fractions/gov/autoschool');

// Крайм

require('./fractions/ghetto/ghetto_zones');
require('./fractions/ghetto/aztecas');

function init() {
    try {
        if(!mysql.isConnected)
        {
            console.log('[MySQL] Database is not connected. Retrying start gamemode in 10 sec..');
            setTimeout(init, 10000);
        } 
        else 
        {
            console.log('INIT GAMEMODE');
            vehicleInfo.loadAll(); // подгружаем таблицу машин
            fuelInfo.loadAll(); // создаем колшейпы заправок
        }
    } 
    catch (e) {
        console.log('ERROR INIT ' + e);
    }
}
init()


mp.events.add('console_log', (player,arg) => {
    console.log(arg);
})

mp.events.add('OnPlayerExitVehicle',(player) => {
        if(player.getConfigFlag(32) == false) {
        player.setConfigFlag(32, true);
        mp.events.call('Hud_addNotify::SERVER',3,"Вы отстегнули ремень безопасности",7000)
        }
})

mp.events.add('playerExitVehicle',(player, vehicle) => {
    player.call('offSeatBelt::CLIENT', player)
    vehicle.engine = vehicle.engine
})

}

catch(err){
    console.log(err)
}

function getMissingElement(superImportantArray){
    var numbers = {};
    for (var i = 1; i < 29; i++) {
        numbers[i] = true
    }
  
    for (var i = 0, l = superImportantArray.length; i < l; i++) {
        delete numbers[superImportantArray[i]];
    }
  
    return Object.keys(numbers);
  }

function getClearSlot(parsedItems) {

let slotTo;

let numberArray = []

parsedItems.forEach((element, index, array) => {
  if(element.slot == 0) return
    numberArray.push(element.slot)
});


let svobodniesloti = getMissingElement(numberArray)
slotTo = svobodniesloti[Math.floor(Math.random()*svobodniesloti.length)];

return slotTo;

}

mp.world.requestIpl("hei_dlc_windows_casino"); // зеркальные окна на здании
mp.world.requestIpl("hei_dlc_casino_door"); // рамка двери
mp.world.requestIpl("vw_dlc_casino_door"); // сами двери
mp.world.requestIpl("hei_dlc_casino_aircon"); // кондиционер на крыше
mp.world.requestIpl("vw_casino_main");
mp.world.requestIpl("vw_casino_garage");
mp.world.requestIpl("vw_casino_carpark"); 
mp.world.requestIpl("shr_int");
mp.world.requestIpl("shr_int_lod");
mp.world.requestIpl("gabz_mrpd_milo_");
mp.world.requestIpl("TrevorsTrailerTidy");

let chat = require("./events/basic/hud");
mp.events.add('controlEngineState::SERVER', (player) => {
    let veh = player.vehicle
    let carsArray = player.personalVehicles;
    let nowCar;
    let carOwner
    nowCar = carsArray.find(item => item.id === player.vehicle.getVariable('id'));

    let fuel = veh.getVariable('fuel')
    if (fuel <= 0) {
        chat.addNotify(player, 2, "Нет бензина!", 4000)

        return
    }
   
    if ( veh && player.seat == 0 ) {
        if (nowCar || player.getVariable('adminlvl') > 1) {
            if (nowCar != undefined ) {
                if ( player.vehicle.getVariable('id') != nowCar.id ) {
                    carOwner = false
                } else {
                    carOwner = true
                }
            }
            if ( carOwner || player.getVariable('adminlvl') > 1 ) {
                if ( veh.engine == false ) {
                    veh.engine = true
                    chat.addNotify(player, 3, "Двигатель запущен", 4000)
                } else {
                    veh.engine = false
                    chat.addNotify(player, 3, "Двигатель заглушен", 4000)
                }
            } else {
                chat.addNotify(player, 2, "У вас нет ключей от этого авто", 4000)
            }
        } else {
            chat.addNotify(player, 2, "У вас нет ключей от этого авто", 4000)
        }
    }
})

//my apa_v_mp_h_01_a
exports.getClearSlot = getClearSlot;