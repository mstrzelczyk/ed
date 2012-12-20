/**
* Item 
*/
function DemoGrid()
{
	var content = new createjs.Shape();
	function init()
	{		
		var W = Canvas.width;
		var H = Canvas.height;

		var c = W/50;
		var r = H/50;

		content.graphics.beginStroke(createjs.Graphics.getRGB(255,255,0,0.5)).setStrokeStyle(1);

		for(i=0;i<c;i++)
		{
			content.graphics.moveTo(i*50,0);
			content.graphics.lineTo(i*50,H);
		}
		for(j=0;j<r;j++)
		{
			content.graphics.moveTo(0,j*50);
			content.graphics.lineTo(W,j*50);
		}
		content.graphics.closePath();
		
	}

	this.init = init;
	this.content = content;
}