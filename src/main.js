import {Config} from './Config.js';
import {Game} from './Game.js';

document.addEventListener('DOMContentLoaded',function(){

	let game = new Game({
		game_width : Config.game_width,
		game_height : Config.game_height,
	});

	game.init();
    

})