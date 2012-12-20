/**
* Item 
*/
function BottleFairyItem()
{
	var abstract = new AbstractItem();

	function init()
	{		
		abstract.content = new createjs.Bitmap('media/img/bottleFairy.png');
		
		abstract.name = abstract.content.name = 'bottleFairy';
		abstract.content.relationObjectName = 'horseshoe';
		abstract.content.regX = Utils.round(abstract.content.image.width / 2);
		abstract.content.regY = Utils.round(abstract.content.image.height / 2);
		abstract.type = 'item';
		abstract.demo = false;
		abstract.action = 'addToBackpack';
		abstract.init();
	}

	this.init = init;
	this.abstract = abstract;
}