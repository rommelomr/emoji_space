import {MainController} from './MainController.js';

export let PhaserExecution = {


	preload:function(){

		MainController.loadImages(this);

	},

	create:function(){

		MainController.setRocket(this);
		
		MainController.setCursors(this);

		MainController.setCurrentLevelEmojis(this);

		MainController.setNextEmojiTime(1);

		MainController.setEmojisVelocity(300);

		MainController.setMaxEmojisToGenerate(1);

		MainController.setPlatform(this);

		

		

	},

	update:function(){

		MainController.runRocketControls();

		MainController.runEmojisRain(this);



	}
}