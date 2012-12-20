/**
* Manager contenerow i pseudo controller
*/ 
function AbstractContainersManager()
{
	var containers = new ContainersCollection();
	var events = new Event();
	this.content = null, this.parent = null;
	this.isChanging = false, this.toShow, this.current, this.ready = false;
	var state = 'none';

	/**
	* init
	*/ 
	function init()
	{
		this.content.onTick = onTick;
		this.ready = true;
	}

	/**
	* Dispatch po wygaszeniu kontenera
	*/ 
	function onFadeOut()
	{
		state = 'fadeOut';
		events.dispatch('fadeOutComplete');
		//console.log('AbstractContainersManager.onFadeOut',this.content.name);
	}

	/**
	* Callback po zmianie kontenerow
	*/ 
	function onFadeIn()
	{
		state = 'fadeIn';
		this.current = this.toShow;
		this.isChanging = false;
		events.dispatch('fadeInComplete');
		//console.log('AbstractContainersManager.onFadeIn',this.content.name);
	}

	/**
	* Listener klikniecia (odbiera event z kontenerow)
	*/ 
	function onPressEvent(e)
	{
		events.dispatch('onPressEvent', null, e.data);
	}

	/**
	* dodanie itemu do plecaka
	*/ 
	function addToBackpack(e)
	{
		game.backpack.add(e.content);		
	}

	/**
	* Callback gdy Ed dojdzie do wskazanego miejsca
	*/ 
	function onEdMoveComplete(e)
	{
		game.containersManager[e.data.action](e.data);	
	}
	
	
	/**
	* Callback gdy Ed skonczy sie animowac (dotyczy animacji typu pociagniecie, skok itp., nie dotyczy chodzenia)
	*/         
	function onEdAnimationEvent(e)
	{
		switch(e.data.action)
		{
			case 'onPullEnd':
				outside.pull();
		}
	}

	/**
	* Tick managera
	*/ 
	function onTick()
	{
		
	}


	function getState()
	{
		return state;
	}

	function getIsChanging()
	{
		return this.isChanging;
	}

	function getCurrent()
	{		
		return this.current != undefined ? this.current.abstract.name : 'undefined';
		
	}

	function getCurrentObject()
	{
		return this.current != undefined ? this.current : 'undefined';
	}

	this.init = init;
	this.events = events;
	this.containers = containers;

	this.onFadeIn = onFadeIn;
	this.onFadeOut = onFadeOut;
	this.state = getState;
	this.getIsChanging = getIsChanging;
	this.onPressEvent = onPressEvent;
	this.getCurrent = getCurrent;
	this.getCurrentObject = getCurrentObject;
}