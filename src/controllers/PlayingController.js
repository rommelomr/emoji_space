import {Config} from '../Config.js';
import {Enviroment} from '../Enviroment.js';
import {Emoji} from '../classes/Emoji.js';

export let PlayingController = {

	runPlayerControls:function(enviroment,phaser){
		let players_num = enviroment.getPlayersNum();
		for(let i = 0; i < players_num; i++){

			if (enviroment.getCursors(i).left.isDown){

	            enviroment.getPlayer(i).obj.setVelocityX(0 - enviroment.getPlayerXVelocity(i));

	        }else if (enviroment.getCursors(i).right.isDown){

	            enviroment.getPlayer(i).obj.setVelocityX(enviroment.getPlayerXVelocity(i));

	        }else{

	        	if(enviroment.getPlayer(i).obj.body.velocity.x > 0){

	            	enviroment.getPlayer(i).obj.setVelocityX(enviroment.getPlayer(i).obj.body.velocity.x - enviroment.getPlayerBrakes(i));

	            }else if(enviroment.getPlayer(i).obj.body.velocity.x < 0){

	            	enviroment.getPlayer(i).obj.setVelocityX(enviroment.getPlayer(i).obj.body.velocity.x + enviroment.getPlayerBrakes(i));

	            }

	        }
		}


	},

	loadPlayerImage:function(){


	},
	loadImages:function(enviroment,phaser){

		let players_num = enviroment.getPlayersNum();

		for(let i = 0; i < players_num; i++){
			enviroment.configurePlayer(i,phaser);

			phaser.load.image(enviroment.getPlayer(i).image_name, enviroment.getPlayer(i).path+enviroment.getPlayer(i).image_name+enviroment.getPlayer(i).ext);
		}
		
		let emojis = Emoji.getEmojis();

		for(let emoji in emojis){

			phaser.load.image(emoji, Config.emojis_path+emojis[emoji].image_name+emojis[emoji].ext);

		}

	},

	runEmojisRain:function(enviroment,phaser){
		if(enviroment.doDisplayRandomEmojis()){

			enviroment.blockDisplayRandomEmojis();

			let num_emojis_to_create = Phaser.Math.Between(1,enviroment.getMaxEmojisToCreate());

			Emoji.createEmojis(num_emojis_to_create,enviroment,phaser,(rocket,emoji)=>{
				
				this.catchEmoji(rocket,emoji,enviroment);
				
			});

			enviroment.setNextEmojiTime(Phaser.Math.Between(0.6,1));
				
		}else{

			enviroment.times.next_emoji.elapsed++;

			if(enviroment.times.next_emoji.elapsed >= enviroment.times.next_emoji.time){

				enviroment.times.next_emoji.elapsed = 0;

				enviroment.allowDisplayRandomEmojis();

			}

			let aux = enviroment.getDisplayedEmojis();

			for(let i = 0; i < aux.length; i++){

				if(aux[i].y >= Config.game_height + (aux[i].height/2)){
				
					enviroment.disableEmoji(i);

					aux.splice(enviroment.getDisplayedEmojis().indexOf(enviroment.getDisplayedEmojis(i)),1);

				}

			}

			enviroment.setDisplayedEmojis(aux);

		}

	},

	catchEmoji:function(rocket, emoji,enviroment){

		emoji.disableBody(true, true);

		let aux = enviroment.getDisplayedEmojis();

		aux.splice(aux.indexOf(emoji),1);

		enviroment.setDisplayedEmojis(aux);

		//console.log(Emoji.emojis[emoji.name]);

	},


}