/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript
Chapter 06 - The Basics of Objects in JavaScript

*/

console.log('===== #1. The Basics of Objects in JavaScript ======');

// You can create a simple object using an object literal
var critter = {};
console.log(critter);
// => [object Object] {...}

// Of course an object is more useful if it has
// some properties and methods
critter = {
  position: {x: 0, y: 0},
  movesTo: function (x, y){
    console.log(this + ' moves to (' + x + ',' + y + ')');
    this.position.x = x;
    this.position.y = y;
  },
  toString: function(){
    return 'critter';
  },
  hp: 40
};

critter.movesTo(10, 10);
// => critter moves to (10,10)
// note how we used `this` to refer 
// to properties within the object itself

console.log('===== #2. Augmenting Objects ======');
// You can augment an object with new properties
// and methods any time
critter.damage = 1;
critter.attacks = function(target) {
  console.log(this + ' rabidly attacks ' + target + ' with ' + this.damage + ' damage');
  target.hp-=this.damage;
};

var rabbit = {hp:10, toString: function(){return 'rabbit';}};

critter.attacks(rabbit);
// => critter rabidly attacks rabbit with 1 damage

console.log('===== #3. Using Special Characters as properties ======');
// You can use special characters as property names by
// taking advantage of the [] notation
critter['sounds used when communicating'] = ['beeeeeh', 'grrrrr', 'tjjiiiiii'];
critter.saysSomething = function(){
  var numberOfSounds = this['sounds used when communicating'].length,
      randomPick = Math.floor(Math.random()*numberOfSounds);

  console.log(this['sounds used when communicating'][randomPick]);
};

critter.saysSomething();
// => beeeeeeh (random pick)
critter.saysSomething();
// => tjjiiiii (random pick)

console.log('===== #4. Getters and Setters ======');
// a very underused feature of JavaScript object literals are
// available since ES5 are getters and setters
var mouse = {
  strength: 1,
  dexterity: 1,
  get damage(){ return this.strength*die20() + this.dexterity*die8();},
  attacks: function(target){
    console.log(this + ' ravenously attacks ' + target + ' with ' + this.damage + ' damage!');
    target.hp-=this.damage;
  },
  toString: function() { return 'mouse';}
};

mouse.attacks(rabbit);
// => mouse ravenously attacks rabbit with 19 damage
mouse.attacks(rabbit);
// => mouse ravenously attacks rabbit with 21 damage!
// note that the actual damage is calculated :) so it may differ

var giantBat = {
  _hp: 1,
  get hp(){ return this._hp;},
  set hp(value){ 
    if (value < 0) { 
      console.log(this + ' dies :(');
      this._hp = 0;
    } else { 
      this._hp = value;
    }
  },
  toString: function(){
    if (this.hp > 0){
      return 'giant bat';
    } else {
      return 'a dead giant bat';
    }
  }
};

mouse.attacks(giantBat);
// => "mouse ravenously attacks giant bat with 23 damage!"
// => "giant bat dies :("
console.log(giantBat.toString());
// => a dead giant bat


console.log('===== #5. Method overloading ======');

var venomousFrog = {
  toString: function(){
    return 'venomous frog';
  },
  jumps: function(meters){ console.log(this + ' jumps ' + meters + ' meters in the air');},
  jumps: function(arbitrarily) { console.log( this + ' jumps ' + arbitrarily);}
};

venomousFrog.jumps(10);
// => venomous frog jumps 10
// ups we have overwritten a the first jumps method

venomousFrog.jumps = function(arg){
  if (typeof(arg) === 'number'){
    console.log(this + ' jumps ' + arg + ' meters in the air');
  } else {
    console.log( this + ' jumps ' + arg);            
  }
};

venomousFrog.jumps(10);
// => venomous frog jumps 10 meters
venomousFrog.jumps('wildly in front of you');
// => venomous frong jumps wildly in front of you

console.log('===== #6. Using Factories to Encapsulate Object Creation ======');

function monster(type, hp){
  return {
    type: type,
    hp: hp || 10,
    toString: function(){return this.type;},
    position: {x: 0, y: 0},
    movesTo: function (x, y){
      console.log(this + ' moves to (' + x + ',' + y + ')');
      this.position.x = x;
      this.position.y = y;
    }
  };
}

var tinySpider = monster('tiny spider', /* hp */ 1);
var giantSpider = monster('giant spider', /* hp */ 200);
tinySpider.movesTo(1,1);
// => tiny spider moves to (1,1)
giantSpider.movesTo(10,10);
// => giant spider moves to (10,10);

console.log('===== #7. Data privacy in JavaScript ======');

// you can use factories and closures
// to achieve data privacy
function stealthyMonster(type, hp){
  var position = {x: 0, y: 0};
  
  return {
    type: type,
    hp: hp || 10,
    toString: function(){return 'stealthy ' + this.type;},
    movesTo: function (x, y){
      console.log(this + ' moves stealthily to (' + x + ',' + y + ')');
      // this function closes over (or encloses) the position variable
      // position is NOT part of the object itself, it's a free variable
      // that's why you cannot access it via this.position
      position.x = x;
      position.y = y;
    }
  };
}

var darkSpider = stealthyMonster('dark spider');
console.log(darkSpider.position)
// now position is completely private
// => undefined
darkSpider.movesTo(10,10);
// => stealthy dark spider moves stealthily to (10,10)

// ENTER ECMASCRIPT 6!!!!!
// Let's rewrite everything! wiiii!
console.log('===== #8. ES6. Method Shorthand ======');

let sugaryCritter = {
  position: {x: 0, y: 0},
  // from movesTo: function(x, y) to...
  movesTo(x, y){
    console.log(`${this} moves to (${x},${y})`);
    this.position.x = x;
    this.position.y = y;
  },
  // from toString: function() to...
  toString(){
    return 'sugary ES6 critter';
  },
  hp: 40
};

sugaryCritter.movesTo(10, 10);
// => sugary ES6 critter moves to (10, 10)

console.log('===== #9. ES6. Property Shorthand ======');

function sugaryStealthyMonster(type, hp = 10){
  let position = {x: 0, y: 0};
  
  return {
    // with property shorthand we avoid the need to repeat 
    // the name of the variable twice (type: type)
    type,
    hp,
    toString(){return `stealthy ${this.type}`;},
    movesTo(x, y){
      console.log(`${this} moves stealthily to (${x},${y})`);
      position.x = x;
      position.y = y;
    }
  };
}

let sugaryOoze = sugaryStealthyMonster('sugary Ooze', /*hp*/ 500);
sugaryOoze.movesTo(10, 10);
// => stealthy sugary Ooze moves stealthily to (10,10)

console.log('===== #10. ES6. Computed Properties ======');

// with computed properties you can
// use any expression as the name of a property:
let theArrow = () => 'I am an arrow';
let crazyMonkey = {
  // ES5 valid
  name: 'Kong',
  ['hates!']: ['mario', 'luigi'],
  // ES6 computed properties
  [(() => 'loves!')()]: ['bananas'],
  // crazier yet
  [theArrow]: `what's going on!?`,
  [sugaryOoze.type]: sugaryOoze.type
}

// when we inspect the object you can appreciate
// how the expressions have been turned into strings
console.log(crazyMonkey);
// => [object Object] {
//    function theArrow() {
//      return 'I am an arrow';
//    }: "what's going on!?",
//    hates!: ["mario", "luigi"],
//    loves!: ["bananas"],
//    name: "Kong",
//  sugary Ooze: "sugary Ooze"
// }

console.log(crazyMonkey[theArrow]);
// => "what's going on!?"

console.log('===== #11. ES6. Symbols and Data Privacy with Symbols ======');

// you can create symbols via the Symbol function
let anUndescriptiveSymbol = Symbol();
console.log(anUndescriptiveSymbol);
// => [object Symbol]
console.log(typeof anUndescriptiveSymbol);
// => symbol
console.log(anUndescriptiveSymbol.toString());
// => Symbol()

// you can add a description to the Symbol
// so you can identify a symbol later on
let up = Symbol('up');
console.log(up.toString());
// => Symbol(up)

// each symbol is unique and immutable
console.log(`Symbol('up') === Symbol('up')?? ${Symbol('up') === Symbol('up')}`);
// => Symbol('up') === Symbol('up')?? false

function flyingMonster(type, hp = 10){
  let position = Symbol('position');
  
  return {
    [position]: {x: 0, y: 0},
    type,
    hp,
    toString(){return `stealthy ${this.type}`;},
    movesTo(x, y){
      console.log(`${this} flies like the wind from (${this[position].x}, ${this[position].y}) to (${x},${y})`);
      this[position].x = x;
      this[position].y = y;
    }
  };
}
let pterodactyl = flyingMonster('pterodactyl');
pterodactyl.movesTo(10,10);
// => stealthy pterodactyl flies like the wind from (0,0) to (10,10)
// since we don't have a reference to the symbol
// we cannot get access to the position property
console.log(pterodactyl.position);
// => undefined

// because each symbol is unique we cannot access the property using a nother symbol with the same description
console.log(pterodactyl[Symbol('position')]);
// => undefined


// there's a drawback with Symbols
// even though they were created as a way to achieve data privacy
// the ECMA committee drop the private part in the last moment
// so that Symbols are not truly private
// you can access then via the Object.getOwnPropertySymbols function
var symbolsUsedInObject = Object.getOwnPropertySymbols(pterodactyl);
var position = symbolsUsedInObject[0];
console.log(position.toString());
// => Symbol(position)
// Got ya!

console.log(pterodactyl[position]);
// => {x: 10, y: 10}
// ups!





// helpers functions XD
function dieX(x){ return () => Math.round(Math.random()*x);}
function die8(){ return dieX(8)();}
function die20(){ return dieX(20)();}










