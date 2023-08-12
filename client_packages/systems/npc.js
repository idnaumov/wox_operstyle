let Peds = [
    {Hash: 0x163B875B, Pos: new mp.Vector3(30.577, -150.188, 58.23), Angel: 90, Dimension: 1}
];

function spawnNPC() {
    Peds.forEach((ped) => {
        let staticPed = mp.peds.new(Peds.Hash, Peds.Pos, Peds.Angel, Peds.Dimension);
    })
}