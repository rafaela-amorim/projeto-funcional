import {distinct, group_By, orderBy, fold, compose} from './utils';

const people = [

    { id: 1, name: 'Alice', age: 23 },
    { id: 8, name: 'Luke', age: 18 },
    { id: 5, name: 'Sarah', age: 20 },
    { id: 9, name: 'Luke', age: 21 },
    { id: 4, name: 'Sarah', age: 23 },
    { id: 6, name: 'James', age: 25 },
    { id: 3, name: 'Mathew', age: 18 },
    { id: 7, name: 'Lucy', age: 27 },
    { id: 2, name: 'Alice', age: 22 },
    { id: 10, name: 'Briana', age: 21 },
  
];

describe('Distinct function test.', () => {
  
    it('Distinct people by name..', () => {
        const distinctPeople = distinct(people, "name");
        expect(distinctPeople).toEqual([

        { id: 1, name: 'Alice', age: 23 },
        { id: 8, name: 'Luke', age: 18 },
        { id: 5, name: 'Sarah', age: 20 },
        { id: 6, name: 'James', age: 25 },
        { id: 3, name: 'Mathew', age: 18 },
        { id: 7, name: 'Lucy', age: 27 },
        { id: 10, name: 'Briana', age: 21 },
      
      ]);
    })

    it('Distinct people by age..', () => {
        const distinctPeople = distinct(people, "age");
        expect(distinctPeople).toEqual([
  
            { id: 1, name: 'Alice', age: 23 },
            { id: 8, name: 'Luke', age: 18 },
            { id: 5, name: 'Sarah', age: 20 },
            { id: 9, name: 'Luke', age: 21 },
            { id: 6, name: 'James', age: 25 },
            { id: 7, name: 'Lucy', age: 27 },
            { id: 2, name: 'Alice', age: 22 },

        ]);
    })

    it('Distinct people by id..', () => {
        const distinctPeople = distinct(people, "id");
        expect(distinctPeople).toEqual([
  
            { id: 1, name: 'Alice', age: 23 },
            { id: 8, name: 'Luke', age: 18 },
            { id: 5, name: 'Sarah', age: 20 },
            { id: 9, name: 'Luke', age: 21 },
            { id: 4, name: 'Sarah', age: 23 },
            { id: 6, name: 'James', age: 25 },
            { id: 3, name: 'Mathew', age: 18 },
            { id: 7, name: 'Lucy', age: 27 },
            { id: 2, name: 'Alice', age: 22 },
            { id: 10, name: 'Briana', age: 21 },

        ]);
    })
})

describe('GroupBy function test.', () => {

    it('Group people by name', () => {
        const groupedPeople = group_By(people, "name");
        expect(groupedPeople).toEqual([
  
            {Alice: [{id: 1, name: 'Alice', age: 23 }, {id: 2, name: 'Alice', age: 22 }]},
            {Luke: [{ id: 8, name: 'Luke', age: 18 }, { id: 9, name: 'Luke', age: 21 }]},
            {Sarah: [{ id: 5, name: 'Sarah', age: 20 }, { id: 4, name: 'Sarah', age: 23 }]},
            {James: [{ id: 6, name: 'James', age: 25 }]},
            {Mathew: [{ id: 3, name: 'Mathew', age: 18 }]},
            {Lucy: [{ id: 7, name: 'Lucy', age: 27 }]},
            {Briana: [{ id: 10, name: 'Briana', age: 21 }]},

        ]);
    })

    it('Group people by age', () => {
        const groupedPeople = group_By(people, "age");
        expect(groupedPeople).toEqual([
  
            {23: [{ id: 1, name: 'Alice', age: 23 }, { id: 4, name: 'Sarah', age: 23 }]},
            {18: [{ id: 8, name: 'Luke', age: 18 }, { id: 3, name: 'Mathew', age: 18 }]},
            {20: [{ id: 5, name: 'Sarah', age: 20 }]},
            {21: [{ id: 9, name: 'Luke', age: 21 }, { id: 10, name: 'Briana', age: 21 }]},
            {25: [{ id: 6, name: 'James', age: 25 }]},
            {27: [{ id: 7, name: 'Lucy', age: 27 }]},
            {22: [{ id: 2, name: 'Alice', age: 22 }]},

        ]);
    })

    it('Group people by id', () => {
        const groupedPeople = group_By(people, "id");
        expect(groupedPeople).toEqual([
  
            {1: [ { id: 1, name: 'Alice', age: 23 }]},
            {8: [{ id: 8, name: 'Luke', age: 18 }]},
            {5: [{ id: 5, name: 'Sarah', age: 20 }]},
            {9: [{ id: 9, name: 'Luke', age: 21 }]},
            {4: [{ id: 4, name: 'Sarah', age: 23 }]},
            {6: [{ id: 6, name: 'James', age: 25 }]},
            {3: [{ id: 3, name: 'Mathew', age: 18 }]},
            {7: [{ id: 7, name: 'Lucy', age: 27 }]},
            {2: [ { id: 2, name: 'Alice', age: 22 }]},
            {10: [{ id: 10, name: 'Briana', age: 21 }]},

        ]);
    })
})

describe('GroupBy function test.', () => {

    it('Order people by id', () => {
        const groupedPeople = orderBy(people, "id");
        expect(groupedPeople).toEqual([
  
            { id: 1, name: 'Alice', age: 23 },
            { id: 2, name: 'Alice', age: 22 },
            { id: 3, name: 'Mathew', age: 18 },
            { id: 4, name: 'Sarah', age: 23 },
            { id: 5, name: 'Sarah', age: 20 },
            { id: 6, name: 'James', age: 25 },
            { id: 7, name: 'Lucy', age: 27 },
            { id: 8, name: 'Luke', age: 18 },
            { id: 9, name: 'Luke', age: 21 },
            { id: 10, name: 'Briana', age: 21 },

        ]);
    })

    it('Order people by age', () => {
        const groupedPeople = orderBy(people, "age");
        expect(groupedPeople).toEqual([
  
            { id: 8, name: 'Luke', age: 18 },
            { id: 3, name: 'Mathew', age: 18 },
            { id: 5, name: 'Sarah', age: 20 },
            { id: 9, name: 'Luke', age: 21 },
            { id: 10, name: 'Briana', age: 21 },
            { id: 2, name: 'Alice', age: 22 },
            { id: 1, name: 'Alice', age: 23 },
            { id: 4, name: 'Sarah', age: 23 },
            { id: 6, name: 'James', age: 25 },
            { id: 7, name: 'Lucy', age: 27 },

        ]);
    })

    it('Order people by name', () => {
        const groupedPeople = orderBy(people, "name");
        expect(groupedPeople).toEqual([
  
            { id: 1, name: 'Alice', age: 23 },
            { id: 2, name: 'Alice', age: 22 },
            { id: 10, name: 'Briana', age: 21 },
            { id: 6, name: 'James', age: 25 },
            { id: 7, name: 'Lucy', age: 27 },
            { id: 8, name: 'Luke', age: 18 },
            { id: 9, name: 'Luke', age: 21 },
            { id: 3, name: 'Mathew', age: 18 },
            { id: 5, name: 'Sarah', age: 20 },
            { id: 4, name: 'Sarah', age: 23 },

        ]);
    })
})

describe('Fold function test.', () => {

    it('Reduce the array of people to the sum of all ages.', () => {
        const sumOfAges = fold((acc, curr) => acc + curr.age, 0, people);
        expect(sumOfAges).toBe(218);
    })
})

describe('Compose function test.', () => {
    const fn1 = (x: number) => x + x;
    const fn2 = (x: number) => x / 2;
  
    it('Compose two functions.', () => {
      const composed = compose(fn1, fn2)
      expect(composed(2)).toBe(2);
    })
  })