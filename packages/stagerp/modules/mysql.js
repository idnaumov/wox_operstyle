var SQL = require('mysql');
let mysql = exports;
mysql.isConnected = false;

global.DB = SQL.createPool({
    host: 'localhost',
    user: 'root',
    database: 'stage',
    password: '',
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 50000,
    acquireTimeout  : 60 * 60 * 50000,
    timeout         : 60 * 60 * 50000,
});

global.CONFIG = SQL.createPool({
    host: 'localhost',
    user: 'root',
    database: 'wox_config',
    password: '',
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 50000,
    acquireTimeout  : 60 * 60 * 50000,
    timeout         : 60 * 60 * 50000,
});

( async () =>{
    await new Promise(function(resolve,reject) {
        DB.getConnection(function(e) {
            if(e) return reject (console.log(`Ошибка подключения - ${e}`));
            resolve(console.log('Вы успешно подключились к Базе Данных!'));
            mysql.isConnected = true
        })
        CONFIG.getConnection(function(e) {
            if(e) return reject (console.log(`Ошибка подключения - ${e}`));
            resolve(console.log('Вы успешно подключились к Базе конфигов!'));
            mysql.isConnected = true
        })
    })
}) ();

mp.events.add('serverShutdown', async () => {
    await DB.end();
    await CONFIG.end();
    console.log('Выключение БД');
});