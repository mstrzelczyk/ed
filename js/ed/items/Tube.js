/**
* Item 
*/
function TubeItem()
{
	var abstract = new AbstractItem();

	function init()
	{		
		abstract.content = new createjs.Bitmap('media/img/tube.png');
		abstract.name = abstract.content.name = 'tube';
		abstract.demo = false;
		abstract.content.relationObjectName = 'santaClaus';
		abstract.content.mouseEnabled = true;
		abstract.content.regX = abstract.content.image.width / 2;
		abstract.content.regY = abstract.content.image.height / 2;
		abstract.type = 'item';
		abstract.action = 'addToBackpack';
		abstract.afterAddToBackpack = function()
		{
			PromptManager.disactive('tube1');
			PromptManager.active('tube2');
		}
		abstract.init(false,true);
	}

	this.init = init;
	this.abstract = abstract;
}