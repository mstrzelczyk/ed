/**
* Obiekt sterujacy Edem
*/ 
function EdCreature()
{
	var abstract = new AbstractCreature(), soundtrack;
	var destX = 0, destY = 0, vX = 4, vY = 40, tmpVY = 10, direction = 1, directionY = 1, moving = false, flying = false, jumpingTo = false, landing = false, freeMoving = false, pulling = false, falling = false, x = 0, y = 0, currentLocation, checkInterval, level = 0, dataTmp, moonWalking = false;


	// obiekt z defaultowymi pozycjami Eda na kazdym z widokow
	var locations = {
		'inside':{ x:150, y:Canvas.height - 200, scale:1, vX:4, vY:40 },
		'outside':{ x:Canvas.width/2 + 170, y:Canvas.height - 175, scale:0.5, vX:2, vY:40 },
		'clouds':{ x:150, y:Canvas.height - 300, scale:1, vX:4, vY:40  },
		'brain':{ x:350, y:68, scale:0.43, vX:2, vY:10 }
	}

	/**
	* Inicjalizacja Eda
	*/ 
	function init()
	{
		abstract.content = new createjs.Container();
		abstract.name = abstract.content.name = 'ed';
		
		// inicjacja sprite
		// {"frames": {"width": 132, "regY": 0, "height": 189, "count": 95, "regX": 0}, "animations": {"all": [0, 94]}, "images": ["ed3.png"]}
		abstract.sprite = new createjs.SpriteSheet(
			{
				"animations": {
					"start": [0, 3], 
					"walk": [4, 27], 
					"pull": [28, 42],
					"pullEnd": [43, 60],
					"jump":[61, 72],
					"jumpEnd":[73,77],
					"landing":[78,81],
					"landingEnd":[82,94]
				}, 
				"images": ["media/spritesheets/ed.png"], 
				"frames": {"width": 132, "regY": 0, "height": 189, "count": 95, "regX": 132/2}
			}
		);

		checkInterval = setInterval(checkInit, 500);
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
		// generowanie odwroconych animacji 
		createjs.SpriteSheetUtils.addFlippedFrames(abstract.sprite, true, false, false);
		
		abstract.animation = new createjs.BitmapAnimation(abstract.sprite);
		abstract.sprite.getAnimation('pull').next = 'pullEnd';
		abstract.sprite.getAnimation('landing').next = 'landingEnd';
		abstract.sprite.getAnimation('pull_h').next = 'pullEnd_h';
		abstract.sprite.getAnimation('landing_h').next = 'landingEnd_h';
		
		abstract.content.x = locations['inside'].x;
		abstract.content.y = locations['inside'].y;
		abstract.animation.direction = 90;
		abstract.animation.scaleX = abstract.animation.scaleY = 1;
		
		// dodanie animacji do contentu
		abstract.content.addChild(abstract.animation);
		abstract.content.snapToPixel = true;
		
		abstract.animation.onTick = onTick;
		abstract.content.cache(-66,0,133,192);

		// ustawienie animacji na stan stojacy
		stopAnimation();

		abstract.events.dispatch('initComplete');
	}

	/**
	* Metoda, ktora uruchamia Eda po zakonczeniu przechodzenia pomiedzy kontenerami (onFadeInComplete)
	*/ 
	function stageReady()
	{
		abstract.content.updateCache();
		stopAnimation();
		
		if(currentLocation === locations.clouds)
		{
			landing = true;
			AnimationsCollection.play('ed');
		} 
	}

	/**
	* ustawianie eda wg danych lokalizacji
	*/ 
	function setLocation(location)
	{
		currentLocation = location
		abstract.content.x = Utils.round(location.x);

		location === locations.clouds 
			? abstract.content.y = -500
			: abstract.content.y = Utils.round(location.y);
		if(location === locations.brain) direction = 1;


		vX = location.vX;

		abstract.content.scaleX = location.scale;
		abstract.content.scaleY = location.scale;
		abstract.content.rotation = 0;


	}
	/**
	* Ed idzie do wskazanego X
	*/ 
	function walkTo(data)
	{
		if(!jumpingTo)
		{
			dataTmp = data;
			if(currentLocation == locations.brain)
			{
				if(dataTmp.target.level == level && ((dataTmp.direction == 'down' && dataTmp.levelUp == level ) || (dataTmp.direction == 'up' && dataTmp.levelDown == level ) || dataTmp.direction == undefined))
					walkEdTo();
			} else {
				walkEdTo();
			}
		}
	}

	function walkEdTo()
	{
		var x = dataTmp.stageX;
		if(!moving && !pulling && !flying && !landing && !falling && !freeMoving)
		{
			var w = 50;
			x < w ? destX = w : (x > Canvas.width - w ? destX = Canvas.width - w : destX = Utils.round(x));
			destX > abstract.content.x ? direction = 1 : direction = -1;
			
			abstract.animation.direction = 90 * direction;
			
			walk();
			
			moving = true;
			flying = pulling = landing = falling = freeMoving = false;
			AnimationsCollection.play('ed');
		}
	}
	function walk()
	{
		abstract.animation.onAnimationEnd = onStartEnd;
		switch(currentLocation)
		{
			case locations['inside']: soundtrack = 'edWood'; break;
			case locations['outside']: BackgroundManager.snow == true ? soundtrack = 'edSnow' : soundtrack = 'edGround'; break;
			case locations['clouds']: soundtrack = 'edSnow'; break;
			case locations['brain']: level < 3 ? soundtrack = 'edPipe' : soundtrack = 'edMud'; break;
		}
		
		if(edDirection() == 1)
			abstract.animation.gotoAndPlay('start')
		else
			abstract.animation.gotoAndPlay('start_h');
	}
	function onStartEnd()
	{
		abstract.animation.onAnimationEnd = onWalkEnd;
		if(edDirection() == 1)
			abstract.animation.gotoAndPlay('walk');
		else
			abstract.animation.gotoAndPlay('walk_h');

		SoundManager.playOnForce(soundtrack);
	}
	function onWalkEnd()
	{
		onStartEnd();
	}
	
	/**
	* Animacja ciagniecia renifera za ogon
	*/ 
	function pull()
	{
		direction = 1;
		moving = flying = landing = falling = jumpingTo = freeMoving = false;
		pulling = true;

		stopAnimation();

		abstract.animation.onAnimationEnd = onPullEnd;
		abstract.animation.gotoAndPlay('pull');
		AnimationsCollection.play('ed');
	}

	/**
	* Animacja latajacego Eda
	*/ 
	function fly(data)
	{
		if(abstract.content.x > 410 && abstract.content.x < 500)
		{
			dataTmp = data;
			moving = pulling = landing = falling = jumpingTo = freeMoving = false;
			flying = true;
			//
			stopAnimation();
			AnimationsCollection.play('ed');
		}
	}

	function flyTo(data)
	{
		dataTmp = data;
		var y = dataTmp.stageY;
		if(!moving || pulling)
		{
			destY = y;
			destY > abstract.content.y ? directionY = 1 : directionY = -1;
			moving = pulling = landing = falling = jumpingTo = flying = false;
			freeMoving = true;
			AnimationsCollection.play('ed');
		}
	}

	function landTo(data)
	{
		dataTmp = data;
		moving = pulling = landing = freeMoving = jumpingTo = flying = false;
		falling = true;

		stopAnimation();
		AnimationsCollection.play('ed');
	}

	/**
	* Callback po animacji ciagniecia (faza 1)
	*/ 
	function onPullEnd(ref, animationName)
	{
		abstract.events.dispatch('animationEvent', null, { action:'onPullEnd' })
		abstract.animation.onAnimationEnd = onPullClose;
	}

	/**
	* Callback po animacji ciagniecia (faza 2 - koncowa)
	*/ 
	function onPullClose(ref,animationName)
	{
		stopAnimation();
		abstract.animation.onAnimationEnd = null;
		
		moving = false;
		pulling = false;
		flying = false;
		landing = false;
		falling = false;
	}

	function jumpToTube(data)
	{
		dataTmp = data;
		moving = pulling = landing = freeMoving = falling = flying = false;
		jumpingTo = true;

		stopAnimation();

		abstract.animation.onAnimationEnd = onJumpEnd;
		abstract.animation.gotoAndPlay('jump');
		AnimationsCollection.play('ed');
	}
	function onJumpEnd(ref,animationName)
	{
		abstract.animation.onAnimationEnd = onJumpEnd2;
		abstract.animation.gotoAndPlay('jumpEnd');
		abstract.events.dispatch('jumpStarted',null,dataTmp);
	}
	function onJumpEnd2(ref, animationName)
	{
		abstract.animation.onAnimationEnd = null;
		abstract.animation.gotoAndStop(77);
		jumpingTo = false;
	}

	function jumpFromTube(data)
	{
		dataTmp = data;
		moving = pulling = landing = freeMoving = falling = flying = false;
		jumpingTo = true;
		stopAnimation();
		abstract.animation.gotoAndStop('landing_h');
		abstract.events.dispatch('landingStarted',null,dataTmp);
		AnimationsCollection.play('ed');
	}
	function jumpFromTubeEnd()
	{
		abstract.animation.onAnimationEnd = null;
		direction == -1;
		stopAnimation();
		AnimationsCollection.stop('ed');
		jumpingTo = false;
	}
	
	/**
	* Zatrzymanie Eda na klatce "stojacej"
	*/ 
	function stopAnimation()
	{
		direction == 1 ? abstract.animation.gotoAndStop('pull') : abstract.animation.gotoAndStop('pull_h');
		abstract.content.updateCache();
	}

	function moonWalk()
	{
		moonWalking = true;
		walkTo({
			stageX: Canvas.width/2,
			type:'background',
			demo:false
		});
	}

	function edDirection()
	{
		var dir = direction;
		moonWalking == true
			? dir = direction*-1 
			: dir = direction;
		return dir;
	}
	
	/**
	* Tick Eda: sprawdzanie czy doszedl do wskazanego punktu.
	*/ 
	function onTick()
	{
		if(moving || flying || landing || pulling || falling || freeMoving || jumpingTo)
		{
			abstract.content.updateCache();
		}

		if(moving)
		{
			var delta = direction*(abstract.content.x - destX);
			if(delta < 0)
			{
				abstract.content.x += vX * direction;
			} else {
				SoundManager.playOff(soundtrack);
				abstract.content.x = destX;
				moving = false;
				AnimationsCollection.stop('ed');
				abstract.animation.onAnimationEnd = null;
				stopAnimation();

				abstract.events.dispatch('walkComplete',null,dataTmp);
			}
		} 
		else if(flying)
		{
			delta = -abstract.content.y - 500;
			if(delta < 0)
			{
				abstract.content.y -= vY;
			} else {
				abstract.content.y = -500;
				flying = false;
				AnimationsCollection.stop('ed');
				stopAnimation();
				abstract.events.dispatch('flyComplete',null,dataTmp);
			}
		}
		else if(landing)
		{
			delta = abstract.content.y - locations[dataTmp.next].y;
			if(delta < 0)
			{
				abstract.content.y += locations[dataTmp.next].vY;
			} else {
				abstract.content.y = locations[dataTmp.next].y;
				landing = false;
				AnimationsCollection.stop('ed');
				stopAnimation();
				
				abstract.events.dispatch('landingComplete',null,dataTmp);
			}
		}
		else if(falling)
		{
			delta = abstract.content.y - (Canvas.height + 500);
			if(delta < 0)
			{
				abstract.content.y += vY;
			} else {
				abstract.content.y = (Canvas.height + 500);
				falling = false;
				AnimationsCollection.stop('ed');
				stopAnimation();
				if(dataTmp.action == 'edLanding') dataTmp.action = 'changeContainer';
				abstract.events.dispatch('fallingComplete',null,dataTmp);
			}
		}
		else if(freeMoving)
		{
			var delta = directionY*(abstract.content.y - destY);
			if(delta < 0)
			{
				abstract.content.y += tmpVY*directionY;
			} 
			else 
			{
				abstract.content.y = destY;
				freeMoving = false;
				AnimationsCollection.stop('ed');
				abstract.events.dispatch('moveComplete',null,dataTmp);
			}
		} 
		else if(jumpingTo)
		{	

		}
	}	

	/**
	* Zwraca czy Ed idzie
	*/ 
	function isMoving()
	{
		return moving;
	}

	function getCurrentLocation()
	{
		return currentLocation;
	}
	

	function setLevel(l)
	{
		level = l;
	}
	
	this.init = init;
	this.abstract = abstract;
	
	this.walkTo = walkTo;
	this.pull = pull;
	this.fly = fly;
	this.landTo = landTo;
	this.flyTo = flyTo;
	this.isMoving = isMoving;
	this.jumpToTube = jumpToTube;
	this.jumpFromTube = jumpFromTube;
	this.jumpFromTubeEnd = jumpFromTubeEnd;
	this.setLevel = setLevel;
	this.moonWalk = moonWalk;

	this.stopAnimation = stopAnimation;
	this.onTick = onTick;
	this.locations = locations;
	this.setLocation = setLocation;
	this.stageReady = stageReady;
	this.getCurrentLocation = getCurrentLocation;
}