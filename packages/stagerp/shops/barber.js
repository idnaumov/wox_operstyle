mp.events.add("Barber_enterShop::SERVER", (player) => {
    player.playAnimation("anim@amb@luxury_suite@spa@barbers", "player_idle_a", 1, 47);
    player.heading = 65.0;
});
mp.events.addCommand('heading', (player, test) => {
    player.heading = parseInt(test);
})