/**
* Item 
*/
function BtnBackpackItem()
{	
	var abstract = new AbstractItem();
	var ico;
	/**
	 * Inicjuje obiekt
	*/
	function init()
	{		
		bitmap = new createjs.Bitmap('media/img/btnSmallRound.png');
		abstract.content = new createjs.Container();
		
		abstract.content.width = bitmap.image.width;
		abstract.content.height = bitmap.image.height;
		abstract.content.regX = bitmap.image.width / 2;
		abstract.content.regY = bitmap.image.height / 2;	

		abstract.content.x = 10 + abstract.content.regX;
		abstract.content.y = 10 + abstract.content.regY;

		abstract.type = 'item';
		abstract.demo = false;
		abstract.action = 'promptInfo';		

		bitmap = new createjs.Bitmap('media/img/btnSmallRound.png');
		abstract.content.addChild(bitmap);
		bitmap.onPress = abstract.onPress;
		
		ico = new createjs.Bitmap('media/img/toolbarIco.png');
		ico.regX = Utils.round(ico.image.width/2);
		ico.regY = Utils.round(ico.image.height/2);
		ico.x = Utils.round(bitmap.image.width/2)+2;
		ico.y = Utils.round(bitmap.image.height/2)-4;
		abstract.content.addChild(ico);
		abstract.content.snapToPixel = true;
		
		abstract.init();
	}

	/**
	* Animacja przycisku po nacisnieciu
	*/
	function animate()
	{
		AnimationsCollection.play('promptBtn');
		var tween = createjs.Tween.get(abstract.content, {loop:false})
			.to({scaleX: 0.8, scaleY: 0.8}, 150, createjs.Ease.bounceOut)
			.wait(20)
			.to({scaleX: 1, scaleY: 1}, 150, createjs.Ease.bounceOut)
			.call(function(){
				AnimationsCollection.stop('promptBtn');
			})
		;
	}

	this.init = init;
	this.animate = animate;
	this.abstract = abstract;
}