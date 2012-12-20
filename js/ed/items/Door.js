/**
* Item 
*/
function DoorItem()
{
	var abstract = new AbstractItem();

	function init()
	{
		abstract.content = new createjs.Shape(new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,0,0,0.01)).rect(0,0,100,100));
		abstract.type = 'exit';
		abstract.demo = false;
		abstract.action = 'changeContainer';
		abstract.init();
	}

	this.init = init;
	this.abstract = abstract;
}