/**
* Kontener zawierajacy Wrozke
*/ 
function FairyContainer()
{
	var abstract = new AbstractContainer();

	var fairy = new FairyCreature();

	function init()
	{
		abstract.name = 'fairy';
		abstract.content = new createjs.Container();
		
		fairy.abstract.events.addEventListener('onPressEvent', onPressEvent);
		fairy.init();
		abstract.content.addChild(fairy.abstract.content);

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
	
		
	this.init = init;
	this.abstract = abstract;
}