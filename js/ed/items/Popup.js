/**
* Item 
*/
function PopupItem()
{
	var abstract = new AbstractItem();
	var isVisible = false;
	var text = null;
	var texts = [];
	var position =  0, arrowLeft, arrowRight;

	function init()
	{		
		abstract.type = 'item';
		abstract.action = 'PromptView';
		abstract.demo = false;
		
		//popup
		abstract.content = new createjs.Container();
		abstract.content.alpha = 0;	
		abstract.content.visible = false;

		//dodanie przezroczystego ksztalu
		var gfx = new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,255,255,0.01)).rect(0,0,Canvas.width,Canvas.height);
		background = new createjs.Shape(gfx);
		background.onPress = this.off;
		abstract.content.addChild(background);

		popupBG = new createjs.Bitmap('media/img/popup.png');		
		popupBG.x = Canvas.width /2 - 285;
		popupBG.y = Canvas.height /2 - 80;
		abstract.content.addChild(popupBG);

		//text
		text = new createjs.Text('', 'Bold 19px '+ fontName, '#080808');
		text.text = "";
		text.textAlign = 'center';
		text.x = popupBG.x + 285;
		text.y = popupBG.y + 30;
		text.lineWidth = 520;
		abstract.content.addChild(text);
		
		//dodanie przezroczystego ksztalu
		var gfx = new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,255,255,0.01)).rect(0,0,Canvas.width,Canvas.height);
		background = new createjs.Shape(gfx);
		background.onPress = off;
		abstract.content.addChild(background);

		//dodanie strzalki lewo
		arrowLeft = new createjs.Bitmap('media/img/arrowL.png');		
		arrowLeft.x = popupBG.x - 94;
		arrowLeft.y = popupBG.y + 65;
		arrowLeft.onPress = prev;
		arrowLeft.onMouseOut = onMouseOut;
		arrowLeft.onMouseOver = onMouseOver;
		abstract.content.addChild(arrowLeft);
		
		//dodanie strzalki prawo
		arrowRight = new createjs.Bitmap('media/img/arrowR.png');		
		arrowRight.x = popupBG.x + 581;
		arrowRight.y = popupBG.y + 60;
		arrowRight.onPress = next;
		arrowRight.onMouseOut = onMouseOut;
		arrowRight.onMouseOver = onMouseOver;
		abstract.content.addChild(arrowRight);

		//dodanie lapki nad ixem
		var btn = new createjs.Shape(new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,255,255,0.02)).rect(popupBG.x + 520,popupBG.y+10,25,28));
		btn.onMouseOut = onMouseOut;
		btn.onMouseOver = onMouseOver;
		btn.onPress = off;
		abstract.content.addChild(btn); 

		abstract.init(true, false);
		abstract.content.onPress = null;
	}

	/**
	* przelaczenie widokow
	*/
	function switchView(){		
		isVisible ? this.off() : this.on();
	}

	function onMouseOut(e){
		$('body').css('cursor','default');
	}

	function onMouseOver(e){
		$('body').css('cursor','pointer');
	}

	/**
	* wlaczenie popapu
	*/
	function on(){
		texts = PromptManager.getActualPrompts();

		arrowRight.visible = arrowLeft.visible = texts.length != 1;

		position = 0;
		abstract.events.dispatch('disactivePrompt',null, {});

		this.setTextFromPromptManager();
		AnimationsCollection.play('popup');
        abstract.content.visible = true;
        isVisible = true;

        var tween = createjs.Tween.get(abstract.content, {loop:false})
            .to({alpha: 1}, 250, createjs.Ease.linear)
            .call(function(){                
                AnimationsCollection.stop('popup');
            })
        ;
		
		game.update = true;

	}

	/**
	* wylaczenie popapu
	*/
	function off(){
		isVisible = false;
		abstract.content.alpha = 0;	
		abstract.content.visible = false;
		game.update = true;
		abstract.events.dispatch('popupOff');
	}

	/**
	* zmienia text
	*/
	function setText(newText)
	{
		text.text = newText;
	}

	/**
	* Ustawia text z prompt managera
	*/
	function setTextFromPromptManager(){	
		text.text = texts[position];
		text.y = popupBG.y + 115 - Utils.round(text.getMeasuredHeight()/2);
		game.update = true;
	}

	/**
	*
	*/
	function next(){
		position++;
		if(position > texts.length-1)
			position = 0;
		
		setTextFromPromptManager();
	}

	/**
	*
	*/
	function prev(){
		position--;
		if(position < 0)
			position = texts.length - 1;				

		setTextFromPromptManager();
	}

	this.init = init;
	this.abstract = abstract;
	this.on = on;
	this.off = off;
	this.setText = setText;
	this.switchView = switchView;
	this.setTextFromPromptManager = setTextFromPromptManager;
}