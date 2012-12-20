/**
 * Glowne funkcje gry - inicjalizacja, UI... 
 */
function Game()
{
	var stage;
	var content, resizeTimeout, preloader;
	var controller = new Controller(); 
	var x = 0, y = 0;
	
	var update = false, tweening = false, animating = false;
	var navigation;
	
	/**
	* Inicjacja Game.
	*/
	function init()
	{	
		// Inicjalizacja Managerów					
		BackgroundManager.init();		
		
		// Opoznienie resize (zmniejszenie ilosci wywolan przy resize okna przegladarki)
		$(window).resize(function(e){
			resizeDelayed(e);
		});
	        
		// Inicjacja canvasa.  
		Canvas.create(game.onCreateCanvas);			
	}

    /**
	* Callback po utworzeniu canvasa
	*/ 
	function onCreateCanvas()
	{
		stage = stageGlobal = new createjs.Stage(Canvas.html);
		createjs.Touch.enable(stage, true);
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = false;
		stage.snapToPixelsEnabled = true;		
		stage.autoClear = true;			

		resize();

		// Inicjacja contenerów lokacji	
		controller.events.addEventListener('controllerInitComplete', onControllerInitComplete);
		controller.events.addEventListener('gameEnd', onGameFinish);
		controller.init();
	}
	
	/**
	* Callback po zainicjowaniu kontenerow
	*/ 
	function onControllerInitComplete(e)
	{	
		// dodanie contenerow do sceny
		stage.addChild(controller.gameplay);
		stage.addChild(controller.animation);
		stage.addChild(controller.gui);
		stage.update();
		//
		this.onGameInit();
	}

	/**
	* Opozniony resize
	*/ 
	function resizeDelayed(e)
	{
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(resize, 500);
	}
	
    /**
	* Skalowanie canvasa
	*/ 
 	function resize()
	{
        Canvas.scale();
	}

	function onGameFinish()
	{
		this.onGameEnd();
	}
	
	/**
	* Glowny tick gry.
	*/ 
	function tick()
	{
		// Check czy trzeba zrobic update stage czy nie.
		check = (this.animating || this.tweening || this.update);
		if(check)
		{
			stage.update();
			//$('.debug').html('FPS: '+Math.round(createjs.Ticker.getMeasuredFPS()));
			this.update = false;
		}
	}
        
	this.init = init;
	this.onCreateCanvas = onCreateCanvas;
	this.controller = controller;

	this.update = update;
	this.tweening = tweening;
	this.animating = animating;
	this.tick = tick;
	
	this.stage = stage;
}