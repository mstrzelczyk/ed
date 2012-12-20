/**
 * Kolekcja obiektow w plecaku
 */
function BackpackCollection()
{
    var items = new AbstractCollection(), events = new Event(), content = new createjs.Container();
    var x = 55, y = 20, width = 412, height = 162, insideObjectWidth = 33, insideObjectHeight = 33;

    /**
    * Inicjalizuje obiekt
    */
    function init(){
    	content.visible = false;
        content.alpha = 0;
        content.x = x;
        content.y = y;
    	content.addChild(new createjs.Bitmap('media/img/bgBackpack.png'));        
    }

    /**
    * Pobiera x,y dla nowego obiektu
    */    
    function _getXY(){
        //cnt = items.getCount();
        cnt = items.getFirstFreeIndex(10)
        pattern = [
            {x: 73 , y: 60},
            {x: 133 , y: 57},
            {x: 200 , y: 55},
            {x: 271 , y: 48},
            {x: 341 , y: 49},
            {x: 78 , y: 123},
            {x: 141 , y: 116},
            {x: 224 , y: 110},
            {x: 296 , y: 109},
            {x: 369 , y: 97}
        ];
        
        return pattern[cnt];
    }

    /**
    * Pokazawanie plecaka
    */
    function show(){
        AnimationsCollection.play('backpack');
        content.visible = true;
        var tween = createjs.Tween.get(content, {loop:false})
            .to({alpha: 1}, 250, createjs.Ease.linear)
            .call(function(){                
                AnimationsCollection.stop('backpack');
            })
        ;
    }

    /**
    * Chowanie plecaka
    */
    function hide(){
        AnimationsCollection.play('backpack');
        var tween = createjs.Tween.get(content, {loop:false})
            .to({alpha: 0}, 250, createjs.Ease.linear)
            .call(function(){
                AnimationsCollection.stop('backpack');
            })
        ;
        content.visible = false;
    }

    /**
    * Wlacza/wylacza plecak
    */
    function switchView(){
        content.isVisible() ? hide() : show();        
    }

    /**
    * Dodaje do plecaka
    */
    function add(object){   
        this.show();             
        SoundManager.play('click');
        
        //skalowanie obiektu
        var cords = this._getXY();
        object.x = cords.x;
        object.y = cords.y;

        var scale = object.scaleX;

        if(object.image.width >= object.image.height){            
            object.scaleY = object.scaleX =  insideObjectWidth / object.image.width;
        }else{            
            object.scaleX = object.scaleY  = insideObjectHeight / object.image.height;
        }

        
        if(object.scaleX > 1)
        {
            object.scaleX = object.scaleY = scale;
        } else {
            scale = object.scaleX;
        }
                   
        object.onMouseOver = function(){
            object.scaleY = object.scaleY * 1.1;
            object.scaleX = object.scaleX * 1.1;
            game.update = true;
        }

        object.onMouseOut = function(){
            object.scaleY = object.scaleY / 1.1;                   
            object.scaleX = object.scaleX / 1.1;
            game.update = true;
        }

        tmpThis = this;
        object.onPress = function(e){
            // dodanie obiektu na najwyzsza warstwe
            object.parent.addChild(object);

            //marginesy
            var offset = {
                x:object.x-e.stageX, 
                y:object.y-e.stageY
            };
            
            //przenoszenie elementu
            e.onMouseMove = function(e) {    
                object.scaleX = 0.8;            
                object.scaleY = 0.8;           

                object.x = e.stageX+offset.x;
                object.y = e.stageY+offset.y;
                game.update = true;
            }
            
            //upuszczenie elementu
            e.onMouseUp = function(e) {
                object.x = e.stageX+offset.x;
                object.y = e.stageY+offset.y;                                

                var pGlobal = content.localToGlobal(object.x , object.y);
                data = stageGlobal.getObjectsUnderPoint(pGlobal.x, pGlobal.y);

                // TEST PUNKTU POD KTORYM SPRAWDZAMY KOLIZJE OBIEKTOW
                /*var check = new createjs.Shape(new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,255,0,1)).rect(-2,-2,4,4));
                check.x = pGlobal.x;//+object.image.width/2 * object.scaleX;
                check.y = pGlobal.y;//+object.image.height/2 * object.scaleY;
                game.controller.gui.addChild(check);
                game.update = true;*/

                idMerge = tmpThis.checkObjectRelation(object,data);
                if(idMerge > 0){
                    game.controller.backpackItemsMerge(object);
                }else{
                     object.x = cords.x;
                     object.y = cords.y;
                    object.scaleX = object.scaleY = scale;
                }
                game.update = true;
            }
            
        }        

        items.add(object);
        content.addChild(object);
        game.update = true;
    }

    /**
    * Zwraca item o podanej nazwie z plecaka.
    */
    function getByName(name)
    {
        return items.getByName(name);
    }

    /**
    * Usuwa z kolekcji item o podanej nazwie
    */
    function removeByName(name)
    {
        var item = items.getByName(name);
        content.removeChild(item);
        items.removeByName(name);
    }
        
    /**
    * Sprawdza czy dany obiekt z ktorym mozna sie polaczyc znajduje sie w kolekcji
    */
    function checkObjectRelation(object,collection){
        //czy jest cos w kolekcji
        if(collection.length < 1)
            return 0;
        
        for(index in collection){
            if(collection[index].name === object.relationObjectName)
                return collection[index].id;
        }

        return 0;
    }

    this.init = init;    
    this._getXY = _getXY;    
    this.add = add;    
    this.show = show;    
    this.hide = hide;    
    this.switchView = switchView;    
    this.items = items;    
    this.events = events;    
    this.content = content; 
    this.checkObjectRelation = checkObjectRelation;
    this.removeByName = removeByName;
    this.getByName = getByName;
}
