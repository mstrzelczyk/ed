/**
 * Kolekcja kontenerow
 */
function ContainersCollection()
{
    var collection = new AbstractCollection();
    
    /**
    * Dodaje kontener do kolekcji
    */
    function add(container){
        collection.add({
            container: container,
            name: container.abstract.name
        });
    }

    /**
    * Zwraca kontener o podanej nazwie
    */
    function getByName(name){
        if(collection.getByName(name))
            return collection.getByName(name).container;
        else
            return undefined;
    }

    /**
    * Zwraca ilość obiektów w kolekcji
    */
    function length(){
        return collection.getCount();
    }

    function getByIndex(index){
        return collection.getByIndex(index);
    }

    this.add = add;
    this.getByName = getByName;
    this.length = length;
    this.getByIndex = getByIndex;
}