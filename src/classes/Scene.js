import {PlayingScene} from '../scenes/PlayingScene.js';
import {MainMenuScene} from '../scenes/MainMenuScene.js';
import {InstructionsScene} from '../scenes/InstructionsScene.js';
import {LoseScene} from '../scenes/LoseScene.js';

export let Scene = {

	main_menu: MainMenuScene,
	playing: PlayingScene,
	instructions: InstructionsScene,
	lose: LoseScene,
	
	getScenes:function(){
		return [
			this.main_menu,
			this.instructions,
			this.playing,
			this.lose,
		]
	}
}