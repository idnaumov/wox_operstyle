// CAMERA //
function createCam(x, y, z, rx, ry, rz, viewangle) {
	camera = mp.cameras.new("Cam", {x, y, z}, {x: rx, y: ry, z: rz}, viewangle);
	camera.setActive(true);
	mp.game.cam.renderScriptCams(true, true, 20000000000000000000000000, false, false);
}
exports.createCam = createCam;

function destroyCam() {
	if (!camera) return;
	camera.setActive(false);
	mp.game.cam.renderScriptCams(false, true, 0, true, true);
	camera.destroy();
	camera = null;
}
exports.destroyCam = destroyCam;
// CAMERA //
