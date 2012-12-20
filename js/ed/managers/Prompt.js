/**
 * Obiekt odpowiedzialny za podpowiedzi
 */
var PromptManager = {
    hasNewPrompt: false,
    collection: [],
    collectionCnt: 0,
    activeNames: [],
    activeNamesCnt : 0,
    events: new Event(),

    /**
    * inicjacja obiektu
    */           
    init: function(){
    },
    
    /**
    * Zwraca aktualną podpowiedź
    */
    getActualPrompts: function(){        
        var prompts = [];
        var promptsTmp = [];
        if(this.activeNamesCnt == 0)
            return prompts;

        activeContainer = game.controller.gameplayManager.getCurrent();
        for(index in this.activeNames){
            if(this.collection[index].locationName == activeContainer){
                prompts.push(this.collection[index].text);
            }else{
                promptsTmp.push(this.collection[index].text);
            }
        }
        
        //sortowanie po aktywnym kontenerze
        return prompts.concat(promptsTmp);
    },

    /**
    * Dodanie podpowiedzi
    */
    add: function(object){
        if(undefined != this.collection[object.name])
            return;
        
        this.collection[object.name] = (object);
        this.collectionCnt++;
    },    
   
    /**
    * Aktywowanie podpowiedzi
    */
    active: function(promptName){
        if(undefined == this.collection[promptName])
            return;
        
        this.activeNames[promptName] = true;
        this.activeNamesCnt++;
    },

    /**
    * Sezaktywowanie podpowiedzi
    */
    disactive: function(promptName){
        if(undefined == this.activeNames[promptName])
            return;
        
        delete this.activeNames[promptName];
        this.activeNamesCnt--;
    }
}