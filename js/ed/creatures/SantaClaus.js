/**
* Obiekt sterujacy Mikolajem
*/ 
function SantaClausCreature()
{
	var abstract = new AbstractCreature();
	var laying, beardLaying, laying = true, moving = false, beardOn = false, checkInterval;

	/**
	* Inicjalizacja Mikolaja
	*/ 
	function init()
	{
		abstract.content = new createjs.Container();
		

		// {"frames": {"width": 290, "regY": 0, "height": 281, "count": 119, "regX": 0}, "animations": {"hohoho": [52, 118], "wakeUp": [1, 51], "all": [119, 121], "sleep": [0, 0]}, "images": ["standingSanta_0.png", "standingSanta_1.png", "standingSanta_2.png"]}
		abstract.sprite = new createjs.SpriteSheet(
			{
				"animations": {
					"sleep": [0, 0],
					"wakeUp": [1, 51], 
					"hohoho": [52, 118]
				}, 
				"images": ["media/spritesheets/santa0.png","media/spritesheets/santa1.png","media/spritesheets/santa2.png"], 
				"frames": {"width": 290, "regY": 0, "height": 281, "count": 119, "regX": 0}
			}
		);

		checkInterval = setInterval(checkInit, 300);
	}

	function checkInit()
	{
		if(abstract.sprite.complete)
		{
			clearInterval(checkInterval);
			postInit();
		}
	}
	function postInit()
	{
		abstract.animation = new createjs.BitmapAnimation(abstract.sprite);
				
		// dodanie animacji do contentu
		abstract.content.addChild(abstract.animation);
		abstract.name = abstract.animation.name = 'santaClaus';
		abstract.content.snapToPixel = true;
		
		abstract.content.x = Canvas.width - 310;
		abstract.content.y = Canvas.height - 280;
		
		abstract.animation.gotoAndStop(0);

		abstract.content.onTick = onTick;
		abstract.content.cache(0,0,290,281);


	}

	function onTick()
	{
		if(laying || moving)
		{
			abstract.content.updateCache();
		}
	}	

	function isMoving()
	{
		return moving;
	}

	function showBeard()
	{
		abstract.animation.gotoAndStop(1);
		PromptManager.active('inside', 'last'); 
	}

	function wakeUp()
	{
		SoundManager.playOff('snore');
		SoundManager.removeSoundFromLocation('inside', 'snore');
		abstract.animation.onAnimationEnd = hohoho;
		abstract.animation.gotoAndPlay('wakeUp')
	}
	
	function hohoho()
	{
		abstract.animation.onAnimationEnd = onEndHohoho;
		abstract.animation.gotoAndPlay('hohoho');
		SoundManager.playOn('hohoho');
	}
	function onEndHohoho()
	{
		abstract.animation.gotoAndStop('hohoho');
		setTimeout(gameEnd, 2000);
	}

	function gameEnd()
	{
		abstract.events.dispatch('gameEnd');
	}
	
	this.init = init;
	this.abstract = abstract;
	this.onTick = onTick;
	this.showBeard = showBeard;
	this.wakeUp = wakeUp;
	
}