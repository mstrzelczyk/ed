/**
* Item 
*/
function HorseshoeItem()
{
	var abstract = new AbstractItem();

	function init()
	{		
		abstract.content = new createjs.Bitmap('media/img/horseshoe.png');
		
		abstract.name = abstract.content.name = 'horseshoePre';
		abstract.content.regX = Utils.round(abstract.content.image.width / 2);
		abstract.content.regY = Utils.round(abstract.content.image.height / 2);
		abstract.type = 'item';
		abstract.demo = false;
		abstract.action = 'addToBackpack';

		abstract.afterAddToBackpack = function()
		{
			abstract.name = abstract.content.name = 'horseshoe';
			abstract.content.relationObjectName = 'bottleFairy';

			PromptManager.disactive('horseshoe1');
			PromptManager.active('horseshoe2');
		}

		abstract.init();
	}

	this.init = init;
	this.abstract = abstract;
}