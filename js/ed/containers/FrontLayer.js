/**
* Kontener zawierajacy Renifera
*/ 
function FrontLayerContainer()
{
	var abstract = new AbstractContainer();
	var cloud, chaos, barrel, pipes, pipe, nerves, mud, sock;

	function init()
	{
		abstract.content = new createjs.Container();
		
		abstract.name = 'frontLayer';
		
		cloud = new createjs.Bitmap('media/img/smallCloud.png');
		cloud.visible = false;
		cloud.x = 120;
		cloud.y = Canvas.height - 200;
		abstract.content.addChild(cloud);

		chaos = new createjs.Bitmap('media/img/frontChaos.png');
		chaos.visible = false;
		chaos.x = 200;
		chaos.y = Canvas.height - 90;
		abstract.content.addChild(chaos);

		barrel = new createjs.Bitmap('media/img/barrel.png');
		barrel.x = Canvas.width - 80;
		barrel.y = Canvas.height - 150;
		abstract.content.addChild(barrel);

		pipes = new createjs.Bitmap('media/img/pipes.png');
		pipes.x = 323;
		pipes.y = 197;
		abstract.content.addChild(pipes);

		pipe = new createjs.Bitmap('media/img/pipe.png');
		pipe.x = 480;
		pipe.y = 335;
		abstract.content.addChild(pipe);

		nerves = new createjs.Bitmap('media/img/nerves.png');
		nerves.x = 312;
		nerves.y = 327;
		abstract.content.addChild(nerves);

		mud = new createjs.Bitmap('media/img/mud.png');
		mud.x = 260;
		mud.y = 267;
		abstract.content.addChild(mud);

		abstract.init();
		abstract.events.dispatch('initComplete', this);
	}

	function setLocation(location)
	{
		cloud.visible = (location == 'clouds');
		chaos.visible = barrel.visible = (location == 'inside');
		pipes.visible = nerves.visible = mud.visible = pipe.visible = (location == 'brain');
	}

	/**
	* Przechwytuje klikniecie z ContainersManagera
	*/ 
	function onPressEvent(e)
	{
		abstract.events.dispatch('onPressEvent',null,e.data);
	}
	
	this.init = init;
	this.abstract = abstract;
	this.setLocation = setLocation;
}