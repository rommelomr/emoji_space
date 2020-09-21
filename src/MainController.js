import {Config} from './Config.js';
import {Enviroment} from './Enviroment.js';

export let MainController = {
/*
*/
	display_random_emojis:true,

	level:9,

	current_level_emojis_name:[],

	rocket:null,

	cursors:null,

	times:{//in seconds

		next_emoji:{
			max:null,
			elapsed:0,
		},

	},

	max_emojis_to_create: null,

	emojis_velocity:null,



	displayed_emojis:[],


	max_poops_to_lose:3,

	avatar:{
		image_name:'rocket',
		extension:'.png'
	},

	platform:{
		image_name:'platform',
		extension:'.png'
	},

	emojis:{

		smile:{
			id:1,
			first_aparition_level:1,
			probability:60,
			good:true,
			points:1,
			object:null,
			image_name:'smile',
			extension:'.png',
			//Solo agrega un punto más
		},
		poop:{

			id:2,
			first_aparition_level:2,
			probability:60,
			good:false,
			object:null,
			image_name:'poop',
			extension:'.png',
			//Se acumula. Si se acumulan N, se 
		},
		toilet:{

			id:3,
			first_aparition_level:2,
			probability:60,
			good:true,
			object:null,
			image_name:'toilet',
			extension:'.png',
			//Limpia una caquita
		},
		angel:{

			id:4,
			first_aparition_level:1,
			probability:60,
			good:true,
			points:3,
			object:null,
			image_name:'angel',
			extension:'.png',
			//Agrega dos puntos más
		},
		laugh:{

			id:5,
			first_aparition_level:3,
			probability:60,
			good:true,
			points:5,
			object:null,
			image_name:'laugh',
			extension:'.png',
			//Agrega 3 puntos más
		},
		heart:{

			id:6,
			first_aparition_level:4,
			probability:60,
			good:true,
			object:null,
			image_name:'heart',
			extension:'.png',
			//Te da una oportunidad mas para jugar
		},
		phantom:{

			id:7,
			first_aparition_level:2,
			probability:60,
			good:false,
			object:null,
			image_name:'phantom',
			extension:'.png',
			//No permite agarrar emojis buenos
		},
		devil:{

			id:8,
			first_aparition_level:3,
			probability:60,
			good:false,
			object:null,
			image_name:'devil',
			extension:'.png',
			//Te quita una vida
		},
		alien:{

			id:9,
			first_aparition_level:4,
			probability:60,
			good:false,
			object:null,
			image_name:'alien',
			extension:'.png',
			//Te invierte los controles

		},

	},

	convertToGameTime:function(num){

		return num * 60;

	},
	setCurrentLevelEmojis:function(){
		let emojis_names = [];

		var emoji_can_be_used = null;

		for(let key in this.emojis){
			//console.log(this.emojis[key].image_name+'. Level: '+this.emojis[key].first_aparition_level +' <= '+ this.level);
			
			
			emoji_can_be_used = this.emojis[key].first_aparition_level <= this.level;

			if(emoji_can_be_used){

				emojis_names.push(this.emojis[key].image_name);

			}

		}

		this.current_level_emojis_name = emojis_names;
		//console.log('current_level_emojis_name');
		//console.log(this.current_level_emojis_name);
		

	},

	setRocketInitialXPosition:function(game_width){

		return game_width / 2;

	},
	setRocketInitialYPosition:function(game_height){

		return game_height * 0.9;

	},
	runRocketControls:function(){

		if (this.cursors.left.isDown){

            this.rocket.setVelocityX(-400);

        }else if (this.cursors.right.isDown){

            this.rocket.setVelocityX(400);

        }else{

            if(this.rocket.body.velocity.x > 0){

            	this.rocket.setVelocityX(this.rocket.body.velocity.x -40);

            }else if(this.rocket.body.velocity.x < 0){

            	this.rocket.setVelocityX(this.rocket.body.velocity.x +40);
            }

        }

	},
	setRocket:function(phaser){

		this.rocket = phaser.physics.add.image(this.setRocketInitialXPosition(Config.game_width), this.setRocketInitialYPosition(Config.game_height), 'rocket');
		this.rocket.setCollideWorldBounds(true);
	},
	setCursors:function(phaser){

		this.cursors = phaser.input.keyboard.createCursorKeys();

	},
	loadImages:function(phaser){
		
		phaser.load.image(this.avatar.image_name, Config.emojis_path+this.avatar.image_name+this.avatar.extension);
		for(let emoji in this.emojis){

			phaser.load.image(emoji, Config.emojis_path+this.emojis[emoji].image_name+this.emojis[emoji].extension);
		}
		phaser.load.image(this.platform.image_name, Config.helpers_path+this.platform.image_name+this.platform.extension);
/*
*/
	},

	runEmojisRain:function(phaser){
		
		if(this.display_random_emojis){
			
			this.display_random_emojis = false;

			let emoji_to_display_index = Phaser.Math.Between(0,this.current_level_emojis_name.length-1);

			let num_emojis_to_create = Phaser.Math.Between(1,this.max_emojis_to_create);

			let emojis_y_position = Phaser.Math.Between(0, 100);

			let i = this.displayed_emojis.length;

			for(let j = 0; j < num_emojis_to_create; j++){


				let emoji_name = this.current_level_emojis_name[emoji_to_display_index];

				let emoji = phaser.physics.add.image(null, null, emoji_name);

				let half_emoji_width = Math.ceil(emoji.width / 2);

				let half_emoji_height = Math.ceil(emoji.height / 2);

				emoji.x = Phaser.Math.Between(half_emoji_width, Config.game_width - half_emoji_width );

				emoji.y = 0 - half_emoji_height - emojis_y_position;

				emoji.setVelocityY(this.emojis_velocity + Phaser.Math.Between(this.emojis_velocity*0.1,this.emojis_velocity*0.4));
				
				phaser.physics.add.overlap(this.rocket, emoji, this.catchEmoji, null, this);
				
				this.displayed_emojis.push(emoji);
			}

			this.setNextEmojiTime(Phaser.Math.Between(0.6,1));
				
		}else{

			this.times.next_emoji.elapsed++;
			if(this.times.next_emoji.elapsed >= this.times.next_emoji.max){
				this.times.next_emoji.elapsed = 0;
				this.display_random_emojis = true;
			}

			let aux = this.displayed_emojis;

			for(let i = 0; i < aux.length; i++){

				if(aux[i].y >= Config.game_height + (aux[i].height/2)){
					
					this.displayed_emojis[i].disableBody(true,true);

					aux.splice(this.displayed_emojis.indexOf(this.displayed_emojis[i]),1);
					
				}

			}
			this.displayed_emojis = aux;

		}

	},
	setNextEmojiTime:function(time){

		this.times.next_emoji.max = this.convertToGameTime(time);
	},
	setEmojisVelocity:function(v){

		this.emojis_velocity = v;
	},

	catchEmoji:function(rocket, emoji){
		emoji.disableBody(true, true);

		this.displayed_emojis.splice(this.displayed_emojis.indexOf(emoji),1);	

	},
	test:function(){
		alert();
	},
	setPlatform:function(phaser){

		//let a = phaser.physics.add.staticImage(Config.game_width / 2,Config.game_height / 2,this.platform.image_name);
		
		//

	},
	setMaxEmojisToGenerate:function(max){

		this.max_emojis_to_create = max;
	},

}