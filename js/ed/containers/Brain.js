/**
* Kontener
*/ 
function BrainContainer()
{
	var abstract = new AbstractContainer();

	var  backgroundLevel1, backgroundLevel2, backgroundLevel3, backgroundLevel4, doorExit = new DoorItem(), door1 = new DoorLevelItem(), door2 = new DoorLevelItem(), door3 = new DoorLevelItem();
	var sock, mask = new MaskItem(), bottle = new BottleItem(), thunderbolt = new ThunderboltItem();

	function init()
	{
		abstract.name = 'brain';
		setupSounds();
		abstract.content = new createjs.Container();
		
		var gfx1 = new createjs.Graphics().beginFill(createjs.Graphics.getRGB(0,255,0,0.01)).rect(320,60,370,85);
		backgroundLevel1 = new createjs.Shape(gfx1);
		backgroundLevel1.level = '0';
		abstract.content.addChild(backgroundLevel1);
		backgroundLevel1.onPress = abstract.onPressBackground;

		var gfx2 = new createjs.Graphics().beginFill(createjs.Graphics.getRGB(0,255,0,0.01)).rect(220,153,500,85);
		backgroundLevel2 = new createjs.Shape(gfx2);
		backgroundLevel2.level = '1';
		abstract.content.addChild(backgroundLevel2);
		backgroundLevel2.onPress = abstract.onPressBackground;

		var gfx3 = new createjs.Graphics().beginFill(createjs.Graphics.getRGB(0,255,0,0.01)).rect(370,260,260,85);
		backgroundLevel3 = new createjs.Shape(gfx3);
		backgroundLevel3.level = '2';
		abstract.content.addChild(backgroundLevel3);
		backgroundLevel3.onPress = abstract.onPressBackground;

		var gfx4 = new createjs.Graphics().beginFill(createjs.Graphics.getRGB(0,255,0,0.01)).rect(320,370,330,100);
		backgroundLevel4 = new createjs.Shape(gfx4);
		backgroundLevel4.level = '3';
		abstract.content.addChild(backgroundLevel4);
		backgroundLevel4.onPress = abstract.onPressBackground;

		doorExit.abstract.events.addEventListener('onPressEvent', onDoorPressEvent);
		doorExit.abstract.arg = 'inside';
		doorExit.abstract.type ='landing'
		doorExit.init();
		doorExit.abstract.content.level = 0;
		doorExit.abstract.content.x = 290;
		doorExit.abstract.content.y = 50;
		doorExit.abstract.content.scaleX = 0.5;
		abstract.content.addChild(doorExit.abstract.content);

		door1.abstract.events.addEventListener('onPressEvent', onPressEvent);
		door1.abstract.contentUp = new createjs.Shape(new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,0,0,0.01)).rect(0,0,50,100));
		door1.abstract.contentUp.x = 630; 
		door1.abstract.contentUp.y = 50;
		door1.abstract.contentDown = new createjs.Shape(new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,0,0,0.01)).rect(0,0,30,80));
		door1.abstract.contentDown.x = 550;
		door1.abstract.contentDown.y = 155;
		door1.abstract.levelUp = door1.abstract.contentUp.level = 0;
		door1.abstract.levelDown = door1.abstract.contentDown.level = 1;
		door1.abstract.enterX = 680; 
		door1.abstract.enterY = 68;
		door1.abstract.postEnterX = 630; 
		door1.abstract.postEnterY = 68;
		door1.abstract.exitX = 565; 
		door1.abstract.exitY = 68;
		door1.abstract.postExitX = 565; 
		door1.abstract.postExitY = 160;
		door1.init();
		abstract.content.addChild(door1.abstract.content);

		door2.abstract.events.addEventListener('onPressEvent', onPressEvent);
		door2.abstract.contentUp = new createjs.Shape(new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,0,0,0.01)).rect(0,0,50,100));
		door2.abstract.contentUp.x = 700; 
		door2.abstract.contentUp.y = 150;
		door2.abstract.contentDown = new createjs.Shape(new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,0,0,0.01)).rect(0,0,50,100));
		door2.abstract.contentDown.x = 625;
		door2.abstract.contentDown.y = 250;
		door2.abstract.levelUp = door2.abstract.contentUp.level = 1;
		door2.abstract.levelDown = door2.abstract.contentDown.level = 2;
		door2.abstract.enterX = 680; 
		door2.abstract.enterY = 158;
		door2.abstract.postEnterX = 750; 
		door2.abstract.postEnterY = 158;
		door2.abstract.exitX = 665; 
		door2.abstract.exitY = 270;
		door2.abstract.postExitX = 605; 
		door2.abstract.postExitY = 270;
		door2.init();
		abstract.content.addChild(door2.abstract.content);

		door3.abstract.events.addEventListener('onPressEvent', onPressEvent);
		door3.abstract.contentUp = new createjs.Shape(new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,0,0,0.01)).rect(0,0,60,30));
		door3.abstract.contentUp.x = 485; 
		door3.abstract.contentUp.y = 325;
		door3.abstract.contentDown = new createjs.Shape(new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,0,0,0.01)).rect(0,0,60,30));
		door3.abstract.contentDown.x = 485;
		door3.abstract.contentDown.y = 360;
		door3.abstract.levelUp = door3.abstract.contentUp.level = 2;
		door3.abstract.levelDown = door3.abstract.contentDown.level = 3;
		door3.abstract.enterX = 515; 
		door3.abstract.enterY = 270;
		door3.abstract.postEnterX = 515; 
		door3.abstract.postEnterY = 298;
		door3.abstract.exitX = 515; 
		door3.abstract.exitY = 300;
		door3.abstract.postExitX = 515; 
		door3.abstract.postExitY = 380;
		door3.init();
		abstract.content.addChild(door3.abstract.content);

		sock = new createjs.Bitmap('media/img/sock.png');
		sock.x = 495;
		sock.y = 145;
		abstract.content.addChild(sock);

		mask.abstract.events.addEventListener('onPressEvent', onPressEvent);
		mask.init();
		mask.abstract.content.x = 621;
		mask.abstract.content.y = 430;
		mask.abstract.content.scaleX = mask.abstract.content.scaleY = 0.6;
		abstract.content.addChild(mask.abstract.content);

		bottle.abstract.events.addEventListener('onPressEvent', onPressEvent);
		bottle.init();
		bottle.abstract.content.x = 366;
		bottle.abstract.content.y = 323;
		abstract.content.addChild(bottle.abstract.content);
		
		thunderbolt.abstract.events.addEventListener('onPressEvent', onPressEvent);
		thunderbolt.init();
		thunderbolt.abstract.content.x = 380;
		thunderbolt.abstract.content.y = 442;
		abstract.content.addChild(thunderbolt.abstract.content);
		
		abstract.init();
		abstract.events.dispatch('initComplete', this);
	}

 	function setupSounds(){
 		SoundManager.addLocation('brain');
 	    SoundManager.addSoundToLocation('brain', 'brain');
 	}
	
	function onDoorPressEvent(e)
	{
		var data = {
			stageX:e.data.target.x + e.data.target.scaleX*100,
			action:'goOut',
			content:e.data.content,
			type:e.data.type, 
			target:e.data.target,
			next:e.data.next,
			demo:false
		};
		abstract.events.dispatch('onPressEvent',null,data);
	}

	function onPressEvent(e)
	{
		abstract.events.dispatch('onPressEvent',null,e.data);
	}

	function cacheUpdate()
	{
		
	}
		
	this.init = init;
	this.abstract = abstract;
	this.cacheUpdate = cacheUpdate;
}