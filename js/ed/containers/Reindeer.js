/**
* Kontener zawierajacy Renifera
*/ 
function ReindeerContainer()
{
	var abstract = new AbstractContainer();

	var reindeer = new ReindeerCreature(), reindeerThis;


	function init()
	{
		abstract.name = 'reindeer';
		abstract.content = new createjs.Container();
			
		reindeerThis = this;

		reindeer.abstract.events.addEventListener('initComplete', onCreatureComplete)
		reindeer.abstract.events.addEventListener('onPressEvent', onPressEvent);
		reindeer.abstract.events.addEventListener('reindeerMoo', onReindeerMoo);
		reindeer.abstract.events.addEventListener('reindeerMoveEd', onReindeerMoveEd);
		reindeer.init();


	}

	/**
	* Przechwytuje klikniecie z ContainersManagera
	*/ 

	function onCreatureComplete(e)
	{
		abstract.content.addChild(reindeer.abstract.content);
		abstract.init();
		abstract.events.dispatch('initComplete', reindeerThis);
	}

	function onPressEvent(e)
	{
		abstract.events.dispatch('onPressEvent',null,e.data);
	}
	
	function onReindeerMoo(e)
	{
		abstract.events.dispatch('reindeerMoo', null, e.data);
	}

	function onReindeerMoveEd(e)
	{
		var data = {
			stageX:420,
			type:'background',
			demo:false
		}
		abstract.events.dispatch('onPressEvent',null,data);
	}

	function pull()
	{
		reindeer.pull();
	}

	function showHorseshoe()
	{
		reindeer.showHorseshoe();
	}
	function reindeerCacheUpdate()
	{
		reindeer.reindeerCacheUpdate();
	}
	
	this.init = init;
	this.abstract = abstract;
	this.pull = pull;
	this.showHorseshoe = showHorseshoe;
	this.reindeerCacheUpdate = reindeerCacheUpdate;
}