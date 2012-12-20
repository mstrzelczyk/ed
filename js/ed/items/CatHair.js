/**
* Item 
*/
function CatHairItem()
{
	var abstract = new AbstractItem();

	function init()
	{		
		abstract.content = new createjs.Bitmap('media/img/catHair.png');
		abstract.content.regX = Utils.round(abstract.content.image.width / 2);
		abstract.content.regY = Utils.round(abstract.content.image.height / 2);

		abstract.otherContent = new createjs.Bitmap('media/img/catHair2.png');
		abstract.name = abstract.otherContent.name = 'catHair';
		abstract.demo = false;
		abstract.otherContent.relationObjectName = 'honey';
		
		abstract.otherContent.regX = Utils.round(abstract.otherContent.image.width / 2);
		abstract.otherContent.regY = Utils.round(abstract.otherContent.image.height / 2);

		abstract.type = 'item';
		abstract.action = 'addToBackpackOther';
		abstract.afterAddToBackpack = function()
		{
			PromptManager.disactive('catHair1');
			PromptManager.active('catHair2');
		}
		abstract.init();
	}

	this.init = init;
	this.abstract = abstract;
}