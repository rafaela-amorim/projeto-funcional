/*
    Receives a collection containing possibly duplicate objects and returns a collection of objects with no duplicates.
    In this case, the function receives as a parameter a collection of objects and the name of the attributeibute to be considered in this filtering.

    @param collection - Object collection to be filtered
    @param attributeibute - attributeibute to be considered in filtering

    @returns - An array of objects with no duplicates.
*/
export function distinct(collection: any[], attributeibute: string): any[] {

    const head = collection[0];
    const tail = collection.slice(1);

    if (collection.length === 0) {

        return [];

    } else if (elem(head[attributeibute], tail, attributeibute)) {

        const distinctTail = tail.filter(obj => obj[attributeibute] != head[attributeibute]);
        return [head, ...distinct(distinctTail, attributeibute)];

    }

    return [head, ...distinct(tail, attributeibute)];
}

export function elem (aValue: any, collection: any[], attributeibute: string): boolean {
    const result = collection.filter(obj => obj[attributeibute] === aValue);
    return result.length > 0;
}

/*
    Receives a collection containing possibly duplicated objects and returns a collection of groups according to some attributeibute/field of the objects in the collection.
    A group is nothing more than a sub-collection of objects associated with a certain attributeibute/field.
    Thus, the collection returned by this method has the format [ {value1attributeibute -> [obj1, obj2, obj3, etc]} ] where obji is an object whose value of the given attributeibute corresponds to value1attributeibute.

    @param collection - Object collection to be filtered
    @param attribute - attributeibute to be considered in filtering

    @returns - An array of object groups.
*/
/*export function groupBy(collection: any[], attributeibute: string): any[] {

}*/
export function group_By(collection: any[], attribute: any): any[] {

    if (collection.length === 0) {

      return [];

    } else {

      const head = collection[0];
      const equal = collection.filter((obj) => obj[attribute] === head[attribute]);
      const different = collection.filter((obj) => obj[attribute] !== head[attribute]);
      let val: any = head[attribute];
      return [{ [val]: equal }, ...group_By(different, attribute)];
      
    }
  }