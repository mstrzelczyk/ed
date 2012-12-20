/**
* Item 
*/
function BtnSoundItem()
{
	var abstract = new AbstractItem();
	var animations;
	/**
	 * Inicjuje obiekt
	*/
	function init()
	{		

		abstract.content = new createjs.Container();	
		abstract.demo = false;
		abstract.type = 'item';
		abstract.action = 'soundSwitch';

		bitmap = new createjs.Bitmap('media/img/btnSmallRound.png');
		bitmap.onPress = abstract.onPress;

		abstract.content.width = bitmap.image.width;
		abstract.content.height = bitmap.image.height;
		abstract.content.regX = bitmap.image.width / 2;
		abstract.content.regY = bitmap.image.height / 2;
		abstract.content.x = Utils.round(Canvas.width - bitmap.image.width/2 - 10) ;
		abstract.content.y = Utils.round(bitmap.image.height/2 + 10);	
		abstract.content.addChild(bitmap);
		
		icons = new createjs.SpriteSheet(
			{				
				"images": ["media/spritesheets/soundIcons.png"], 				
				"frames": {"width": 27, "height": 30, "count": 2}
			}
		);
		
		animations = new createjs.BitmapAnimation(icons);		
		animations.x = 11;
		animations.y = 3;
		abstract.content.addChild(animations);

		abstract.init();
		abstract.content.cache(-abstract.content.regX,-abstract.content.regY, bitmap.image.width*2,bitmap.image.height*2);
		abstract.content.snapToPixel = true;
		(SoundManager.isSoundOn) ? this.soundOn() : this.soundOff();
		abstract.content.onTick = onTick;
	}

	
	/**
	 * Wlacza dzwiek
	*/
	function soundOn()
	{	
		animations.gotoAndStop(2);
		game.update = true;	
		abstract.content.updateCache();	
	}

	/**
	 * Wylacza dzwiek
	*/
	function soundOff()
	{
		animations.gotoAndStop(1);
		game.update = true;
		abstract.content.updateCache();
	}

	/**
	 * Zmienia dzwiek
	*/
	function change()
	{
		(SoundManager.isSoundOn) ? this.soundOn() : this.soundOff();
		abstract.content.updateCache();
	}
	
	/**
	* Animacja przycisku po nacisnieciu
	*/
	function animate()
	{
		AnimationsCollection.play('soundBtn');
		var tween = createjs.Tween.get(abstract.content, {loop:false})
			.to({scaleX: 0.8, scaleY: 0.8}, 150, createjs.Ease.bounceOut)
			.wait(20)
			.to({scaleX: 1, scaleY: 1}, 150, createjs.Ease.bounceOut)
			.call(function(){
				AnimationsCollection.stop('soundBtn');
			});
	}

	function onTick()
	{
		if(createjs.Tween.hasActiveTweens(abstract.content)) 
		{
			abstract.content.updateCache();
		}
			
	}

	this.init = init;
	this.animate = animate;
	this.abstract = abstract;
	this.change = change;
	this.soundOn = soundOn;
	this.soundOff = soundOff;
	
}