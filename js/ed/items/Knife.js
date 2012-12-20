/**
* Item 
*/
function KnifeItem()
{
	var abstract = new AbstractItem();

	function init()
	{		
		abstract.content = new createjs.Bitmap('media/img/knife.png');
		abstract.content.regX = Utils.round(abstract.content.image.width / 2);
		abstract.content.regY = Utils.round(abstract.content.image.height / 2);
		abstract.name = abstract.content.name = 'knifePre';
		abstract.type = 'item';
		abstract.demo = false;
		abstract.action = 'addToBackpack';
		
		abstract.afterAddToBackpack = function()
		{
			abstract.name = abstract.content.name = 'knife';
			abstract.content.relationObjectName = 'cake';
			PromptManager.disactive('demo2');
			PromptManager.active('demo3');
			game.controller.guiManager.gui.popup.on();
		}

		abstract.init();
	}

	this.init = init;
	this.abstract = abstract;
}