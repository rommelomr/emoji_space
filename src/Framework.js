import {exec} from './execution.js';

export class Framework {

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

	init(){

		let config = {
	        type: Phaser.AUTO,

	        width: this.game_width,

	        height: this.game_height,

	        physics: {

	            default: 'arcade',

	            arcade: {
	                gravity: { y: 0 },
	                debug: false
	            }
	        },
	        scene: {
	            preload:exec.preload,
	            create:exec.create,
	            update:exec.update
	        }
		};

		let game = new Phaser.Game(config);

	}
}