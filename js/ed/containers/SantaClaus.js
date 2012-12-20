/**
* Kontener zawierajacy Mikolaja
*/ 
function SantaClausContainer()
{
	var abstract = new AbstractContainer();

	var santa = new SantaClausCreature();

	function init()
	{
		abstract.content = new createjs.Container();
		abstract.name = abstract.content.name = 'santa';
		santa.abstract.events.addEventListener('onPressEvent', onPressEvent);
		santa.abstract.events.addEventListener('gameEnd', onGameEnd);
		santa.init();
		abstract.content.addChild(santa.abstract.content);

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
	function onGameEnd(e)
	{
		abstract.events.dispatch('gameEnd');
	}

	function showBeard()
	{
		santa.showBeard();
	}

	function wakeUp()
	{
		santa.wakeUp();
	}
		
	this.init = init;
	this.abstract = abstract;
	this.showBeard = showBeard;
	this.wakeUp = wakeUp;
}