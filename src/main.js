import {f_config} from './f_config.js';
import {Framework} from './Framework.js';

document.addEventListener('DOMContentLoaded',function(){

	let framework = new Framework({
		game_width : f_config.game_width,
		game_height : f_config.game_height,
	});

	framework.init();
    

})