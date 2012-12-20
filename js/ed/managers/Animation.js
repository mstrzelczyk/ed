/**
* Manager contenerow i pseudo controller
*/ 
function AnimationManager()
{
	var abstract = new AbstractContainersManager(), ed = new EdContainer(), tube = new TubeItem(), catHair = new CatHairItem(), cat = new CatContainer(), reindeer = new ReindeerContainer(), santa = new SantaClausContainer(), clock = new ClockContainer(), fairy = new FairyContainer(), frontLayer = new FrontLayerContainer();
	var faded = 0, toFade = 0, tonextData, tubeIsVisible = false, catHairIsVisible = false, doFinishOnce = false;
	

	/**
	* Inicjalizacja kontenerow
	*/ 
	function init()
	{
		abstract.content = new createjs.Container();	
		abstract.content.name = 'animations';

		ed.abstract.parent = this;
		ed.abstract.events.addEventListener('initComplete',onContainerInit);
		ed.abstract.events.addEventListener('onPressEvent', abstract.onPressEvent);
		ed.abstract.events.addEventListener('edMoveComplete', edMoveComplete)
		ed.abstract.events.addEventListener('edAnimationEvent', edAnimationEvent)
		ed.init();

		reindeer.abstract.parent = this;
		reindeer.abstract.events.addEventListener('initComplete',onContainerInit);
		reindeer.abstract.events.addEventListener('onPressEvent', abstract.onPressEvent);
		reindeer.abstract.events.addEventListener('reindeerMoo', reindeerMoo);
		reindeer.init();

		santa.abstract.parent = this;
		santa.abstract.events.addEventListener('initComplete',onContainerInit);
		santa.abstract.events.addEventListener('onPressEvent', abstract.onPressEvent);
		santa.abstract.events.addEventListener('gameEnd', onGameEnd);
		santa.init();

		clock.abstract.parent = this;
		clock.abstract.events.addEventListener('initComplete',onContainerInit);
		clock.abstract.events.addEventListener('onPressEvent', abstract.onPressEvent);
		clock.init();

		fairy.abstract.parent = this;
		fairy.abstract.events.addEventListener('initComplete',onContainerInit);
		fairy.abstract.events.addEventListener('onPressEvent', abstract.onPressEvent);
		fairy.init();

		cat.abstract.parent = this;
		cat.abstract.events.addEventListener('initComplete',onContainerInit);
		cat.abstract.events.addEventListener('onPressEvent', abstract.onPressEvent);
		cat.abstract.events.addEventListener('catHair', onCatHair);
		cat.init();


		frontLayer.abstract.parent = this;
		frontLayer.abstract.events.addEventListener('initComplete', onContainerInit);
		frontLayer.init();
	}
	
	/**
	* nasłuchuje, czy wszystkie kontenery zostały zainicjalizowane
	*/ 
	function onContainerInit(e)
	{
		// dodanie contenera do kolekcji kontenerow
		abstract.containers.add(e.target);
		
		// Gdy wszyskie kontenery zostaly zainicjowane daje znac do Game ze jest gotowy.

		if(abstract.containers.length() == 7)
		{
			abstract.content.addChild(reindeer.abstract.content);
			abstract.content.addChild(santa.abstract.content);
			abstract.content.addChild(clock.abstract.content);
			abstract.content.addChild(fairy.abstract.content);
			abstract.content.addChild(cat.abstract.content);

			tube.abstract.parent = this;
			tube.init();
			tube.abstract.content.rotation = -90;
			tube.abstract.content.x = 724;
			tube.abstract.content.y = 402;
			tube.abstract.content.visible = false;
			tube.abstract.content.onPress = onTubePress;
			abstract.content.addChild(tube.abstract.content);


			catHair.abstract.parent = this;
			catHair.abstract.events.addEventListener('onPressEvent', onCatHairPress)
			catHair.init();
			catHair.abstract.content.x = 207;
			catHair.abstract.content.y = 482;
			catHair.abstract.content.visible = false;
			abstract.content.addChild(catHair.abstract.content);

			abstract.content.addChild(ed.abstract.content);
			abstract.content.addChild(frontLayer.abstract.content);

			abstract.init();
			abstract.events.dispatch('managerInitComplete');
		}
	}
	function stageReady()
	{
		ed.stageReady();
	}

	function onPressEvent(e)
	{
		
	}

	function onGameEnd(e)
	{
		abstract.events.dispatch('gameEnd');
	}

	function catchPressEvent(e)
	{
		ed.catchOnPressEvent(e);
	}

	function edMoveComplete(e)
	{
		abstract.events.dispatch('edMoveComplete', null, e.data)
	}

	function edGoOut(e)
	{
		ed.goOut(e);
	}

	function edAnimationEvent(e)
	{
		if(e.data.action =='onPullEnd')
			reindeer.pull();
	}

	function reindeerPull()
	{
		ed.reindeerPull();
	}
	function reindeerMoo(e)
	{
		ed.edFly(e.data);
	}


	function hideContainers(data)
	{
		faded = 0;
		nextData = data;
		for(i=0;i<abstract.containers.length();i++)
		{
			abstract.containers.getByIndex(i).container.abstract.events.addEventListener('fadeOutComplete', onFadeOutCompleteContainers);
			abstract.containers.getByIndex(i).container.abstract.fadeOut();
		}

		var tweenTube = createjs.Tween.get(tube.abstract.content)
			.to({alpha:0},200,createjs.Ease.linear)
		var tweenCatHair = createjs.Tween.get(catHair.abstract.content)
			.to({alpha:0},200,createjs.Ease.linear)
		
	}

	function onFadeOutCompleteContainers(e)
	{
		faded +=1;
		if(faded == abstract.containers.length())
			abstract.onFadeOut();
	}

	function showContainers()
	{
		//console.log('AnimationManager.showContainers')

		faded = 0;
		toFade = 3;
		if(nextData.next == 'outside')
		{
			reindeer.abstract.events.addEventListener('fadeInComplete', onFadeInCompleteContainers);
			reindeer.reindeerCacheUpdate();
			reindeer.abstract.fadeIn();
		} else if(nextData.next == 'inside'){
			toFade = 6;
			santa.abstract.events.addEventListener('fadeInComplete', onFadeInCompleteContainers);
			santa.abstract.fadeIn();
			clock.abstract.events.addEventListener('fadeInComplete', onFadeInCompleteContainers);
			clock.abstract.fadeIn();
			fairy.abstract.events.addEventListener('fadeInComplete', onFadeInCompleteContainers);
			fairy.abstract.fadeIn();
			cat.abstract.events.addEventListener('fadeInComplete', onFadeInCompleteContainers);
			cat.abstract.fadeIn();

			if(tubeIsVisible)
			{
				tube.abstract.content.visible = true;
			}
			if(catHairIsVisible)
			{
				catHair.abstract.content.visible = true;
			}

			var tweenTube = createjs.Tween.get(tube.abstract.content)
				.to({alpha:1},200,createjs.Ease.linear)
			var tweenCatHair = createjs.Tween.get(catHair.abstract.content)
				.to({alpha:1},200,createjs.Ease.linear)

		} else {
			toFade = 2;
		}

		ed.setLocation(nextData);
		ed.abstract.events.addEventListener('fadeInComplete', onFadeInCompleteContainers);
		ed.abstract.fadeIn();

		frontLayer.setLocation(nextData.next);
		frontLayer.abstract.events.addEventListener('fadeInComplete', onFadeInCompleteContainers);
		frontLayer.abstract.fadeIn();
	}
	function onFadeInCompleteContainers(e)
	{
		faded +=1;
		//console.log('AnimationManager.onFadeInCompleteContainers',toFade,faded);
		if(faded == toFade)
		{
			//console.log('AnimationManager.onFadeIn')
			abstract.onFadeIn();
		}
	}
    
    function edLanding(e)
    {
    	ed.edLanding(e);
    }

    function changeLevel(e)
    {
    	ed.changeLevel(e);
    }

    function showTube()
    {
    	tubeIsVisible = true;
    	tube.abstract.content.visible = true;
    	tube.abstract.content.alpha = 1;
    }
    function jumpToTube(e)
   	{
   		ed.jumpToTube(e);
   	}
	function jumpFromTube(e)
   	{
   		ed.jumpFromTube(e);
   	}

    function onTubePress(e)
    {
    	var data = {
			action:'changeContainer',
			content:this.content,
			type:'jump', 
			next:'brain',
			stageX: tube.abstract.content.x - 104,
			target: e.target,
			demo:false
		};
		abstract.events.dispatch('onPressEvent',null, data);
    }
   	
   	function scareCat()
   	{
   		cat.scare();
   	}
   	
   	function onCatHairPress(e)
   	{
		abstract.events.dispatch('onPressEvent',null, e.data);
   	}
   	function onCatHair(e)
	{
		catHairIsVisible = true;
		catHair.abstract.content.visible = true;
	}

	function clockEat(object)
	{
		clock.addCake(object);
	} 

	function showBeard()
	{
		santa.showBeard();
	}

	function hideFairy()
	{
		abstract.content.removeChild(fairy.abstract.content);
	}

	function showMagicHorseshoe()
	{
		reindeer.showHorseshoe();
	}

	function doFinish()
	{
		if(!doFinishOnce)
		{
			doFinishOnce = true;
			clock.abstract.events.addEventListener('clockShoutComplete', onClockShoutComplete);
			clock.shout();
		}
	}

	function onClockShoutComplete()
	{
		tube.abstract.content.visible = false;
		//setTimeout(ed.moonWalk(), 2000);
		santa.wakeUp();
	}

	
		
	this.init = init;
	this.abstract = abstract;
	this.onContainerInit = onContainerInit;

	this.hideContainers = hideContainers;
	this.showContainers = showContainers;
	this.catchPressEvent = catchPressEvent;
	this.reindeerPull = reindeerPull;
	this.edLanding = edLanding;
	this.edGoOut = edGoOut;
	this.jumpToTube = jumpToTube;
	this.jumpFromTube = jumpFromTube;
	this.stageReady = stageReady;
	this.changeLevel = changeLevel;
	
	this.showTube = showTube;
	this.scareCat = scareCat;
	this.clockEat = clockEat;
	this.showBeard = showBeard;
	this.hideFairy = hideFairy;
	this.showMagicHorseshoe = showMagicHorseshoe;
	this.doFinish = doFinish;
	
	

}