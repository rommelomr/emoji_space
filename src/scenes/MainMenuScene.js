import {Config} from '../Config.js';
import {MainMenuController} from '../controllers/MainMenuController.js';

export class MainMenuScene extends Phaser.Scene {

	constructor(){
		super('MainMenuScene')
	}

	preload(){
		
		this.load.image('main_menu_image', 'assets/helpers/main_menu_image.png');
		this.load.image('play_button', 'assets/helpers/play_button.png');

	}

	create(){

		let main_menu = this.physics.add.image(Config.game_width /2, Config.game_height /2.5, 'main_menu_image');
		let play_button = this.physics.add.image(Config.game_width /2, Config.game_height /1.5, 'play_button');

		play_button.setInteractive();
		play_button.once('pointerup',()=>{

			this.scene.start('FlyingScene');
		});
		
	}

	update(){


	}
}