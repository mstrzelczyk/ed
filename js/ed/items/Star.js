/**
* Item 
*/
function StarItem()
{
	var abstract = new AbstractItem(), sprite, animation, isPlaying = false;

	function init()
	{		

		abstract.content = new createjs.Container();
		abstract.demo = false;
		
		abstract.type = 'item';
				
		sprite = new createjs.SpriteSheet(
			{				
				"animations": {"all": [0,1]},
				"images": ["media/spritesheets/star.png"], 				
				"frames": {"width": 219, "regY": 0, "height": 213, "count":2, "regX": 0}
			}
		);
		
		animation = new createjs.BitmapAnimation(sprite);		
		sprite.getAnimation('all').next = 'all';

		abstract.content.addChild(animation);
		abstract.content.snapToPixel = true;

		abstract.init(true);
		abstract.content.cache(0,0,219,213);
		
		animation.gotoAndStop('all');
		abstract.name != null ? animation.name = abstract.name : animation.name = 'star';
		abstract.content.updateCache();	

		abstract.content.onTick = onTick;
	}

	function lightUp()
	{
		isPlaying = true;
		animation.play();

		SoundManager.playOn('starLightUp1');
		setTimeout(stop, 400);
	}
	function lightUpStill()
	{
		isPlaying = false;
		animation.gotoAndStop(1);
		abstract.content.updateCache();
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
		animation.gotoAndStop(1);
		SoundManager.playOn('starLightUp2');
		abstract.content.updateCache();
	}

	function cacheUpdate()
	{
		abstract.content.updateCache();
	}

	this.init = init;
	this.abstract = abstract;
	this.stop = stop;
	this.lightUp = lightUp;
	this.lightUpStill = lightUpStill;
	this.cacheUpdate = cacheUpdate;


}