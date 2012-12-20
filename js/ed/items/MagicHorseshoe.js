/**
* Item 
*/
function MagicHorseshoeItem()
{
	var abstract = new AbstractItem();

	function init()
	{		
		abstract.content = new createjs.Bitmap('media/img/magicHorseshoe.png');
		
		abstract.name = abstract.content.name = 'magicHorseshoePre';
		abstract.content.regX = Utils.round(abstract.content.image.width / 2);
		abstract.content.regY = Utils.round(abstract.content.image.height / 2);
		abstract.type = 'item';
		abstract.demo = false;
		abstract.action = 'addToBackpack';

		abstract.afterAddToBackpack = function()
		{
			abstract.name = abstract.content.name = 'magicHorseshoe';
			abstract.content.relationObjectName = 'reindeer';
		}

		abstract.init();
	}

	this.init = init;
	this.abstract = abstract;
}