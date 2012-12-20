/**
 * Kolekcja animacji
 */
var AnimationsCollection = {
    collection: new AbstractCollection(),
    
    /**
    * Odtwarza animację o podanej nazwie
    */
    play: function(name){
                
        //czy jest taki idik
        animation = this.collection.getByName(name);

        if(animation == undefined){
            this.add(name);
        } else {
            animation.playing = true;
            game.animating = true;
        }
    } ,

    /**
    * Dodaje animację do kolekcji
    */
    add: function(name){
        
        this.collection.add({
            name: name,
            playing: true
        });
        game.animating = true;
    } ,

    /**
    * Zatrzymuje animację o podanej nazwie
    */
    stop: function(name){
        this.collection.getByName(name).playing = false;
        if(this.collection.getByObjectAttribute('playing', true).length == 0)  game.animating = false;  
    },

    /**
    * Zwraca ilość obiektów w kolekcji
    */
    length: function(){
        return this.collection.getCount();
    }


}