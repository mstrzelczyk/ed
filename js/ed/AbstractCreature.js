/**
* Abstrakcyjny obiekt Creature
*/ 
function AbstractCreature()
{
	this.name = null;
	this.type = 'creature';
	this.animation = null;
	this.sprite = null;
	this.parent = null;
	this.content = null;
	this.events = new Event(); 
	
	function init()
	{
		
	}
	
	
	this.init = init;

}