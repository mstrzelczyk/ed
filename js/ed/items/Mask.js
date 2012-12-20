/**
* Item 
*/
function MaskItem()
{
	var abstract = new AbstractItem();

	function init()
	{		
		abstract.content = new createjs.Bitmap('media/img/mask.png');
		abstract.content.regX = Utils.round(abstract.content.image.width / 2);
		abstract.content.regY = Utils.round(abstract.content.image.height / 2);
		abstract.name = abstract.content.name = 'mask';
		abstract.content.relationObjectName = 'cat';
		abstract.type = 'item';
		abstract.demo = false;
		abstract.action = 'addToBackpack';
		abstract.content.level = 3;
		abstract.afterAddToBackpack = function()
		{
			PromptManager.disactive('mask1');
			PromptManager.active('mask2');
			game.controller.brainCleanUp();
		}
		abstract.init();
	}

	this.init = init;
	this.abstract = abstract;
}