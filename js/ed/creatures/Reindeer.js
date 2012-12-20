/**
* Obiekt 
*/ 
function ReindeerCreature()
{
	var abstract = new AbstractCreature();
	var pullTimes = 0, moving = false, horseshoeSprite, horseShoeOn = false, horseshoeAnimation, dispatchMoving = false, checkInterval;
	var tail, rageTimes = 0;
	
	function init()
	{
		abstract.content = new createjs.Container();
		abstract.name = 'reindeer';

		abstract.sprite = new createjs.SpriteSheet(
			{
				"animations": {
					"pull": [0, 14], 
					"rage": [15, 18],
					"moo": [19, 35],
					"moo2": [36, 73], 
					"horseshoe": [75, 102],
					"still": [103, 109]
				},
				"images": ["media/spritesheets/reindeer.png"], 
				"frames": {"width": 176, "regY": 0, "height": 175, "count": 109, "regX": 0}
			}
		);

		horseshoeSprite = new createjs.SpriteSheet(
			{
				"animations": {
					"h_pull": [0, 14], 
					"h_rage": [15, 18],
					"h_moo": [19, 35],
					"h_moo2": [36, 73], 
					"h_horseshoe": [75, 102],
					"h_still": [103, 109]
				},
				"images": ["media/spritesheets/reindeerHorseshoe.png"],
				"frames": {"width": 61, "regY": 0, "height": 46, "count": 109, "regX": 0}
			}
		);

		checkInterval = setInterval(checkInit, 500);
	}
	function checkInit()
	{
		if(abstract.sprite.complete && horseshoeSprite.complete)
		{
			clearInterval(checkInterval);
			postInit();
		}
	}

	function postInit()
	{
		abstract.animation = new createjs.BitmapAnimation(abstract.sprite);
		abstract.animation.name = 'reindeer';

		var sledge = new createjs.Bitmap("media/img/sledge.png");
		abstract.content.addChild(sledge);	

		var stripe = new createjs.Bitmap("media/img/stripe.png");
		stripe.x = sledge.image.width;
		stripe.y = 49;
		abstract.content.addChild(stripe);
		
		abstract.animation.x = Utils.round(stripe.x + stripe.image.width - 16);
		abstract.animation.y = -22;
		abstract.content.addChild(abstract.animation);
		
		horseshoeAnimation = new createjs.BitmapAnimation(horseshoeSprite);
		horseshoeAnimation.x = abstract.animation.x + 50;
		horseshoeAnimation.y = abstract.animation.y + 125;
		horseshoeAnimation.alpha = 0;
		abstract.content.addChild(horseshoeAnimation);

		tail = new createjs.Shape(new createjs.Graphics().beginFill(createjs.Graphics.getRGB(0,0,0,0.05)).rect(-10,-10,35,35));
		tail.x = abstract.animation.x;
		tail.y = 60;
		abstract.content.addChild(tail);
		tail.onPress = onPress;
		tail.onMouseOut = onMouseOut;
		tail.onMouseOver = onMouseOver;

		abstract.content.scaleX = 0.8;
		abstract.content.scaleY = 0.8;
		abstract.content.x = 100;
		abstract.content.y = Canvas.height - 208;

		abstract.content.snapToPixel = true;

		abstract.content.cache(0,-12,abstract.animation.x + 175,176+12);

		abstract.animation.onTick = onTick;
		
		stopAnimation();

		abstract.events.dispatch('initComplete');
	}

	function reindeerCacheUpdate()
	{
		abstract.content.updateCache();
	}

	function showHorseshoe()
	{
		horseShoeOn = true;
		moving = true;
		horseshoeAnimation.alpha = 1;
		abstract.animation.onAnimationEnd = onHorseshoeComplete;
		abstract.animation.gotoAndPlay('horseshoe');
		horseshoeAnimation.gotoAndPlay('h_horseshoe');
		SoundManager.playOnForce('reindeerHorseshoe');
		PromptManager.active('outside', 'last'); 
	}
	function onHorseshoeComplete(ref,animationName)
	{
		if(animationName == 'horseshoe')
		{
			abstract.animation.onAnimationEnd = null;
			abstract.animation.gotoAndStop('still');
			horseshoeAnimation.gotoAndStop('h_still');
			moving = false;
			abstract.content.updateCache();
		}
	}
	
	function pull()
	{
		if(!moving)
		{
			moving = true;
			pullTimes += 1;
			
			abstract.animation.onAnimationEnd = onPullComplete;
			abstract.animation.gotoAndPlay('pull');
			horseshoeAnimation.gotoAndPlay('h_pull');
			
			AnimationsCollection.play('reindeer');
		}
	}
	function rage()
	{
		rageTimes += 1;
		abstract.animation.gotoAndPlay('rage');
		horseshoeAnimation.gotoAndPlay('h_rage');
	}
	function moo()
	{
		abstract.animation.gotoAndPlay('moo');
		horseshoeAnimation.gotoAndPlay('h_moo');
		SoundManager.playOn('reindeer');
	}
	function moo2()
	{
		abstract.events.dispatch('reindeerMoo', null, {
			stageX:abstract.content.x,
			target:tail, 
			type:'exit', 
			action:'changeContainer',
			next: 'clouds'
		});
		abstract.animation.gotoAndPlay('moo2');
		horseshoeAnimation.gotoAndPlay('h_moo2');
		SoundManager.playOn('reindeer');
	}



	function onPullComplete(ref,animationName)
	{
		abstract.animation.onAnimationEnd = onRageComplete;
		rage();
	}
	function onRageComplete(ref,animationName)
	{
		if(pullTimes < 2)
		{
			abstract.animation.onAnimationEnd = onMooComplete;
			moo();
		} else {
			dispatchEdMoving();
			if(rageTimes < 20)
			{
				rage();
			}
			else
			{
				pullTimes = 0;
				rageTimes = 0;
				abstract.animation.onAnimationEnd = onMooComplete;
				moo();
			}
		}
	}
	function onMooComplete(ref,animationName)
	{
		abstract.animation.onAnimationEnd = onAnimationComplete;
		moo2();
	}

	function onAnimationComplete(ref, animationName)
	{
		abstract.animation.onAnimationEnd = null;
		stopAnimation();
		AnimationsCollection.stop('reindeer');
		moving = false;
		dispatchMoving = false;
	}
	
	function stopAnimation()
	{
		abstract.animation.gotoAndStop('pull');
		horseshoeAnimation.gotoAndStop('h_pull');
		abstract.content.updateCache();	
	}

	function dispatchEdMoving()
	{
		if(!dispatchMoving)
		{
			PromptManager.active('outside', 'horseshoe'); 
			dispatchMoving = true;
			abstract.events.dispatch('reindeerMoveEd');
		}
	}
	
	function onPress(e)
	{
		var pGlobal = abstract.content.localToGlobal(e.target.x - 30, e.target.y);
		abstract.events.dispatch('onPressEvent', null, {
			stageX:pGlobal.x, 
			target:e.target, 
			type:abstract.type, 
			action:'reindeerPull',
			demo:false
		} );
	}

	function onTick()
	{
		if(moving){
			abstract.content.updateCache();
		}
	}	

	function onMouseOut(e){
		$('body').css('cursor','default');
	}

	function onMouseOver(e){
		$('body').css('cursor','pointer');
	}
	
	
	this.init = init;
	this.abstract = abstract;
	this.pull = pull;
	this.stopAnimation = stopAnimation;
	this.onTick = onTick;
	this.showHorseshoe = showHorseshoe;
	this.reindeerCacheUpdate = reindeerCacheUpdate;
}