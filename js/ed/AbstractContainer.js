function AbstractContainer()
{
	this.name = null;
	this.type = 'container';
	this.content = null;
	this.parent = null;
	var events = new Event();
	this.ready = false;

	

	/**
     * inicjacja. ustawia widocznosc na false.
     */
	function init()
	{
		this.content.alpha = 0;
		this.content.visible = false;
		this.content.onTick = this.onTick;

		
	}
	
	/**
     * Pojawianie sie contenera
     */
	function fadeIn()
	{
		//console.log('AbstractContainer.fadeIn',this.name);
		if(this.content.alpha < 1)
		{
			this.content.visible = true;
			game.tweening = true;
			var tween = createjs.Tween.get(this.content)
				.call(function(){  })
				.to({alpha:1},200,createjs.Ease.linear)
				.call(function(){
					//console.log('AbstractContainer.fadeIn.complete');
					events.dispatch('fadeInComplete');
				});
		} else {
			events.dispatch('fadeInComplete');
		}
	}

	/**
     * Chowanie sie kontenera
     */
	function fadeOut()
	{
		
		if(this.content.alpha > 0)
		{
			game.tweening = true;
			var tween = createjs.Tween.get(this.content)
				.to({alpha:0, visible:false},200,createjs.Ease.linear)
				.call(function(){
					events.dispatch('fadeOutComplete');
				});
		} else {
			events.dispatch('fadeOutComplete');
		}
	}

	/**
     * Event klikniecia w tlo (chodzenie)
     */
	function onPressBackground(e)
	{
		events.dispatch('onPressEvent',null,{
			stageX:e.stageX, 
			target:e.target, 
			type:'background',
			demo:false
		});
	}

	/**
     * Ticker contenera
     */
	function onTick()
	{
		
	}

	this.fadeIn = fadeIn;
	this.fadeOut = fadeOut;
	this.init = init;
	this.events = events;
	this.onPressBackground = onPressBackground;

}