/**
* Item 
*/
function BeardItem()
{
	var abstract = new AbstractItem();

	function init()
	{		
		abstract.content = new createjs.Bitmap('media/img/beard.png');
		abstract.name = abstract.content.name = 'beard';
		abstract.demo = false;
		abstract.content.relationObjectName = 'santaClaus';

		abstract.content.regX = Utils.round(abstract.content.image.width / 2);
		abstract.content.regY = Utils.round(abstract.content.image.height / 2);

		abstract.type = 'item';
		//abstract.action = 'addToBackpack';
		abstract.init();
	}

	this.init = init;
	this.abstract = abstract;
}