let lscMarker = mp.colshapes.newSphere(-338.50469970703125, -136.62179565429688, 39.00967025756836, 1)

mp.events.add("playerEnterColshape", (shape) => {
    if (shape == lscMarker) {
        mp.game.graphics.notify('Нажмите E чтобы зайти в тюнинг салон');

        const aspectRation = mp.game.graphics.getScreenAspectRatio(true);
        console.log(aspectRation)
    }
});