/**
* Kontener zawierajacy Eda
*/ 
function EdContainer()
{
	var abstract = new AbstractContainer();

	var ed = new EdCreature(), layer, dataTmp;
	var changeLevelData, isChangingLevelA = false, isChangingLevelB = false, tween, canWalk = true, edThis;

	function init()
	{
		abstract.name = 'ed';
		abstract.content = new createjs.Container();

		edThis = this;
		
		ed.abstract.events.addEventListener('walkComplete', onEdMoveComplete);
		ed.abstract.events.addEventListener('flyComplete', onEdMoveComplete);
		ed.abstract.events.addEventListener('landingComplete', onEdMoveComplete);
		ed.abstract.events.addEventListener('fallingComplete', onEdMoveComplete);
		ed.abstract.events.addEventListener('moveComplete', onEdMoveComplete);
		ed.abstract.events.addEventListener('animationEvent',onEdAnimationEvent);
		ed.abstract.events.addEventListener('jumpStarted',onEdJumpStarted);
		ed.abstract.events.addEventListener('landingStarted',onEdLandingStarted);
		ed.abstract.events.addEventListener('initComplete',onCreatureComplete);
		ed.abstract.parent = this;
		ed.init();
	}

	function onCreatureComplete()
	{
		abstract.content.addChild(ed.abstract.content);
      	abstract.content.snapToPixel = true;
		abstract.init();
		abstract.events.dispatch('initComplete', edThis);
	}

	function stageReady()
	{
		ed.stageReady();
		ed.abstract.content.alpha = 1;
		if(dataTmp != null)
			if(dataTmp.type == 'goOut') 
				ed.jumpFromTube(dataTmp);
	}

	function setLocation(data)
	{
		abstract.content.removeChild(layer);
		ed.setLocation(ed.locations[data.next]);

		dataTmp = data;

		if(data.type == 'goOut' && data.next == 'inside')
		{
			ed.abstract.content.x = 745;
			ed.abstract.content.y = 415;
			ed.abstract.content.scaleX = ed.abstract.content.scaleY = 0.1;
		} 
	}

	function catchOnPressEvent(e)
	{
		if(!ed.isMoving())
			ed.walkTo(e.data);
	}

	/**
	* Callback gdy Ed dojdzie do wskazanego miejsca
	*/ 
	function onEdMoveComplete(e)
	{
		if(!isChangingLevelA && !isChangingLevelB)
		{
			if(e.data)
				if(e.data.type == 'goOut'){
					ed.abstract.content.alpha = 0;	
					abstract.content.removeChild(layer);
				} 
				if(e.data.type != 'background')
					abstract.events.dispatch('edMoveComplete', null, e.data);
		}
		else 
		{
			if( isChangingLevelA )
				changeLevelB();
			else if(isChangingLevelB)
				changeLevelFinish();
		}
	}

	/**
	* Callback gdy Ed skonczy sie animowac (nie dot. chodzenia)
	*/ 
	function onEdAnimationEvent(e)
	{
		abstract.events.dispatch('edAnimationEvent', null, e.data);
	}

	function onEdJumpStarted(e)
	{
		abstract.content.removeChild(layer);
		layer = new createjs.Bitmap('media/img/tubeDoor.png');
		layer.x = 703;
		layer.y = 409;
		abstract.content.addChild(layer);
		
		e.data.type = 'exit';

		tween = createjs.Tween.get(ed.abstract.content)
			.to({ 
				x:790,
				y:250,
				rotation:90,
				scaleX:0.8,
				scaleY:0.8
			}, 200,createjs.Ease.sineIn)
			.to({ 
				x:720,
				y:375,
				rotation:180
			}, 200,createjs.Ease.sineOut)
			.to({ 
				x:740,
				y:435,
				scaleX:0.2,
				scaleY:0.2,
				alpha:0
			}, 200,createjs.Ease.sineOut)
			.wait(500)
			.call(
				function(){
					abstract.content.removeChild(layer);
					ed.abstract.content.alpha = 0;
					abstract.events.dispatch('edMoveComplete', null, e.data);
				}
			);
	}
	function onEdLandingStarted(e)
	{
		abstract.content.removeChild(layer);
		layer = new createjs.Bitmap('media/img/tubeDoor.png');
		layer.x = 703;
		layer.y = 409;
		abstract.content.addChild(layer);


		tween = createjs.Tween.get(ed.abstract.content)
			.wait(500)
			.to({ 
				x:700,
				y:200,
				scaleX:0.8,
				scaleY:0.8
			}, 200,createjs.Ease.sineIn)
			.to({ 
				x:640,
				y:ed.locations['inside'].y,
				scaleX:ed.locations['inside'].scale,
				scaleY:ed.locations['inside'].scale
			}, 200,createjs.Ease.sineOut)
			.call(
				function(){
					ed.jumpFromTubeEnd();
					abstract.content.removeChild(layer);
				}
			);
	}


	function changeLevel(data)
	{
		if(data.levelUp == 0)
		{
			abstract.content.removeChild(layer);
			layer = new createjs.Bitmap('media/img/brainExit1.png');
			layer.x = 528;
			layer.y = 63;
			abstract.content.addChild(layer);
		} 
		else if(data.levelUp == 1)
		{
			abstract.content.removeChild(layer);
			layer = new createjs.Container();

			var layer1 = new createjs.Bitmap('media/img/brainExit3.png');
			layer1.x = 693;
			layer1.y = 134;
			layer.addChild(layer1);

			var layer2 = new createjs.Bitmap('media/img/brainExit4.png');
			layer2.x = 611;
			layer2.y = 263;
			layer.addChild(layer2);

			abstract.content.addChild(layer);
		}
		
		if(data.direction == 'down')
		{
			changeLevelData = {
				x1: data.enterX,
				y1: data.enterY,
				x2: data.postEnterX,
				y2: data.postEnterY,
				x3: data.exitX,
				y3: data.exitY,
				x4: data.postExitX,
				y4: data.postExitY,
				level: data.levelDown,
				target: data.target
			}
		} 
		else if(data.direction == 'up')
		{
			changeLevelData = {
				x1: data.postExitX,
				y1: data.postExitY,
				x2: data.exitX,
				y2: data.exitY,
				x3: data.postEnterX,
				y3: data.postEnterY,
				x4: data.enterX,
				y4: data.enterY,
				level: data.levelUp,
				target: data.target
			}
		}

		changeLevelA();
	}
	function changeLevelA()
	{
		isChangingLevelA = true;
		isChangingLevelB = false;

		ed.abstract.content.x = changeLevelData.x1;
		ed.abstract.content.y = changeLevelData.y1;

		var data = {
			stageX: changeLevelData.x2,
			stageY:changeLevelData.y2,
			target: changeLevelData.target
		}

		changeLevelData.y1 == changeLevelData.y2 ? ed.walkTo(data) : ed.flyTo(data);
		
	}
	function changeLevelB()
	{
		isChangingLevelA = false;
		isChangingLevelB = true;

		ed.abstract.content.x = changeLevelData.x3;
		ed.abstract.content.y = changeLevelData.y3;

		var data = {
			stageX: changeLevelData.x4,
			stageY:changeLevelData.y4,
			level:changeLevelData.level,
			target: changeLevelData.target
		}

		changeLevelData.y3 == changeLevelData.y4 ? ed.walkTo(data) : ed.flyTo(data);
	}
	function changeLevelFinish()
	{
		isChangingLevelA = false;
		isChangingLevelB = false;
		ed.setLevel(changeLevelData.level);
		abstract.content.removeChild(layer);
	}

	function goOut(data)
	{
		var action, type;
		if(data.next == 'inside')
		{
			action = 'changeContainer';
			type = 'goOut';
			abstract.content.removeChild(layer);
			layer = new createjs.Bitmap('media/img/brainExit0.png');
			layer.x = 239;
			layer.y = 57;
			abstract.content.addChild(layer);
		} 
				
		var outData = {
			action:action,
			next:data.next,
			target:data.target,
			stageX:260,
			type:type
		}
		ed.walkTo(outData);
	}

	/**
	* Przechwytuje klikniecie z ContainersManagera
	*/ 
	function onPressEvent(e)
	{
		abstract.events.dispatch('onPressEvent',null,e.data);
	}

	function reindeerPull()
	{
		ed.pull();
	}
	
	function edFly(e)
	{
		ed.fly(e);
	}

	function edLanding(e)
	{
		ed.landTo(e);
	}

	function jumpToTube(e)
	{
		ed.jumpToTube(e);
	}
	function jumpFromTube(e)
	{
		ed.jumpFromTube(e);
	}
	
	function moonWalk()
	{
		ed.moonWalk();
	}

	this.init = init;
	this.abstract = abstract;
	this.stageReady = stageReady;
	this.setLocation = setLocation;
	this.catchOnPressEvent = catchOnPressEvent;
	this.reindeerPull = reindeerPull;
	this.edFly = edFly;
	this.goOut = goOut;
	this.changeLevel = changeLevel;
	this.edLanding = edLanding;
	this.jumpToTube = jumpToTube;
	this.jumpFromTube = jumpFromTube;
	this.stageReady = stageReady;
	this.moonWalk = moonWalk;
}