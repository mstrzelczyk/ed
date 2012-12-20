/**
* Item 
*/
function ThunderboltItem()
{
	var abstract = new AbstractItem();

	function init()
	{		
		abstract.content = new createjs.Bitmap('media/img/thunderbolt.png');
		abstract.name = abstract.content.name = 'thunderbolt';
		abstract.demo = false;
		abstract.content.relationObjectName = 'star';
		abstract.content.regX = Utils.round(abstract.content.image.width / 2);
		abstract.content.regY = Utils.round(abstract.content.image.height / 2);

		abstract.type = 'item';
		abstract.action = 'addToBackpack';
		abstract.content.level = 3;
		abstract.afterAddToBackpack = function()
		{
			PromptManager.disactive('thunderbolt1');
			PromptManager.active('thunderbolt2');
			game.controller.brainCleanUp();
		}
		abstract.init();
	}

	this.init = init;
	this.abstract = abstract;
}