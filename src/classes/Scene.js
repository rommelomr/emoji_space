import {PlayingScene} from '../scenes/PlayingScene.js';
import {MainMenuScene} from '../scenes/MainMenuScene.js';

export let Scene = {

	MainMenu: MainMenuScene,
	Playing: PlayingScene,
	
	getScenes:function(){
		return [
			this.Playing,
			this.MainMenu,
		]
	}
}