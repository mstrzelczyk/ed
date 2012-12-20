/**
* Obiekt sterujacy kotem
*/ 
function CatCreature()
{
	var abstract = new AbstractCreature();
	var isPlaying = false, isUpdate = false, eyeInterval;
	
	/**
	* Inicjalizacja kota
	*/ 
	function init()
	{
		abstract.content = new createjs.Container();
		
		// inicjacja sprite
		abstract.sprite = new createjs.SpriteSheet(
			{
				"frames": {"width": 118, "regY": 0, "height": 113, "count": 60, "regX": 0}, 
				"animations": {
					"awake": [2, 59], 
					"sleep": [0, 1]
				}, 
				"images": ["media/spritesheets/cat.png"]
			}
		);

				
		abstract.animation = new createjs.BitmapAnimation(abstract.sprite);
			
		// dodanie animacji do contentu
		abstract.name = abstract.animation.name = 'cat';
		abstract.content.addChild(abstract.animation);
		abstract.content.x = 150;
		abstract.content.y = 375;
		abstract.content.snapToPixel = true;
		
		abstract.animation.onTick = onTick;
		abstract.content.cache(0,0,118,113);

		// ustawienie animacji na stan stojacy
		abstract.animation.gotoAndStop(0);
		isUpdate = true;
		eyeInterval = setInterval(openEye, 5000); 

	}
	
	/**
	* Tick Eda: sprawdzanie czy doszedl do wskazanego punktu.
	*/ 
	function onTick()
	{
		if(isPlaying || isUpdate)
		{
			isUpdate = false;
			abstract.content.updateCache();
		}
	}

	function openEye()
	{
		abstract.animation.gotoAndStop(1);
		isUpdate = true;
		clearInterval(eyeInterval);
		eyeInterval = setInterval(closeEye, 5000);
	}
	function closeEye()
	{
		abstract.animation.gotoAndStop(0);
		isUpdate = true;
		clearInterval(eyeInterval);
		eyeInterval = setInterval(openEye, 5000);
	}

	function scare()
	{
		clearInterval(eyeInterval);
		isPlaying = true;
		AnimationsCollection.play('cat');
		abstract.animation.onAnimationEnd = onAwakeComplete;
		abstract.animation.gotoAndPlay('awake');
	}

	function onAwakeComplete()
	{
		isPlaying = false;
		isUpdate = true;
		abstract.animation.onAnimationEnd = null;
		abstract.animation.gotoAndStop(0);
		abstract.events.dispatch('catHair', null)
		AnimationsCollection.stop('cat');
	}
		
	
	
	this.init = init;
	this.abstract = abstract;
	this.scare = scare;
	
	
}