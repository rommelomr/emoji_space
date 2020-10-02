import {Config} from '../Config.js';
export let MainMenuController = {

	loadResources:function(phaser){

		phaser.load.image('main_menu_image', 'assets/helpers/main_menu_image.png');
		phaser.load.image('play_button', 'assets/helpers/play_button.png');
		phaser.load.image('instructions_button', 'assets/helpers/instructions_button.png');

	},
	createMenu:function(phaser){

		let main_menu = phaser.physics.add.staticImage(Config.game_width /2, Config.game_height /2.5, 'main_menu_image');
		let play_button = phaser.physics.add.staticImage(Config.game_width /3, Config.game_height /1.5, 'play_button').setScale(0.5);
		let instructions_button = phaser.physics.add.staticImage(Config.game_width /1.5, Config.game_height /1.5, 'instructions_button').setScale(0.5);

		play_button.setInteractive();
		play_button.once('pointerup',()=>{

			phaser.scene.start('PlayingScene');
		});
		instructions_button.setInteractive();
		instructions_button.once('pointerup',()=>{

			phaser.scene.start('InstructionsScene');
		});
		
	}

}