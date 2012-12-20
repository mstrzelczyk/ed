/**
 * Obiekt odpowiedzialny za zmiane tla
 */
var BackgroundManager = {
    element: $('#canvasBg'),
    manifest: [],
    snow: false,
    /**
    * Inicjacja obiektu
    */
    init: function(){
        this.add('inside','media/img/insideBg.jpg');
        this.add('outside','media/img/outsideBg.jpg');
        this.add('outsideSnow','media/img/outsideSnowBg.jpg');
        this.add('clouds','media/img/cloudsBg.jpg');
        this.add('brain','media/img/brainBg.jpg');
        this.add('init','media/img/init.jpg');
    },
    /**
    * Dodawanie obiektu
    */
    add: function(name, src){
        this.manifest[name] = src;
    },
    /**
    * Pokazywanie danego tla
    */
    show: function(name){        
        if(undefined != this.manifest[name]){
            if(name == 'outside' && BackgroundManager.snow) name = 'outsideSnow';
            this.element.css('background-image', 'url(' +  this.manifest[name] + ')');            
            this.element.fadeIn(200);    
        }
    } ,
    hide:function()
    {
        this.element.fadeOut(200);
    }
}