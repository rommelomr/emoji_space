import {PlayingController} from '../controllers/PlayingController.js';

import {Enviroment} from '../Enviroment.js';

export class PlayingScene extends Phaser.Scene {

	constructor(){

		super('PlayingScene');
		
	}

	preload(){

		PlayingController.loadImages(Enviroment,this);

	}

	create(){

		Enviroment.configureLevel();

		Enviroment.configureAvatarObject(this);

		Enviroment.configureAvatarXVelocity();

		Enviroment.configureAvatarBrakes();

		Enviroment.configureEmojisVelocity();

		Enviroment.setCursors(this);

		Enviroment.configureCurrentLevelEmojis();
		
		Enviroment.configureNextEmojiTime();

		Enviroment.configureBoolDisplayRandomEmojis();

		Enviroment.configureMaxEmojisToCreate();

		Enviroment.configureMaxPoopsToLose();


	}

	update(){
		
		PlayingController.runAvatarControls(Enviroment);

		PlayingController.runEmojisRain(Enviroment,this);			

	}
}