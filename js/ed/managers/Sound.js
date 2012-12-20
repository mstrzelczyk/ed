/**
 * Obiekt odpowiedzialny za wlaczanie muzyki
 */
var SoundManager = {
    isSoundOn: false,
    collection: [],
    locations: [],
    actualLocation: "",
    path: 'media/audio/',
    
    /**
    * Odtwarza dzwiek o podanej nazwie
    */
    play: function(name, global){
        if(global === undefined)
            global = false;

        if(this.collection[name] === undefined)
            return;

        if(!this.isSoundOn)
            return;
        
        if(global)
            this.collection[name].source.setAttribute('loop', 'loop');  

        this.collection[name].source.play();    
    },
    
    /**
    * Dodaje dzwiek do kolekcji
    */
    add: function(object){
        object.global = false;
        this.collection[object.name] = object;   
    },
    
    /**
    * Dodaje nazwe lokacji
    */
    addLocation: function(name){
        this.locations[name] = {
            soundNames: []
        };
    },

    /**
    * Dodanie nazwy dzwieku do lokalizacji
    */
    addSoundToLocation: function(locationName, soundName){
        this.locations[locationName].soundNames.push(soundName);
    },

    /**
    * Usuwa nazwe dzwieku z lokalizacji
    */
    removeSoundFromLocation: function(locationName, soundName){
        for(index in this.locations[locationName].soundNames){
                if(soundName == this.locations[locationName].soundNames[index]){
                    delete this.locations[locationName].soundNames[index];
                    return;
                }              
        }
    },
    
    /**
    * Wylacza wszystkie dzwieki
    */
    playOffAll: function(location){
        if(undefined === location)
            location = this.actualLocation;
        
        if(undefined === this.locations[location])
            return

        if(this.locations[location].soundNames.length > 0){
            for(index in this.locations[location].soundNames){
                soundName = this.locations[location].soundNames[index];
                this.collection[soundName].source.pause()                 
            }
        }        
    },
    
    /**
    * Wlacza wszystkie dzwieki
    */
    playOnAll: function(location){
        if(undefined === location)
            location = this.actualLocation;

        if(undefined === this.locations[location])
            return

        if(this.locations[location].soundNames.length > 0){
            for(index in this.locations[location].soundNames){
                soundName = this.locations[location].soundNames[index];
                this.play(soundName, true);                 
            }
        }        
    },
    
    /**
    * Wylacz dzwiek o danej nazwie
    */
    playOff: function(name){
        if(undefined === this.collection[name])
            return;
        this.collection[name].source.pause();
    },
    
    /**
    * Wlacz dzwiek o danej nazwie
    */
    playOn: function(name){

        if(undefined === this.collection[name])
            return;
        if(this.isSoundOn)
            this.collection[name].source.play();
    },

    /**
    * Wlacz dzwiek o danej nazwie od poczatku
    */
    playOnForce: function(name){
        if(undefined === this.collection[name])
            return;
        if(this.isSoundOn)
        {
            this.collection[name].source.currentTime = 0;
            this.collection[name].source.play();
        }
    },

    /**
    * Wycisza wszystkie dzwieki
    */
    mute: function(){
        for(index in this.collection){
            this.collection[index].source.pause();              
        }  
    },
   
   /**
    * przelaczenie dzwieku
    */
    switchSound: function(){
        if(this.isSoundOn){
            this.isSoundOn = false;
            this.mute();
        }else{
            this.isSoundOn = true;
            this.playOnAll();
        }
    }, 

    /**
    * Rozpoznaje rozszerzenia pliku
    */
    _getBrowserExtension: function(){
        if(navigator.userAgent.indexOf('Firefox') > 0)
            return '.ogg';
        
        return '.mp3';
    }
}