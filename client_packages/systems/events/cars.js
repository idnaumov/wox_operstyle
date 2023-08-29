mp.events.add('entityStreamIn', (entity) => {
    if (entity.type !== 'vehicle') {
        return;
    }
    entity.setDirtLevel(0);
});

let l_indicator = false
mp.keys.bind(0x25, false, function () { // <- key
    l_indicator = !l_indicator;

    var vehicle = player.vehicle;
    vehicle.setIndicatorLights(1, l_indicator)
})

let r_indicator = false
mp.keys.bind(0x27, false, function () { // -> key
    r_indicator = !r_indicator;

    var vehicle = player.vehicle;
    vehicle.setIndicatorLights(0, r_indicator)
})