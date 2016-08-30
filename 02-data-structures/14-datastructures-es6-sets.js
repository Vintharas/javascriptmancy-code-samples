/* 
 *
 * JavaScript-mancy - Chapter 14
 * Sets! 
 *
 */

console.log('========== JavaScripts Set ============');
// like in C#
// a way to have a set of unique items
let set = new Set();

let elementsOfMagic = new Set(['earth', 'fire', 'air', 'earth', 'fire', 'water']);
console.log(`These are the elements of magic: ${[...elementsOfMagic]}`);
// => These are the elements of magic: earth, fire, air, water
// BOOM!

console.log('========== Operating With Elements ============');

// you can add new elements as well
elementsOfMagic.add('aether');
console.log(`More magic!: ${[...elementsOfMagic]}`);
// => More magic!: earth, fire, air, water, aether

// add is chainable
elementsOfMagic
  .add('earth')
  .add('air')
  .add('water');

console.log(`Already added: ${[...elementsOfMagic]}`);
// => Already added: earth,fire,air,water,aether

// check for existence
console.log(`Is water one of the sacred elements of magic? ${elementsOfMagic.has('water')}`)
// => Is water one of the sacred elements of magic? true

// removing items
elementsOfMagic.delete('aether');
console.log(`The aether element flows like the tides and sometimes disappears: ${[...elementsOfMagic]}`);
// => The aether element flows like the tides and sometimes disappears: earth,fire,air,water

// you can check how many items are there in a set with 'size'
console.log(`${elementsOfMagic.size} are the elements of magic`);
// => 4 are the elements of magic

// and you can remove all items from a set by using 'clear'
const castMagicShield = () => elementsOfMagic.clear();
castMagicShield();
console.log(`ups! I can't feel the elements: ${elementsOfMagic.size}`);
// => ups! I can't feel the elements: 0

console.log('========== Iterating Sets ============');
// let's free the elements of Magic once again
elementsOfMagic.add('fire').add('water').add('air').add('earth');

// you can iterate over the elements of a set using the for/of loop
for(let element of elementsOfMagic){
  console.log(`element: ${element}`);
}
// => element: fire
//    element: water
//    element: air
//    element: earth

elementsOfMagic.forEach((value, alsoValue, set) => {
  console.log(`element: ${value}`);
})
// => element: fire
//    element: water
//    element: air
//    element: earth

console.log('========== Using Array Methods with Sets ==========');
// all the cool methods from Array.prototype
// are just one little step away

function filterSet(set, predicate){
    var filteredItems = [...set].filter(predicate);
    return new Set(filteredItems);
}

var aElements = filterSet(elementsOfMagic, e => e.startsWith('a'));
console.log(`Elements of Magic starting with a: ${[...aElements]}`);
// => 

console.log('========== How Do Sets Understand Equality? ============');
// set understand that two items are equal
// using strict equality comparison
// this works great with numbers or strings
// but it falls short with objects
let persons = new Set();
let randalf = {id: 1, name: 'randalf'};
persons.add(randalf);
persons.add(randalf);
console.log(`I have ${persons.size} person`)
// => I have 1 person 
console.log([...persons]);
// => [[object Object] {
//  id: 1,
//  name: "randalf"
//}]

persons.add({id: 1, name: 'randalf'});
console.log(`I have ${persons.size} persons?!?`)
// => I have 2 persons?!?
console.log([...persons]);
/*
*= [[object Object] {
  id: 1,
  name: "randalf"
}, [object Object] {
  id: 1,
  name: "randalf"
}]
*/

// since there's no way to specify custom equality
// the best alternative to a Set-like functionality with objects
// is to work with Maps
var fakeSetThisIsAHack = new Map();
fakeSetThisIsAHack
  .set(randalf.id, randalf)
  .set(1, {id: 1, name: 'randalf'});
console.log(`fake set has ${fakeSetThisIsAHack.size} item`);
// => fake set has 1 item





