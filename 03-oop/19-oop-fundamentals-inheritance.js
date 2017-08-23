/* 
 *
 * JavaScript-mancy - Summoning Fundamentals: Prototypical Inheritance
 *
 */

console.log("==== OOP Fundamentals - Prototypical Inheritance ====");
console.log("===== #1. Prototypical inheritance =====");

console.log("===== #1.1 Prototypical inheritance with initializers =====");
let minion = {
  hp: 10,
  name: 'minion',
  toString(){ return this.name;}
};

// lets convince a giant scorpion to be our minion
let giantScorpion = {
  '__proto__': minion, // here we set the minion as prototype
  name: 'scorpion',
  stings() { 
    console.log(`${this} pierces your shoulder with its venomous sting`); }
}

// access a prototype property via prototype chain
console.log(`giant scorpion has ${giantScorpion.hp} hit points`);
// => giant scorpion has 10 hit points

// if a property is shared between an object and its prototype
// there's no need to traverse the prototype chain
// the nearest property wins
giantScorpion.stings();
// => scorpion pierces your shoulder with its venomous sting

// you can have one prototype object per derived object instance
// we will see how that's effective for object composition with mixins
// or share a prototype across all derived types
let smallScorpion = {
  '__proto__': minion, // here we set the minion as prototype
  name: 'small scorpion',
  stings() { 
    console.log(`${this} pierces your shoulder with its tiny venomous sting`); }
};
let giantSpider = {
  '__proto__': minion, // here we set the minion as prototype
  name: 'giant spider',
  launchWeb() { 
    console.log(`${this} launches a sticky web and immobilizes you`); }
};

// You have to be careful when you place state (properties) in a prototype
// If you have a property that holds a primitive type
// even though they share the same prototype
// you cannot modify the prototype properties from the derived object
// if you try to do that you just create new properties in derived objects
console.log(`Small scorpion has ${smallScorpion.hp} hp`);
// => Small scorpion has 10 hp
smallScorpion.hp = 22;

console.log(`Small scorpion has ${smallScorpion.hp} hp`);
// => Small scorpion has 22 hp

console.log(`Giant Spider *still* has ${giantSpider.hp}`);
// => Giant spider still has 10 hp

// but if you have an object or an array
// then it is shared among all objects with the same prototype
// resulting in all of them being coupled.
// Imagine that a minion had a stomach
minion.stomach = [];
// if a giant scorpion eats an elf
giantScorpion.stomach.push('elf')
// we can verify that yeah, it has eaten an elf
console.log(`giant scorpion stomach: ${giantScorpion.stomach}`);
// => giant scorpion stomach: elf

// but so has the spider
console.log(`giant spider stomach: ${giantSpider.stomach}`);
// => giant spider stomach: elf

// A cool thing is that if you augment a prototype
// you automatically augment all its derived objects
minion.eats = function(food){ 
  console.log(`${this} eats ${food} and gains ${food.hp} health`);
  this.hp += food.hp;
};

giantScorpion.eats({name: 'hamburger', hp: 10, toString(){return this.name}});
// => scorpion eats hamburger and gains 10 health 
smallScorpion.eats({name: 'ice cream', hp: 1, toString(){return this.name}});
// => scorpion eats ice cream and gains 11 health 
giantSpider.eats({name: 'goblin', hp: 100, toString(){return this.name}});
// => giant spider eats hamburger and gains 100 health 

console.log("===== #1.2 Prototypical inheritance with Object.create =====");

let newGiantScorpion = Object.create(minion);
newGiantScorpion.name = 'scorpion';
newGiantScorpion.stings = function(){
    console.log(`${this} pierces your shoulder with its venomous sting`); 
};

/*
let newGiantScorpion = Object.create(minion);
Object.assign(newGiantScorpion,{
    name: 'scorpion',
    stings(){
      console.log(`${this} pierces your shoulder with its venomous sting`); 
    }
};
*/


console.log("===== #1.3 Prototypical inheritance with constructor functions =====");
//let minion = {
//  hp: 10,
//  name: 'minion',
//  toString(){ return this.name;}
//};

// prototype inheritance works slightly different with constructor functions
function TeleportingMinion(){
    let position = {x: 0, y: 0};
    this.teleportsTo = function(x, y){ 
      console.log(`${this} teleports from (${position.x}, ${position.y}) to (${x}, ${y})`);
      position.x = x;
      position.y = y;
    };
    this.healthReport = function(){
      console.log(`${this} has ${this.hp} health. It looks healthy.`);
    };
}
TeleportingMinion.prototype = minion;

// from now own every object that we create with this ctor function
// will have the minion object as prototype
var oneCrazyTeleportingMinion = new TeleportingMinion();
oneCrazyTeleportingMinion.healthReport();
// => minion has 10 health. It looks healthy.

var anotherCrazyTeleportingMinion = new TeleportingMinion();
anotherCrazyTeleportingMinion.healthReport();
// => minion has 10 health. It looks healthy.

console.log(`oneCrazyTeleportingMinion is TeleportingMinion: ${oneCrazyTeleportingMinion instanceof TeleportingMinion}`);

console.log("===== #1.4 Creating Prototype chains =====");

// you can create deeper prototype chains than one level
let wizard = {
   '__proto__': new TeleportingMinion(),
   name: 'Evil wizard',
   castsFireballSpell(target){ 
     console.log(`${this} casts fireball spell and obliterates ${target}`);
   }
};

console.log(`wizard is TeleportingMinion: ${wizard instanceof TeleportingMinion}`)

// the wizard can cast fireballs
wizard.castsFireballSpell('sandwich');
// => Evil wizard casts fireball spell and obliterates sandwich
// damn that was my last sandwich

// it can teleport
wizard.teleportsTo(1,2);
// => Evil wizard teleports from (0, 0) to (1, 2)

// and it has hit points
wizard.healthReport();
// => Evil wizard has 10 health. It looks healthy.

// you can do the same with a constructor function
function Druid(){
  this.name = 'Druid of the Forest';
  this.changesSkinIntoA = function(skin){
    console.log(`${this} changes his skin into a ${skin}`);
  }
}
Druid.prototype = new TeleportingMinion();

let druid = new Druid();

console.log(`druid is Druid: ${druid instanceof Druid}`);
console.log(`druid is TeleportingMinion: ${druid instanceof TeleportingMinion}`);

// the druid can change skin
druid.changesSkinIntoA('wolf');
// => Druid of the Forest changes his skin into a wolf

// it can teleport
druid.teleportsTo(2,2);
// => Druid of the Forest teleports from (0, 0) to (2, 2)

// and has hit points
druid.healthReport();
// => Druid of the Forest has 10 health. It looks healthy.
