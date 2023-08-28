
let chat = require('../events/basic/hud');
let methods = require('../modules/methods');

let emsPos = [
  { x: 314.9762878417969, y: -579.4092407226562, z: 43.28411102294922, rotate: 174.72389221191406 },
  { x: 310.7103881835937, y: -577.9423217773438, z: 43.28411102294922, rotate: -177.553466796875 },
  { x: 308.8382873535156, y: -581.9496459960938, z: 43.28411102294922, rotate: -51.5485954284668 },
  { x: 312.2325439453125, y: -582.9229736328125, z: 43.28411102294922, rotate: -31.793012619018555 },
  { x: 313.489990234375, y:  -583.8287963867188, z: 43.28411102294922, rotate: -28.045862197875977 },
  { x: 315.4621276855469, y: -584.4326171875, z: 43.28411102294922, rotate: -37.8892822265625 },
  { x: 318.8356628417969, y: -585.5217895507812, z: 43.28411102294922, rotate: -33.471778869628906 },
  { x: 321.9925842285156, y: -586.0043334960938, z: 43.28411102294922, rotate: -13.750576972961426 },
  { x: 322.9520263671875, y: -582.8380126953125, z: 43.28411102294922, rotate: 166.96031188964844 },
  { x: 318.3399658203125, y: -580.8189086914062, z: 43.28411102294922, rotate: 145.47439575195312 }
]

mp.events.add('playerDeath', (player) => {
  setTimeout(() => {
    var randomSpawn = Math.floor(Math.random() * emsPos.length );

    player.spawn(
      new mp.Vector3(emsPos[randomSpawn].x, emsPos[randomSpawn].y, emsPos[randomSpawn].z)
    );
    player.heading = emsPos[randomSpawn].rotate;

    // chat.addNotify(player, 3, `Вы умерли`, 4000);
    player.call('playerDeath');
    
  }, 5000);
})

mp.events.addCommand('phonestart', (player) => {
    player.call('PhoneAnimShow')
    chat.addNotify(player, 3, `Нету`, 4000);
  })


  mp.events.addCommand('phonestop', (player) => {
    player.call('PhoneAnimHide')
    chat.addNotify(player, 3, `Нету`, 4000);
  })
