/**
* Item 
*/
function CakeItem()
{
	var abstract = new AbstractItem();

	function init()
	{		
		abstract.content = new createjs.Bitmap('media/img/cake.png');
		abstract.name = abstract.content.name = 'cakePre';
		abstract.content.relationObjectName = 'knife';
		abstract.content.mouseEnabled = true;
		abstract.content.regX = Utils.round(abstract.content.image.width / 2);
		abstract.content.regY = Utils.round(abstract.content.image.height / 2);
		
		abstract.type = 'item';
		abstract.demo = true;
		abstract.action = 'addToBackpack';
		
		abstract.afterAddToBackpack = function()
		{
			abstract.name = abstract.content.name = 'cake';
			PromptManager.disactive('demo1');
			PromptManager.active('demo2');
			game.controller.guiManager.gui.popup.on();
			game.controller.demoPart2();
		}
		abstract.init();
	}

	this.init = init;
	this.abstract = abstract;
}