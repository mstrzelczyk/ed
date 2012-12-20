/**
* Manager contenerow i pseudo controller
*/ 
function Controller()
{
	var events = new Event();
	var gameplayManager = new GameplayManager();
	var animationManager = new AnimationManager();
	var guiManager = new GUIManager();

	var gameplay = new createjs.Container();
	var animation = new createjs.Container();
	var gui = new createjs.Container();
	var dataNext, snow = false, finished = false, demo = true, firstTime = true, brainVisited = false, outsideVisited = false, cloudsVisited = false, finishing = false, brainClean = 0;

	/**
	* Inicjalizacja kontenerow
	*/ 
	function init()
	{
		setupPrompts();

		gameplayManager.abstract.events.addEventListener('managerInitComplete', onManagerInit);
		gameplayManager.abstract.events.addEventListener('fadeOutComplete', onFadeOutComplete);
		gameplayManager.abstract.events.addEventListener('fadeInComplete', onFadeInComplete);
		gameplayManager.abstract.events.addEventListener('onPressEvent', onPressEvent);
		gameplayManager.init();

		animationManager.abstract.events.addEventListener('managerInitComplete', onManagerInit);
		animationManager.abstract.events.addEventListener('fadeOutComplete', onFadeOutComplete);
		animationManager.abstract.events.addEventListener('fadeInComplete', onFadeInComplete);
		animationManager.abstract.events.addEventListener('edMoveComplete', onEdMoveComplete);
		animationManager.abstract.events.addEventListener('onPressEvent', onPressEvent);
		animationManager.abstract.events.addEventListener('gameEnd', onGameEnd);
		animationManager.init();
		
		guiManager.abstract.events.addEventListener('managerInitComplete', onManagerInit);
		guiManager.abstract.events.addEventListener('fadeOutComplete', onFadeOutComplete);
		guiManager.abstract.events.addEventListener('fadeInComplete', onFadeInComplete);
		guiManager.init();
	}

	/**
	* Ustawia podpowedzi dla scen
	*/
	function setupPrompts(){		
        PromptManager.add({ locationName: "inside", name: "demo1", status: true, text: TranslatorManager.get("demo1") });
        PromptManager.add({ locationName: "inside", name: "demo2", status: false, text: TranslatorManager.get("demo2") });
        PromptManager.add({ locationName: "inside", name: "demo3", status: false, text: TranslatorManager.get("demo3") });
        PromptManager.add({ locationName: "inside", name: "demo4", status: false, text: TranslatorManager.get("demo4") });
        PromptManager.add({ locationName: "inside", name: "demo5", status: false, text: TranslatorManager.get("demo5") });

        PromptManager.add({ locationName: "brain", name: "brain", status: false, text: TranslatorManager.get("tipBrain") });
        PromptManager.add({ locationName: "outside", name: "outside1", status: false, text: TranslatorManager.get("tipOutside1") });
        PromptManager.add({ locationName: "outside", name: "outside2", status: false, text: TranslatorManager.get("tipOutside2") });
        PromptManager.add({ locationName: "outside", name: "outside3", status: false, text: TranslatorManager.get("tipOutside3") });
        PromptManager.add({ locationName: "inside", name: "inside", status: false, text: TranslatorManager.get("tipInside") });

        PromptManager.add({ locationName: "inside", name: "tube1", status: false, text: TranslatorManager.get("tube1") });
        PromptManager.add({ locationName: "inside", name: "tube2", status: false, text: TranslatorManager.get("tube2") });
 		PromptManager.add({ locationName: "inside", name: "honey1", status: false, text: TranslatorManager.get("honey1") });
        PromptManager.add({ locationName: "inside", name: "honey2", status: false, text: TranslatorManager.get("honey2") });
		PromptManager.add({ locationName: "outside", name: "horseshoe1", status: false, text: TranslatorManager.get("horseshoe1") });
        PromptManager.add({ locationName: "inside", name: "horseshoe2", status: false, text: TranslatorManager.get("horseshoe2") });
        PromptManager.add({ locationName: "brain", name: "bottle1", status: false, text: TranslatorManager.get("bottle1") });
        PromptManager.add({ locationName: "inside", name: "bottle2", status: false, text: TranslatorManager.get("bottle2") });
        PromptManager.add({ locationName: "inside", name: "fairy1", status: false, text: TranslatorManager.get("fairy1") });
        PromptManager.add({ locationName: "inside", name: "fairy2", status: false, text: TranslatorManager.get("fairy2") });
        PromptManager.add({ locationName: "outside", name: "magicHorseshoe", status: false, text: TranslatorManager.get("magicHorseshoe") });
        PromptManager.add({ locationName: "inside", name: "angelHair1", status: false, text: TranslatorManager.get("angelHair1") });
        PromptManager.add({ locationName: "clouds", name: "angelHair2", status: false, text: TranslatorManager.get("angelHair2") });
        PromptManager.add({ locationName: "brain", name: "mask1", status: false, text: TranslatorManager.get("mask1") });
        PromptManager.add({ locationName: "inside", name: "mask2", status: false, text: TranslatorManager.get("mask2") });
        PromptManager.add({ locationName: "inside", name: "catHair1", status: false, text: TranslatorManager.get("catHair1") });
        PromptManager.add({ locationName: "inside", name: "catHair2", status: false, text: TranslatorManager.get("catHair2") });
        PromptManager.add({ locationName: "inside", name: "beard", status: false, text: TranslatorManager.get("beard") });
        PromptManager.add({ locationName: "brain", name: "thunderbolt1", status: false, text: TranslatorManager.get("thunderbolt1") });
        PromptManager.add({ locationName: "clouds", name: "thunderbolt2", status: false, text: TranslatorManager.get("thunderbolt2") });
        PromptManager.add({ locationName: "inside", name: "lastTip", status: false, text: TranslatorManager.get("lastTip") });
        
        PromptManager.active('demo1'); 
 	}
	
	/**
	* nasłuchuje, czy wszystkie managery zostały zainicjalizowane
	*/ 
	function onManagerInit(e)
	{
		// Gdy wszyskie kontenery zostaly zainicjowane daje znac do Game ze jest gotowy.
		//console.log('Controller.onManagerInit:',gameplayManager.abstract.ready,animationManager.abstract.ready,guiManager.abstract.ready);
		if(gameplayManager.abstract.ready && animationManager.abstract.ready && guiManager.abstract.ready)
		{
			gameplay.addChild(gameplayManager.abstract.content);
			animation.addChild(animationManager.abstract.content);
			gui.addChild(guiManager.abstract.content);

			events.dispatch('controllerInitComplete');
		}
	}

	/**
	* Zmienia aktualny kontener na podany.
	*/ 
	function changeContainer(data)
	{
		//console.log('Controller.changeContainer');
		//Zmiana dzwieku
		SoundManager.playOffAll();
		SoundManager.actualLocation = data.next;
		SoundManager.playOnAll();
		
		dataNext = data;
		if(dataNext.next != gameplayManager.getCurrent() && dataNext.type != 'landed' && dataNext.type != 'jump' && dataNext.type != 'landing')
		{
			////console.log('Controller.changeContainer 1');
			//
			AnimationsCollection.play('controller');
			// przekazuje wywolanie zmiany kontenera do managerow
			if(gameplayManager.getCurrent() != 'undefined'){
				firstTime = false;
				BackgroundManager.hide();
			} else {
				firstTime = true;
			}
			gameplayManager.changeContainer(dataNext);
			animationManager.hideContainers(dataNext);
			guiManager.hideGUI(dataNext);
		}
		else if(dataNext.type == 'jump')
		{
			animationManager.jumpToTube(dataNext);
		}
		else if(dataNext.type == 'landing')
		{
			animationManager.jumpFromTube(dataNext);
		}
	}
	function onFadeOutComplete(e)
	{
		////console.log('Controller.onFadeOutComplete',gameplayManager.abstract.state(),animationManager.abstract.state(),guiManager.abstract.state());
		if(gameplayManager.abstract.state() == 'fadeOut' && animationManager.abstract.state() == 'fadeOut' && guiManager.abstract.state() == 'fadeOut')
		{
			//console.log('Controller.onFadeOutComplete 1');

			gameplayManager.showNextContainer();
			animationManager.showContainers();
			guiManager.showGUI();
			gameplayManager.stopSnowing();
			BackgroundManager.show(dataNext.next);

			if(!SoundManager.isSoundOn && firstTime){
				SoundManager.switchSound();
				guiManager.gui.soundSwitch.change();
			}
			SoundManager.playOnAll(dataNext.next);	

			if(dataNext.next == 'brain' && brainVisited == false)
			{
				brainVisited = true;
				PromptManager.active('brain');
				PromptManager.active('mask1');
				PromptManager.active('thunderbolt1');
				PromptManager.active('bottle1');
				
			}
			if(dataNext.next == 'inside' && brainClean >= 3)
			{
				PromptManager.disactive('brain');
			}
			if(dataNext.next == 'outside' && outsideVisited == false)
			{
				outsideVisited = true;
				PromptManager.active('outside1');
				PromptManager.active('horseshoe1');
      			PromptManager.active('outside2');
        		PromptManager.active('outside3');
			}
			if(dataNext.next == 'clouds' && cloudsVisited == false)
			{
				cloudsVisited = true;
				PromptManager.disactive('outside1');
			}
		}
	}
	function onFadeInComplete(e)
	{
		//console.log('Controller.onFadeInComplete',gameplayManager.abstract.state(),animationManager.abstract.state(),guiManager.abstract.state());
		if(gameplayManager.abstract.state() == 'fadeIn' && animationManager.abstract.state() == 'fadeIn' && guiManager.abstract.state() == 'fadeIn')
		{
			//console.log('Controller.onFadeInComplete');
			//
			AnimationsCollection.stop('controller');
			animationManager.stageReady();

			if(gameplayManager.getCurrent() == 'inside' && finished == true)
			{
				doFinish();
			}
			//
			if(firstTime)
			{
				guiManager.gui.popup.on();
			}
		}
	}

	function changeLevel(data)
	{
		animationManager.changeLevel(data);
	}

	/**
	* Listener klikniecia (odbiera event z kontenerow)
	*/ 
	function onPressEvent(e)
	{
		if((demo == e.data.demo && !finishing) || e.data.type == 'background') 
		{
			animationManager.catchPressEvent(e);
			guiManager.hideBackpack();
		}
	}

	function onEdMoveComplete(e)
	{
		game.controller[e.data.action](e.data);
	}

	function goOut(data)
	{
		animationManager.edGoOut(data);
	}
	function addToBackpack(data, omitSound)
	{
		if(!omitSound && data.target != null) if(data.target.name == 'tube') gameplayManager.stopGramophone();
		guiManager.addToBackpack(data);
	}
	function addToBackpackOther(data, omitSound)
	{
		if(!omitSound && data.target != null) if(data.target.name == 'tube') gameplayManager.stopGramophone();
		guiManager.addToBackpackOther(data);
	}
	function brainCleanUp()
	{
		brainClean+=1;
	}
	function reindeerPull()
	{
		animationManager.reindeerPull();
	}

	function edLanding(data)
	{
		animationManager.edLanding(data);
	}

	function demoEnd()
	{
		demo = false;
	}
	function demoPart2()
	{
		gameplayManager.demoPart2();
	}

	/**
	* Polaczenie dwoch obiektow
	*/
	function backpackItemsMerge(object){
		MergeManager[object.name](object);
		//object.name -> nazwa obiektu
		//object.relationObjectName -> nazwa objektu z ktorym nastapilo polaczenie
	}
	function backpackRemoveByName(name)
	{
		guiManager.backpackRemoveByName(name);
	}
	function backpackGetByName(name)
	{
		return guiManager.backpackGetByName(name);
	}

	function hideBackpack()
	{
		guiManager.hideBackpack();
	}

	function gameFinish()
	{
		_gaq.push(['_trackEvent', 'game', 'end', 'Ukonczenie gry']);
		finished = true;
		if(gameplayManager.getCurrent() == 'inside')
		{
			doFinish();
		}
	}
	function doFinish()
	{
		animationManager.doFinish();
		finishing = true;
	}
	function onGameEnd(e)
	{
		SoundManager.isSoundOn = false;
		SoundManager.mute();
		events.dispatch('gameEnd');
	}

	this.init = init;
	this.events = events;
	this.snow = snow;

	this.gameplayManager = gameplayManager;
	this.animationManager = animationManager;
	this.guiManager = guiManager;

	this.gameplay = gameplay;
	this.animation = animation;
	this.gui = gui;

	this.changeContainer = changeContainer;
	this.addToBackpack = addToBackpack;
	this.addToBackpackOther = addToBackpackOther;
	this.reindeerPull = reindeerPull;
	this.edLanding = edLanding;
	this.goOut = goOut;
	this.changeLevel = changeLevel;
	this.backpackItemsMerge = backpackItemsMerge;
	this.backpackRemoveByName = backpackRemoveByName;
	this.backpackGetByName = backpackGetByName;
	this.hideBackpack = hideBackpack;
	this.gameFinish = gameFinish;
	this.demoEnd = demoEnd;
	this.demoPart2 = demoPart2;
	this.brainCleanUp = brainCleanUp;

}