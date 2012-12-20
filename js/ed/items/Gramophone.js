/**
* Item 
*/
function GramophoneItem()
{
	var abstract = new AbstractItem(), sprite, animation, isPlaying = true;

	function init()
	{		

		abstract.content = new createjs.Container();
		abstract.name = abstract.content.name = 'gramophone';	
		abstract.demo = false;	
		abstract.type = 'background';
				
		sprite = new createjs.SpriteSheet(
			{				
				"animations": {"all": [0, 19]},
				"images": ["media/spritesheets/gramophone.png"], 				
				"frames": {"width": 118, "regY": 0, "height": 96, "count": 20, "regX": 0}
			}
		);
		
		animation = new createjs.BitmapAnimation(sprite);		
		sprite.getAnimation('all').next = 'all';

		abstract.content.addChild(animation);
		abstract.content.snapToPixel = true;

		abstract.init(true);
		abstract.content.cache(0,0,118,96);
		
		animation.gotoAndPlay('all');

		abstract.content.onTick = onTick;
	}

	function onTick()
	{
		if(isPlaying) 
		{
			abstract.content.updateCache();
		}
	}

	function stop()
	{
		isPlaying = false;
		animation.stop();
		
		SoundManager.playOn('gramophoneStop');
		SoundManager.playOff('gramophone');
		SoundManager.removeSoundFromLocation('inside', 'gramophone');
	}

	this.init = init;
	this.abstract = abstract;
	this.stop = stop;
}