let misc = require('./systems/misc');

let clothesShop = mp.colshapes.newSphere(-30.77630615234375, -150.2158203125, 57.076560974121094, 1)
let Ped = mp.peds.new(mp.game.joaat("s_f_m_fembarber"),new mp.Vector3(-30.899322509765625, -151.62937927246094, 57.07648849487305),0,!1,"WORLD_HUMAN_STAND_IMPATIENT")

mp.events.add("playerEnterColshape", (shape) => {
    if (shape == clothesShop) {
        player.freezePosition(true);
        player.setCollision(false, true);

        mp.game.streaming.requestAnimDict("misshair_shop@hair_dressers").then(async () => {
            global.player.taskPlayAnimAdvanced("misshair_shop@hair_dressers", "player_enterchair", -34.090211639404297, -150.39789123535156, 57.08412094116211, 0, 0, 0, 1000, -1000, -1, 5642, 0, 2, 1);

            global.createCamera("barbershop");
        });
        //misc.createCam(-35.34893035888672, -150.0380810546875, 57.4087646484375, 0, 0, -110, 50);
    }
})