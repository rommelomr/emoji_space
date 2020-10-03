import {Scene} from './classes/Scene.js';
import {Config} from './Config.js';

export class Game {

	constructor(data){

		if(this.isMobile()){

			this.game_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			this.game_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			Config.game_width = this.game_width;
			Config.game_height = this.game_height;

		}else{			

			this.game_width = data.game_width;
			this.game_height = data.game_height;
		}
		
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
	isMobile(){
	    return (
	        (navigator.userAgent.match(/Android/i)) ||
	        (navigator.userAgent.match(/webOS/i)) ||
	        (navigator.userAgent.match(/iPhone/i)) ||
	        (navigator.userAgent.match(/iPod/i)) ||
	        (navigator.userAgent.match(/iPad/i)) ||
	        (navigator.userAgent.match(/BlackBerry/i))
	    );
	}
}