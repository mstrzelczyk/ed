/**
* Manager contenerow i pseudo controller
*/ 
function AbstractCollection()
{
    var items = [];
    
    /**
     * Zwraca wielkość danej kolekcji
     */
    function getCount()
    {
        return items.length;
    }
    
    /**
     * Zwraca całą kolekcje
     */
    function getAll()
    {
        return items;
    }
    
    /**
     * zwraca element z kolekcji na podstawie indexu
     */
    function getByIndex(index)
    {
        return items[index];
    }

    function getFirstFreeIndex(max)
    {
        for(var i=0; i<max; i++){
            if(items[i] === undefined){
                return i;
            }
        }
    }

    /**
     * zwraca tablicę elementów z kolekcji zawierajęce podany atrybut o podanej wartości.
     */
    function getByObjectAttribute(attribute, value)
    {
        var tmp = [];
        for(index in items){
            if(items[index][attribute] === value) 
                tmp.push(items[index]);
        }
        return tmp;
    }
    
    /**
     * zwraca element z kolekcji na podstawie nazwy
     */
    function getByName(name)
    {
        for(index in items){
            if(items[index].name === name){
                return items[index];
            }
        }
    }
    
    /**
     * dodaje element do kolekcji
     */
    function add(object, callback)
    {
        var index = getFirstFreeIndex(100);
        index > items.length 
            ? items.push(object)
            : items[index] = object;
        if(callback != undefined)
            callback();
    }
    
    /**
     * usuwa element z kolekcji na podstawie indexu
     */
    function removeByIndex(index, callback)
    {
        delete items[index];
        if(callback != undefined)
            callback();
    }
    
    /**
     * usuwa element z kolekcji na podstawie nazwy
     */
    function removeByName(name,callback)
    {
        for(index in items){
            if(items[index].name === name){
                delete items[index];
                if(callback != undefined)
                    callback();
                break;
            }
        }
    }
        
    this.getAll = getAll;
    this.removeByName = removeByName;
    this.removeByIndex = removeByIndex;
    this.add = add;
    this.getByIndex = getByIndex;
    this.getByName = getByName;
    this.getCount = getCount;
    this.items = items;
    this.getByObjectAttribute = getByObjectAttribute;
    this.getFirstFreeIndex = getFirstFreeIndex;
}
