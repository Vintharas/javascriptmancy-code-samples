/* jshint esnext:true */
'use strict'
startWorld();

/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript
Chapter 01 - The Basic Ingredients of JavaScript-mancy

*/

narrate("=== Act 1: The Basic Ingredients of JavaScript-mancy ===");

// add more fun to this XD
narrate("And so here are we... at the start of a new adventure, " +
  "our heroine sleeping peacefully in the middle a clearing, " +
  "surrounded by the darkness of a moonless night. " +
  "\nWe will call her stranger since we do not yet know her name... "
);

stranger.says('hmmm... what?! where!?');
try {
  stranger.weaves('Console.WriteLine("lux++!")');
} catch (e) {
  world.error(e.toString());
  // => ReferenceError: Console is not defined
}

stranger.says('hmm?');

try {
  stranger.weaves('Console.WriteLine("lux = lux + 1 !!")');
} catch (e) {
  world.error(e.toString());
  // => ReferenceError: Console is not defined
}

narrate("The stranger curses and looks startled. Well I suppose she looks startled, is hard to see a person's expression in the complete blackness of a moonless night as you well know");

randalf.says("I'm afraid that is not going to work here...");
randalf.weaves("lux();");
// => A tiny wisp of light appears out of thin air and illuminates the surroundings

narrate("Ok, now! THAT, my friend, is what startled looks like!");

randalf.says("Hmm, you are not ready yet... You are going to need to learn some ~~~JavaScript~~~");



narrate("===Scene 1: JavaScript as a dynamic language===");


// A variable can reference any type during its lifetime,
// a minion can start as a number of all things
var minion = 1;
console.log(minion);
// => 1

// but I can do some alchemy and transform that minion into something else
// a string, for instance,
minion = "bunny";
console.log(minion);
// => "bunny"

// and I can keep doing that for as long as I want
minion = { name: 'bugs', type: 'bunny' };
console.log(minion);
// => Object {name: 'bugs', type: 'bunny'}

// an object isn't defined by a blueprint class like in C#
// and you can augment it with new properties at any point in time
minion.description = 'A mean looking bunny';
console.log(minion);
// => Object {name: bugs, type: bunny, description: A mean looking bunny}



narrate("=== Scene 2: JavaScript types ===");

// JavaScript supports many types
// There a single type to represent number: Number
// which is pretty nice if you ask me, not having to think about
// doubles and shorts and longs and floats...

var one = 1;
console.log(typeof (one));
// => "number"

var oneAndAHalf = 1.5;
console.log(typeof (1.5));
// => "number"

// There's a string type that works as you would expect
// which works with both double and single quotes (",')
var text = "Thou shalt not pass!";
console.log(typeof (text));
// => "string"

var anotherBitOfText = 'No! Thou Shalt Not Pass!';
console.log(typeof (anotherBitOfText));
// => "string"

// There's a boolean type as well
var always = true;
var never = false;
console.log(typeof (always));
// => "boolean"

// And an object type to represent that we can use to create
// any custom types
var skull = { name: 'Skull of Dark Magic' };
console.log(typeof (skull));
// => object

// JavaScript has two ways of representing the lack of something,
// so in addition to `null` we have `undefined`
// Any variable that hasn't yet been defined in JavaScript
// will have the value of `undefined` by default
// whereas `null` needs to be set explicitly
console.log(skull.description);
// => undefined
console.log(typeof (skull.description));
// => undefined
skull.description = null;
console.log(typeof (skull.description));
// => object :)

// ECMAScript 6 comes with a new type, the Symbol
// Symbols can be seen as constant and immutable tokens
// that can be used as unique Ids
var crux = Symbol();
console.log(typeof (crux));

// In practice, however, everything within JavaScript can be treated as an object
// numbers for instance, provide several of methods that you can use:

console.log((1).toString())
// => 1
console.log((3.14159).toPrecision(3))
// => 3.141
console.log((5000).toLocaleString('sv-SE'));
// => 5 000

// Although what is really happening is that the JavaScript runtime is wrapping
// primitive values in special wrapper objects
// in the case of numbers, the `Number` wrapper object:

var number = new Number(1);
console.log(number);
// => Number {}
console.log(typeof (number))
// => 'object'
// you can unwrap the original value with valueOf
console.log(number.valueOf())
// => 1

// Even more remarkable functions behave like objects
// they have their own methods
var fireBall = function () { world.spell('A blazing ball of fire materializes from the palm of your hand!'); };
fireBall();
// => a blazing ball of fire...
console.log(fireBall.apply);
// => function apply(){}

// and you can even add properties to a function
fireBall.maxNumberOfCharges = 5;
console.log(fireBall.maxNumberOfCharges);
// => 5;

narrate("=== Scene 4: Strings in JavaScript ===");

console.log("hi there");
// => hi there
console.log("creepy");
// => creepy
console.log("stop repeating what I say");
// => stop repeating what I say

// Unlike in C# you can use both single (`'`) and double quotes (`"`) to create a string. Oftentimes you will see one used to escape the other:

console.log("this ain't cool man");
// => this ain't cool man
console.log('you think you are so "funny"');
// => you think you are so "funny"


// Any string has a number of useful methods:

console.log("I am tired of you devious REPL".split(' '));
// => ["I", "am", "tired", "of", "you", "devious", "REPL"]
console.log("I am tired of you devious REPL".replace('tired', 'ecstatic'));
// => I am ecstatic of you devious REPL
console.log("I am tired of you devious REPL".indexOf('tired'));
// => 5

// ES6 also brings a number of new methods like `startsWith`, `endsWith`, `repeat`:

console.log("Stop REPL!".startsWith("Stop"));
// => true
console.log("Stop REPL!".endsWith("REPL!"));
// => true
console.log("NaN".repeat(10) + " BatMan!!!");
// => NaNNaNNaNNaNNaNNaNNaNNaNNaNNaN BatMan!!!!
console.log("ha! Now I beat you at your own game!");
// => "ha! Now I beat you at your own game!"

// Template strings let you inject values within a string
// (string interpolation)

var target = 'minion';
var spell = 'hellfire';
console.log(`obliterate ${target} with ${spell}!`);
// => obliterate minion with hellfire!


// Template strings also let you easily create multi-line strings.
// Where in the past you were forced to make use of string concatenation and the new line character `\n`:


console.log("One ring to rule them all\n" +
  "One ring to find them;\n" +
  "One ring to bring them all\n" +
  "and in the darkness bind them");
// =>  One ring to rull them all
//     One ring to find them;
//     One ring to bring them all
//     and in the darkness bind them

// ES6 Template strings let you write a multi-line string in a more straightforward fashion:

console.log(`One ring to rull them all
  One ring to find them
  One ring to bring them all
  and in the darkness bind them`);
// =>  One ring to rull them all
//     One ring to find them;
//     One ring to bring them all
//     and in the darkness bind them


narrate("=== Scene 5: Functions in JavaScript ===");

// Functions are the most basic building component in JavaScript.
// They live very independent lives and you'll often see them alone in the wild:

function obliterate(target) {
  console.log(`${target} is obliterated into tiny ashes`);
}
obliterate('rabid bunny');
// => rabid bunny is obliterated into tiny ashes

//JavaScript lets you call a function with any number of arguments, even if they are not defined in a functions signature:

obliterate('rabid bunny', 'leprechaun', 'yeti');
// => rabid bunny is obliterated into tiny ashes

// And even with no arguments at all, although depending on the function implementation it may cause some chaos and some mayhem:

obliterate();
// => undefined is obliterated into tiny ashes

// You can use the very special `arguments` to get hold of the arguments being passed at runtime to a given function:

function obliterateMany() {
  // ES6 method to convert arguments to an actual array
  var targets = Array.from(arguments).join(', ');
  console.log(`${targets} are obliterated into tiny ashes`);
}
obliterate('Rabid bunny', 'leprechaun', 'yeti')
// => Rabit bunny, leprechaun, yeti are obliterated into tiny ashes

// Or the finer **ES6 rest syntax** reminescent of C# `params`:

function obliterateMany(...targets) {
  var targets = Array.from(arguments).join(', ');
  console.log(`${targets} are obliterated into tiny ashes`);
}
obliterate('Rabid bunny', 'leprechaun', 'yeti');
// => Rabit bunny, leprechaun, yeti are obliterated into tiny ashes

//  An interesting and very important aspect of functions in javascript is that they can be treated as values. Functions are just like any other type in JavaScript, you can store them in variables, you can pass them as arguments to other functions and you can return them from a function.

// For instance, let's say you want to create a very special logger that prepends your name to any message that you wish to log:

var log = function (msg) { console.log(msg); }
var logByRandalf = function (msg, logFn) {
  logFn(`Randalf logs: ${msg}`);
}
logByRandalf('I am logging something, saving it to memory for ever', log);
// => Randalf logs: I am logging something, saving it to memory for ever

// But that was a little bit awkward, what if we return a function with the new functionality that we desire:

var createLogBySomeone = function (byWho) {
  return function (msg) {
    return console.log(`Randalf logs: ${msg}`);
  };
}
var logByRandalf = createLogBySomeone('Randalf');
logByRandalf('I am logging something, saving it to memory for ever');
// => Randalf logs: I am logging something, saving it to memory for ever

narrate("=== Scene 5.1: JavaScript has Function Scope ===");

// JavaScript has function scope

function scopeIsNuts() { // new scope for scopeIsNuts
  console.log(x); // => undefined
  if (true) {
    var x = 1;
  }
  console.log(x); // => 1
}

// But if we replace the `if` block with a new function `inner`, then we have two scopes:

function outer() { // new scope for outer
  var x = 0;
  console.log(x); // => 0

  function inner() { // new scope for inner
    var x = 1;
    console.log(x); // => 1
  }
  inner();

  console.log(x); // => 0
}

// ES6 attemps to bring an end to the confussion of JavaScript having function scope with the `let` keyword that lets you create variables with block scope.

function scopeIsNuts() { // new scope for scopeIsNuts
  console.log(x); // => undefined
  if (true) {
    let x = 1;
    console.log(x); // => 1
  }
  console.log(x); // => undefined
}

// Now the `x` variable only exists within the `if` statement block. Additionally, you can use the `const` keyword to declare constant variables with block scope.

/*
function scopeIsNuts(){ // new scope for scopeIsNuts
    console.log(x); // => undefined
    if (true){
        const x = 1;
        console.log(x); // => 1
        x = 2; // => TypeError
    }
    console.log(x); // => undefined
}
*/

narrate("=== Scene 5.2: ES6 Default Arguments ===");

// ES6 comes with default arguments

function fireBallDefaults(target, mana = 10) {
  var damage = 1.5 * mana;
  console.log(`A huge fireball springs from
your fingers and hits the ${target} with ${damage} damage`);
}
fireBallDefaults('troll')
// => A huge fireball springs from your fingers and hits the troll
//    with 15 damage
fireBallDefaults('troll', /* mana */ 50)
// => A huge fireball springs from your fingers and hits the troll
//    with 75 damage

narrate("=== Scene 5.3: ES6 Destructuring ===");

// Another nifty ES6 feature is destructuring. Destructuring lets you unwrap any given object into a number of properties and bind them to variables of your choice. You can take advantage of destructuring with any object:

var { hp, defense } = {
  name: 'conan',
  description: 'cimmerian barbarian king of thieves',
  hp: { current: 9000, max: 9000 },
  defense: 100, attack: 400
};
console.log(hp);
// => {current: 9000, max: 9000}
console.log(defense);
// => 100

// Even when passing an object to a function:

function calculateDamage({ attack }, { hp, defense }) {
  var effectiveAttackRating = attack - defense + getHpModifier(hp);
  var damage = attackRoll(effectiveAttackRating);
  return damage > 0 ? damage : 0;

  function getHpModifier(hp) {
    return hp.current < 0.1 * hp.max ? 10 : 0;
  }
  function attackRoll(dice) {
    // do some fancy dice rolling
    return dice;
  }
}
var troll = {
  name: 'Aaagghhhh', description: 'nasty troll',
  hp: { current: 20000, max: 20000 },
  defense: 40, attack: 100
};
var conan = { name: 'conan', hp: { current: 200, max: 200 }, defense: 1000, attack: 1000 };
console.log(calculateDamage(troll, conan));
// => 0
// => no troll gonna damage conan

narrate("=== Scene 5.4: Arrow Functions ===");

// Another great feature brought by ES6 are arrow functions which resemble C# lambda expressions. Instead of writing the `obliterate` function as we did before, we can use the arrow function syntax:

/*
> function obliterate(target){
    console.log(`${target} is obliterated into tiny ashes`);
}
*/

obliterate = target =>
  console.log(`${target} is obliterated into tiny ashes`);
obliterate('minion');
// => minion is obliterated into tiny ashes
obliterate('rabid bunny');
// => rabid bunny is obliterated into tiny ashes

// And if you have a function with more arguments or statements, you can write it just like we do in C#:


obliterateMany = (...targets) => {
  targets = targets.join(', ');
  console.log(`${targets} are obliterated into tiny ashes`);
};
obliterateMany('bunny', 'leprechaun', 'yeti');
// => Bunny, leprechaun, yeti are obliterated into tiny ashes

narrate("=== Scene 6: Objects in JavaScript ===");

// JavaScript has great support for object-oriented programming with objects literals, constructor functions, prototypical inheritance, ES6 classes and less orthodox OOP paradigms like mixins and stamps.

// Objects in JavaScript are just key/value pairs. The simplest way to create an object is using an object literal:

var scepterOfDestruction = {
  description: 'Scepter of Destruction',
  toString: function () {
    return this.description;
  },
  destruct: function (target) {
    console.log(`${target} is instantly disintegrated`);
  }
}
scepterOfDestruction.destruct('apple');
// => apple is instantly disintegrated

// ES6 makes easier to create object literals with syntactic sugar for functions also known as *method shorthand*:

var scepterOfDestructionShorthand = {
  description: 'Scepter of Destruction',
  toString() {
    return this.description;
  },
  destruct(target) {
    console.log(`${target} is instantly disintegrated`);
  }
}

// And for creating properties from existing variables also known as *property shorthand*:

var damage = 10000;
var scepterOfDestructionMoreShorthand = {
  description: 'Scepter of Destruction',
  damage, // as opposed to damage: damage
  toString() {
    return this.description;
  },
  destruct(target) {
    console.log(`${target} is instantly disintegrated`);
  }
}
console.log(scepterOfDestructionMoreShorthand.damage);
// => 10000

// This works great for one-off objects. When you want to reuse the same type of object more than once you can either use a vanilla factory method or a constructor function with the `new` keyword:

// by convention constructor functions are capitalized
function Scepter(name, damage, spell) {
  this.description = `Scepter of ${name}`,
    this.damage = damage;
  this.castSpell = spell;
  this.toString = () => this.description;
}
var scepterOfFire = new Scepter('Fire', 100,
  (target) => console.log(`${target} is burnt to cinders`));
scepterOfFire.castSpell('grunt');
// => grunt is burnt to cinders

narrate("=== Scene 6.1. Prototypical Inheritance ===");

// Yet another big diffence between C# and JavaScript are their inheritance models. JavaScript exhibits what is known as prototypical inheritance. That means that objects inherit from other objects which therefore are called prototypes.

// Let's say that you have an object that represents an abstraction for any item that can exist in your inventory:

var item = {
  durability: 100,
  sizeInSlots: 1,
  toString() { return 'an undescriptive item'; }
}
console.log(item.toString());
// => an undescriptive item

// And a two handed iron sword that in addition to being an item (and an awesome item at that) has its own specific set of traits:

var ironTwoHandedSword = {
  damage: 60,
  sizeInSlots: 2,
  wield() {
    console.log('you wield your iron sword crazily over your head');
  },
  material: 'iron',
  toString() { return 'A rusty two handed iron sword'; }
};

// You can take advantage of JavaScript prototypical inheritance to reuse the item properties across many items, by setting the `item` object as the prototype of the `ironTwoHandedSword` (and any other specific items that you create afterwards).

Object.setPrototypeOf(ironTwoHandedSword, item);

// This will establish a prototypical chain, so that, if we attempt to retrieve the sword `durability`, the JavaScript runtime will traverse the chain and retrieve the property from the `item` prototype:

console.log(ironTwoHandedSword.durability);
// => 100

// If, on the other hand, you attemp to access a property that exists in both the prototype and the object itself, the nearest property in the chain will win:

console.log(ironTwoHandedSword.toString());
// => A rusty two handed iron sword

// ES6 exposes the `__proto__` property that lets you directly assign a prototype through an object literal:

ironTwoHandedSword = {
  __proto__: item,
  damage: 60,
  // etc...
};
ironTwoHandedSword.prototype = item;

narrate("=== Scene 6.2: ES6 Classes ===");

// A JavaScript class looks very similar to a C# class:

class Item {
  constructor(durability = 100, sizeInSlots = 1) {
    this.durability = durability;
    this.sizeInSlots = sizeInSlots;
  }
  toString() {
    return 'an undescriptive item';
  }
}
var item = new Item();
item.toString();
// => an undescriptive item

// And so does inheritance:

class Sword extends Item {
  constructor(durability = 500, sizeInSlots = 2,
    damage = 50, material = 'iron') {
    super(durability, sizeInSlots);
    this.damage = damage;
    this.material = material;
  }
  wield() {
    console.log(`you wield your ${this.material} sword
crazily over your head`);
  }
  toString() {
    return `A ${this.material} sword`;
  }
};
var sword = new Sword();
sword.wield();
// => you wield your iron sword crazily over your head

narrate("=== Scene 7: Arrays in JavaScript ===");

// Up until recently JavaScript had only one single data structure, albeit very verstatile, to handle collections of items: the array. You can create an array using using square brackets `[]`:

console.log([1, 2, 3, 4, 5]);
// => [1,2,3,4,5]

// You can mix and match the different elements of an array. There's no type restrictions so you can have numbers, strings, objects, functions, arrays, etc...:

var aKendersPouch = [
  'jewel',
  '3 stones',
  1,
  { name: 'Orb of Power' },
  function () { return 'trap!'; }
];

// You can access the items of an array via their indexes:

console.log(aKendersPouch[0]);
// => jewel
console.log(aKendersPouch[4]());
// => trap!

// You can also traverse the indexes of an array using the `for/in` loop:

console.log('iterating over the items in the pouch: ')
for (var idx in aKendersPouch) console.log(aKendersPouch[idx]);
// => jewel
// => 3 stones
// => ...etc
// => function() { return 'trap!';}

// And even better the items of an array using ES6 `for/of` loop:

console.log('iterating over the items in the pouch: ')
for (var item of aKendersPouch) console.log(item);
// => jewel
// => 3 stones
// => ...etc
// => function() { return 'trap!';}

// Arrays have a lot of cool and useful methods that you can use to add/remove or otherwise operate on the items within the array:

console.log(`length: ${aKendersPouch.length}`);
// => length: 5

// add item at the end of the array
console.log(aKendersPouch.push('silver coin'));
// => 6 (returns the current length of the array)
console.log(aKendersPouch.push('6 copper coins', 'dental floss'));
// => 8

// pop item at the end of the array
console.log(aKendersPouch.pop());
// => dental floss

// insert item at the beginning
console.log(aKendersPouch.unshift('The three Musketeers'));
// => 8

// extract item from the beginning of the array
console.log(aKendersPouch.shift());
// => 'The three musketeers'

// And even LINQ-like methods to perform functional style transformations within an array:

const isValuable = item => parseInt(item) > 5;
const toGoldCoins = item => parseInt(item) || 0;
const sumCoins = (sum, price) => sum + price;

var goldCoins = aKendersPouch
  .filter(isValuable) // ES6 analogous to LINQ Where
  .map(toGoldCoins) // analogous to LINQ Select
  .reduce(sumCoins, 0); // analogous to LINQ Aggregate
console.log(goldCoins);
// => 6

narrate("=== Scene 7.1: Spread operator and arrays ");

// The **ES6 spread operator** can also be used to merge or flatten an array within another array:

var newRecruits = ['Sam', 'John', 'Connor'];
var merryBandits = ['Veteran Joe', 'Brave Krom', ...newRecruits];
console.log(merryBandits);
// => ["Veteran Joe", "Brave Krom", "Sam", "John", "Connor"]

narrate("=== Scene 7.2: Maps and Sets ");

// ES6 gives us magicians two new data structures to work with: maps, a true key/value pair data structure and sets to handle collections of unique items.

// You can create a new map using the `Map` constructor:

var libraryOfWisdom = new Map();
libraryOfWisdom.set('A',
  ['A brief history of JavaScript-mancy', 'A Tale of Two Cities']);
console.log(libraryOfWisdom.get('A'));
// => ['A brief history of JavaScript-mancy', 'A Tale of Two Cities'];

// You can even seed a map with existing information by sending an array of key/value pairs:

var libraryOfWisdom = new Map([
  ['A', ['A brief history of JavaScript-mancy', 'A Tale of Two Cities']],
  ['B', ['Better Dead Than Powerless: Tome I of Nigromantics']]
]);
console.log(libraryOfWisdom.get('B'));
// => ['Better Dead Than Powerless: Tome I of Nigromantics']

// In a similar fashion, you create sets using the `Set` constructor:

var powerElements = new Set(['earth', 'fire', 'water', 'wind']);
console.log(powerElements);
// => Set {"earth", "fire", "water", "wind"}

// Sets will ensure that you don't have duplicated data within a collection:

powerElements.add('water').add('earth').add('iron');
console.log(powerElements);
// => Set {"earth", "fire", "water", "wind", "iron"}

narrate("=== Scene 8: Flow Control Structures ===");

// JavaScript gives you the classic flow control structures that you are accustomed to: `if`, `for`, `while` loops behave much in the same way in JavaScript than in C# (but for the function scoped variables of course).

// In addition to these, JavaScript has the `for/in` loop that lets you iterate over the properties of an object:
var spellOfFarseeing =
{
  name: 'Spell of Farseeing',
  manaCost: 10,
  description: 'The spell lets you see a limited' +
    'portion of a far away location;'
}

for (var prop in spellOfFarseeing) {
  console.log(`${prop} : ${spellOfFarseeing[prop]}`);
}
// => name : Spell of Farseeing
// => manaCost : 10
// => description : The spell lets you see a limited portion of a far away location

// And the ES6 `for/of` loop that lets you iterate over collections[^collections] (arrays, maps and sets):

for (var element of powerElements) console.log(element);
// => earth
// => fire
// => water
// => etc...

narrate("=== Scene 8.1: Logical Operators");

// JavaScript equality operators behave in a particularly special way. The operators that you are accustomed to use in C# `==` and `!=` are called **abstract equality operators** and evaluate the equality of expressions in a loose way. If the two expressions being evaluated by one of this operators don't match in type, they'll be converted to a matching type. For instance, in evaluating the abstract equality of `42` and `"42"`, the string will be converted to a number resulting in both values being equal:

console.log(42 == '42');
// => true

// Fortunately JavaScript also provides operators that performs strict equality ( `===` and `!==`) which is basically a comparison of two values without the implicit type conversion.

console.log(42 === '42')
// => false

// This implicit conversion that takes place in JavaScript gives birth to the concept of *truthy* and *falsey*. Since any value can be evaluated as a boolean, we say that some values like an array `[]` or an object `{}` are truthy, and some other values like empty string `''` or *undefined* are falsey. In the examples below we use the `!!` to explicitly convert values to boolean for clarity purposes:

console.log(!![]);
// => true
console.log(!!{});
// => true
console.log(!!"");
// => false
console.log(!!undefined);
// => false
console.log(!!null);
// => false
console.log(!!0);
// => false

// This allows for a terser way to write `if` statements
if (troll) { } // as opposed to (troll != null && troll != undefined)

// Since `troll` is coerced to a boolean type, having the `troll` variable holding an object value will evaluate to *truthy* and having it holding `null` or `undefined` will be *falsey*. In either case the `if` statement will fulfill its purpose while being much nicer to read.

// **OR** (`||`) and **AND** (`&&`) operations also behave in an interesting way. The *OR* operation will return the first truthy expression or the last falsey expression (if all expressions are falsey):

// 0 falsey
// 'cucumber' truthy
// 42 truthy
console.log(0 || 'cucumber' || 42);
// => 'cucumber'
console.log(0 || false || undefined);
// => undefined

// The *AND* operator will return the last truthy expression or the first falsey expression (if any falsey expression is encountered):

// 0 falsey
// 'cucumber' truthy
// 42 truthy
console.log(0 && 'cucumber' && 42);
// => 0
console.log(true && 'cucumber' && 42)
// => 42

narrate("=== Scene 9: Exception Handling ===");

try { asdf; }
catch (e) { console.log(e.message); }
finally { console.log('done!'); }
// => asdf is not defined
// => done!

// And you can throw new exceptions with the `throw` keyword:

try {
  throw new Error("We're all gonna die!");
} catch (e) {
  console.log(e.message);
}
// => We're all gonna die!


narrate("=== Scene 10: Regular Expressions ===");

// JavaScript also supports regular expressions. You can create a regular expression in two ways, either by wrapping the expression between slash (`/`):

var matchNumbers = /\d+/;
console.log(matchNumbers.test('40 gold coins'));
// => true
console.log(matchNumbers.exec('40 gold coints'));
// => ["40"]

// Or by creating a `RegExp` object:

var matchItems = new RegExp('\\D+');
console.log(matchItems.test('40 gold coins'));
// => true
console.log(matchItems.exec('40 gold coints'));
// => [" gold coins"]

// Strings have built-in support for regular expressions as well with the `match` and `search` methods:

var bagOfGold = '30 gold coins';
console.log(bagOfGold.match(/\d+/));
// => ['30']
console.log(bagOfGold.search(/\d+/));
// => 0 (index where first match is found)

narrate("=== Scene 11: Beware!! JavaScript is weird and dangerous!!!===");

// So far you've seen the bests parts of JavaScript and nothing too weird or inconsistent. But sometimes you'll experience strange behaviors in some less visited corners of JavaScript like any of the following:

x = 10;
// => added a variable to the global scope (window.x)
console.log(NaN == NaN);
// => false
console.log(null == undefined);
// => true
console.log(typeof (null));
// => object
console.log([] + []);
// => ''
console.log([] + {});
// => {}
console.log({} + []);
// => 0
console.log({} + {});
// => NaN

// Oftentimes you won't run into these issues when building real web applications and my advice is that you ignore them. Be aware that they exist but just don't use them, or use patterns or conventions to avoid them.

narrate(`The first rays of a new day like dubious trendils of light
    start approaching the clearing when Randalf notices that the stranger
    is looking weirdly at him...`);

randalf.says("Yes, I know what you are thinking, it is a lot to take in...");
stranger.says('...err... no... Who the hell are you? and whaaaat is a kender?!');








/**** World interface *****/
function createWorld() {
  var world = createWorldAPI(console);
  window.addEventListener('error', function (e) {
    world.error(e.message);
  });
  return world;

  // *** World/Logger code ***
  function createWorldAPI(console) {
    var logFn = console.log,
      errorFn = console.error,
      infoFn = console.info;

    return {
      log: function log() {
        var args = Array.prototype.slice.call(arguments),
          message = formatLogMessage.apply(this, args);
        logFn.apply(console, args);
        addWorldEvent(message);
      },
      error: function error() {
        var args = Array.prototype.slice.call(arguments),
          message = formatLogMessage.apply(this, arguments);
        errorFn.apply(console, args);
        addWorldEvent(message, 'error');
      },
      info: function info() {
        var args = Array.prototype.slice.call(arguments),
          message = formatLogMessage.apply(this, arguments);
        infoFn.apply(console, args);
        addWorldEvent(message, 'info');
      },
      spell: function spell() {
        var args = Array.prototype.slice.call(arguments),
          message = formatLogMessage.apply(this, arguments);
        logFn.apply(console, args);
        addWorldEvent(message, 'spell');
      }

    };

    function formatLogMessage() {
      var args = Array.prototype.slice.call(arguments),
        message = args.reduce(function (acc, item) {
          if (item instanceof Array) {
            item = "[" + item.join(', ') + "]";
          } else if (item instanceof Function) {
            item = item.toString();
          }
          else if (item instanceof Object) {
            var properties = [],
              ctor = item.constructor.name;
            for (prop in item) {
              properties.push(prop + ': ' + item[prop]);
            }
            item = ctor + ' {' + properties.join(', ') + '}';
          }
          return acc + item;
        }, "");
      return message;
    }

    function addWorldEvent(message, type) {
      var theWorld = document.getElementById("theWorld"),
        span = document.createElement('span'),
        type = type || 'event';
      span.className = 'world world-' + type;
      span.innerHTML = message;
      theWorld.appendChild(span);
    }
  }
}


function startWorld() {
  /**** load logging ****/
  window.world = createWorld();
  // hijack logs
  console.log = world.log;
  console.info = world.info;
  console.error = world.error;

  /**** characters *****/
  window.stranger = {
    says: function (msg) { world.log('The stranger says: ' + msg); },
    weaves: function (spell) {
      world.log('The stranger starts weaving a spell!');
      world.log('***' + spell + '***');
      eval(spell);
    }
  }
  window.randalf = {
    says: function (msg) { world.log('Randalf the Red says: ' + msg); },
    weaves: function (spell) {
      world.log('Randalf the Red starts weaving a spell!');
      world.log('***' + spell + '***');
      eval(spell);
    }
  }

  function weaveSpell(spell) {
    eval(spell);
  }
}

function narrate() {
  world.info.apply(console, arguments);
}

/*** Randalf the Red Spells ***/
function lux() {
  world.spell('A tiny wisp of light appears out of thin air and illuminates the surroundings');
}
