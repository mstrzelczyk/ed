/**
* Kontener zawierajacy kota
*/ 
function CatContainer()
{
	var abstract = new AbstractContainer();

	var cat = new CatCreature();

	function init()
	{
		abstract.content = new createjs.Container();
		

		cat.abstract.events.addEventListener('onPressEvent', onPressEvent);
		cat.abstract.events.addEventListener('catHair', onCatHair);
		cat.init();
		abstract.content.addChild(cat.abstract.content);

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

	function scare()
	{
		cat.scare();
	}

	function onCatHair(e)
	{
		abstract.events.dispatch('catHair', null, e.data);
	}
	
		
	this.init = init;
	this.abstract = abstract;
	this.scare = scare;
}