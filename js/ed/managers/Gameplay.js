/**
* Manager contenerow i pseudo controller
*/ 
function GameplayManager()
{
	var abstract = new AbstractContainersManager();

	var inside = new InsideContainer();
	var outside = new OutsideContainer();
	var clouds = new CloudsContainer();
	var brain = new BrainContainer();

	var firstContainer, action = null;

	/**
	* Inicjalizacja kontenerow
	*/ 
	function init()
	{
		abstract.content = new createjs.Container();
		abstract.content.name = 'gameplay';
		
		// Widok wnetrza chaty
		inside.abstract.parent = this;
		inside.abstract.events.addEventListener('initComplete',onContainerInit);
		inside.abstract.events.addEventListener('onPressEvent', abstract.onPressEvent);
		inside.init();
		
		// Widok przed chata
		outside.abstract.parent = this;
		outside.abstract.events.addEventListener('initComplete',onContainerInit);
		outside.abstract.events.addEventListener('onPressEvent', abstract.onPressEvent);
		outside.abstract.events.addEventListener('reindeerMoo', onReindeerMoo);
		outside.init();

		// Widok w chmurach
		clouds.abstract.parent = this;
		clouds.abstract.events.addEventListener('initComplete',onContainerInit);
		clouds.abstract.events.addEventListener('onPressEvent', abstract.onPressEvent);
		clouds.init();

		// Widok w glowie
		brain.abstract.parent = this;
		brain.abstract.events.addEventListener('initComplete',onContainerInit);
		brain.abstract.events.addEventListener('onPressEvent', abstract.onPressEvent);
		brain.init();

	}
	
	/**
	* nasłuchuje, czy wszystkie kontenery zostały zainicjalizowane
	*/ 
	function onContainerInit(e)
	{
		// dodanie contenera do kolekcji kontenerow
		abstract.containers.add(e.target);
		
		// Gdy wszyskie kontenery zostaly zainicjowane daje znac do Game ze jest gotowy.
		if(abstract.containers.length() == 4)
		{
			firstContainer = inside;

			abstract.content.addChild(inside.abstract.content);
			abstract.content.addChild(outside.abstract.content);
			abstract.content.addChild(clouds.abstract.content);
			abstract.content.addChild(brain.abstract.content);

			abstract.init();
			abstract.events.dispatch('managerInitComplete');
		}
	}

	function onPressEvent(e)
	{
		
	}

	/**
	* Zmienia aktualny kontener na podany.
	*/ 
	function changeContainer(data)
	{
		// sprawdza czy nastepny contener jest w danym managerze i czy nie zostala juz wywolana zmiana
		if(abstract.containers.getByName(data.next) != undefined && !abstract.getIsChanging())
		{
			abstract.isChanging = true;
			abstract.toShow = abstract.containers.getByName(data.next);
			
			// sprawdza czy aktualny kontener jest zdefiniowany, 
			// jezeli tak wygasza aktualny i na callback pokazuje nowy, 
			// jezeli nie od razu pokazuje nowy
			if(abstract.current !== undefined)
			{
				abstract.current.abstract.events.addEventListener('fadeOutComplete', abstract.onFadeOut);
				abstract.current.abstract.fadeOut();
			} else {
				abstract.onFadeOut();				
			}
		}
	}

    /**
	* Pokazuje nowy kontener 
	*/ 
	function showNextContainer()
	{
		//console.log('GameplayManager.showNextContainer')
		abstract.toShow.abstract.events.addEventListener('fadeInComplete', onFadeIn);
		abstract.toShow.cacheUpdate();
		abstract.toShow.abstract.fadeIn();
	}

	function onFadeIn()
	{
		//console.log('GameplayManager.onFadeIn')
		abstract.isChanging = false;
		abstract.onFadeIn();
	}

	/**
	* Listener ryczacego renifera
	*/ 
	function onReindeerMoo(e)
	{
		//ed.fly(e.data);
	}

	/**
	* Renifer pociagniety za ogon
	*/ 
	function reindeerPull()
	{
		//ed.pull();
	}

	function getCurrent()
	{
		return abstract.getCurrent();
	}

	function getCurrentObject()
	{
		return abstract.getCurrentObject();
	}
	
	function stopGramophone()
	{
		inside.stopGramophone();
	}

	function lightStar()
	{
		clouds.lightStar();
		outside.lightStar();
	}
	function sewCloud()
	{
		clouds.sewCloud();
		outside.sewCloud();
	}
	function stopSnowing()
	{
		clouds.stopSnowing();
	}

	function demoPart2()
	{
		inside.demoPart2();
	}

	

	this.init = init;
	this.abstract = abstract;
	this.onContainerInit = onContainerInit;

	this.changeContainer = changeContainer;
	this.showNextContainer = showNextContainer;
	this.getCurrent = getCurrent;
	this.getCurrentObject = getCurrentObject;
	this.stopGramophone = stopGramophone;
	this.lightStar = lightStar;
	this.sewCloud = sewCloud;
	this.stopSnowing = stopSnowing;
	this.demoPart2 = demoPart2;


}