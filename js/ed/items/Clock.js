/**
* Item 
*/
function ClockItem()
{
	var abstract = new AbstractItem(), sprite, animation, isPlaying = true, pendulum, hour, minute, eatInterval, cake, shouts = 0;

	function init()
	{		

		abstract.content = new createjs.Container();
		abstract.name = abstract.content.name = 'clock';
		abstract.demo = false;
		abstract.type = 'background';
				
		sprite = new createjs.SpriteSheet(
			{				
				"animations": {
					"open": [0, 43],
					"open2": [0, 13],
					"shout": [14, 43],
					"eat": [44, 58],
					"close": [59, 73]
				}, 
				"images": ["media/spritesheets/clock.png"],
				"frames": {"width": 114, "regY": 0, "height": 194, "count": 74, "regX": 0}
			}
		);
		
		animation = new createjs.BitmapAnimation(sprite);		
		abstract.name = animation.name = 'clock';

		animation.scaleX = animation.scaleY = 1;

		pendulum = new createjs.Bitmap('media/img/pendulum.png')
		pendulum.x = 51;
		pendulum.y = 110;
		abstract.content.addChild(pendulum);

		abstract.content.addChild(animation);

		hour = new createjs.Bitmap('media/img/hour.png');
		hour.x = 59;
		hour.y = 96;
		hour.regX = 4;
		hour.regY = 11;
		abstract.content.addChild(hour);

		minute = new createjs.Bitmap('media/img/minute.png');
		minute.x = 59;
		minute.y = 96;
		minute.regX = 3;
		minute.regY = 18;
		abstract.content.addChild(minute);

		var hit = new createjs.Shape();
		nW = 90;
		nH = 130;
		hit.graphics.beginFill(createjs.Graphics.getRGB(255,255,255,0.5)).drawRect(22,0,nW,nH);
		//abstract.content.addChild(hit);
		abstract.content.hitArea = hit;	

		abstract.content.snapToPixel = true;

		abstract.init(true);
		abstract.content.cache(0,0,114,194);
		
		animation.gotoAndStop('open');

		movePendulum();
		updateClock();
		setInterval(updateClock, 15000);

		abstract.content.onTick = onTick;

	}

	

	function movePendulum()
	{
		createjs.Tween.get(pendulum, {loop:true})
			.to({rotation:-15}, 500, createjs.Ease.sineOut)
			.call(function(){
				SoundManager.playOn('clockPendulum');
			})
			.to({rotation:15}, 1000, createjs.Ease.sineInOut)
			.call(function(){
				SoundManager.playOn('clockPendulum');
			})
			.to({rotation:0}, 500, createjs.Ease.sineIn);
	}
	
	function stopPendulum()
	{
		createjs.Tween.removeTweens(pendulum);
		createjs.Tween.get(pendulum)
			.to({rotation:0}, 300, createjs.Ease.sineInOut);
		SoundManager.playOff('clockPendulum');
	}

	function updateClock()
	{
		var date = new Date();
		var h=date.getHours();
		var m=date.getMinutes();	
		//
		if(h > 12) h -= 12;

		var stepH = 360/12;
		var stepM = 360/60;

		hour.rotation = stepH * (h + m/60) ;
		minute.rotation = stepM * m;

		abstract.content.updateCache();
	}

	function addCake(object)
	{
		AnimationsCollection.play('clock');
		cake = object;
		cake.x = 60;
		cake.y = 60;
		cake.scaleX = cake.scaleY = 0.6;
		abstract.content.addChild(cake);
		abstract.content.updateCache();
		stopPendulum();
		animation.onAnimationEnd = onEatEnd;
		animation.gotoAndPlay('open');
		SoundManager.playOn('clockOpen');
	}
	function eat()
	{	
		isPlaying = true;
		clearInterval(eatInterval)
		animation.onAnimationEnd = onEatEnd;
		animation.gotoAndPlay('eat');
		isPlaying = true;
		
	}
	function onEatEnd()
	{
		animation.gotoAndStop(58);
		eatInterval = setInterval(eat, 500);
		isPlaying = false;
	}

	function shout()
	{
		shouts = 0;
		clearInterval(eatInterval)
		abstract.content.removeChild(cake);

		animation.onAnimationEnd = onCloseEnd;
		animation.gotoAndPlay('close');
		SoundManager.playOn('clockClose');
		movePendulum();
		isPlaying = true;
	}
	function onCloseEnd()
	{
		if(shouts < 3)
			startShout();
		else 
			endShout();
	}
	function startShout()
	{
		animation.onAnimationEnd = openEnd;
		animation.gotoAndPlay('open2');
		SoundManager.playOn('clockOpen');
		shouts += 1;
	}
	function openEnd()
	{
		animation.onAnimationEnd = shoutEnd;
		animation.gotoAndPlay('shout');
		SoundManager.playOn('clockShout');
	}
	function shoutEnd()
	{
		animation.onAnimationEnd = onCloseEnd;
		animation.gotoAndPlay('close');
		SoundManager.playOn('clockClose');
	}
	function endShout()
	{
		animation.onAnimationEnd = null;
		animation.gotoAndStop('open');
		abstract.events.dispatch('clockShoutComplete');
	}

	function onTick()
	{
		if(isPlaying || createjs.Tween.hasActiveTweens(pendulum)) 
		{
			abstract.content.updateCache();
		}
	}

	
	this.init = init;
	this.abstract = abstract;
	this.eat = eat;
	this.addCake = addCake;
	this.shout = shout;

}