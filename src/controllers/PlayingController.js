import {Config} from '../Config.js';
import {Enviroment} from '../Enviroment.js';
import {Emoji} from '../classes/Emoji.js';

export let PlayingController = {

	runAvatarControls:function(enviroment){
		
		if (enviroment.getCursors().left.isDown){

            enviroment.getAvatar().obj.setVelocityX(0 - enviroment.getAvatarXVelocity());

        }else if (enviroment.getCursors().right.isDown){

            enviroment.getAvatar().obj.setVelocityX(enviroment.getAvatarXVelocity());

        }else{

        	if(enviroment.getAvatar().obj.body.velocity.x > 0){

            	enviroment.getAvatar().obj.setVelocityX(enviroment.getAvatar().obj.body.velocity.x - Enviroment.getAvatarBrakes());

            }else if(enviroment.getAvatar().obj.body.velocity.x < 0){

            	enviroment.getAvatar().obj.setVelocityX(enviroment.getAvatar().obj.body.velocity.x + Enviroment.getAvatarBrakes());

            }

        }

	},

	loadAvatarImage:function(){

		if(Enviroment.getAvatar().path == null){

		}

	},
	loadImages:function(enviroment,phaser){

		Enviroment.configureAvatar(phaser);

		phaser.load.image(enviroment.getAvatar().image_name, enviroment.getAvatar().path+enviroment.getAvatar().image_name+enviroment.getAvatar().ext);

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

		console.log(Emoji.emojis[emoji.name]);

	},


}