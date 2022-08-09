import { groupBy } from "rxjs";

/*
    Receives a collection containing possibly duplicate objects and returns a collection of objects with no duplicates.
    In this case, the function receives as a parameter a collection of objects and the name of the attribute to be considered in this filtering.

    @param collection - Object collection to be filtered
    @param attribute - Attribute to be considered in filtering

    @returns - An array of objects with no duplicates.
*/
export function distinct(collection: any[], attribute: string): any[] {

    const head = collection[0];
    const tail = collection.slice(1);

    if (collection.length === 0) {

        return [];

    } else if (elem(head[attribute], tail, attribute)) {

        const distinctTail = tail.filter(obj => obj[attribute] != head[attribute]);
        return [head, ...distinct(distinctTail, attribute)];

    }

    return [head, ...distinct(tail, attribute)];
}

export function elem (aValue: any, collection: any[], attribute: string): boolean {
    const result = collection.filter(obj => obj[attribute] === aValue);
    return result.length > 0;
}

/*
    Receives a collection containing possibly duplicated objects and returns a collection of groups according to some attribute/field of the objects in the collection.
    A group is nothing more than a sub-collection of objects associated with a certain attribute/field.
    Thus, the collection returned by this method has the format [ {value1Attribute -> [obj1, obj2, obj3, etc]} ] where obji is an object whose value of the given attribute corresponds to value1Attribute.

    @param collection - Object collection to be filtered
    @param attribute - Attribute to be considered in filtering

    @returns - An array of object groups.
*/
/*export function groupBy(collection: any[], attribute: string): any[] {

}*/