/*
    Receives a collection containing possibly duplicate objects and returns a collection of objects with no duplicates.
    In this case, the function receives as a parameter a collection of objects and the name of the attribute to be considered in this filtering.

    @param collection - Object collection to be filtered
    @param attribute - attribute to be considered in filtering

    @returns - An array of collection with no duplicates.
*/
export function distinct<T, K extends keyof T>(collection: T[], attribute: K): T[] {

    const head = collection[0];
    const tail = collection.slice(1);

    if (collection.length === 0) {
        return [];
    } 

    const distinctTail = tail.filter(obj => obj[attribute] !== head[attribute]);
    return [head, ...distinct(distinctTail, attribute)];
}

/*
    Receives an object, a collection of objects, and an attribute.
    The function return indicates whether the attribute of the passed object is present in the received collection.
*/
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
      return [{[val]: equal}, ...group_By(different, attribute)];

    }
  }

/*
    Receives a collection of objects and an attribute and returns a collection ordered (ascending) by the given attribute

    @param collection - Object collection to be sorted
    @param attribute - attribute to be considered in sorting

    @returns - an ordered array (ascending order)
*/
export function orderBy<T, K extends keyof T>(collection: T[], attribute: K): T[] {
  if (collection.length === 0) {
    return [];
  }
  
  if (collection.length <= 1) {
    return collection;
  }

  const result: T[] = [...collection];
  result.sort((a, b) => (a[attribute] < b[attribute] ? -1 : 1));
  return result;
}

/*
    Receives a collection of objects and an attribute and returns a collection ordered (descending) by the given attribute

    @param collection - Object collection to be sorted
    @param attribute - attribute to be considered in sorting

    @returns - an ordered array (descending order)
*/
export function orderByDesc<T, K extends keyof T>(collection: T[], attribute: K): T[] {
	if (collection.length === 0) {
	  return [];
	}
	
	if (collection.length <= 1) {
	  return collection;
	}
  
	const result: T[] = [...collection];
	result.sort((a, b) => (a[attribute] > b[attribute] ? -1 : 1));
	return result;
  }

/*
    Reduces an array of objects to a value

    @param reducer - Reduction function
    @param init - Initial value of the reduction
    @param collection -  Object collection to be reduced

    @returns - the final value of the reduction
*/
export function fold<T, K>(reducer: (acc: K, curr: T) => K, init: K, collection: T[]) {
  return collection.reduce(reducer, init);
}	

/*
    Represents the composition function (high order), corresponding to compose(f1,f2)(arg) = f1(f2(arg)))

    @param f1 - Composition function 1
    @param f2 -  Composition function 2

    @returns - compound function
*/
export function compose(f1: Function, f2: Function): Function {
  function composition(...args: any) {
    return f1(f2(args));
  };
  return composition;
}