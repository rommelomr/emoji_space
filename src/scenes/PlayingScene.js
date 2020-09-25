import {PlayingController} from '../controllers/PlayingController.js';

import {Enviroment} from '../Enviroment.js';

export class PlayingScene extends Phaser.Scene {

	constructor(){

		super('PlayingScene');
		
	}

	preload(){

		Enviroment.configurePlayersNum();

		PlayingController.loadImages(Enviroment,this);

	}

	create(){

		Enviroment.configureLevel();

		Enviroment.configurePlayerObject(Enviroment,this);

		Enviroment.configurePlayers(Enviroment);


		Enviroment.configureEmojisVelocity();

		Enviroment.setCursors(this);

		Enviroment.configureCurrentLevelEmojis();
		
		Enviroment.configureNextEmojiTime();
		Enviroment.configureBoolDisplayRandomEmojis();

		Enviroment.configureMaxEmojisToCreate();

		Enviroment.configureMaxPoopsToLose();


	}

	update(){
		
		PlayingController.runPlayerControls(Enviroment,this);

		PlayingController.runEmojisRain(Enviroment,this);			


	}
}