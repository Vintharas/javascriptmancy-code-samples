/* 
 *
 * JavaScript-mancy 
 * Black Tower Summoning: Objects Interweaving Objects with Mixins
 *
 *
 */

console.log("===== Class Free Inheritance =====")
console.log("===== Free Yourself From Classes With Object Composition and Mixins =====")

// define behaviors as objects
let canBeIdentifiedByName = {
  toString(){
    return this.name;
  }
};

let canCastSpells = {
  castsSpell(spell, target){
    console.log(this + ' casts ' + spell + ' on ' + target);
    this.mana -= spell.mana;
    spell(target);
  }
};

let canSteal = {
  steals(target, item){
    console.log(`${this} steals ${item} from ${target}`);
  }
};

let canPlayMusic = {
  playsMusic(){
    console.log(`${this} grabs his ${this.instrument} and starts playing music`);
  }
};

// and now we can create our objects by composing this behaviors together
function Wizard(element, mana, name, hp){
  let wizard = {element, 
                mana, 
                name, 
                hp};
  Object.assign(wizard, 
               canBeIdentifiedByName,
               canCastSpells);
  return wizard;
}

function Thief(name, hp){
  let thief = {name, 
               hp};
  Object.assign(thief,
               canBeIdentifiedByName,
               canSteal);
  return thief;
}

function Bard(instrument, mana, name, hp){
  let bard = {instrument, 
                mana, 
                name, 
                hp};
  Object.assign(bard,
               canBeIdentifiedByName,
               canCastSpells,
               canSteal,
               canPlayMusic);
  return bard;
}

var lightningSpell = function(target){
  console.log('A bolt of lightning electrifies ' + target + '(-10hp)');
  target.hp -= 10;
};
lightningSpell.mana = 5;
lightningSpell.toString = function(){ return 'lightning spell';};
var orc = {name: 'orc', hp: 100, toString(){return this.name}};

let wizard = Wizard('fire', 100, 'Randalf, the Red', 10);
wizard.castsSpell(lightningSpell, orc);
// => Randalf, the Red casts lightning spell on orc
// => A bolt of lightning electrifies orc(-10hp)

let thief = Thief('Locke Lamora', 100);
thief.steals('orc', /*item*/ 'gold coin');
// => Locke Lamora steals gold coin from orc

let bard = Bard('lute', 100, 'Kvothe', 100);
bard.playsMusic();
// => Kvothe grabs his lute and starts playing music
bard.steals('orc', /*item*/ 'sandwich');
// => Kvothe steals sandwich from orc
bard.castsSpell(lightningSpell, orc);
// => Kvothe casts lightning spell on orc
// =>A bolt of lightning electrifies orc(-10hp)



// the bits of reusable behavior are called mixins
// the encapsulate reusable behavior that you can compose any object with
// You don't need a factory function to use a mixin.
// You can use it on any simple object
var orcMagician = Object.assign(
    {name: 'orcmag', hp: 100, mana: 50},
    canBeIdentifiedByName,
    canCastSpells);

orcMagician.castsSpell(lightningSpell, wizard);
// => orcmag casts lightning spell on Randalf, the Red
// => A bolt of lightning electrifies Randalf, the Red(-10hp)
// sweet vengeance muahahaha

console.log("===== Another example of object composition =====")

// Imagine that you want to be able to see your legions displayed on a map so you take better strategic decisions in your path to ruling the known universe. 
// You can define a `canBePositioned` object that encapsulates this wanted behavior:

var canBePositioned = {
    x : 0,
    y : 0,
    movesTo(x, y) {
        console.log(`${this} moves from (${this.x}, ${this.y}) to (${x}, ${y})`);
        this.x = x;
        this.y = y;
    }
};

Object.assign(wizard, canBePositioned);
Object.assign(thief, canBePositioned);
Object.assign(bard, canBePositioned);
Object.assign(orcMagician, canBePositioned);

wizard.movesTo(10,10);
// => Randalf, the Red moves from (0, 0) to (10, 10)
thief.movesTo(5,5);
// => Locke Lamora moves from (0, 0) to (5, 5)
bard.movesTo(15,15);
// => Kvothe moves from (0, 0) to (15, 15)

function Map(width, height, creatures){
  
  function paintPoint(x,y){
    var creatureInPosition = creatures.find(c => c.x === x && c.y === y);
    if (creatureInPosition) return creatureInPosition.name[0];
    return '_';
  }
  
  return {
    width,
    height,
    creatures,
    paint(){
      let map = '';
      for(let y = 0; y < height; y++){
        for (let x = 0; x < width; x++)
          map += paintPoint(x,y);
        map += '\n';
      }
      return map;
    }
  }
}

let worldMap = Map(50, 20, [wizard, thief, bard, orcMagician]);
console.log(worldMap.paint());
/* 
o_________________________________________________
__________________________________________________
__________________________________________________
__________________________________________________
__________________________________________________
_____L____________________________________________
__________________________________________________
__________________________________________________
__________________________________________________
__________________________________________________
__________R_______________________________________
__________________________________________________
__________________________________________________
__________________________________________________
__________________________________________________
_______________K__________________________________
__________________________________________________
__________________________________________________
__________________________________________________
__________________________________________________
*/

console.log("===== Mixin Objects Gotchas =====")

// As wonderful as *mixin* objects are they have some severe limitations:
// 
// * They don't support data privacy
// * They can create undesired coupling between objects
// * They are subject to name collisions
//
console.log("===== Undesired Coupling =====")

var canBePositionedWithGotcha = {
    position: {x: 0, y: 0},
    movesTo(x, y) {
        console.log(`${this} moves from (${this.position.x}, ${this.position.y}) to (${x}, ${y})`);
        this.position.x = x;
        this.position.y = y;
    }
};

var wizardOfOz = Wizard('oz', 100, 'Wizard of Oz', 10);
var tasselhof = Thief('Tasshelhof B.', 20);
Object.assign(wizardOfOz, canBePositionedWithGotcha);
Object.assign(tasselhof, canBePositionedWithGotcha);

wizardOfOz.movesTo(2,2);
// => Wizard of Oz moves from (0, 0) to (2, 2)
tasselhof.movesTo(6,6);
// => Tasshelhof B. moves from (2, 2) to (6, 6)
// wait... from (2,2)?????

console.log("===== Name Collisions =====")

var canBePositionedIn3Dimensions = {
    x: 0,
    y: 0,
    z: 0,
    movesTo(x, y, z) {
        console.log(`${this} moves from (${this.x}, ${this.y}, ${this.z}) to (${x}, ${y}, ${z})`);
        this.x = x;
        this.y = y;
        this.z = z;
    }
};

var raist = Wizard('death', /*mana*/ 1000, 'Raistlin', /*hp*/ 1);
Object.assign(raist, canBePositioned, canBePositionedIn3Dimensions);

// we used the movesTo method thinking about the canBePositioned mixin
// and we get an unexpected result z becomes undefined
raist.movesTo(10, 20);
// => Raistlin moves from (0, 0, 0) to (10, 20, undefined)


console.log("===== Functional Mixins  =====")

/* 
*Functional mixins* are *mixins* implemented as functions instead of objects. 

They let you implement *data privacy* through closures and avoid undesired coupling between objects by working as a factory for *mixins*.
*/

let canBeIdentifiedByNameFn = (state) => ({
  toString(){
    return state.name;
  }
});

let canCastSpellsFn = (state) => ({
  castsSpell(spell, target){
    console.log(`${state.name} casts ${spell} on ${target}`);
    state.mana -= spell.mana;
    spell(target);
  }
});

let canStealFn = (state) => ({
  steals(target, item){
    console.log(`${state.name} steals ${item} from ${target}`);
  }
});

let canPlayMusicFn = (state) => ({
  playsMusic(){
    console.log(`${state.name} grabs his ${state.instrument} and starts playing music`);
  }
});

// and now we can create our objects by composing these behaviors together
function TheWizard(element, mana, name, hp){
  let state = {element, 
               mana, 
               name, 
               hp};
  
  return Object.assign({},
               canBeIdentifiedByNameFn(state),
               canCastSpellsFn(state));
}

function TheThief(name, hp){
  let state = {name, 
               hp};
  
  return Object.assign({},
                       canBeIdentifiedByNameFn(state),
                       canStealFn(state));
}

function TheBard(instrument, mana, name, hp){
  let state = {instrument, 
                mana, 
                name, 
                hp};
  
  return Object.assign({},
               canBeIdentifiedByNameFn(state),
               canCastSpellsFn(state),
               canStealFn(state),
               canPlayMusicFn(state));
}

var landaf = TheWizard('light', 100, 'Landaf the light', 100);
landaf.castsSpell(lightningSpell, orc);
// => Landaf the light casts lightning spell on orc
// => A bolt of lightning electrifies orc(-10hp)

var lupen = TheThief('Lupen', 200);
lupen.steals(orc, 'rusty copper ring');
// => Lupen steals rusty copper ring from orc

var bart = TheBard('lute', 200, 'Bart', 100);
bart.playsMusic();
// => Bart grabs his lute and starts playing music
bart.steals(lupen, 'rusty copper ring');
// => Bart steals rusty copper ring from Lupen
bart.castsSpell(lightningSpell, landaf);
// => Bart casts lightning spell on Landaf the light
// => A bolt of lightning electrifies Landaf the light(-10hp)
// Wow Bart is mean!


// well you can take advantage of the way Object.assign works
// and use it to overwrite behaviors with new ones:

let canCastSpellsOnMany = {
  castsSpell(spell, ...many){
    many.forEach(target => {
    	console.log(this + ' casts ' + spell + ' on ' + target);
    	this.mana -= spell.mana;
      spell(target);
    });
  }
}

Object.assign(bard, canCastSpellsOnMany);
bard.castsSpell(lightningSpell, orc, orcMagician, landaf);
// => Kvothe casts lightning spell on orc
// => A bolt of lightning electrifies orc (-10hp)
// => Kvothe casts ligtning spell on orcmag
// => A bolt of lightning electrifies orcmag (-10hp)
// => Kvothe casts lightning spell on Landaf the light
// => A bolt of lightning electrifies Landaf the light(-10hp)

// or use namespacing for your mixins. This will result in more
// verbose APIs for your composed objects

var canEat = {
  food: {
    eats(foodItem) { 
      console.log(`${this} eats ${foodItem}`);
      this.hp += foodItem.recoverHp;
    }
  }
};
// bard.food.eats({name: 'banana', recoverHp: 10, toString(){return this.name;}});

var canEatMany = {
  foods: {
    eats(...foodItems) { 
      foodItems.forEach(f => {
        console.log(`${this} eats ${f}`);
        this.hp += f.recoverHp;
      });
    }
  }
};

// bard.foods.eats(
//    {name: 'banana', recoverHp: 10, toString(){return this.name;}}
//    {name: 'sandwich', recoverHp: 20, toString(){return this.name;}});


console.log("===== Combining ES6 Classes and Mixins  =====")
console.log("===== Composing a class instance  =====")

class Warrior{
  
  constructor(name, hp=500){
    this.name = name;
    this.hp = hp;
    this.weapons = [];
  }
  
  equipsWeapon(weapon){
    weapon.isEquipped = true;
    this.weapons.push(weapon);
    console.log(`${this} picks ${weapon} from the ground and looks at it appreciatively`);
  }
  
  attacks(target){
    if (this.weapons.length === 0) {
      console.log(`${this} attacks ${target} with his bare arms`);
    } else {
      console.log(`${this} attacks ${target} with ${this.weapons.find(w => w.isEquipped)}`);
    }
  }

  toString(){
    return this.name;
  }

}

// you can compose a single instance of class with a mixin
let caramon = new Warrior('Caramon', 1000);
Object.assign(caramon, canSteal);
caramon.steals(bard, 'lute');
// => Caramon steals lute from Kvothe

console.log("===== Composing a class prototype  =====")
// or you can compose the class prototype with a mixin
// and provide all existing and future class instances with that mixin behavior
Object.assign(Warrior.prototype, canBePositioned);
// existing instances of Warrior now can be positioned
caramon.movesTo(10,10);
// => Caramon moves from (0, 0) to (10, 10)
// Crazy!

// and new ones as well
let riverwind = new Warrior('Riverwind', 300);
riverwind.movesTo(20,20);
// => Riverwind moves from (0, 0) to (20, 20)

console.log("===== Object.assign =====")

// The `Object.assign` method is a new `Object` static method in *ES6* 
// it lets you copy all enumerable own properties 
// from one or several *source* objects into a single *target* object. 

// copy properties from one object to another
var companyOfTheRing = { aHobbit: 'frodo'};
var companyPlusOne = Object.assign(/* target */ companyOfTheRing, /*source*/ { aWizard: 'Gandalf'});
console.log(companyOfTheRing);
// => [object Object] { aHobbit: "frodo", aWizard: "Gandalf" }

// the returned object is the same as the target object
console.log(`companyPlusOne and companyOfTheRingt are the same: ${companyPlusOne === companyOfTheRing}`);
// => companyPlusOne and companyOfTheRingt are the same: true

// merge serveral objects into one 
Object.assign(companyOfTheRing, {anElf: 'Legolas'}, {aDwarf: 'Gimli'});
console.log(companyOfTheRing);
// => [objetc Object] {aHobbit: "frodo", ... anElf: "Legolas", aDwarf: "Gimli"}

// clone an object (shallow-copy)
var clonedCompany = Object.assign(/*target*/ {}, /*source*/ companyOfTheRing);
console.log(clonedCompany);
// => [objetc Object] {aHobbit: "frodo", ... anElf: "Legolas", aDwarf: "Gimli"}

// it doesn't copy prototype properties
// only own properties
var newCompanyWithPrototype = Object.assign({
  '__proto__': { 
    destroyTheRing(){
      console.log('The mighty company of the ring successfully destroys the ring and saves Middle Earth');
    }
  }}, companyOfTheRing);

var companyOfTheBracelet = Object.assign({}, newCompanyWithPrototype);
console.log(`companyOfTheBracelet.destroyTheRing: ${companyOfTheBracelet.destroyTheRing}`);
// => companyOfTheBracelet.destroyTheRing: undefined

// it does a shallow-copy of each property
companyOfTheRing.equipment = ['bread', 'rope', 'the one ring'];
var companyOfTheSash = Object.assign({}, companyOfTheRing);
companyOfTheSash.equipment.push('sash');
console.log(companyOfTheRing.equipment);
// => ["bread", "rope", "the one ring", "sash"]
// ups!

console.log("===== Object.assign Alternatives for ES5 JavaScriptmancers =====")

// custom made version of Object.assign

function assign(){
  var args = Array.prototype.slice.call(arguments, 0),
      target = args[0],
      sources = args.slice(1);
  
  return sources.reduceRight(assignObject, target);
  
  function assignObject(target, source){
    for (var prop in source)
      if (source.hasOwnProperty(prop))
        target[prop] = source[prop];
    
    return target;
  }
}

let thor = new Warrior('Thor', 2000);
assign(thor, canCastSpells);
thor.castsSpell(lightningSpell, orc);
// => Thor casts lightning spell on orc
// => A bolt of lightning electrifies orc (-10hp)
// poor orc



