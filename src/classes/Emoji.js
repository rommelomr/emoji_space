import {Config} from '../Config.js';

export let Emoji = {

	emojis:{

		smile:{
			id:1,
			first_aparition_level:1,
			probability:60,
			good:true,
			points:1,
			object:null,
			image_name:'smile',
			ext:'.png',
			//Add 1 pt
		},
		poop:{

			id:2,
			first_aparition_level:2,
			probability:60,
			good:false,
			object:null,
			image_name:'poop',
			ext:'.png',
			//If catch (this.max_poop_to_lose), lose
		},
		toilet:{

			id:3,
			first_aparition_level:2,
			probability:60,
			good:true,
			object:null,
			image_name:'toilet',
			ext:'.png',
			//Clean a poop
		},
		angel:{

			id:4,
			first_aparition_level:1,
			probability:60,
			good:true,
			points:3,
			object:null,
			image_name:'angel',
			ext:'.png',
			//Add 2 pt
		},
		laugh:{

			id:5,
			first_aparition_level:3,
			probability:60,
			good:true,
			points:5,
			object:null,
			image_name:'laugh',
			ext:'.png',
			//Add 3 pt
		},
		heart:{

			id:6,
			first_aparition_level:4,
			probability:60,
			good:true,
			object:null,
			image_name:'heart',
			ext:'.png',
			//Add 1 life
		},
		phantom:{

			id:7,
			first_aparition_level:3,
			probability:60,
			good:false,
			object:null,
			image_name:'phantom',
			ext:'.png',
			//Not allow catch good emojis
		},
		devil:{

			id:8,
			first_aparition_level:3,
			probability:60,
			good:false,
			object:null,
			image_name:'devil',
			ext:'.png',
			//Lose 1 life
		},
		alien:{

			id:9,
			first_aparition_level:4,
			probability:60,
			good:false,
			object:null,
			image_name:'alien',
			ext:'.png',
			//Invert cursors for N seconds

		},

	},
	getEmojis:function(){
		return this.emojis;
	},
	
	createEmojis:function(num,enviroment,phaser,catchEmoji){
		for(let i = 0; i < num; i++){

			let emoji = Emoji.createSingleEmoji(enviroment,phaser);

			Emoji.setEmojiRandomPosition(emoji);

			phaser.physics.add.overlap(enviroment.avatar.obj, emoji.epo, catchEmoji, null, this);

			enviroment.addDisplayedEmoji(emoji.epo);
			

		}

		enviroment.setNextEmojiTime(Phaser.Math.Between(0.6,1));

	},
	createSingleEmoji:function(enviroment,phaser){
		let emoji_to_display_random_index = Phaser.Math.Between(0,enviroment.getCurrentLevelEmojis().length-1);

		let random_emoji_name = enviroment.getCurrentLevelEmojis()[emoji_to_display_random_index];

		//EPO: Emoji Phaser Object
		let epo = phaser.physics.add.image(null, null, random_emoji_name);
		
		let velocity = enviroment.getEmojisBaseVelocity() + Phaser.Math.Between(enviroment.getEmojisMinVelocityAdd(),enviroment.getEmojisMaxVelocityAdd());

		epo.setVelocityY(velocity);
		epo.name = random_emoji_name;

		return {
			'epo':epo
		};

	},
	setEmojiRandomPosition:function(emoji){

		let half_epo_width = Math.ceil(emoji.epo.width / 2);
		let x = Phaser.Math.Between(half_epo_width, Config.game_width - half_epo_width);

		this.setEmojiXposition(emoji,x);

		let half_epo_height = Math.ceil(emoji.epo.height / 2);
		let random_above_screen = Phaser.Math.Between(0, 100);
		let y = 0 - half_epo_height - random_above_screen;

		this.setEmojiYposition(emoji,y);

	},
	setEmojiXposition:function(emoji,x){

		emoji.epo.x = x;

	},
	setEmojiYposition:function(emoji,y){

		emoji.epo.y = y;

	},
}