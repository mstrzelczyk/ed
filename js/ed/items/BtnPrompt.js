/**
* Item 
*/
function BtnPromptItem()
{	
	var abstract = new AbstractItem();
	var ico;
	var tween;
	
	/**
	 * Inicjuje obiekt
	*/
	function init()
	{		
		bitmap = new createjs.Bitmap('media/img/btnSmallRound.png');
		abstract.content = new createjs.Container();
		
		abstract.content.width = bitmap.image.width;
		abstract.content.height = bitmap.image.height;
		abstract.content.regX = abstract.content.width / 2;
		abstract.content.regY = abstract.content.height / 2;
		abstract.content.x = 10 + abstract.content.regX;
		abstract.content.y = Canvas.height - 10 - abstract.content.regY;

		abstract.type = 'item';
		abstract.demo = false;
		abstract.action = 'promptInfo';		
		abstract.content.addChild(bitmap);
		
		ico = new createjs.Bitmap('media/img/promptsIco.png');
		ico.regX = Utils.round(ico.image.width/2);
		ico.regY = Utils.round(ico.image.height/2);
		ico.x = Utils.round(bitmap.image.width/2) +2;
		ico.y = Utils.round(bitmap.image.height/2) -4;
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
		var t = createjs.Tween.get(abstract.content, {loop:false})
			.to({scaleX: 0.8, scaleY: 0.8}, 150, createjs.Ease.linear)
			.wait(20)
			.to({scaleX: 1, scaleY: 1}, 150, createjs.Ease.linear)
			.call(function(){
				AnimationsCollection.stop('promptBtn');
			})
		;
	}

	/**
	* Animacja przycisku po nacisnieciu
	*/
	function activeAnimateStart()
	{
		/*AnimationsCollection.play('promptBtnActive');
		tween = createjs.Tween.get(abstract.content, {loop:true})
			.to({scaleX: 1.2, scaleY: 1.2}, 300, createjs.Ease.linear)
			.wait(20)
			.to({scaleX: 1, scaleY: 1}, 300, createjs.Ease.linear)
			.call(function(){
				AnimationsCollection.stop('promptBtnActive');
			})
		;*/
	}

	/**
	* Zakonczenie animacji nowej wiadomosci
	*/
	function activeAnimateStop()
	{
		AnimationsCollection.play('promptBtnActive');
		if(undefined != tween)
			tween.pause(tween);
		abstract.content.scaleX = 1.0;
		abstract.content.scaleY = 1.0;
	}

	this.init = init;
	this.animate = animate;
	this.activeAnimateStart = activeAnimateStart;
	this.activeAnimateStop = activeAnimateStop;
	this.abstract = abstract;
}