/**
* Item 
*/
function CakePiecesItem()
{
	var abstract = new AbstractItem();

	function init()
	{		
		abstract.content = new createjs.Bitmap('media/img/cakePieces.png');
		abstract.content.regX = Utils.round(abstract.content.image.width / 2);
		abstract.content.regY = Utils.round(abstract.content.image.height / 2);
		abstract.name = abstract.content.name = 'cakePieces';
		abstract.content.relationObjectName = 'clock';
		abstract.type = 'item';
		abstract.demo = true;
		abstract.action = 'addToBackpack';
		
		abstract.init();
	}

	this.init = init;
	this.abstract = abstract;
}