import {Config} from '../Config.js';
export let LoseController = {

	loadResources:function(phaser){

		phaser.load.image('main_menu_image', 'assets/helpers/main_menu_image.png');
		phaser.load.image('play_button', 'assets/helpers/play_button.png');

	},
	createMenu:function(phaser){

		let main_menu = phaser.physics.add.staticImage(Config.game_width /2, Config.game_height /2.5, 'main_menu_image');
		let play_button = phaser.physics.add.staticImage(Config.game_width /2, Config.game_height /1.5, 'play_button');

		play_button.setInteractive();
		play_button.once('pointerup',()=>{

			phaser.scene.start('PlayingScene');
		});
	}

}