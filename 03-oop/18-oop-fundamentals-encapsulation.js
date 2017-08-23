/* 
 *
 * JavaScript-mancy - Summoning Fundamentals: 
 * An Introduction to Object Oriented Programming in JavaScript
 * Encapsulation
 *
 *
 */


console.log("==== OOP Fundamentals in JavaScript - Encapsulation ====");

console.log("===== #1. Creating Objects =====");
console.log("===== #1.1 Creating Objects: Using Object Intializers =====");

console.log('creating a simple object: ')
// creating a simple object
var object = {};
console.log(object);
// => [object Object] { ... }

console.log('you can create objects with any number of properties and methods:')
let minion = {
  hp: 10,
  name: 'minion',
  toString(){ return this.name;}
};
console.log(minion);
// => [object Object] {
//  hp: 10,
//  name: "minion",
//  toString: function toString() {
//    return this.name;
//  }
// }

console.log('and you can augment them with new properties')
minion.armor = 'chain mail';
console.log('augmented minion with an armor: ', minion.armor);
// => augmented minion with an armor, chain mail


console.log('and a factory')
// we can use factories to ease object creation
function createMinion(name, hp=10){
  var position = {x: 0, y: 0};

  return {
    hp: hp,
    name: name,
    toString(){ return this.name;},
    walksTo(x, y) {
      console.log(`${this} walks to position (${position.x},${position.y})`);
      position.x = x;
      position.y = y;
    }
  };
}

let orc = createMinion(/* name */ 'orc', /* hp */ 100);
console.log(orc);
// => [object Object] {
//  hp: 100,
//  name: "orc",
//  etc...
// }
orc.walksTo(1,1);
// => "orc walks to position (0,0)"

console.log("===== #1.2 Creating Objects: Using The New Operator and Constructor Functions =====");

console.log('simple object with ctor function')
// an equivalent expression to the one above using the new operator
// to create an object is
let anotherObject = new Object();
console.log(anotherObject);
// => [object Object] { ... }

console.log('a minion with ctor function')
// you can use the new operator with any function
function Minion(name='minion', hp=10){
  this.hp = hp;
  this.name = name;
  this.toString = () => this.name;
};

let anotherMinion = new Minion();
console.log(anotherMinion);
// => [object Object] {
//  hp: 10,
//  name: "minion",
//  toString: () => this.name
// }

console.log('A constructor function acts as a class definition' +
           'it represents the properties and methods of the resulting' +
           'object from invoking it.')
console.log('You can also use the instaceof operator to verify that');

console.log(`anotherMinion is a Minion: ${anotherMinion instanceof Minion}`);
// => anotherMinion is a Minion: true
console.log(`anotherMinion is an Object: ${anotherMinion instanceof Object}`);
// => anotherMinion is an Object: true


console.log('what happens if we return something explicitly from a ctor function')
// if you try to return a primitive it is ignored
// if you try to return an object it is returned instead of the `this` object
function MinionOrBanana(name='minion', hp=10){
  this.hp = hp;
  this.name = name;
  //return 'banana'; // => {hp: 10, name: 'minion}
  //return 1337; // => {hp: 10, name: 'minion'}
  return {name: 'banana'}; // => {name: 'banana'}
}
let isItAMinionOrIsItABanana = new MinionOrBanana();
console.log(isItAMinionOrIsItABanana)
// => [object Object] {
//  name: "banana"
//}
console.log('what happens if you call a constructor function without new')

let yetAnotherMinion = Minion();
console.log(`yetAnotherMinion: ${yetAnotherMinion}`);
// => undefined
console.log(`Window.hp : ${window.hp}`);
// => 10
console.log('ups!')
// in strict mode TypeError: Cannot set property 'hp' of undefined

console.log('we can use the following pattern to foolproof constructor objects')
function MinionSafe(name='minion', hp=10){
  'use strict';
  if (!this) return new MinionSafe(name, hp);
  this.name = name;
  this.hp = hp;
}

console.log('using new operator: ', new MinionSafe());
// => [object Object] {
//  hp: 10,
//  name: "minion"
//}

console.log('using function call: ', MinionSafe());
// => [object Object] {
//  hp: 10,
//  name: "minion"
//}

console.log('is there a way that we can reuse this pattern without having to rewrite it every single time we create a constructor function?')

function safeConstructor(constructor){
  return function(){
    'use strict'
    return new constructor(...arguments);
  }
}
let SafeMinion = safeConstructor(Minion);
console.log(`using function: ${SafeMinion('orc', 110)}`);
// => "using function: orc"
console.log(`using new operator: ${new SafeMinion('pirate', 50)}`);
// => "using new operator: pirate"

console.log("===== #2. Information or Data Hiding =====");
console.log("===== #2.1 Data Hiding Using Closures =====");

// just like with factory methods
// you can implement data privacy using closures
// when using constructor functions
function WalkingMinion(name='minion', hp=10){
  let position = {x: 0, y: 0};
  
  this.hp = hp;
  this.name = name;
  this.toString = () => this.name;
  
  this.walksTo = (x,y) => {
    console.log(`${this} walks from (${position.x}, ${position.y}) to (${x}, ${y})`);
    position.x = x;
    position.y = y;
  };

};

// you cannot access the position property
// since it is private
let walkingMinion = new WalkingMinion();
console.log(walkingMinion.position);
// => undefined

// yet it is part of the internal state of the walking minion
// as you can see when we call the walksTo function
walkingMinion.walksTo(2, 2)
// => minion walks from (0, 0) to (2, 2)
walkingMinion.walksTo(3,3)
// => minion walks from (2, 2) to (3, 3)

console.log("===== #2.2 Data Hiding Using Symbols =====");

// You can also use Symbols for data hiding
function FlyingMinion(name='minion', hp=10){
  let position = Symbol('position');
  
  this.hp = hp;
  this.name = name;
  this.toString = () => this.name;
 
  this[position] = {x: 0, y: 0};
  this.fliesTo = (x,y) => {
    console.log(`${this} flies like the wind from (${this[position].x}, ${this[position].y}) to (${x}, ${y})`);
    this[position].x = x;
    this[position].y = y;
  };
};

// again you cannot access the position property (almost)
let flyingMinion = new FlyingMinion();
console.log(flyingMinion.position);
// => undefined

flyingMinion.fliesTo(1,1);
// => minion flies like the wind from (0, 0) to (1, 1)
flyingMinion.fliesTo(3,3);
// => minion flies like the wind from (1, 1) to (3, 3)










