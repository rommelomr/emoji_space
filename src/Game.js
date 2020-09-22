import {Scene} from './Scene.js';

export class Game {

	constructor(data){


		this.game_width = data.game_width;
		this.game_height = data.game_height;

		this.verifyScreenSize();
		
	}

	verifyScreenSize(){

		let minimum_screen_width = screen.width >= this.game_width;
		if(!minimum_screen_width){

			this.throwError('Minimum width screen size required: '+this.game_width+' px.');

		}

		let minimum_screen_height = screen.width >= this.game_height;
		if(!minimum_screen_height){

			this.throwError('Minimum height screen size required: '+this.game_height+' px.');
		}

	}
	
	throwError(data){

		let message = '';

		if(data != null){

			message = data;

		}else{

			message = "An internal error has ocurred and the game can't be executed"
		}

		alert(message);
		throw message;
	}
	getGameWidth(){

		return this.game_width;
	}
	getGameHeight(){

		return this.game_height;
	}
	
	init(){

		let config = {
	        type: Phaser.AUTO,

	        width: this.getGameWidth(),

	        height: this.getGameHeight(),

	        physics: {

	            default: 'arcade',

	            arcade: {
	                gravity: { y: 0 },
	                debug: false
	            }
	        },
	        scene:Scene.getScenes()
		};

		let game = new Phaser.Game(config);

	}
}