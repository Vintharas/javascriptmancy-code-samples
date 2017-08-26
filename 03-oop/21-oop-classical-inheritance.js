/*

JavaScriptmancy OOP
White Tower Summoning: Emulating Classical Inheritance in JavaScript

*/

console.log("A C# class equivalent in JavaScript consists on the combination of a constructor function with a prototype")
console.log("===== Constructor Functions ======")

function Barbarian(name){
    this.name = name;
    this["character class"] = "barbarian";
    this.hp = 200;
    this.weapons = [];
    this.talks = function(){ 
        console.log("I am " + this.name + " !!!");
    };
    this.equipsWeapon = function(weapon){ 
        weapon.equipped = true;
        this.weapons.push(weapon);
    };
    this.toString = function(){ return this.name; };
}

// you can instantiate it with the new keyword like in C#
let conan = new Barbarian("Conan, the Barbarian");
conan.equipsWeapon({
        name: "two-handed sword",
        type: "sword",
        damage: "2d20+10",
        material: "cimmerian steel",
        status: "well maintained",
        toString(){ return this.name;}
    });

// these properties are all publicly available
console.log(`Conan is a Barbarian: ${conan instanceof Barbarian}`);
// => Conan is a Barbarian: true
console.log(`Conan is an Object: ${conan instanceof Barbarian}`);
// => Conan is an Object: true
conan.talks();
// => I am Conan, the Barbarian!!!
console.log(conan.name);
// => Conan, The Barbarian"
console.log(`Conan has these weapons: ${conan.weapons}`);
// => Conan has these weapons: two-handed sword

console.log("===== Prototypes ======")
console.log(`Every function has a *prototype* property. This property holds an object that will be shared amongst all objects created using the new keyword on that function`);
// every function has a prototype property
console.log(`Barbarian.prototype: ${Barbarian.prototype}`);
// => Barbarian.prototype: [object Object]

// and the prototype has a constructor property that points back to the function
console.log(`Barbarian.prototype.constructor: ${Barbarian.prototype.constructor}`);
// => Barbarian.prototype.constructor: function Barbarian(name) {...}

// you can extend this prototype with methods that will be shared across
// all barbarian instances created with the Barbarian constructor function
Barbarian.prototype.sayHi = function (){ console.log("Hi! I am " + this.name);}
var krull = new Barbarian("krull");
krull.sayHi();
// => Hi! I am krull
// var conan = new Barbarian("Conan, the Barbarian");
conan.sayHi();
// => Hi! I am Conan, the Barbarian

// this was the simples JavaScript inheritance scenario where you have a single 
// object that inherits from another object

// in more common scenarios you have several objects within the prototypical chain
// Inheritance Hierarchy:
//   Barbarian -> DrawableGameObject -> GameObject -> Object

function GameObject(){
    // game object ctor  
}
function DrawableGameObject(){
    // drawable object ctor
}

DrawableGameObject.prototype = Object.create(GameObject.prototype);
DrawableGameObject.constructor = DrawableGameObject;


Barbarian.prototype = Object.create(DrawableGameObject.prototype);
Barbarian.prototype.constructor = Barbarian;

var krom = new Barbarian();
console.log(`krom is Barbarian: ${krom instanceof Barbarian}`);
// => krom is Barbarian: true
console.log(`krom is DrawableGameObject: ${krom instanceof DrawableGameObject}`);
// => krom is DrawableGameObject: true
console.log(`krom is GameObject: ${krom instanceof GameObject}`);
// => krom is GameObject: true

// You can differentiate own properties from prototype properties
// using the hasOwnProperty method
console.log(`conan has a property called name: ${conan.hasOwnProperty("name")}`)
// => conan has a property called name: true
console.log(`conan has a property called sayHi: ${conan.hasOwnProperty("sayHi")}`)
// => conan has a property called sayHi: false


console.log("===== Class = Constructor Function + Prototype ======");

// the constructor function:
//   - defines the ClassyBarbarian type
//   - defines the properties a ClassyBarbarian instance is going to have
function ClassyBarbarian(name){
    this.name = name;
    this["character class"] = "barbarian";
    this.hp = 200;
    this.weapons = [];
}

// the prototype:
//   - defines the methods shared across all ClassyBarbarian instances
ClassyBarbarian.prototype = {
    constructor: ClassyBarbarian,
    talks: function(){ 
        console.log("I am " + this.name + " !!!");
    },
    equipsWeapon: function(weapon){ 
        weapon.equipped = true;
        this.weapons.push(weapon);
        console.log(`${this.name} grabs a ${weapon.name} from the cavern floor`);
    },
    toString: function(){
        return this.name;
    },
    saysHi: function (){ 
        console.log("Hi! I am " + this.name);
    }
};

// we can use it just as we would use a class in C#
var logen = new ClassyBarbarian('Logen Ninefingers');
logen.saysHi();
// => Hi! I am Logen Ninefingers
logen.talks();
// => I am Logen Ninefingers !!!
logen.equipsWeapon({name:'very large axe'});
// => Logen Ningefingers grabs a very large axe from the cavern floor
console.log(logen.weapons.map(w => w.name));
// => ["very large axe"]


console.log("===== Data Privacy With Closures ======");


/*
In order to use *closures* to achieve data privacy you need to have a function that encloses a variable. This poses a small problem if we want to follow the *constructor function* for state plus *prototype* for behavior pattern because the *prototype* methods are defined outside of the *constructor* function and therefore cannot enclose any of the variables defined within it.

That means that if we want to use *closures* to manage *data privacy* we need to move our methods from the *prototype* to the *constructor function*:
*/

// constructor function
function PrivateBarbarian(name){
    // private members
    var weapons = [],
        hp = 200;

    // public members
    this.name = name;
    this["character class"] = "private barbarian";
    this.equipsWeapon = function(weapon){ 
        weapon.equipped = true;
        weapons.push(weapon);
        console.log(`${this.name} grabs a ${weapon.name} from the cavern floor`);
    };
  
    this.toString = function(){
      if (weapons.length > 0) return formatWeaponizedBarbarian();
      else return formatPeacefulBarbarian();
    }
    
    function formatWeaponizedBarbarian(){
      return `${name} looks angry and wields a ${weapons.find(w => w.equipped).name}`;
    }
    function formatPeacefulBarbarian(){
      return `${name} looks peaceful`;
    }
}

// the prototype:
PrivateBarbarian.prototype = {
    constructor: PrivateBarbarian,
    talks: function(){ 
        console.log("I am " + this.name + " !!!");
    },
    saysHi: function (){ 
        console.log("Hi! I am " + this.name);
    }
};

// we cannot access the weapons of the barbarian because
// they are not part of the object
var privateBarbarian = new PrivateBarbarian('krox');
console.log(`private barbarian weapons: ${privateBarbarian.weapons}`);
// => private barbarian weapons: undefined
privateBarbarian.equipsWeapon({name:'Two-handed Hammer'});
// => krox grabs a Two-handed Hammer from the cavern floor
console.log(privateBarbarian.toString());
// => krox looks angry and wields a Two-handed Hammer



console.log("===== Data Privacy With ES6 Symbols ======");

// doing data privacy with ES6 symbols lets you keep your methods
// in your prototype

(function(characters){
  characters.SymbolicBarbarian = SymbolicBarbarian;
  let weapons = Symbol('weapons');
  // the constructor function:
  function SymbolicBarbarian(name){
      this.name = name;
      this["character class"] = "barbarian";
      this.hp = 200;
      this[weapons] = [];
  }

  // the prototype:
  SymbolicBarbarian.prototype = {
      constructor: SymbolicBarbarian,
      talks: function(){ 
          console.log("I am " + this.name + " !!!");
      },
      equipsWeapon: function(weapon){ 
          weapon.equipped = true;
          this[weapons].push(weapon);
          console.log(`${this.name} grabs a ${weapon.name} from the cavern floor`);
      },
      saysHi: function (){ 
          console.log("Hi! I am " + this.name);
      },
      toString: function(){
      if (this[weapons].length > 0)
        return `${this.name} looks angry and wields a ${this[weapons].find(w => w.equipped).name}`;
      else 
        return `${this.name} looks peaceful`;
    }
};
  
  
}(window.characters = window.characters || {}))

var symbolicBarbarian = new window.characters.SymbolicBarbarian('khaaarg');
symbolicBarbarian.equipsWeapon({name: 'katana sword'});
// => khaaarg grabs a katana sword from the cavern floor
console.log(`khaaarg weapons: ${symbolicBarbarian.weapons}`);
// => khaaarg weapons: undefined
console.log(symbolicBarbarian.toString());
// => khaaarg looks angry and wields a katana sword


console.log("===== Static Classes, Members and Methods ======");
console.log("===== Static Members and Methods ======");

// you can mimic static members and methods
// by augmenting the constructor function with properties

ClassyBarbarian.default = function(){ 
  return new Barbarian('default barbarian');
};
ClassyBarbarian.swordWieldingBarbarian = function(){
  var barbarian = new Barbarian('sword wielding barbarian');
  barbarian.equipsWeapon({name: 'sword'});
  return barbarian;
};

var defaultBarbarian = ClassyBarbarian.default();
console.log(defaultBarbarian.name);
// => default barbarian
var swordWieldingBarbarian = ClassyBarbarian.swordWieldingBarbarian();
console.log(swordWieldingBarbarian.name);
// => sword wielding barbarian

console.log("===== Static Class ======");

function DateHelpers(){ throw Error('static class'); };
DateHelpers.ToJavaScriptMonth = function(month){
    // JavaScript months are 0 based
    return month - 1;
}

console.log("==== From one Single Class to Classical Inheritance =====")

// Inheritance Hierarchy:
//   Barbarian -> DrawableGameObject -> MobileGameObject

function Position(x,y){
    this.x = x;
    this.y = y;
}
Position.prototype.toString = function(){
    return "[" + this.x + "," + this.y + "]";
}

function MobileGameObject(position){
    this.position = position;    
}
MobileGameObject.prototype.movesTo = function(newPosition){
    console.log(`${this} moves to ${newPosition}`);
    this.position = newPosition;
}

function DrawableGameObject(position, sprite){
    // call base type constructor function
    MobileGameObject.apply(this, position);
    this.sprite = sprite;
}
// establish prototypical inheritance 
// between DrawableGameObject and MobileGameObject
DrawableGameObject.prototype = Object.create(MobileGameObject.prototype);
DrawableGameObject.prototype.constructor = DrawableGameObject;
DrawableGameObject.prototype.draw = function(){
    console.log("drawing sprite: " + this.sprite);
    // draw sprite
};


function Shaman(name, position, sprite){
    // call base type constructor function
    DrawableGameObject.call(this, position, sprite);
    this.name = name;
}
// establish prototypical inheritance 
// between Barbarian and DrawableGameObject
Shaman.prototype = Object.create(DrawableGameObject.prototype);
Shaman.prototype.constructor = Shaman;
Shaman.prototype.toString = function(){
    return this.name;
};
Shaman.prototype.heals = function(target){
    console.log(`${this} heals ${target} (+ 50hp)`);
    target.hp += 50;
}


var koloss = new Shaman("Koloss", new Position(0,0), "koloss.jpg");
koloss.movesTo(new Position(5,5))
// => moving Koloss!!! to [5,5]
koloss.draw()
// => drawing sprite: koloss.jpg
koloss.heals(conan);
// => Koloss heals Conan, the Barbarian

function WhiteShaman(name, position, sprite){
    // call base type constructor function
    Shaman.call(this, name, position, sprite);
}
WhiteShaman.prototype = Object.create(Shaman.prototype);
WhiteShaman.prototype.constructor = WhiteShaman;
WhiteShaman.prototype.castsSlowCurse = function(target){
  console.log(`${this} casts slow on ${target}. ${target} seems to move slower`);
  if (target.curses) target.curses.push('slow');
  else target.curses = ['slow'];
};
WhiteShaman.prototype.heals = function(target){
    Shaman.prototype.heals.call(this, target);
    console.log(`${this} cleanses all negatives effects in ${target}`);
    target.curses = [];
    target.poisons = [];
}


var khaaar = new WhiteShaman('Khaaar', new Position(0,0), "khaaar.png");
khaaar.castsSlowCurse(conan);
// => Khaaar casts slow on Conan, the Barbarian. Conan, the Barbarian seems to move slower
khaaar.heals(conan);
// => Khaaar cleanses all negatives effects in Conan, the Barbarian

console.log("==== Simplify Classical Inheritance with helpers =====")

// writing all this structures by hand can get a little bit tiring
// but you can create a couple of helpers to make it easier for you

function newClass({constructor, methods:prototype, extends:BaseClass=Object}){
  //console.log(constructor, prototype, BaseClass);
  function extendConstructor(ctor, ctorToExtend){
     return function(...args){
        ctorToExtend.apply(this, args)
        ctor.apply(this, args);
        return this;
     };
  }
                   
  // make sure constructor calls base class constructor
  let extendingConstructor = extendConstructor(constructor, BaseClass);
  
  // set the class prototype to an object that has
  // the base class prototype as prototype
  extendingConstructor.prototype = Object.create(BaseClass.prototype);
  extendingConstructor.prototype.constructor = extendingConstructor;
  // extend the prototype with the *class* methods
  Object.assign(extendingConstructor.prototype, prototype);
                   
  return extendingConstructor;
}

var Berserker = newClass({
  constructor: function(name, position, sprite, animalSpirit){
    this.animalSpirit;
  },
  methods: {
    rageAttack: function(target){
      console.log(`${this} screams and hits ${target} with a terrible blow`);
      target.hp -= 100;
    }
  },
  extends: ClassyBarbarian
});

var dwarfBerserker = new Berserker('Gloin', new Position(0,0), 'gloin.png', 'badger');
dwarfBerserker.rageAttack("conan");
// => Gloin screams and hits conan with a terrible blow
dwarfBerserker.equipsWeapon({name: 'Double bearded Axe'});
// => Gloin grabs a Double bearded Axe from the cavern floor











