import {Config} from '../Config.js';
import {LoseController} from '../controllers/LoseController.js';

import {Enviroment} from '../Enviroment.js';

export class LoseScene extends Phaser.Scene {

	constructor(){

		super('LoseScene');
		
	}

	preload(){

		this.load.image('game_over','assets/helpers/game_over.png');
		this.load.image('play_again_button','assets/helpers/play_again_button.png');
		

	}

	create(){

		this.add.image(Config.game_width/2,Config.game_height/2,'game_over');

		let button = this.add.image(Config.game_width/2,Config.game_height/1.5,'play_again_button').setScale(0.5);

		button.setInteractive();
		button.once('pointerup',()=>{
			
			this.scene.start('PlayingScene');
		})
	}

	update(){
		

	}
}