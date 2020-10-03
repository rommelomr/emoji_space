import {Config} from '../Config.js';
export class InstructionsScene extends Phaser.Scene {

	constructor(){
		super('InstructionsScene');

	}

	preload(){
		
		this.load.image('instructions', 'assets/helpers/instructions.png');
		this.load.image('button', 'assets/helpers/main_menu_button.png');

	}

	create(){
		this.scale.startFullScreen();
		this.add.image(Config.game_width/2,Config.game_height/2,'instructions');
		let button = this.add.image(350,350,'button').setScale(0.7);
		
		button.setInteractive();
		button.once('pointerup',()=>{

			this.scene.start('MainMenuScene');
		});
		
	}

	update(){


	}
}