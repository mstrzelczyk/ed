/**
* Item 
*/
function SnowItem()
{
	var abstract = new AbstractItem(), snowing = false, vY = 10, limit = 50;

	function init()
	{
		abstract.content = new createjs.Container();
		abstract.content.onTick = onTick;


		abstract.init();
		abstract.content.onPress = null;
	}

	function startSnowing()
	{
		abstract.content.visible = true;
		for(var i=0;i<limit;i++)
		{
			addFlake(i);
		}
		snowing = true;
	}

	function stopSnowing()
	{
		snowing = false;
		for(var i=0;i<limit;i++)
		{
			abstract.content.removeChild(abstract.content.getChildAt(i));
		}
		abstract.content.visible = false;
	}

	function addFlake(index, visible)
	{
		var snowflake = new createjs.Bitmap("media/img/snowflake.png");
		snowflake.x = Math.random()*300 + 45;
		snowflake.y = Math.random()*50;
		visible == true ? snowflake.alpha = 1 : snowflake.alpha = 0;
		snowflake.rotation = Math.random()*300;
		snowflake.speed = vY*(Math.random()*1+0.5);
		snowflake.index = index;
		
		abstract.content.addChildAt(snowflake, index);
		snowflake.cache(0,0,14,14);
	}

	function onTick()
	{
		if(snowing)
		{
			for(var i=0;i<limit;i++)
			{
				var snowflake = abstract.content.getChildAt(i);
				snowflake.y += snowflake.speed;
				snowflake.updateCache();
				if(snowflake.y > Canvas.height)
				{
					var index = snowflake.index;
					abstract.content.removeChild(snowflake);
					addFlake(index, true);
				}
			}
		}
	}

	this.init = init;
	this.abstract = abstract;
	this.startSnowing = startSnowing;
	this.stopSnowing = stopSnowing;
}