import {PlayingController} from '../controllers/PlayingController.js';

import {Emoji} from '../classes/Emoji.js';
import {Enviroment} from '../Enviroment.js';

export class PlayingScene extends Phaser.Scene {

	constructor(){

		super('PlayingScene');
		
	}

	preload(){

		Enviroment.configurePlayersNum();

		PlayingController.loadImages(Enviroment,this);

		Enviroment.loadFonts(this);

	}

	create(){

		Enviroment.configureLevel();

		Enviroment.configurePlayerObject(this);

		Enviroment.configurePlayers();

		Enviroment.configureEmojisVelocity();

		Enviroment.setCursors(this);

		Enviroment.configureCurrentLevelEmojis();

		Enviroment.configureNextEmojiTime();

		Enviroment.configureBoolDisplayRandomEmojis();

		Enviroment.configureMaxEmojisToCreate();

		Enviroment.configureMaxPoopsToLose();

		Enviroment.configureScore(this);

		Enviroment.configureCollectedPoops();

		Emoji.configureProbabilities();

		Enviroment.configureFallVelocities();

	}

	update(){
		if(Enviroment.gameOver()){

			alert('Game over');
			

			this.scene.start('MainMenuScene');

		}else{

			PlayingController.runPlayerControls(Enviroment,this);

			PlayingController.runEmojisRain(Enviroment,this);			
			
			Enviroment.increaceFallVelocity();		
			Enviroment.increacePoopProbability();
		}
		

	}
}