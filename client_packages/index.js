browser = mp.browsers.new('package://browser/index.html')

player = mp.players.local;

require('./mp-commands/index');

require('./systems/shortcut');
require('./systems/npc');
require('./systems/misc');

require('./systems/events/auth');
require('./systems/events/pedCreator');
require('./systems/events/charselector');
require('./systems/events/hud');
require('./systems/events/autosalon');
require('./systems/events/nametag');
require('./systems/events/inventory');
require('./systems/events/bank');
require('./systems/events/noclip');
require('./systems/events/binds');
require('./systems/events/voice');
require('./systems/events/weaponcompsync');
require('./systems/events/houses');
require('./systems/events/menu');
// 
require('./systems/utils/3dCamera');
require('./systems/utils/snake');
require('./systems/utils/noclip');
// Jobs

require('./systems/jobs/farm');
require('./systems/jobs/bus');
require('./systems/jobs/lawnmower');
require('./systems/jobs/taxi');

//
require('./luckywheel/index');
//

// autosalons
require('./systems/autosalon/auto');
//

// clothes shop
require('./systems/shops/clothes');
//
require('./systems/shops/barber');

require('./fly.js');

// tuning
//require('./systems/tuning/lsc');
//
require('./systems/ultrawide_fix/fix');

//IPL
//
//

global.console_log = function (msg) {
    mp.events.callRemote('console_log', msg)
}

global.chatsend = function(msg) {
    mp.events.callRemote('Hud_chatSendMessage::SERVER',msg)
}

CPED_CONFIG_FLAG_DisableStartEngine = 429;
player.setConfigFlag(CPED_CONFIG_FLAG_DisableStartEngine, true);

function securityBelt()
{
    console_log(player.isInAnyVehicle());
    if (player.isInAnyVehicle()) {
        
        if(player.getConfigFlag(32) == false) {
            player.setConfigFlag(32, true);
        mp.events.callRemote('Hud_addNotify::SERVER',3,"Вы отстегнули ремень безопасности",7000)
        }else{
            player.setConfigFlag(32, false);
        mp.events.callRemote('Hud_addNotify::SERVER',1,"Вы пристегнули ремень безопасности",7000)
        }
        }
}
mp.keys.bind(0x4A, true, function () { // J key
    console_log(player.isInAnyVehicle())
    securityBelt();
})

function controlEngineState()
{
    let currentVehicle = player.vehicle;
    currentVehicle.setEngineOn(!currentVehicle.getIsEngineRunning(), false, false);
    console_log(!currentVehicle.getIsEngineRunning())
}
mp.keys.bind(0xA2, false, function () { // ctrl key
    controlEngineState();
})


mp.events.add('console_cef', (msg) => {
    console_log(msg)
})

mp.events.add("cef:error", (errorMessage, url, line) => {
    mp.console.logError(`Ошибка: ${errorMessage} в ${url} на строчке ${line.toString()}`);
});

const colour = { r: 44, g: 128, b: 239 }; // set this to the colour you want
const serverName = 'OPER STYLE | First Server'; // set this to the pause menu title you want

mp.events.add('playerReady', () => {
    mp.game.invoke('0xF314CF4F0211894E', 143, colour.r, colour.g, colour.b, 255); // Replace Michael colour
    mp.game.invoke('0xF314CF4F0211894E', 116, colour.r, colour.g, colour.b, 255); // Replace freemode colour
    mp.game.gxt.set('PM_PAUSE_HDR', serverName); // Replace map title
});


function isVehicleAccessAP(a) {
    return -1 === [156252959, 3277054437].indexOf(a.model) //белый список, указывать цифры из чата через запятую
}

function setSpeed() {
    if(player.getVariable('carspeedX') == 1) {
    if(player.getVariable('adminlvl') > 6) {
        let vehicle = mp.players.local.vehicle
        let speed = vehicle.getSpeed();
        vehicle.setForwardSpeed(speed + 20);
    }else{
    return;
    }   
}else{
    return
}
}

mp.keys.bind(0x58, false, function () { // ALT key
    setSpeed()
})

var autopilotStart = !1,
    autopilotPoint = null,
    autopilotInterval = null;
const autoPilotSpeed = 35;

mp.keys.bind(0x58, false, function () { // X key
    if(chatOpened == true) return;
    const a = player.vehicle;
    if (player.vehicle.getPedInSeat(-1) !== player.handle) return; //Проверка, водителю доступно другим нет
    if (autopilotStart) {
        const a = player.vehicle;
        return a && (player.clearTasks(), player.taskVehicleTempAction(a.handle, 27, 1e4)), autopilotPoint = null, autopilotStart = !1, void clearInterval(autopilotInterval)
    }
    if (null == a) return;

    // var vehicleName = a.getModel();
    // console_log(`vehname: ${vehicleName}`); //Номер модели в чат что бы узнать какой он  ив писать в белый список(отключи меня после завершения настройки)

    if (isVehicleAccessAP(a)) return; //отказ автопилота абоба

    var engine = a.getIsEngineRunning();
    if (engine == false) return mp.game.graphics.notify('Двигатель не заведен.');  //проверка двигателя

    let b = mp.game.invoke("0x1DD1F58F493F1DA5"),
        c = mp.game.invoke("0x186E5D252FA50E7D"),
        d = mp.game.invoke("0x1BEDE233E6CD2A1F", c),
        e = mp.game.invoke("0x14F96AA50D6FBEA7", c);

    for (let a = d; 0 != mp.game.invoke("0xA6DB27D19ECBB7DA", a); a = e)
        if (4 == mp.game.invoke("0xBE9B0959FFD0779B", a) && !!b) {
            autopilotPoint = mp.game.ui.getBlipInfoIdCoord(a);
            break
        }
    return null == autopilotPoint ? void Я : void (!autopilotStart && (mp.events.callRemote('Hud_addNotify::SERVER',1,"Точка указана, маршрут построен, начинаем движение",7000), player.taskVehicleDriveToCoord(a.handle, autopilotPoint.x, autopilotPoint.y, autopilotPoint.z, autoPilotSpeed, 1, 1, 2883621, 30, 1), autopilotStart = !0, clearInterval(autopilotInterval), autopilotInterval = setInterval(() => {
        if (!autopilotStart) return void clearInterval(autopilotInterval);
        const a = player.vehicle;
        return a ? 15 > mp.game.system.vdist(player.position.x, player.position.y, player.position.z, autopilotPoint.x, autopilotPoint.y, autopilotPoint.z) ? (player.clearTasks(), a && player.taskVehicleTempAction(a.handle, 27, 1e4), autopilotPoint = null, autopilotStart = !1, clearInterval(autopilotInterval), void mp.events.callRemote('Hud_addNotify::SERVER',1,"Вы достигли места назначения",7000)) : void 0 : (a && (player.clearTasks(), player.taskVehicleTempAction(a.handle, 27, 1e4)), autopilotStart = !1, void clearInterval(autopilotInterval))
    }, 300)))
});