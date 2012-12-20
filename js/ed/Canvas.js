/**
* Obiekt tworzący canvas
*/
var Canvas = {
    width: 960,
    height: 540,
    context: null,
    html: null,
    orientation: 'landscape',
    create: function(callback){
        canv = document.createElement('canvas');
        canv.height = this.height;
        canv.width = this.width;
        canv.id='canvasStage';
        document.getElementById('wraper').appendChild(canv);
        this.html = document.getElementById('canvasStage');
        this.context = this.html.getContext('2d');

        callback();
    },
    clear: function(){
        this.context.clearRect(0,0,this.html.width, this.html.height);
    },
    getXMargin: function(){
        position = this.html;
        return position.left - this.x/2;
    },
    getYMargin: function(){
        position = this.html;
        return position.top - this.y/2;
    },
    getMarginVector: function(){
        return [this.getXMargin(), this.getYMargin()];
    },
    scale: function(){
        switch(this._getWindowOrientation()){
            case "landscape" : 
                this.orientation = "landscape";
                this.scaleLandscape();
                break;
            case "portrait" : 
                this.orientation = "portrait";
                this.scalePortrait();
                break;
        }
    },
    scalePortrait: function(){
    	
    	//alert("port");
    	if(isMobile.any())
    	{
    		$("#rotateOverlay").show();
    		return;
    	}
    	
    	
        $('#canvas').css({
            transform: 'rotate(90deg)',
            '-webkit-transform': 'rotate(90deg)',
            '-moz-transform': 'rotate(90deg)',
            '-o-transform': 'rotate(90deg)',
            '-ms-transform': 'rotate(90deg)'
        });

        pCanvas =  this.height / this.width;
        wW = $(window).width();
        wH = $(window).height();
        pWindow = wH / wW;
        
        if(pWindow < this.width/this.height){
            newH = Utils.round(wH * this.height / this.width);
            $('#canvas').css({
               width:  wH,
               height: newH,
               marginTop: -newH/2,
               marginLeft: -wH/2
            });
        }else{            
            newW = Utils.round(wW * this.width / this.height);
            $('#canvas').css({
               width:  newW,
               height: wW,
               marginTop: -wW/2,
               marginLeft: -newW/2
            });
        }        
    },
    scaleLandscape: function(){
    	
    	//alert('land');
    	$("#rotateOverlay").hide();
    	
    	
        $('#canvas').css({
            transform: 'rotate(0deg)',
            '-webkit-transform': 'rotate(0deg)',
            '-moz-transform': 'rotate(0deg)',
            '-o-transform': 'rotate(0deg)',
            '-ms-transform': 'rotate(0deg)'
        });
        
        pCanvas = this.width / this.height;
        wW = $(window).width();
        wH = $(window).height();
        pWindow = wW / wH;
        
        ////console.log(pWindow , pCanvas);

        //skalowanie do wysokosci
        if(pWindow >= pCanvas){
            newW = Utils.round(wH * this.width / this.height);
            $('#canvas').css({
               width:  newW,
               height: wH,
               marginTop: -wH/2,
               marginLeft: -newW/2
            });
        }else{
            newH = Utils.round(wW * this.height / this.width);
            $('#canvas').css({
               width:  wW,
               height: newH,
               marginTop: -newH/2,
               marginLeft: -wW/2
            });
        }        
    },
    _getWindowOrientation: function(){
         return $(window).width() < $(window).height() ? "portrait" : "landscape";
    }
    
}