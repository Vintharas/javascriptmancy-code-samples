/* 
 *
 * JavaScript-mancy 
 * Black Tower Summoning: Traits Like Mixins But Better
 *
 *
 */

let Trait = require('traits.js');

console.log("===== Class Free Inheritance =====");
console.log("===== Safer Object Composition with Traits =====");

console.log("=== traits with traits.js ===");

// Traits traditionally can only provide behavior
// With traits.js you provide behavior and state
// Instead of combining a class or object with traits
// You define an object as a collection of traits

// let's imagine we have a behavior that defines something that can be positioned in a 2 dimensional space

let TPositionable = Trait({
  x: 0,
  y: 0,
  location(){
    console.log(`${this} is calmly resting at (${this.x}, ${this.y})`);
  }
});

// And now let's define a minion that we can compose with this positioned trait
// The minion will gain that ability of being able to have a position
function MinionWithPosition(){
  var methods = {
    toString(){ return 'minion';}
  };
  var minion = Object.create(/* prototype */ methods, /* traits */ TPositionable);

  return minion;
}


var minionWithPosition = MinionWithPosition();
minionWithPosition.location();
// => minion is calmly resting at (0, 0)

console.log("=== composing traits with each other ===")

// you can compose traits with each other
// and define objects in terms of multiple traits
// let's define a new trait that represents something being able to move

let TMovable = Trait({
  x: Trait.required,
  y: Trait.required,
  movesTo(x,y){
      "use strict"; 
    // due to jsbin bug I need to use function level strict mode
    // you wouldn't need this with script level strict mode
      console.log(`${this} moves from (${this.x}, ${this.y}) to (${x}, ${y})`);
      this.x = x;
      this.y = y;
  }
});

// this trait requires two properties x and y that represent a position
// and provide a method to move something from one place to another

function MovingMinion(){
  var methods = {
    toString() { return 'moving minion';}
  };
  var minion = Object.create(/* prototype */ methods,
       Trait.compose(TPositionable, TMovable));
  return minion;
}

var movingMinion = MovingMinion();
movingMinion.location();
// => moving minion is calmly resting at (0, 0)
movingMinion.movesTo(2,2);
// => moving minion moves from (0, 0) to (2, 2)
movingMinion.location();
// => moving minion is calmly resting at (2, 2)
// what an oxymoron

// what happens if we miss any of the required properties?

console.log("=== what happens if you miss required properties ===")

function ConfusedMinion(){
  var methods = {
    toString() { return 'confused minion'; }
  };
  var minion = Object.create(/* prototype */ methods, TMovable);
  return minion;
}

var confusedMinion = ConfusedMinion();
try{
  confusedMinion.movesTo(1,1);
  // => confused minion moves from (undefined, undefined) to (1, 1);
} catch (e) {
  console.log(e.message);
  // => Cannot assign to read only property 'x' of [object Object]
}

// because the requirement is not met
// traits.js creates a read only property that throws when you try to set it to some value
// (note that you need to enable strict mode for this to happen)

console.log("=== Resolving Name Conflicts ===")

// Unlike *mixins* which only support linear composition where later mixins overwrite the previous ones, *Traits* composition order is irrelevant. 
// With traits conflicting methods or properties must be resolved explicitly.

let TPositionable3D = Trait({
  x: 0, // conflict
  y: 0, // conflict 
  z: 0,
  location(){ // conflict
    console.log(`${this} is calmly resting at (${this.x}, ${this.y}, ${this.z})`);
  }
});

function ConflictedMinion(){
  var methods = {
    toString() { return 'conflicted minion'; }
  };
  var minion = Object.create(/* prototype */ methods, 
      Trait.compose(TPositionable, TPositionable3D));
  return minion;
}

// if we attempt to access any of the conflicting properties
// we get an exception
var conflictedMinion = ConflictedMinion();
try {
  conflictedMinion.location();
} catch (e) {
  console.log(e.message);
  // => Conflicting property: location
  // ouch!
}

console.log("=== Renaming Conflicting Properties ===")

function AliasedMinion(){
  var methods = {
    toString() { return 'aliased minion'; }
  };
  var minion = Object.create(/* prototype */ methods, 
      Trait.compose(TPositionable, 
                    TMovable,
                    Trait.resolve({x: 'x3d', 
                               y: 'y3d', 
                               location: 'location3d'
                             }, TPositionable3D)));
  return minion;
}

var aliasedMinion = new AliasedMinion();
aliasedMinion.location3d();
// => aliased minion is calmly resting at (0, 0, 0)
aliasedMinion.location();
// => aliased minion is calmly resting at (0, 0)


// the object composed from these traits
// after having resolved the conflicting properties via renaming
// looks like this:
console.log(aliasedMinion);
/* => [object Object] {
  toString: function toString() {
      return 'aliased minion';
    },
  x: 0,
  x3d: 0,
  y: 0,
  y3d: 0,
  z: 0
}
*/
console.log(aliasedMinion.location);
// => function location() {
//  console.log(this + " is calmly resting at (" + // this.x + ", " + this.y + ")");
// }
console.log(aliasedMinion.location3d);
// => function location() {
//  // conflict
//  console.log(this + " is calmly resting at (" + // this.x + ", " + this.y + ", " + this.z + ")");
// }

console.log("=== Excluding Conflicting Properties ===")

function LeanMinion(){
  var methods = {
    toString() { return 'lean minion'; }
  };
  var minion = Object.create(/* prototype */ methods, 
      Trait.compose(TPositionable, 
                    TMovable,
                    Trait.resolve({x: undefined, 
                               y: undefined, 
                               location: 'location3d'
                             }, TPositionable3D)));
  return minion;
}

var leanMinion = LeanMinion();
leanMinion.location3d();
// => lean minion is calmly resting at (0, 0, 0)
leanMinion.location();
// => lean minion is calmly resting at (0, 0)

// the object composed from these traits
// after having resolved the conflicting properties via excluding
// looks like this:
console.log(leanMinion);
/*
[object Object] {
  toString: function toString() {
      return 'lean minion';
    },
  x: 0,
  y: 0,
  z: 0
}
*/

leanMinion.movesTo(1,1);
// => lean minion moves from (0, 0) to (1, 1)
leanMinion.location3d();
// => lean minion is calmly resting at (1, 1, 0)
leanMinion.location();
// => lean minion is calmly resting at (1, 1)


console.log("=== Overriding Properties ===")

function OverridenMinion(){
  var methods = {
    toString() { return 'overriden minion'; }
  };
  var minion = Object.create(/* prototype */ methods, 
      Trait.compose(TMovable,
                    Trait.override(TPositionable3D, TPositionable)));
  return minion;
}

var overridenMinion = OverridenMinion();
overridenMinion.location();
// => overriden minion is calmly resting at (0, 0, 0)
overridenMinion.movesTo(1,2);
// => overriden minion moves from (0, 0) to (1, 2)
overridenMinion.location();
// => overriden minion is calmly resting at (1, 2, 0)

console.log(overridenMinion);
/* => 
[object Object] {
  toString: function toString() {
      return 'overriden minion';
    },
  x: 1,
  y: 2,
  z: 0
}

*/

console.log("=== Traits and Data Privacy ===")

console.log("=== Closures ===")
// to implement data privacy via closures we need to wrap our
// traits in functions


let TPositionableFn = function(state){
  var position = state.position;
  return Trait({
    location(){
      console.log(`${this} is calmly resting at (${position.x}, ${position.y})`);
    }
  });
}

let TMovableFn = function(state) {
  var position = state.position;
  return Trait({
    movesTo(x,y){
      console.log(`${this} moves from (${position.x}, ${position.y}) to (${x}, ${y})`);
      position.x = x;
      position.y = y;
    }
  });
}

function PrivateMinion(){
  var state = { position: {x: 0, y: 0} }, 
    methods = { toString: () => 'private minion' };
  
  var minion = Object.create(/* prototype */ methods,
       Trait.compose(TPositionableFn(state), TMovableFn(state)));
  return minion;
}

var privateMinion = PrivateMinion();
// we can access the public API as usual
privateMinion.movesTo(1,1);
// => private minion moves from (0, 0) to (1, 1)
privateMinion.location();
// => private minion is calmly resting at (1, 1)

// but the private state can't be accessed
console.log(privateMinion.state);
// => undefined

console.log("=== High Integrity Objects With Immutable Traits ===")

function ImmutableMinionWithPosition(){
  var methods = {
    toString(){ return 'minion';}
  };
  var minion = Trait.create(/* prototype */ methods, /* traits */ TPositionable);

  return minion;
}

var immutableMinion = ImmutableMinionWithPosition();
immutableMinion.location();
// => minion is calmly resting at (0, 0)

console.log('== The resulting object of using Trait.create is immutable: it will throw exceptions if we try to change a property, delete an existing property or add new ones.');

(function(){
  'use strict'; // jsBin doesn't support global use strict mode
  // immutableMinion.x = 10;
  // => TypeError: Cannot assign to read only property 'x'
  // delete immutableMinion.x; 
  // => TypeError: Cannot delete property 'x'
  // immutableMinion.health = 100; 
  // => TypeError: Can't add property health, object is not extensible

}());

console.log('Trait.create will also throw an exception when trying to create an object with missing requirements');

function ConfusedMinionThatThrows(){
  var methods = {
    toString() { return 'confused minion'; }
  };
  var minion = Trait.create(/* prototype */ methods, TMovable);
  return minion;
}

try {
  var confusedMinionThatThrows = ConfusedMinionThatThrows();
} catch (e) {
  console.log(e.message);
  // => Missing required property: x
}

console.log('== and also when there are unresolved conflicts')

function ConflictedMinionThatThrows(){
  var methods = {
    toString() { return 'conflicted minion'; }
  };
  var minion = Trait.create(/* prototype */ methods, 
      Trait.compose(TPositionable, TPositionable3D));
  return minion;
}

try{
  var conflictedMinionThatThrows = ConflictedMinionThatThrows();
} catch(e){
  console.log(e.message);
  // => Remaining conflicting property: location
}

console.log('=== Managing state with Trait.create');
console.log('You can take advantage of Trait.create to get a great developer experience and also be able to handle state by separating mutable from immutable state');

function TPositionableWithState(x, y){
  return Trait({
    get x() { return x; },
    set x(value) { x = value; },
    get y() { return y; },
    set y(value) { y = value; },

    location(){
      console.log(`${this} is calmly resting at (${x}, ${y})`);
    }
  });
}

function TMovableWithState(){
  return Trait({
    x: Trait.required,
    y: Trait.required,

    movesTo(newX, newY){
      console.log(`${this} moves from (${this.x}, ${this.y}) to (${newX}, ${newY})`);
      this.x = newX;
      this.y = newY;
    }
  });
}

function StatefulMinion(x, y){
  var methods = {
    toString(){ return 'minion';}
  };
  var minion = Trait.create(/* prototype */ methods, 
                            /* traits */ Trait.compose(
              TPositionableWithState(x,y),
              TMovableWithState()));
  return minion;
}

let statefulMinion = StatefulMinion(1, 1);
statefulMinion.location();
// => minion is calmly resting at (1, 1)
statefulMinion.movesTo(2, 2);
// => minion moves from (1,1) to (2,2)
statefulMinion.location();
// => minion is calmly resting at (2, 2)




