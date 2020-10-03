import {Config} from '../Config.js';
import {MainMenuController} from '../controllers/MainMenuController.js';
import {Enviroment} from '../Enviroment.js';

export class MainMenuScene extends Phaser.Scene {

	constructor(){
		super('MainMenuScene');

	}

	preload(){
		
		MainMenuController.loadResources(this);		

	}

	create(){
		
		MainMenuController.createMenu(this);
		
	}

	update(){


	}
}