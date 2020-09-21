export let Enviroment = {

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
	max_emojis_to_generate: null,
	max_poops_to_lose:3,
	emojis_velocity:null,
	emojis_displayed:[],

	blockDisplayRandomEmoji(){

		this.display_random_emojis = false;

	},
	allowDisplayRandomEmoji(){

		this.display_random_emojis = true;

	}		
}
/*
export class Enviroment{

	constructor(bool_display){

		this.display_random_emojis;

		if(bool_display != null){

			this.setDisplayRandomEmojis(bool_display);

		}else{

			this.setDisplayRandomEmojis(true);

		}

	}

	setDisplayRandomEmojis(bool){

		this.display_random_emojis = bool;
	}
	getDisplayRandomEmojis(){
		return this.display_random_emojis;
	}

	blockDisplayRandomEmoji(){

		this.setDisplayRandomEmojis(false);

	}
	allowDisplayRandomEmoji(){

		this.setDisplayRandomEmojis(true);

	}
}
*/