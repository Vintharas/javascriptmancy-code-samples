/* 
 *
 * JavaScript-mancy 
 * More Metaprogramming with Reflect, Proxies and Symbols
 *
 */

console.log("===== More Metaprogramming with Reflect, Proxies and Symbols =====");
console.log("===== ES6 Reflect =====");
console.log("==== Object Methods====");

// Behold! A Goat!
var goat = {};

// We add a hit points property using
// an object descriptor
Object.defineProperty(goat, 'hitPoints',{
  /* object descriptor */
  value: 50,
  writable: true, 
  enumerable: true,
  configurable: true
});

console.log(`Goat has ${goat.hitPoints} hit points`);
// => Goat has 50 hit points

const success = Reflect.defineProperty(goat, 'woolColor', {
  value: 'brown',
  writable: false,
  enumerable: true,
  configurable: true
});

if (success) {
  // celebrate!
  console.log('Successfully added woolColor property to goat');
} else {
  // cry
  console.log('failed adding woolColor property to goat');
}

console.log("\n\n==== Function Methods====");

class HeroOfAges{
  constructor(hitPoints=100){
    this._hitPoints = hitPoints;
    this.invincibilitySpells = [
      stoneSkin,
      miraculousRecovery,
      rage,
      titanStrength
    ];
  }
  
  get hitPoints() { return this._hitPoints;}
  
  set hitPoints(value){
    this._hitPoints = value;
    if (this._hitPoints < 10){
      this.becomeInvincible();
    }
  }

  toString(){
    return 'Hero of Ages';
  }
  
  becomeInvincible(){
    // give me your strength pegasus!
    // original:
    //this.invincibilitySpells.forEach(s => s.apply(this))
    // Reflect:
    this.invincibilitySpells
        .forEach(s => Reflect.apply(s, this, []));
    console.log(`${this} becomes invincible!!!!`);
  }
}

function stoneSkin() {
  this.defense = 1000;
}
function miraculousRecovery(){
  this.hitPoints += 100;
}
function rage(){
  this.attack = 1000;
}
function titanStrength(){
  this.damage = 2000;
}

const heroOfAges = new HeroOfAges();
heroOfAges.hitPoints -= 95;
// => Hero of Ages becomes invincible!!!!
console.log(` ===heroOfAges===
attack: ${heroOfAges.attack}
defense: ${heroOfAges.defense}
hitPoints: ${heroOfAges.hitPoints}
damage: ${heroOfAges.damage}`)
/*
===heroOfAges===
attack: 1000, 
defense: 1000, 
hitPoints: 105, 
damage: 2000
*/

console.log("\n\n==== New Methods in Reflect API ====");

const wasAbleToSetValue = Reflect.set(goat, 'hitPoints', 42);
if (wasAbleToSetValue){
  console.log('I set the hitPoints property');
}
// => I set the hitPoints property

const hitPoints = Reflect.get(goat, 'hitPoints');
console.log(`The goath hadeth ${hitPoints} hit points`);
// => The goath hadeth 42 hit points

// A burrahobbit
const secretPouch = Symbol.for('secretPouch');

const burrahobbit = {
  name: 'Birwo Baggins',
  hitPoints: 20,
  [secretPouch]: ['jewels', 'golden ring', '4 gold doublons'],
  disappear(){
    console.log(`${this.name} suddenly disappears!`);
  }
};

// Object methods to retrieve properties of an object...
console.log(`Object.getOwnPropertyNames:`, Object.getOwnPropertyNames(burrahobbit));
// => Object.getOwnPropertyNames: ['name', 'hitPoints', 'disappear']

// and symbols
console.log(`Object.getOwnPropertySymbols: `,  Object.getOwnPropertySymbols(burrahobbit));
// => Object.getOwnPropertySymbols: [ symbol ]

console.log(`Reflect.ownKeys: `, Reflect.ownKeys(burrahobbit));
// => Reflect.ownKeys: ['name', 'hitPoints', 'disappear', symbol]

console.log("\n\n==== A more involved use case of the Reflect API ====");

class ConstrainedMixins {

  @requires('mana', 'hp')
  static canCastSpells(obj) {
    return Object.assign(obj, {
      castSpell
    });

    function castSpell(spell, target) {
      console.log(`${this} prepares to cast spell ${spell}...`);
      if (this.mana < spell.manaCost){
        console.log(`${this} doesn't have enough mana!` +
          `The spell fizzles out and ${this} gets ` + 
          `damaged by the wild currents of magic`);
        this.hp -= (spell.manaCost - spell.mana);
        this.mana = 0;
      } else {
        this.mana -= spell.manaCost;
        spell.cast(target);
      }
    }
  }
}


function requires(...props){
  return function decorator(target, property, descriptor){
    const mixinFunction = descriptor.value;
    descriptor.value = function constrainedMixin(obj){
      throwIfObjectDoesntSatifyRequirements(obj, props, property);
      mixinFunction(obj);
    }
  }
  
  function throwIfObjectDoesntSatifyRequirements(obj, props, mixinName){
    const objProperties = Reflect.ownKeys(obj);
    const missingProps = props.filter(p => !objProperties.includes(p))
    if (missingProps.length > 0)
      throw new Error(`Object ${obj} lacks properties: [` +
                      `${missingProps}] required for mixin ${mixinName}`);
    
  }
}

const sparrow = {
  name: 'Sparrow',
  toString() { return this.name; }
};

try {
  ConstrainedMixins.canCastSpells(sparrow);
} catch (e){
  console.log(e.message);
}
// => "Object Sparrow lacks properties: [mana,hp] required for mixin canCastSpells"
 

const sparrowTheGifted = {
  name: 'Sparrow, the gifted',
  toString() { return this.name; },
  mana: 100,
  hp: 200
};

ConstrainedMixins.canCastSpells(sparrowTheGifted);

sparrowTheGifted.castSpell({
  toString(){ return 'bless'; },
  manaCost: 10,
  cast(target){
    console.log(`You bless ${target} (+20 Luck)`);
  }
}, sparrowTheGifted);
// => Sparrow, the gifted prepares to cast spell bless...
//    You bless Sparrow, the gifted (+20 Luck)

console.log("\n\n==== ### ES6 Proxies ====");

console.log("==== The Goat Strikes Back: Creating a Proxy ====");

const goatProxies = {
  hitPoints: 100,
  woolColor: 'brownish',
  position: {x: 0, y: 0},
  toString() {return `A ${this.woolColor} goat `},
  bleats(){ console.log(`${this}: baaaaaaaa!`); },
  goesTo({x, y}) { 
    this.x = x;
    this.y = y;
    console.log(`${this} goes to (${x}, ${y})`);
  }
};

let ploat = new Proxy(goatProxies, /*handler*/ {});

console.log(goatProxies);
// => object...
console.log(ploat);
// => object...
//    exactly like the original object

console.log("==== Validations with Proxies ====");

let handler = {
  set(target, key, value) {
    if (key === 'hitPoints') {
      if (value < 0) {
        throw new Error('must have positive value!');
      } else if (value === undefined ||
                 value === null) {
        throw new Error('must have defined value!');
      }
    }
    if (key === 'woolColor') {
      throw new Error('woolColor is read-only!');
    }
    Reflect.set(target, key, value);
    // same as:
    // target[key] = value;
  }
}

ploat = new Proxy(goatProxies, handler);

ploat.hitPoints = 50;
// value set as usual
console.log(`goat hitpoints: ${ploat.hitPoints}`);
// => goat hitPoints: 50
try {
  ploat.hitPoints -= 100;
} catch (e){
  console.error(e.message);
  // => must have positive value!
}

try {
  ploat.woolColor = "whiteish";
} catch (e) {
  console.error(e.message);
  // => woolColor is read-only!
}

// other properties behave normally
ploat.bleats = function(){ console.log('moooo');};
ploat.bleats();
// => moooo

console.log("====  The Get Trap: Wizardy CIA Surveillance ====");

// HERE
class WIA {
  constructor(){
    this.log = new WeakMap();
  }
  
  logEvent(target, key){
    if (!Reflect.ownKeys(target).includes(key))
      return;
    
    let targetLog = this.log.get(target);
    if (!targetLog) {
      targetLog = this.log
                      .set(target, new Map())
                      .get(target);
    }
    this.addLogLine(key, targetLog);
  }
  
  addLogLine(key, targetLog){
    if (!targetLog.has(key)) {
      targetLog.set(key, []);
    }
    
    console.log('add key to targetLog', key, targetLog[key]);  
    
    targetLog.get(key).push({
      timestamp: new Date() , 
      toString(){ return `${this.timestamp}`}
    });
  }
  
  showLogs(target){
    const log = this.log.get(target)
    console.log(`
${[...log.entries()]
    .map(([k,v]) => `\n${k}:\n${v.join('\n')}`)}
`);
  }
}
const wia = new WIA();

handler = {
  get(target, key) {
    wia.logEvent(target, key);
    return Reflect.get(target, key)
  }
}

ploat = new Proxy(goatProxies, handler);

// A day in the life of a goat
ploat.bleats();
ploat.goesTo(1, 1);
ploat.bleats();
ploat.goesTo(2, 2);
ploat.bleats();
ploat.goesTo(3, 3);

// let's see what we've monitored
wia.showLogs(goatProxies);
/* => bleats:
Wed Aug 02 2017 15:31:52 GMT+0200 (CEST)
Wed Aug 02 2017 15:31:52 GMT+0200 (CEST)
Wed Aug 02 2017 15:31:52 GMT+0200 (CEST),
goesTo:
Wed Aug 02 2017 15:31:52 GMT+0200 (CEST)
Wed Aug 02 2017 15:31:52 GMT+0200 (CEST)
Wed Aug 02 2017 15:31:52 GMT+0200 (CEST),
toString:
Wed Aug 02 2017 15:31:52 GMT+0200 (CEST)
Wed Aug 02 2017 15:31:52 GMT+0200 (CEST)
Wed Aug 02 2017 15:31:52 GMT+0200 (CEST),
woolColor:
Wed Aug 02 2017 15:31:52 GMT+0200 (CEST)
Wed Aug 02 2017 15:31:52 GMT+0200 (CEST)
Wed Aug 02 2017 15:31:52 GMT+0200 (CEST)
*/

console.log("==== Get and Property Visibility ====");

const goatSpy = {
  hitPoints: 100,
  woolColor: 'brownish',
  position: {x: 0, y: 0},
  toString() {return `A ${this.woolColor} goat `},
  bleats(){ console.log(`${this}: baaaaaaaa!`); },
  goesTo({x, y}) { 
    this.x = x;
    this.y = y;
    console.log(`${this} goes to (${x}, ${y})`);
  },
  _secretCompartment: ['plans of the Death Star'],
  _givesTip(target) {
    console.log(`${this} tips the ${target}`);
    target.takeDiscreetly(this._secretCompartment);
  }
};

handler = {
  get(target, key) {
    if (typeof key !== 'string' ||
        !key.startsWith('_'))
      return Reflect.get(target, key);
  },
  set(target, key, value) {
    if (typeof key !== 'string' ||
        !key.startsWith('_'))
      Reflect.set(target, key, value);
  }
}

let regularLookingGoat = new Proxy(goatSpy, handler);
/*
console.log(goatSpy);
console.log(regularLookingGoat);
*/

console.log(`Does the goat have a secret compartment? ${regularLookingGoat._secretCompartment}`);
// => "Does the goat have a secret compartment? undefined"

// You can use the unproxied goat
// to carry out the spy deals
const bartender = {
  toString() { return 'a bartender';},
  takeDiscreetly(things){
    console.log(`${this} receives ${things}`);
  }
}

goatSpy._givesTip(bartender);
// => A brownish goat  tips the a bartender
//    a bartender receives plans of the Death Star


console.log("====  Making the Goat Bulletproof with `Has` and `Enumerate` ====");

console.log('There are some flaws in the previous handler...');

console.log('_secretCompartment' in regularLookingGoat)
// => true
console.log(Reflect.has(regularLookingGoat, '_secretCompartment'));
// => true

console.log(Reflect.ownKeys(regularLookingGoat))
// => ["hitPoints", "woolColor", "position", "toString", "bleats", "goesTo", "_secretCompartment", "_givesTip"]

// ouch, looks like they weren't that private after all

handler = {
  get(target, key) {
    if (typeof key !== 'string' ||
        !key.startsWith('_'))
      return Reflect.get(target, key);
  },
  set(target, key, value) {
    if (typeof key !== 'string' ||
        !key.startsWith('_'))
      Reflect.set(target, key, value);
  },
  has(target, key){
    if (typeof key !== 'string' ||
        !key.startsWith('_'))
      return Reflect.has(target, key);
    return false;
  },
  ownKeys(target){
    return Reflect
              .ownKeys(target)
              .filter(k => typeof k !== 'string' || !k.startsWith('_'));
  }
}

regularLookingGoat = new Proxy(goatSpy, handler);

// and now...
console.log('And now the goat is bulletproof...');

console.log('_secretCompartment' in regularLookingGoat)
// => false
console.log(Reflect.has(regularLookingGoat, '_secretCompartment'));
// => false

console.log(Reflect.ownKeys(regularLookingGoat))
// => ["hitPoints", "woolColor", "position", "toString", "bleats", "goesTo"] 

console.log("\n\n==== Revocable proxies ====");

// the goat retires from spionaging
// and starts a wool scissor renting business

class MagicWoolScissors{
  cutWool(target) {
    const numberOfBales = Math.floor(Math.random()*10);
 
    console.log(`You use the magic scissor on ${target}` + `and obtain ${numberOfBales} bales of wool`);
    return `${numberOfBales} bales of wool`;
  }
}

class GoatBusiness {
  constructor() {
    this.purse = 0;
  }
  rentScissors() {
    console.log('You rent a pair of scissors for 1 gold doublon');
    this.purse++;
    
    const scissors = new MagicWoolScissors();
    let {proxy, revoke} = Proxy.revocable(scissors, {});
    
    this.revokeWithinOneHour(revoke);
    
    // return proxy;
    // we willl return the revoke token so we 
    // don't need to wait for a day to test that it works
    // :)
    return {scissors:proxy, revoke};
  }
  revokeWithinOneHour(revoke){
    setTimeout(() => revoke(), 1000*60*60*24);
  }
}

const goatBusiness = new GoatBusiness();

let {scissors, revoke} = goatBusiness.rentScissors();
// => You rent a pair of scissors for 1 gold doublon

scissors.cutWool('sheep');
// => You use the magic scissor on sheepand obtain 4 bales of wool

// 1 day later.....
revoke();


try{
  scissors.cutWool('another sheep');
} catch(e){
  console.error(e.message);
  // => TypeError: Cannot perform 'get' on a proxy that has been revoked
  // ouch
}

console.log("\n\n\n\n==== Meta-programming with Symbols ====");

const rune = Symbol('rune');
const sword = {
  [rune]: 'rune of fire'
}

console.log(sword[rune]);
// => rune of fire

// imagine a Dungeon
class Dungeon {
  constructor(numberOfCells = 10, treasury = 20){
    this.numberOfCells = numberOfCells;
    this.treasury = treasury;
    this.prisoners = [];
  }
  
  addPrisoner(prisoner){
    if (this.dungeonIsFull())
      throw Error('Dungeon is full. You need to build ' +
                  'more cells oh master of evil and deceit!');
    else
      this.prisoners.push(prisoner);
  }
  
  dungeonIsFull(){
    return this.numberOfCells === this.prisoners.length;
  }
  
  buildCell(){
    if (this.cellCost() > this.treasury)
      throw Error("You don't have enough money");
    else {
      this.treasury -= this.cellCost();
      this.numberOfCells++;
    }
  }
  
  cellCost(){
    if (this.numberOfCells < 20) return 10;
    else if (this.numberOfCells < 30) return 15;
    else return 20;
  }
  
  // Adding this property
  // all of the sudden gives
  // Dungeon objects the possibility to be
  // iterable
  [Symbol.iterator](){
    return this.prisoners[Symbol.iterator]();
  }
}


// by providing the object with an iterator
// now I can iterate over it using for..of
const dungeonOfFire = new Dungeon();
dungeonOfFire.addPrisoner('John doe');
dungeonOfFire.addPrisoner('Cersei L.');
dungeonOfFire.addPrisoner('Catelynn S.');


console.log('---prisoners in this dungeon---');
for(let p of dungeonOfFire){
  console.log(p);
}
console.log('-------------------------------');

// ---prisoners in this dungeon---
// John doe
// Cersei L.
// Catelynn S.
// -------------------------------

// it also works with any object at runtime
const goatAgain = {
  hitPoints: 100,
  woolColor: 'black and white'
};

goatAgain[Symbol.iterator] = function*(){
  yield 'goat moves left';
  yield 'goat moves up';
  yield 'goat bleats';
  yield 'goat moves right';
}

for(let moves of goatAgain){
  console.log(moves);
}
// => goat moves left
//    goat moves up
//    goat bleats
//    goat moves right

console.log("==== Symbol.split ====");
// An example of the string well-known symbols

class Separators {
  constructor(separators=[',', ':', ';']){
    this.separators = separators;
  }
  
  [Symbol.split](str){
    let [separator, ] = this.separators
                            .filter(s => str.includes(s));
    console.log(`Found separator in string ${separator}`);
    if (separator)          
      return str.split(separator);
    else
      return str;
  }
}

const validSeparators = new Separators();
console.log('this,works,well'.split(validSeparators));
// => ['this', 'works', 'well']
console.log('this;also;works'.split(validSeparators));
// => ['this', 'also', 'works']
console.log('and:this:woooot'.split(validSeparators));
// => ['and', 'this', 'woooot']

// `Symbol.split` allowed us to write more modular, extensible and intentional code.Awesome right?






