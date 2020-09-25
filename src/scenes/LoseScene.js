import {LoseController} from '../controllers/LoseController.js';

import {Enviroment} from '../Enviroment.js';

export class LoseScene extends Phaser.Scene {

	constructor(){

		super('LoseScene');
		
	}

	preload(){

		LoseController.loadImages(this);

	}

	create(){
		
	}

	update(){
		
		LoseController.runAvatarControls(Enviroment);

		LoseController.runEmojisRain(Enviroment,this);			

	}
}