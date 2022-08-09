/*
    Receives a collection containing possibly duplicate objects and returns a collection of objects with no duplicates.
    In this case, the function receives as a parameter a collection of objects and the name of the attribute to be considered in this filtering.

    @param collection - Object collection to be filtered
    @param attribute - attribute to be considered in filtering

    @returns - An array of collection with no duplicates.
*/
export function distinct<T, K extends keyof T>(collection: T[], attribute: K): any[] {

    const head = collection[0];
    const tail = collection.slice(1);

    if (collection.length === 0) {

        return [];

    } 
    const distinctTail = tail.filter(obj => obj[attribute] !== head[attribute]);
    return [head, ...distinct(distinctTail, attribute)];
}

export function elem<T, K extends keyof T>(aValue: any, collection: T[], attribute: K): boolean {
    const result = collection.filter(obj => obj[attribute] === aValue);
    return result.length > 0;
}

/*
    Receives a collection containing possibly duplicated objects and returns a collection of groups according to some attribute/field of the objects in the collection.
    A group is nothing more than a sub-collection of objects associated with a certain attribute/field.
    Thus, the collection returned by this method has the format [ {value1attribute -> [obj1, obj2, obj3, etc]} ] where obji is an object whose value of the given attribute corresponds to value1attribute.

    @param collection - Object collection to be filtered
    @param attribute - attribute to be considered in filtering

    @returns - An array of object groups
*/
export function group_By<T, K extends keyof T>(collection: T[], attribute: K): any[] {

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

/*
    Receives a collection of objects and an attribute and returns a collection ordered by the given attribute

    @param collection - Object collection to be sorted
    @param attribute - attribute to be considered in sorting

    @returns - an ordered array
*/
export function orderBy<T, K extends keyof T>(collection: T[], attribute: K): any {
  // Null is a result for a nullable or undefined array
  if (!collection) {
    return null;
  }

  if (collection.length <= 1) {
    return collection;
  }

  collection.sort((a, b) => (a[attribute] < b[attribute] ? -1 : 1));
  return collection;
}
