/**
* Kontener
*/ 
function CloudsContainer()
{
	var abstract = new AbstractContainer();
	var background, door = new DoorItem(), cloud = new CloudItem(), star = new StarItem(), snow = new SnowItem();

	function init()
	{
		abstract.name = 'clouds';
		setupSounds();
		abstract.content = new createjs.Container();
		
		var gfx = new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,255,255,0.01)).rect(0,0,Canvas.width/2+100,Canvas.height);
		background = new createjs.Shape(gfx);
		abstract.content.addChild(background);
		background.onPress = abstract.onPressBackground;
		
		door.abstract.events.addEventListener('onPressEvent', onPressEvent);
		door.abstract.arg = 'outside';
		door.init();
		door.abstract.content.x = Canvas.width/2 + 100;
		door.abstract.content.y = Canvas.height - 150;
		door.abstract.content.scaleX = door.abstract.content.scaleY = 20;
		abstract.content.addChild(door.abstract.content);

		snow.init();
		snow.abstract.content.x = Canvas.width/2 - 130;
		snow.abstract.content.y = 150;
		abstract.content.addChild(snow.abstract.content);

		cloud.init();
		cloud.abstract.content.x = Canvas.width/2 - 130;
		cloud.abstract.content.y = 50;
		abstract.content.addChild(cloud.abstract.content);

		star.init();
		star.abstract.content.x = 118;
		star.abstract.content.y = 110;
		abstract.content.addChild(star.abstract.content);
		
		abstract.init();
		abstract.events.dispatch('initComplete', this);
	}

 	function setupSounds(){
 		SoundManager.addLocation('clouds');
 	    SoundManager.addSoundToLocation('clouds', 'clouds');
 	}


	function onPressEvent(e)
	{
		var data = e.data;
		if(data.type == 'exit')
		{
			data.action = 'edLanding';
			data.stageX = door.abstract.content.x;
		}

		abstract.events.dispatch('onPressEvent',null,data);
	}
	

	function lightStar()
	{
		star.lightUp();
	}
	function sewCloud()
	{
		cloud.sewCloud();
		snow.startSnowing();
	}
	function stopSnowing()
	{
		snow.stopSnowing();
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
	this.stopSnowing = stopSnowing;

	this.cacheUpdate = cacheUpdate;

}