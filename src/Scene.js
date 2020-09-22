import {FlyingScene} from './scenes/FlyingScene.js';
import {MainMenuScene} from './scenes/MainMenuScene.js';

export let Scene = {

	MainMenu: MainMenuScene,
	Flying: FlyingScene,
	
	getScenes:function(){
		return [
			this.MainMenu,
			this.Flying,
		]
	}
}