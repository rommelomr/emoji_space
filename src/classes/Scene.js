import {PlayingScene} from '../scenes/PlayingScene.js';
import {MainMenuScene} from '../scenes/MainMenuScene.js';
import {InstructionsScene} from '../scenes/InstructionsScene.js';

export let Scene = {

	MainMenu: MainMenuScene,
	Playing: PlayingScene,
	instructions: InstructionsScene,
	
	getScenes:function(){
		return [
			this.MainMenu,
			this.instructions,
			this.Playing,
		]
	}
}