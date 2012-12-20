/**
* Item 
*/
function DoorLevelItem()
{
	var abstract = new AbstractDoorLevelItem();

	function init()
	{
		abstract.content = new createjs.Container();

		abstract.type = 'level';
		abstract.action = 'changeLevel';
		abstract.demo = false;

		abstract.content.addChild(abstract.contentUp);
		abstract.content.addChild(abstract.contentDown);
		abstract.init();
	}
	
	this.init = init;
	this.abstract = abstract;
}