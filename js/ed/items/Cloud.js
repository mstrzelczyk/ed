/**
* Item 
*/
function CloudItem()
{
	var abstract = new AbstractItem(), bitmap, thread;

	function init()
	{	
		abstract.content = new createjs.Container();
		
		bitmap = new createjs.Bitmap('media/img/cloud.png');
		abstract.name != null ? bitmap.name = abstract.name : bitmap.name = 'cloud';
		
		abstract.type = 'object';
		abstract.demo = false;
		abstract.action = 'sewCloud';		

		abstract.content.addChild(bitmap);

		thread = new createjs.Bitmap('media/img/cloudThread.png');
		thread.x = 145;
		thread.y = 30;
		

		abstract.content.snapToPixel = true;
		
		abstract.content.cache(0,0,bitmap.image.width,bitmap.image.height);
		abstract.init(true);
		//
	}

	function sewCloud()
	{
		abstract.content.addChild(thread);
		abstract.content.updateCache();
	}

	function cacheUpdate()
	{
		abstract.content.updateCache();
	}

	

	this.init = init;
	this.abstract = abstract;
	this.sewCloud = sewCloud;
	this.cacheUpdate = cacheUpdate;
}