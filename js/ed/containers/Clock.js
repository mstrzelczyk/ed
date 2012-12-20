/**
* Kontener zawierajacy Zegar
*/ 
function ClockContainer()
{
	var abstract = new AbstractContainer();

	var clock = new ClockItem();

	function init()
	{
		abstract.name = 'clock';
		abstract.content = new createjs.Container();
		
		clock.abstract.events.addEventListener('onPressEvent', onPressEvent);
		clock.abstract.events.addEventListener('clockShoutComplete', onClockShoutComplete);
		clock.init();
		abstract.content.addChild(clock.abstract.content);
		abstract.content.x = 593;
		abstract.content.y = 238;

		abstract.init();
		abstract.events.dispatch('initComplete', this);
	}

	/**
	* Przechwytuje klikniecie z ContainersManagera
	*/ 
	function onPressEvent(e)
	{
		abstract.events.dispatch('onPressEvent',null,e.data);
	}

	function onClockShoutComplete(e)
	{
		abstract.events.dispatch('clockShoutComplete',null,e.data);
	}

	function addCake(object)
	{
		clock.addCake(object);
	}

	function shout()
	{
		clock.shout();
	}
		
	this.init = init;
	this.abstract = abstract;
	this.addCake = addCake;
	this.shout = shout;
}