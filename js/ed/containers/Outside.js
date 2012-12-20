/**
* Kontener
*/ 
function OutsideContainer()
{
	var abstract = new AbstractContainer();
	var ground, background, door = new DoorItem(), cloud = new CloudItem(), star = new StarItem(), nail, horseshoe = new HorseshoeItem();

	function init()
	{
		abstract.name = 'outside';
		setupSounds();
		abstract.content = new createjs.Container();
		
		var gfx = new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,255,255,0.01)).rect(0,0,Canvas.width,Canvas.height);
		background = new createjs.Shape(gfx);
		abstract.content.addChild(background);
		background.onPress = abstract.onPressBackground;
		
		door.abstract.events.addEventListener('onPressEvent', onPressEvent);
		door.abstract.arg = 'inside';
		door.init();
		door.abstract.content.x = Canvas.width/2 + 170;
		door.abstract.content.y = Canvas.height - 190;
		door.abstract.content.scaleX = 0.5;
		abstract.content.addChild(door.abstract.content);

		
		cloud.abstract.name = 'cloudSmall';
		cloud.init();
		cloud.abstract.content.x = Canvas.width/2 - 160;
		cloud.abstract.content.y = 25;
		cloud.abstract.content.scaleX = 0.45;
		cloud.abstract.content.scaleY = 0.45;
		abstract.content.addChild(cloud.abstract.content);

		
		star.abstract.name = 'starSmall';
		star.init();
		star.abstract.content.x = Canvas.width/2 - 280;
		star.abstract.content.y = 33;
		star.abstract.content.scaleX = 0.5;
		star.abstract.content.scaleY = 0.5;
		abstract.content.addChild(star.abstract.content);

		
		horseshoe.abstract.events.addEventListener('onPressEvent', onPressEvent);
		horseshoe.init();
		horseshoe.abstract.content.x = Canvas.width/2 + 195;
		horseshoe.abstract.content.y = Canvas.height/2 + 110;
		abstract.content.addChild(horseshoe.abstract.content);

		nail = new createjs.Bitmap('media/img/nail.png');
		nail.x = Canvas.width/2 + 185;
		nail.y = Canvas.height/2 + 95;
		abstract.content.addChild(nail);
		
		abstract.init();

		abstract.events.dispatch('initComplete', this);
	}

 	function setupSounds(){
 		SoundManager.addLocation('outside');
 	    SoundManager.addSoundToLocation('outside', 'outside');
 	}

	function onPressEvent(e)
	{
		abstract.events.dispatch('onPressEvent',null,e.data);
	}
	
	function onReindeerMoo(e)
	{
		abstract.events.dispatch('reindeerMoo',null,e.data);
	}

	function lightStar()
	{
		star.lightUpStill();
	}
	function sewCloud()
	{
		cloud.sewCloud();
	}
	
	function cacheUpdate()
	{
		star.cacheUpdate();
		cloud.cacheUpdate();
	}

	this.init = init;
	this.abstract = abstract;
	this.lightStar = lightStar;
	this.sewCloud = sewCloud;
	this.cacheUpdate = cacheUpdate;
}