/**
* Item 
*/
function SoundSwitchItem()
{
	var abstract = new AbstractItem();

	/**
	 * Inicjuje obiekt
	*/
	function init()
	{		
		abstract.content = new createjs.Container();
		
		data = {				
				"images": ["media/spritesheets/soundSwitcher_0.png"], 
				"frames": {"width": 35, "height": 30 }
			};

		abstract.sprite = new createjs.SpriteSheet(data);
		abstract.animation = new createjs.BitmapAnimation(abstract.sprite);
		abstract.content.addChild(abstract.animation);		
		abstract.type = 'item';
		abstract.demo = false;
		abstract.action = 'soundSwitch';
		abstract.init();

		(SoundManager.isSoundOn) ? this.soundOn() : this.soundOff();
	}

	/**
	 * Wlacza dzwiek
	*/
	function soundOn()
	{
		abstract.animation.gotoAndStop(2);
		game.update = true;
	}

	/**
	 * Wylacza dzwiek
	*/
	function soundOff()
	{
		abstract.animation.gotoAndStop(1);
		game.update = true;
	}

	/**
	 * Zmienia dzwiek
	*/
	function change()
	{
		(SoundManager.isSoundOn) ? this.soundOn() : this.soundOff();
	}
	

	this.init = init;
	this.abstract = abstract;
	this.change = change;
	this.soundOn = soundOn;
	this.soundOff = soundOff;
	
}