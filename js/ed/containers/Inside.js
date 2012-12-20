/**
* Kontener
*/ 
function InsideContainer()
{
	var abstract = new AbstractContainer();

	var  background, tableLeg, barrel, door = new DoorItem(), door2 = new DoorItem(), knife = new KnifeItem(), angelHair = new AngelHairItem(), gramophone = new GramophoneItem(), tube = new TubeItem(), cake = new CakeItem(), honey = new HoneyItem();

	function init()
	{
		abstract.name = 'inside';
		setupSounds();

		abstract.content = new createjs.Container();
		
		var gfx = new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,255,255,0.01)).rect(0,0,Canvas.width,Canvas.height);
		background = new createjs.Shape(gfx);
		abstract.content.addChild(background);
		background.onPress = abstract.onPressBackground;
		
		door.abstract.events.addEventListener('onPressEvent', onPressEvent);
		door.abstract.arg = 'outside';
		door.init();
		door.abstract.content.y = 250;
		door.abstract.content.scaleX = 0.5;
		door.abstract.content.scaleY = 2.5;
		abstract.content.addChild(door.abstract.content);

		angelHair.abstract.events.addEventListener('onPressEvent', onPressEvent);
		angelHair.init();
		abstract.content.addChild(angelHair.abstract.content);

		tube.abstract.events.addEventListener('onPressEvent', onPressEvent);
		tube.init();
		tube.abstract.content.x = 405;
		tube.abstract.content.y = 282;
		abstract.content.addChild(tube.abstract.content);

		gramophone.abstract.events.addEventListener('onPressEvent', onPressEvent);
		gramophone.init();	
		gramophone.abstract.content.x = 312;
		gramophone.abstract.content.y = 295;
		abstract.content.addChild(gramophone.abstract.content);		

		cake.abstract.events.addEventListener('onPressEvent', onPressEvent);
		cake.init();
		cake.abstract.content.x = 245;
		cake.abstract.content.y = 363;
		abstract.content.addChild(cake.abstract.content);		
		
		honey.abstract.events.addEventListener('onPressEvent', onPressEvent);
		honey.init();	
		honey.abstract.content.x = 366;
		honey.abstract.content.y = 440;
		abstract.content.addChild(honey.abstract.content);		

		tableLeg = new createjs.Bitmap('media/img/tableLeg.png');
		tableLeg.x = 360;
		tableLeg.y = 398;
		abstract.content.addChild(tableLeg);

		knife.abstract.events.addEventListener('onPressEvent', onPressEvent);
		knife.init();	
		knife.abstract.content.x = 245;
		knife.abstract.content.y = 270;
		abstract.content.addChild(knife.abstract.content);	

		var nail = new createjs.Bitmap('media/img/nail2.png');
		nail.x = 233;
		nail.y = 235;
		abstract.content.addChild(nail);

		abstract.init();
		abstract.events.dispatch('initComplete', this);
	}

	/**
	* Ustawia dzwiekow 
	*/
 	function setupSounds(){
 		SoundManager.addLocation('inside');
 	    SoundManager.addSoundToLocation('inside', 'snore');
 	    SoundManager.addSoundToLocation('inside', 'gramophone'); 
 	    SoundManager.actualLocation = "inside";    		 			
 	}

	function onPressEvent(e)
	{
		abstract.events.dispatch('onPressEvent',null,e.data);
	}

	function stopGramophone()
	{
		gramophone.stop();
	}

	function demoPart2()
	{
		knife.abstract.demo = true;
		knife.abstract.updateData();
	}

	function cacheUpdate()
	{
		
	}

	this.init = init;
	this.abstract = abstract;
	this.stopGramophone = stopGramophone;
	this.demoPart2 = demoPart2;
	this.cacheUpdate = cacheUpdate;
}