/**
* Item 
*/
function AngelHairItem()
{
	var abstract = new AbstractItem();

	function init()
	{		
		abstract.content = new createjs.Container();
		abstract.content.mouseEnabled = true;
		abstract.type = 'item';
		abstract.demo = false;
		abstract.action = 'addToBackpackOther';

		var hair1 = new createjs.Bitmap('media/img/angelHair.png');
		hair1.x = 445;
		hair1.y = 338;
		abstract.content.addChild(hair1);

		var hair1hit = new createjs.Shape(new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,255,0,0.01)).rect(0,0,94,31));
		hair1hit.x = 445;
		hair1hit.y = 338;
		abstract.content.addChild(hair1hit);

		var hair2 = new createjs.Bitmap('media/img/angelHair.png');
		hair2.x = 520;
		hair2.y = 450;
		hair2.rotation = -95;
		hair2.scaleX = hair2.scaleY = 0.8;
		abstract.content.addChild(hair2);

		var hair2hit = new createjs.Shape(new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,255,0,0.01)).rect(0,0,94,31));
		hair2hit.x = 520;
		hair2hit.y = 450;
		hair2hit.rotation = -95;
		hair2hit.scaleX = hair2hit.scaleY = 0.8;
		abstract.content.addChild(hair2hit);

		var hair3 = new createjs.Bitmap('media/img/angelHair.png');
		hair3.x = 550;
		hair3.y = 300;
		hair3.rotation = -75;
		hair3.scaleX = hair3.scaleY = 0.8;
		abstract.content.addChild(hair3);

		var hair3hit = new createjs.Shape(new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,255,0,0.01)).rect(0,0,94,31));
		hair3hit.x = 550;
		hair3hit.y = 300;
		hair3hit.rotation = -75;
		hair3hit.scaleX = hair3hit.scaleY = 0.8;
		abstract.content.addChild(hair3hit);

		abstract.otherContent = new createjs.Bitmap('media/img/angelHair2.png');
		abstract.name = abstract.otherContent.name = 'angelHair';
		abstract.otherContent.relationObjectName = 'cloud';
		abstract.otherContent.regX = Utils.round(abstract.otherContent.image.width / 2);
		abstract.otherContent.regY = Utils.round(abstract.otherContent.image.height / 2);

		abstract.afterAddToBackpack = function()
		{
			PromptManager.disactive('angelHair1');
			PromptManager.active('angelHair2');
		}

		abstract.init();
	}

	this.init = init;
	this.abstract = abstract;
}