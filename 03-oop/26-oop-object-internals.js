/* 
 *
 * JavaScript-mancy 
 * The Secret Lives of Objects: JavaScript Object Internals
 *
 */

console.log("===== The Secret Lives of Objects =====");
console.log("===== Object Internals =====");

console.log("\n\n==== Defining properties using Object.defineProperty ====");

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

// Read-only properties
Object.defineProperty(goat, 'woolColor', {
  value: 'brown',
  writable: false,
  enumerable: true,
  configurable: true
});

console.log(goat.woolColor);
// => brown
(function(){
  'use strict';
  try {
    goat.woolColor = 'black';
  } catch(e) {
    console.error(e.message);
    // => "Cannot assign to read only property 'woolColor' of object '#<Object>'"
  }
}())

// Behold! A Sheep!
var sheep = {};

// We add hitPoints but this time we will use
// a data descriptor for the backing field
// that will be called _hitPoints.
// Note how we use `enumerable: false` so the field
// is not shown when we iterate over the properties
// of this object

Object.defineProperty(sheep, '_hitPoints', {
 /* accessor descriptor */ 
  value: 50,
  writable: true, 
  enumerable: false, // look here!
  configurable: true
});

// We add a getter/setter with the name of
// hitPoints using an accessor descriptor
Object.defineProperty(sheep, 'hitPoints', {
 /* data descriptor */ 
  get(){ return this._hitPoints},
  set(value){
    if (value === undefined 
       || value === null
       || value < 0)
      throw new Error(`Invalid value ${value}! Hit points should be a number greater than 0!`);
    this._hitPoints = value;
  }, 
  enumerable: true,
  configurable: true
});

console.log(`Sheep has ${sheep.hitPoints} hit points`);
// => Sheep has 50 hit points

// Now let's try something simple
sheep.hitPoints = 10;

console.log(`Sheep has ${sheep.hitPoints} hit points`);
// => Sheep has 10 hit points

// Now let's go into the danger zone
try{
  sheep.hitPoints -= 20;
} catch (e){
  console.log(e.message);
  // => "Invalid value -10! Hit points should be a number greater than 0!"
}

// And more danger!
try{
  sheep.hitPoints = undefined;
} catch (e){
  console.log(e.message);
  // => "Invalid value undefined! Hit points should be a number greater than 0!"

}

console.log("\n\n==== Beautiful Property Manipulation with ESnext Decorators ====");


console.log("\n==== A simple decorator ====");
// compare this
const goat2 = {
};
// using the very same goat
Object.defineProperty(goat, 'woolColor', {
  value: 'brown',
  writable: false,
  enumerable: true,
  configurable: true
});

// with this!
const decoratedGoat = {
  @readOnly
  woolColor: 'brown'
}

// A decorator is a simple function
function readOnly(target, property, descriptor){
  console.log(`Making ${property} read only!`);
  descriptor.writable = false;
}

console.log('goat wool color: ' + decoratedGoat.woolColor);
// => brown
(function(){
  'use strict';
  try {
    decoratedGoat.woolColor = 'black';
  } catch(e) {
    console.error(e.message);
    // => "Cannot assign to read only property 'woolColor' of object '#<Object>'"
  }
}());

console.log("\n==== Accessor decorators ====");

// Yet another example with the sheep
const sheep2 = {};
Object.defineProperty(sheep, 'hitPoints', {
  get(){ return this._hitPoints},
  set(value){
    if (value === undefined 
       || value === null
       || value < 0)
      throw new Error(`Invalid value ${value}! Hit points` +
                `should be a number greater than 0!`);
    this._hitPoints = value;
  }, 
  enumerable: true,
  configurable: true
});


const decoratedSheep = {
  @notNullUndefinedNorNegative
  hitPoints: 100
};

function notNullUndefinedNorNegative(target, property, descriptor){
  console.log(`Adding validation to ${property}!`)
  let backingField = descriptor.initializer();
  return {
   /* data descriptor */ 
    get(){ return backingField},
    set(value){
      if (value === undefined 
         || value === null
         || value < 0)
        throw new Error(`Invalid value ${value}! ${property}` +
                  `should be a number greater than 0!`);
      backingField = value;
    }, 
    enumerable: true,
    configurable: true
  };
}
  
console.log('Decorated sheep hitPoints: ' + decoratedSheep.hitPoints);
try {
  decoratedSheep.hitPoints = undefined;
} catch (e) {
  console.error(e.message);
  // => Invalid value undefined! etc...
}

console.log("\n==== Composing decorators ====");

// we can compose decorators
const sheepWithComposedDecorators = {
  @defined
  @greaterThanZero
  hitPoints: 100
};
// HERE

function composeSetter(target, property, oldDesc, newDesc){
  let backingField = (oldDesc.get && oldDesc.get()) || oldDesc.initializer(),
      defaultSetter = (value) => backingField = value;
      
  return {
    get: () => backingField,
    set: before(oldDesc.set || defaultSetter, newDesc.set)
  };
  
  function before(f, decorator){
    return (...args) => {
      decorator(...args);
      f(...args);
    }
  }
}

function defined(target, property, descriptor){
  return composeSetter(target, property, descriptor, {
    set(value){
      throwIfInvalid(value)
    }
  });
  function throwIfInvalid(value){
    if (value === undefined || value === null)
      throw new Error(`Invalid value ${value}! ` +
         `${property} should be defined!`);
  }
}

function greaterThanZero(target, property, descriptor){
  return composeSetter(target, property, descriptor, {
    set(value){
      throwIfInvalid(value)
    }
  });
  function throwIfInvalid(value){
    if (value < 0)
      throw new Error(`Invalid value ${value}! ` +
         `${property} should be a number ` + 
         `greater than 0!`);
  }
}

try {
  //sheepWithComposedDecorators.hitPoints = null;
} catch(e){
  console.error(e.message);
  // => "Invalid value null! hitPoints should be defined!"
}

try {
  sheepWithComposedDecorators.hitPoints = -100;
} catch(e){
  console.error(e.message);
  // => "Invalid value -100! hitPoints should be a number greater than 0!"

}
console.log('sheep hitpoints: ' + sheepWithComposedDecorators.hitPoints);

console.log("\n==== Decorators With Arguments ====");

const wizard = {
    name: 'Wise Wizard',
    @allowedArmors('cloth', 'wool', 'silk')
    armor: 'cloth vest',
    toString() { return this.name; }
};

function allowedArmors(...armors){
  const decorator = (target, property, descriptor) => {
    let backingField = descriptor.initializer();
    return {
      set: (value) => {
        if (value !== '' && armors.every(a => !value.includes(a)))
          throw new Error(`${target} can't wear armor ${value}.` + ` She only can wear these armor classes ${armors}`);
        backingField = value;
      },
      get: () => backingField
    }
  }
  return decorator;
}

console.log('Wizards armor: ' + wizard.armor);
wizard.armor = 'silk robes';
console.log('Wizards armor: ' + wizard.armor);
try {
  wizard.armor = 'plate mail';
} catch (e) {
  console.error(e.message);
  // => "Wise Wizard can't wear armor plate mail. 
  // She only can wear these armor classes cloth,wool,silk"
}

console.log("\n==== Decorators In Classes - Properties ====");

class Wizard{
  constructor(name){
    this.name = name;
    this._armor = 'cloth vest';   
  }
  toString(){
    return this.name;
  } 
  
  get armor(){ return this._armor;}
  @allowedArmorsMember('cloth', 'wool', 'silk')
  set armor(value){ this._armor = value;}
}

function allowedArmorsMember(...armors){
  const decorator = (target, property, descriptor) => {
    return {
      set: (value) => {
        if (value !== '' && armors.every(a => !value.includes(a)))
          throw new Error(`You can't wear armor ${value}.` + ` She only can wear these armor classes ${armors}`);
        descriptor.set(value);
      },
      get: descriptor.get
    }
  }
  return decorator;
}

const anotherWizard = new Wizard('unwise Wizard');
anotherWizard.armor = 'silk robes';
console.log(`${anotherWizard} wears ${anotherWizard.armor}`);

try {
  anotherWizard.armor = 'steel chain mail';
} catch (e){
  console.error(e.message);
  // => "You can't wear armor steel chain mail. 
  // She only can wear these armor classes cloth,wool,silk"
}

console.log("\n==== Decorators In Classes - Methods ====");

class WizardCount{
  constructor(name){
    this.name = name;
    this._armor = 'cloth vest';   
  }
  toString(){
    return this.name;
  } 
  
  get armor(){ return this._armor;}
  @allowedArmorsMember('cloth', 'wool', 'silk')
  set armor(value){ this._armor = value;}

  @count('numberOfSpells')
  castFireball(target){
    console.log(`${this} casts fireball on ${target} burning it to ashes`);
  }
}

function count(countStorageField) {
  const decorator = (target, property, descriptor) =>{
    const originalFunction = descriptor.value;
    descriptor.value = function(...args){
      if (!this[countStorageField]) { 
        this[countStorageField] = 0;
      }
      this[countStorageField] += 1;
      originalFunction.apply(this, args);
    }
  }
  return decorator;
}

const fieryWizard = new WizardCount('Fiery Wizard');
fieryWizard.castFireball('rat');
// => "Fiery Wizard casts fireball on rat burning it to ashes"
fieryWizard.castFireball('bat');
// => "Fiery Wizard casts fireball on bat burning it to ashes"
console.log(`${fieryWizard} casted spells ${fieryWizard.numberOfSpells} times`);
// => "Fiery Wizard casted spells 2 times"

console.log("\n==== Decorators In Classes - Classes ====");

// a mixin to cast spells
let canCastSpells = {
  castSpell(spell, target) {
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

class Warlock {
  constructor(name, hp=100, mana=100){
    this.name = name + ', the Warlock';
    this.hp = hp;
    this.mana = mana;
  }
  toString(){
    return this.name;
  }
}

class Bard {
  constructor(name, hp=100, mana=50){
    this.name = name + ', the Bard';
    this.hp = hp;
    this.mana = mana;
  }
  toString(){
    return this.name;
  }
}

Object.assign(Warlock.prototype, canCastSpells);
Object.assign(Bard.prototype, canCastSpells);

const kvothe = new Bard('Kvothe');
kvothe.castSpell({
  toString(){ return 'blizzard';},
  manaCost: 10,
  cast(target) {
    console.log(`${target} gets hit by a blizzard`);
    target.hp -= 50;
  }
}, {
  name: 'Giant Spider', 
  toString(){ return this.name}, 
  hp: 400
});
// => "Kvothe, the Bard prepares to cast spell blizzard..."
// => "Giant Spider gets hit by a blizzard"

// You can do the same with a decorator
@spellCaster
//@mixin(canCastSpells)
class BardAgain {
  constructor(name, hp=100, mana=50){
    this.name = name + ', the Bard';
    this.hp = hp;
    this.mana = mana;
  }
  toString(){
    return this.name;
  }
}

function spellCaster(constructor){
  Object.assign(constructor.prototype, canCastSpells);
}

const jazz = new BardAgain("Jazz");
jazz.castSpell({
  toString(){ return 'light healing';},
  manaCost: 5,
  cast(target){
    console.log(`${target} is healed lightly`);
    target.hp +=25;
  }
}, jazz);
// => "Jazz, the Bard prepares to cast spell light healing..."
// "Jazz, the Bard is healed lightly"

// As an alternative you can use
// @mixin(canCastSpells)
function mixin(...args){
  return function(constructor){
    Object.assign(constructor.prototype, ...args);
  }
}

console.log("\n\n==== ## Defining Multiple Properties with Object.defineProperties ====");

// Object.defineProperties let's you extend an object with many
// properties at once

// let's extend our goat with a couple of new
// properties. Behold!
Object.defineProperties(goat, {
  weapons: {
    value: ['knife', 'katana', 'hand-trebuchet'],
    enumerable: true,
    writable: true,
    configurable: true
  },
  armor: {
    value: ['templar helmet', 'platemail'],
    enumerable: true,
    writable: true,
    configurable: true
  }
});

console.log(goat.weapons);
// => ["knife", "katana", "hand-trebuchet"]
console.log(goat.armor);
// => ["templar helmet", "platemail"]






console.log("\n\n==== ## Create Objects With Object.create And Property Descriptors ====");

let anotherGoat = Object.create(Object.prototype, {
  _hitPoints: {
   /* accessor descriptor */ 
    value: 50,
    writable: true, 
    enumerable: false, // look here!
    configurable: true
  },
  hitPoints: {
   /* data descriptor */ 
    get(){ return this._hitPoints},
    set(value){
      if (value === undefined 
         || value === null
         || value < 0)
        throw new Error(`Invalid value ${value}! Hit points should be a number greater than 0!`);
      this._hitPoints = value;
  }, 
  enumerable: true,
  configurable: true
  }, 
  weapons: {
    value: ['knife', 'katana', 'hand-trebuchet'],
    enumerable: true,
    writable: true,
    configurable: true
  },
  armor: {
    value: ['templar helmet', 'platemail'],
    enumerable: true,
    writable: true,
    configurable: true
  }
});

console.log(anotherGoat.hitPoints);
// => 50
console.log(anotherGoat.weapons);
// => ["knife", "katana", "hand-trebuchet"]
console.log(anotherGoat.armor);
// => ["templar helmet", "platemail"]




console.log("\n\n==== ## Making objects immutable ====");


// using this function to enable strict mode
// within the function itself
function testFreezingObjects(){
  "use strict";
  // enable strict mode
  
  Object.freeze(goat);
  
  try{
    goat.hitPoints = 100;
  } catch (e){
    console.log(e.toString());
    // => TypeError: Cannot assign to read only property 'hitPoints'...
  }
  
  try{
    goat.coat = "coat for the cold";
  } catch (e){
    console.log(e.toString());
    // => TypeError: Can't add property coat, object is not extensible
  }
  
  try{
    delete goat.hitPoints
  } catch (e){
    console.log(e.toString());
    // => TypeError: Cannot delete property 'hitPoints'...
  }
}


testFreezingObjects();



