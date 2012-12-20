/**
* Item 
*/
function BottleItem()
{
	var abstract = new AbstractItem();

	function init()
	{		
		abstract.content = new createjs.Bitmap('media/img/bottle.png');
		
		abstract.name = abstract.content.name = 'bottle';
		abstract.demo = false;
		abstract.content.relationObjectName = 'fairy';
		abstract.content.regX = Utils.round(abstract.content.image.width / 2);
		abstract.content.regY = Utils.round(abstract.content.image.height / 2);
		abstract.type = 'item';
		abstract.action = 'addToBackpack';
		abstract.content.level = 2;
		abstract.afterAddToBackpack = function()
		{
			PromptManager.disactive('bottle1');
			PromptManager.active('bottle2');
			game.controller.brainCleanUp();	
		}
		abstract.init();
	}

	this.init = init;
	this.abstract = abstract;
}