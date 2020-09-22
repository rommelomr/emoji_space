import {FlyingController} from '../controllers/FlyingController.js';

export class FlyingScene extends Phaser.Scene {

	constructor(){
		super('FlyingScene')
	}

	preload(){

		FlyingController.loadImages(this);

	}

	create(){

		FlyingController.setRocket(this);
		
		FlyingController.setCursors(this);

		FlyingController.setCurrentLevelEmojis(this);

		FlyingController.setNextEmojiTime(1);

		FlyingController.setEmojisVelocity(300);

		FlyingController.setMaxEmojisToGenerate(1);

		FlyingController.setPlatform(this);

	}

	update(){

		FlyingController.runRocketControls();

		FlyingController.runEmojisRain(this);



	}
}