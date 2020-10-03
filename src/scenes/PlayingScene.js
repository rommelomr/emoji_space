import {Config} from '../Config.js';
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
		
		Enviroment.background = this.add.tileSprite(Config.game_width/2,Config.game_height/2,Config.game_width,Config.game_height,'background');

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

		Enviroment.configureTimes();

		Enviroment.configureFallVelocities();

		Enviroment.configureEmojiSetting();

		console.log('Emojis settings:',Enviroment.emojis_settings.poops.objs.player_one);
	}

	update(time,delta){

		if(Enviroment.gameOver()){

			
			this.scene.pause();

			this.scene.launch('LoseScene');
			this.scene.bringToTop('LoseScene');

			return;

			

			

		}else{

			Enviroment.moveBackground();
			//Enviroment.background.tilePositionY	-= 1;

			PlayingController.runPlayerControls(Enviroment,this);

			PlayingController.runEmojisRain(Enviroment,this);			
			
			Enviroment.increaceFallVelocity();		
			Enviroment.increacePoopProbability();
		}
		

	}
}