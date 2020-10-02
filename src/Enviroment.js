import {Config} from './Config.js';
import {Emoji} from './classes/Emoji.js';

export let Enviroment = {

	level:{

		num:null,
		passed:null,
	},

	times:{//in seconds
		game:{
			hours:0,
			minutes:0,
			seconds:0
		},
		next_emoji:{
			time:null,
			elapsed:0,
			max:0,
			min:0,
		},
		increace_fall_velocity:{
			time:0,
			timer:0,
			time_to_change:1,
		},
		increace_poop_probability:{
			probability_to_add:0,
			timer:0,
			time_to_change:8,
		}

	},


	emojis_settings:{

		max_emojis_to_create: null,
		display_random_emojis:null,

		current_level_emojis_name:[],

		displayed_emojis:[],

		poops:{
			objs:{
				player_one:[],
				player_two:[],
			},
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
	texts:{
		player_score:[]
	},

	configureFallVelocities:function(){

		this.setIncreaceFallVelocityTime(0);
		this.setIncreaceFallVelocityTimer(0);

	},

	setIncreaceFallVelocityTime:function(num){

		this.times.increace_fall_velocity.time = num;

	},
	setIncreaceFallVelocityTimer:function(num){

		this.times.increace_fall_velocity.timer = num;

	},

	getIncreaceFallVelocity:function(){

		return this.times.increace_fall_velocity;

	},
	
	setIncreacePoopProbability:function(num){

		this.times.increace_poop_probability.probability_to_add = num;

	},
	setIncreacePoopTimer:function(num){

		this.times.increace_poop_probability.timer = num;

	},
	
	getIncreacePoopProbability:function(){

		return this.times.increace_poop_probability;

	},

	
	setIncreacePoopProbability:function(i,num){
	},
	
	setPlayerCollectedPoops:function(i,num){

		this.players.array[i].poops = num;

	},
	
	getPlayerCollectedPoops:function(i){

		return this.players.array[i].poops;

	},
	
	configureCollectedPoops:function(){

		this.setGameCollectedPoops(0);
		let num = this.getPlayersNum();
		for(let i = 0; i < num; i++){

			this.setPlayerCollectedPoops(i,0);
		}


	},
	catchEmoji:function(catched_rocket,catched_emoji,phaser){

		let rocket = this.getPlayer(catched_rocket.id);

		let emoji_info = Emoji.getSingleEmoji(catched_emoji.name);

		let type_emoji = Emoji.getTypeEmoji(emoji_info);

		
		
		switch(type_emoji){
			case 'add_points':{

				let actual_player_score = this.getPlayer(catched_rocket.id).score;

				let new_score = actual_player_score + emoji_info.points;

				this.updateTextScore(catched_rocket.id,new_score);

				this.setScore(catched_rocket.id,new_score);

				break;

			}
			case 'is_poop':{

				let game_collected_poops = this.getGameCollectedPoops()+1;

				this.setGameCollectedPoops(game_collected_poops);

				let player_collected_poops = this.getPlayer(catched_rocket.id).poops+1;

				this.setPlayerCollectedPoops(catched_rocket.id,player_collected_poops);

				this.displayCornerPoop(catched_rocket,phaser);

				break;

			}
			case 'is_toilet':{

				this.cleanPoop(catched_rocket,rocket);

				break;

			}
			case 'is_toilet':{

				this.cleanPoop(catched_rocket,rocket);

				break;

			}
			

		}


	},

	setScore:function(i,score){

		this.players.array[i].score = score;

	},
	updateTextScore:function(i,new_score){
		
		let score = this.getTextScore(i);
		let num = this.getPlayersNum();
		let message;
		if(num == 1){

			message = 'player : '+new_score;

		}else{

			message = 'player '+(i+1)+': '+new_score;

		}
		score.text = message;

	},
	getTextScore:function(i){

		return this.texts.player_score[i];

	},
	setTextScore:function(i,message,phaser){

		
		this.texts.player_score[i] = phaser.add.bitmapText(3,3+(i*25),'vermin',message,23);


	},
	
	getScore:function(i){

		return this.players.array[i].score;

	},
	
	configureScore:function(phaser){

		let num = this.getPlayersNum();
		let single_player = num == 1;

		for(let i = 0; i<num; i++){

			let score = 0;

			this.setScore(i,score);

			let message;

			if(single_player){

				message = 'player: '+score;				

			}else{

				message = 'player '+(i+1)+': '+score;

			}

			//this.texts.player_score[i] = phaser.add.bitmapText(3,3+(i*25),'vermin',message,23);
			this.setTextScore(i,message,phaser);

		}

	},
	loadFonts:function(phaser){

		phaser.load.bitmapFont('vermin','assets/fonts/vermin/vermin.png','assets/fonts/vermin/vermin.xml');
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

			this.level.passed = true;

		}else{

			this.level.passed = !passed;

		}

	},
	getLevelPassed:function(){

		return this.level.passed;

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

	disableEmoji:function(i,aux){

		this.emojis_settings.displayed_emojis[i].disableBody(true,true);
		aux.splice(this.getDisplayedEmojis().indexOf(this.getDisplayedEmojis(i)),1);
		this.setDisplayedEmojis(aux);
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

		
	},
	setMaxPoopsToLose:function(num){

		this.emojis_settings.poops.max_to_lose = num;

	},
	getGameCollectedPoops:function(){
		return this.emojis_settings.poops.collected;
	},
	setGameCollectedPoops:function(num){
		this.emojis_settings.poops.collected = num;


	},

	getMaxPoopsToLose:function(){

		return this.emojis_settings.poops.max_to_lose;

	},
	setLevel:function(num){
		this.level.num = num;
	},

	configureLevel:function(num){

		let is_level_customized = num != null;

		if(is_level_customized){

			this.setLevel(num);

		}else{

			let game_is_starting = this.getLevel() == null;

			if(game_is_starting){

				this.setLevel(9);

			}else{

				let user_pass_current_level = this.getLevelPassed();

				if(user_pass_current_level){

					this.setLevel(this.getLevel()+1);
				}

			}
		
		}

	},

	getLevel:function(){

		return this.level.num;

	},

	configurePlayerXVelocity:function(i,v){

		if(v == null){
			this.setPlayerXVelocity(i,550);
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

			this.setPlayerBrakes(i,this.getPlayerXVelocity(i)/10);

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
	configurePlayers:function(){
		let players_num = this.getPlayersNum();		
		for(let i = 0; i < players_num; i++){

			this.configurePlayerXVelocity(i);
			this.configurePlayerBrakes(i);
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
		let score;
		
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

		if(avatar.score == null){

			if(obj == null || obj.score == null){

				score = Config.default_avatar[i].score;

			}else{

				score = obj.score;

			}

		}else{

			score = avatar.score;

		}


		this.setPlayer(cursors,lifes,path,image_name,ext,obj,x_velocity,brakes,score);

	},
	setPlayerObject:function(i,obj){
		
		this.players.array[i].obj = obj;
		this.players.array[i].obj.id = i;

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
	configurePlayerObject:function(phaser){

		let players_num;

		if(this.getPlayersNum() == null){

			this.setPlayersNum(1);

			players_num = 1;

		}

		players_num = this.getPlayersNum();

		for(let i = 0; i < players_num; i++){
		
			let player = this.getPlayer(i);

			this.setPlayerObject(i,phaser.physics.add.image(this.setPlayerInitialXPosition(Config.game_width), this.setPlayerInitialYPosition(Config.game_height), player.image_name).setSize(50,80,true));

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
			brakes:this.players.array[i].brakes,
			score:this.players.array[i].score,
			poops:this.players.array[i].poops
		}

	},
	setPlayer:function(cursors,lifes,path,image_name,ext,obj,x_velocity,brakes,score,poops){

		let aux = {
			cursors:cursors,
			lifes:lifes,
			path:path,
			image_name:image_name,
			ext:ext,
			obj:obj,
			x_velocity:x_velocity,
			brakes:brakes,
			score:score,
			poops:poops,
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
	gameOver:function(){

		let num = this.getPlayersNum();

		if(num == 1){

			return this.getPlayerCollectedPoops(0) >= this.getMaxPoopsToLose();

		}else if(num == 2){

			let max_poops_to_lose = this.getMaxPoopsToLose();

			let a_player_lost = this.getPlayerCollectedPoops(0) >= max_poops_to_lose || this.getPlayerCollectedPoops(1) >= max_poops_to_lose;

			return a_player_lost;

		}

	},	

	addCollectedPoopObject:function(obj,i){
		if(i==0){

			this.emojis_settings.poops.objs.player_one.push(obj);

		}else if(i==1){

			this.emojis_settings.poops.objs.player_two.push(obj);
		}
	},
	displayCornerPoop:function(rocket,phaser){

		let poops_num = this.getPlayerCollectedPoops(rocket.id);

		let obj = phaser.add.image(120 + (poops_num * 30) , 10 + (rocket.id*25), 'poop').setScale(0.5);

		this.addCollectedPoopObject(obj,rocket.id);
		
	},	
	cleanPoop:function(catched_rocket,rocket){
		
		if(rocket.poops != 0){

			let new_poops_number = rocket.poops-1;

			if(catched_rocket.id == 0){

				this.emojis_settings.poops.objs.player_one[new_poops_number].destroy();
				this.emojis_settings.poops.objs.player_one.splice(new_poops_number,1);

			}else if(catched_rocket.id == 1){

				this.emojis_settings.poops.objs.player_two[new_poops_number].destroy();
				this.emojis_settings.poops.objs.player_two.splice(new_poops_number,1);
				
			}

				this.setPlayerCollectedPoops(catched_rocket.id,new_poops_number);

		}
		
	},	
	increaceFallVelocity:function(){

		let velocity = this.getIncreaceFallVelocity();
		
		if(velocity.timer == this.secondsToGameTime(velocity.time_to_change) && velocity.time < 400){
			
			velocity.timer = 0;

			velocity.time += 5;

			this.setIncreaceFallVelocityTime(velocity.time);
			
		}else{

			velocity.timer++;

		}
		if(velocity.time < 400){

			this.setIncreaceFallVelocityTimer(velocity.timer);
		}

	},
	increacePoopProbability:function(){

		let probability = this.getIncreacePoopProbability();

		let poop_probability = Emoji.emojis.probabilities.poop;
		
		if(probability.timer == this.secondsToGameTime(probability.time_to_change) && probability.probability_to_add+poop_probability < 90){
			
			probability.timer = 0;

			probability.probability_to_add += 5;

			Emoji.emojis.probabilities.poop += probability.probability_to_add;

			this.getIncreacePoopProbability(probability.time);

			

		}else{

			probability.timer++;

		}
		if(probability.probability_to_add+poop_probability < 80){

			this.setIncreacePoopTimer(probability.timer);
		}

	}


}