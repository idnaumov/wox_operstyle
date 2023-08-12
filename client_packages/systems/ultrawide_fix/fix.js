let test = 1

// <data name="minimap"        	alignX="L"	alignY="B"	posX="-0.1845"		posY="0.002"		sizeX="0.150"		sizeY="0.188888" /> <!-- WARNING! Feed MUST match sizeX -->
// <data name="minimap_mask"   	alignX="L"	alignY="B"	posX="-0.160"		posY="0.032" 	 	sizeX="0.111"		sizeY="0.159" />
// <data name="minimap_blur"   	alignX="L"	alignY="B"	posX="-0.21"		posY="0.022"		sizeX="0.266"		sizeY="0.237" />
mp.game.ui.setMinimapComponentValues("minimap", "L", "B", "-0.1845", "0.002", "0.150", "0.188888");
mp.game.ui.setMinimapComponentValues("minimap_mask", "L", "B", "-0.160", "0.032", "0.111", "0.159");
mp.game.ui.setMinimapComponentValues("minimap_blur", "L", "B", "-0.21", "0.022", "0.266", "0.237");