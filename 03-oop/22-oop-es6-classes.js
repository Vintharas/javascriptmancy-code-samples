/* 
 *
 * JavaScript-mancy 
 * White Tower Summoning Enhanced: the Marvels of ES6 Classes
 *
 *
 */

console.log('===== From ES5 to ES6 Classes ======');

// An ES5 "class"
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


// You can translate it in a very straightforward fashion to ES6 classes


class Barbarian {

    constructor(name){
        this.name = name;
        this["character class"] = "barbarian";
        this.hp = 200;
        this.weapons = [];
    }

    talks(){ 
        console.log("I am " + this.name + " !!!");
    }

    equipsWeapon(weapon){ 
        weapon.equipped = true;
        this.weapons.push(weapon);
        console.log(`${this.name} grabs a ${weapon.name} from the cavern floor`);
    }

    toString(){
        return this.name;
    }

    saysHi(){ 
        console.log("Hi! I am " + this.name);
    }
};

var conan = new Barbarian('Conan');
console.log(`Conan is a barbarian: ${conan instanceof Barbarian}`);
// => Conan is a barbarian: true
conan.equipsWeapon('steel sword');
// => Conan grabs a undefined from the cavern floor

console.log('===== Prototypical inheritance via extends ======');

// with ES5 we could have set the prototype property of a constructor function

/*
function Berserker(name, animalSpirit){
    Barbarian.call(this, name);
    this.animalSpirit;
};
Berserker.prototype = Object.create(Barbarian.prototype);
Berserker.prototype.constructor = Berserker;
Berserker.prototype.rageAttack = function(target){
  console.log(`${this} screams and hits ${target} with a terrible blow`);
  target.hp -= 100;
};
*/


class Berserker extends Barbarian {

    constructor(name, animalSpirit){
        super(name);
        this.animalSpirit = animalSpirit;
    }

    rageAttack(target){
      console.log(`${this} screams and hits ${target} with a terrible blow`);
      target.hp -= 100;
    }
}

var logen = new Berserker('Logen, the Bloody Nine', 'wolf');
console.log(`Logen is a barbarian: ${logen instanceof Barbarian}`);
// => Logen is a barbarian: true
console.log(`Logen is a berserker: ${logen instanceof Berserker}`);
// => Logen is a berserker: true
logen.equipsWeapon({name:'huge rusty sword'});
// => Logen, the Bloody Nine grabs a huge rusty sword from the cavern floor
logen.rageAttack(conan);
// => Logen, the Bloody Nine screams and hits Conan with a terrible blow

console.log("===== Override Methods ======")

// you can use the super keyword to call methods from the base class
class Shaman extends Barbarian{
  constructor(name){
    super(name);
  }
  
  heals(target){
    console.log(`${this} heals ${target} (+ 50hp)`);
    target.hp += 50;
  }
}

class WhiteShaman extends Shaman {
  constructor(name){
    super(name);
  }
  
  castsSlowCurse(target){
    console.log(`${this} casts slow on ${target}. ${target} seems to move slower`);
    if (target.curses) target.curses.push('slow');
    else target.curses = ['slow'];
  }
  
  heals(target){
    // instead of Shaman.prototype.heals.call(this, target);
    // you can use super
    super.heals(target);
    console.log(`${this} cleanses all negatives effects in ${target}`);
    target.curses = [];
    target.poisons = [];
  }
}

var khaaar = new WhiteShaman('Khaaar');
khaaar.castsSlowCurse(conan);
// => Khaaar casts slow on Conan, the Barbarian. Conan seems to move slower
khaaar.heals(conan);
// => Khaaar cleanses all negatives effects in Conan

console.log("===== Static Members and Methods ======")

class Sword {
    constructor(material, damage, weight){
        this.material = material;
        this.damage = damage;
        this.weight = weight;
    } 
    toString(){
        return `${this.material} sword (+${this.damage})`;
    }
    static getRandom(){
        let randomMaterial = 'iron',
            damage = Math.round(Math.random()*10),
            randomWeight = '5 stones';
        return new Sword(randomMaterial, damage, randomWeight);
    }
}

let randomSword = Sword.getRandom();
console.log(randomSword.toString());
// => iron sword (+4)

// ES6 classes don't have a specific syntax for static members
// but you can use the same approach you learned in the previous chapter
// augment the constructor with the static member:
Sword.materials = ['wood', 'iron', 'steel'];
console.log(Sword.materials);
// => ['wood', 'iron', 'steel']

console.log("===== ES6 Classes and Information Hiding ======");
console.log("===== Closures ======");

class PrivateBarbarian {

    constructor(name){
        // private members
        var weapons = [];
        // public members
        this.name = name;
        this["character class"] = "barbarian";
        this.hp = 200;
        this.equipsWeapon = function (weapon){ 
            weapon.equipped = true;
            weapons.push(weapon);
            console.log(`${this.name} grabs a ${weapon.name} from the cavern floor`);
        };
        this.toString = function(){
          if (weapons.length > 0) return `${this.name} wields a ${weapons.find(w => w.equipped).name}`;
          else return this.name
        };
    }

    talks(){ 
        console.log("I am " + this.name + " !!!");
    }

    saysHi(){ 
        console.log("Hi! I am " + this.name);
    }
};

var privateBarbarian = new PrivateBarbarian('timido');
privateBarbarian.equipsWeapon({name: 'mace'});
// => timido grabs a mace from the cavern floor
console.log(`Barbarian weapons: ${privateBarbarian.weapons}`);
// => Barbarian weapons: undefined
console.log(privateBarbarian.toString())
// => timido wields a mace

console.log("===== ES6 Symbols ======");

// this should be placed inside a module
// so only the SymbolicBarbarian has access to it
let weapons = Symbol('weapons');

class SymbolicBarbarian {

    constructor(name){
        this.name = name;
        this["character class"] = "barbarian";
        this.hp = 200;
        this[weapons] = [];
    }

    talks(){ 
        console.log("I am " + this.name + " !!!");
    }

    equipsWeapon(weapon){ 
        weapon.equipped = true;
        this[weapons].push(weapon);
        console.log(`${this.name} grabs a ${weapon.name} from the cavern floor`);
    }

    toString(){
        if(this[weapons].length > 0) return `${this.name} wields a ${this[weapons].find(w => w.equipped).name}`;
        else return this.name;
    }

    saysHi(){ 
        console.log("Hi! I am " + this.name);
    }
};

var symbolicBarbarian = new SymbolicBarbarian('simbolo');
symbolicBarbarian.equipsWeapon({name: 'morning star'});
// => timido grabs a mace from the cavern floor
console.log(`Barbarian weapons: ${symbolicBarbarian.weapons}`);
// => Barbarian weapons: undefined
console.log(symbolicBarbarian.toString())
// => timido wields a morning star

console.log("====== ES6 Classes Behind the Curtain ======");

// ES6 classes are just syntactic sugar over the existing JavaScript OOP constructs
// this is a hint that we can use *ES6 classes* just like we could a
// constructor function and prototype pair
// for instance, we can augment a class prototype at any time
// and give instant access to new capabilities to all instances of that class

Barbarian.prototype.entersGodMode = function(){
  console.log(`${this} enters GOD MODE!!!!`);
  this.hp = 99999;
  this.damage = 99999;
  this.speed = 99999;
  this.attack = 99999;
};


conan.entersGodMode();
// => Conan enters GOD MODE!!!!
logen.entersGodMode();
// => Logen, the Bloody Nine enters GOD MODE!!!!
khaaar.entersGodMode();
// => Khaaar enters GOD MODE!!!!



