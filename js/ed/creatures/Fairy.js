/**
* Obiekt sterujacy Wrozka
*/ 
function FairyCreature()
{
	var abstract = new AbstractCreature();
	
	/**
	* Inicjalizacja Wrozki
	*/ 
	function init()
	{
		abstract.content = new createjs.Container();
		
		
		// inicjacja sprite
		abstract.sprite = new createjs.SpriteSheet(
			{
				"frames": {"regX": 0, "regY": 0, "height": 60, "width": 63, "count": 50}, 
				"images": ["media/spritesheets/fairy.png"], 
				"animations": {"all": [0, 49]}
			}
		);

				
		abstract.animation = new createjs.BitmapAnimation(abstract.sprite);
		abstract.name = abstract.animation.name = 'fairy';
		abstract.sprite.getAnimation('all').next = 'all';
			
		// dodanie animacji do contentu
		abstract.content.addChild(abstract.animation);
		abstract.content.x = 265;
		abstract.content.y = 230;
		abstract.content.snapToPixel = true;
		
		abstract.animation.onTick = onTick;
		abstract.content.cache(0,0,63,60);

		// ustawienie animacji na stan stojacy
		abstract.animation.gotoAndPlay('all');


		


	}
	
	/**
	* Tick Eda: sprawdzanie czy doszedl do wskazanego punktu.
	*/ 
	function onTick()
	{
		abstract.content.updateCache();
	}
		
	
	
	this.init = init;
	this.abstract = abstract;
	
	
}