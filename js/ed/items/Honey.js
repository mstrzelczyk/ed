/**
* Item 
*/
function HoneyItem()
{
	var abstract = new AbstractItem();

	function init()
	{		
		abstract.content = new createjs.Bitmap('media/img/honey.png');
		abstract.content.regX = Utils.round(abstract.content.image.width / 2);
		abstract.content.regY = Utils.round(abstract.content.image.height / 2);
		abstract.name = abstract.content.name = 'honeyPre';
		abstract.type = 'item';
		abstract.demo = false;
		abstract.action = 'addToBackpack';
		
		abstract.afterAddToBackpack = function()
		{
			abstract.name = abstract.content.name = 'honey';
			abstract.content.relationObjectName = 'catHair';
			PromptManager.disactive('honey1');
			PromptManager.active('honey2');
		}

		abstract.init();
	}

	this.init = init;
	this.abstract = abstract;
}