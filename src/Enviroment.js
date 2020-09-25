import {Config} from './Config.js';
import {Emoji} from './classes/Emoji.js';

export let Enviroment = {


	level:null,
	level_passed:null,

	times:{//in seconds

		next_emoji:{
			time:null,
			elapsed:0,
			max:0,
			min:0,
		},

	},


	emojis_settings:{

		max_emojis_to_create: null,
		display_random_emojis:null,

		current_level_emojis_name:[],

		displayed_emojis:[],

		poops:{
			max_to_lose:null,
			collected:null,
		},
		
		base_velocity:null,
		max_velocity_add:null,
		min_velocity_add:null,
	},


	players:{
		num_players:null,
		array:[],
	},
	setLifes:function(num){

		this.players.lifes = num;

	},
	getLifes:function(){

		return this.players.lifes;

	},
	
	setLevelPassed:function(bool){
		let passed = this.getLevelPassed();

		if(passed == null){

			this.level_passed = true;

		}else{

			this.level_passed = !passed;

		}

	},
	getLevelPassed:function(){

		return this.level_passed;

	},
	setEmojisBaseVelocity:function(v){

		this.emojis_settings.base_velocity = v;

	},
	setEmojisMaxVelocityAdd:function(v){

		this.emojis_settings.max_velocity_add = v;

	},
	setEmojisMinVelocityAdd:function(v){

		this.emojis_settings.min_velocity_add = v;

	},

	getEmojisBaseVelocity:function(){

		return this.emojis_settings.base_velocity;

	},
	getEmojisMaxVelocityAdd:function(){

		return this.emojis_settings.max_velocity_add;

	},
	getEmojisMinVelocityAdd:function(){

		return this.emojis_settings.min_velocity_add;

	},
	
	configureEmojisVelocity:function(v){
		if(v == null){

			this.setEmojisVelocity(300);

		}else{

			this.setEmojisVelocity(v);

		}

	},

	setEmojisVelocity:function(v){

		let max = v * 0.4;
		let min = v * 0.1;

		this.setEmojisBaseVelocity(v);

		this.setEmojisMaxVelocityAdd(max);

		this.setEmojisMinVelocityAdd(min);

	},

	disableEmoji:function(i){

		this.emojis_settings.displayed_emojis[i].disableBody(true,true);

	},

	setDisplayedEmojis:function(arr){

		return this.emojis_settings.displayed_emojis = arr;

	},
	addDisplayedEmoji:function(emoji){

		let aux = this.getDisplayedEmojis();

		aux.push(emoji);

		this.setDisplayedEmojis(aux);

	},
	
	getDisplayedEmojis:function(i){

		if(i == null){

			return this.emojis_settings.displayed_emojis;
		}else{

			return this.emojis_settings.displayed_emojis[i];
		}

	},

	configureMaxPoopsToLose:function(max,coll){
		if(max == null){

			this.setMaxPoopsToLose(3);
			
		}else{

			this.setMaxPoopsToLose(num);

		}
		if(coll == null){

			this.setPoopsCollected(0);
			
		}else{

			this.setPoopsCollected(num);

		}
		
	},
	setMaxPoopsToLose:function(num){

		this.emojis_settings.poops.max_to_lose = num;

	},
	setPoopsCollected:function(num){

		this.emojis_settings.poops.collected = num;

	},

	getMaxPoopsToLose:function(){

		return this.emojis_settings.poops.max_to_lose;

	},
	setLevel:function(num){
		this.level = num;
	},

	configureLevel:function(num){

		let is_level_customized = num != null;

		if(is_level_customized){

			this.setLevel(num);

		}else{

			let game_is_starting = this.getLevel() == null;

			if(game_is_starting){

				this.setLevel(1);

			}else{

				let user_pass_current_level = this.getLevelPassed();

				if(user_pass_current_level){

					this.setLevel(this.getLevel()+1);
				}

			}
		
		}

	},

	getLevel:function(){

		return this.level;

	},

	configurePlayerXVelocity:function(i,v){

		if(v == null){
			this.setPlayerXVelocity(i,400);
		}else{

			this.setPlayerXVelocity(i,v);
		}

	},
	setPlayerXVelocity:function(i,num){

		this.players.array[i].x_velocity = num;

	},

	getPlayerXVelocity:function(i){

		return this.players.array[i].x_velocity;

	},
	configurePlayerBrakes:function(i,num){
		
		if(num == null){

			this.setPlayerBrakes(i,40);

		}else{

			this.setPlayerBrakes(i,num);

		}

	},
	setPlayerBrakes:function(i,num){

		this.players.array[i].brakes = num;

	},

	getPlayerBrakes:function(i){

		return this.players.array[i].brakes;

	},
	configureBoolDisplayRandomEmojis:function(bool){
		if(bool == null){

			this.allowDisplayRandomEmojis();

		}else{

			this.setDisplayRandomEmojis(bool);

		}
	},
	setDisplayRandomEmojis:function(bool){

		this.emojis_settings.display_random_emojis = bool;

	},
	blockDisplayRandomEmojis:function(){

		this.emojis_settings.display_random_emojis = false;

	},
	allowDisplayRandomEmojis:function(){

		this.emojis_settings.display_random_emojis = true;

	},
	doDisplayRandomEmojis(){

		return this.emojis_settings.display_random_emojis;

	},
	consultAvatar(){
		return {
			image_name:null,
			ext:null,
		}
	},
	configurePlayers:function(enviroment){
		let players_num = enviroment.getPlayersNum();		
		for(let i = 0; i < players_num; i++){

			enviroment.configurePlayerXVelocity(i);
			enviroment.configurePlayerBrakes(i);
		}

	},
	configurePlayer:function(i,phaser,obj){

		let avatar = this.consultAvatar();

		let cursors;
		let lifes;
		let path;
		let image_name;
		let ext;
		let phaser_obj;
		let x_velocity;
		let brakes;
		
		if(avatar.cursors == null){

			if(obj == null || obj.cursors == null){

				cursors = Config.default_avatar[i].cursors;

			}else{

				cursors = obj.cursors;

			}

		}else{

			cursors = avatar.cursors;

		}



		if(avatar.lifes == null){

			if(obj == null || obj.lifes == null){

				lifes = Config.default_avatar[i].lifes;

			}else{

				lifes = obj.lifes;

			}

		}else{

			lifes = avatar.lifes;

		}



		if(avatar.path == null){

			if(obj == null || obj.path == null){

				path = Config.avatars_path;

			}else{

				path = obj.path;

			}

		}else{

			path = avatar.path;

		}



		if(avatar.image_name == null){

			if(obj == null || obj.image_name == null){

				image_name = Config.default_avatar[i].image_name;

			}else{

				image_name = obj.image_name;

			}

		}else{

			image_name = avatar.image_name;

		}



		if(avatar.ext == null){

			if(obj == null || obj.ext == null){

				ext = Config.default_avatar[i].ext;

			}else{

				ext = obj.ext;

			}

		}else{

			ext = avatar.ext;

		}



		if(avatar.obj == null){

			if(obj == null || obj.phaser_obj == null){

				obj = Config.default_avatar[i].obj;

			}else{

				obj = obj.phaser_obj;

			}

		}else{

			phaser_obj = avatar.obj;

		}



		if(avatar.x_velocity == null){

			if(obj == null || obj.x_velocity == null){

				x_velocity = Config.default_avatar[i].x_velocity;

			}else{

				x_velocity = obj.x_velocity;

			}

		}else{

			x_velocity = avatar.x_velocity;

		}



		if(avatar.brakes == null){

			if(obj == null || obj.brakes == null){

				brakes = Config.default_avatar[i].brakes;

			}else{

				brakes = obj.brakes;

			}

		}else{

			brakes = avatar.brakes;

		}


		this.setPlayer(cursors,lifes,path,image_name,ext,obj,x_velocity,brakes);

	},
	setPlayerObject:function(i,obj){
		
		this.players.array[i].obj = obj;

	},
	getPlayerObject:function(i){
		
		return this.players.array[i].obj;

	},
	
	configurePlayersNum:function(){

		let user_setted_players_num = this.getPlayersNum() != null;

		if(!user_setted_players_num){
			this.setPlayersNum(1);
		}

	},
	configurePlayerObject:function(enviroment,phaser){

		if(this.getPlayersNum() == null){

			this.setPlayersNum(1);
			players_num = 1;
		}

		let players_num = this.getPlayersNum();
		for(let i = 0; i < players_num; i++){
		
			let player = this.getPlayer(i);

			this.setPlayerObject(i,phaser.physics.add.image(this.setPlayerInitialXPosition(Config.game_width), this.setPlayerInitialYPosition(Config.game_height), player.image_name));
			this.getPlayerObject(i).setCollideWorldBounds(true);
				
		}

	},
	setPlayersNum:function(i){

		this.players.num_players = i;

	},
	getPlayersNum:function(){

		return this.players.num_players;

	},
	
	getPlayer:function(i){
		
		return {

			cursors:this.players.array[i].cursors,
			lifes:this.players.array[i].lifes,
			path:this.players.array[i].path,
			image_name:this.players.array[i].image_name,
			ext:this.players.array[i].ext,
			obj:this.players.array[i].obj,
			x_velocity:this.players.array[i].x_velocity,
			brakes:this.players.array[i].brakes
		}

	},
	setPlayer:function(cursors,lifes,path,image_name,ext,obj,x_velocity,brakes){

		let aux = {
			cursors:cursors,
			lifes:lifes,
			path:path,
			image_name:image_name,
			ext:ext,
			obj:obj,
			x_velocity:x_velocity,
			brakes:brakes,
		};

		this.players.array.push(aux);


		
	},
	secondsToGameTime:function(num){

		return num * 60;

	},

	configureWasdCursors:function(phaser){

		return {
			left:phaser.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			right:phaser.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
		};
	},
	setCursors:function(phaser){

		this.players.array[0].cursors = phaser.input.keyboard.createCursorKeys();

		if(this.getPlayersNum()==2){

			this.players.array[1].cursors = this.configureWasdCursors(phaser);
		}

	},

	getCursors:function(i){

		return this.players.array[i].cursors;

	},
	
	getCurrentLevelEmojis:function(){
		return this.emojis_settings.current_level_emojis_name;
	},
	setCurrentLevelEmojis:function(arr){
		this.emojis_settings.current_level_emojis_name = arr;
	},
	getLevelEmojiNames:function(arr){

		let emoji_names = [];

		let all_emojis = Emoji.getEmojis();

		for(let key in all_emojis){

			let emoji_can_be_used = all_emojis[key].first_aparition_level <= this.getLevel();

			if(emoji_can_be_used){

				emoji_names.push(all_emojis[key].image_name);

			}

		}
		return emoji_names
	},

	configureCurrentLevelEmojis:function(){

		let emoji_names = this.getLevelEmojiNames();

		this.setCurrentLevelEmojis(emoji_names);

	},
	configureNextEmojiTime:function(time){
		if(time == null){

			this.setNextEmojiTime(1);		

		}else{

			this.setNextEmojiTime(time);		

		}
	},
	setNextEmojiTime:function(time){

		this.times.next_emoji.time = this.secondsToGameTime(time);

	},
	setNextEmojiMaxTime:function(time){

		this.times.next_emoji.max = this.secondsToGameTime(time);

	},
	setNextEmojiMinTime:function(time){

		this.times.next_emoji.min = this.secondsToGameTime(time);

	},
	configureMaxEmojisToCreate:function(max){
		if(max == null){

			this.setMaxEmojisToCreate(1);		

		}else{

			this.setMaxEmojisToCreate(max);		

		}
	},
	setMaxEmojisToCreate:function(max){

		this.emojis_settings.max_emojis_to_create = max;

	},
	getMaxEmojisToCreate:function(){
		return this.emojis_settings.max_emojis_to_create;
	},

	setPlayerInitialXPosition:function(game_width){

		return game_width / 2;

	},
	setPlayerInitialYPosition:function(game_height){

		return game_height * 0.9;

	},
}