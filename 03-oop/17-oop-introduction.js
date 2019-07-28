/* 
 *
 * JavaScript-mancy: OOP
 * Introduction to the Path of Summoning and Commanding Objects (aka OOP)
 *
 */

console.log('===== Class Equivalent in ES5 ======');

// A C# class is more or less equivalent
// to a JavaScript constructor function and prototype pair
// Here we have a Minion ctor function and prototype
function Minion(name, hp){
  // the ctor function usually defines the data within a "class"
  // will contain.
  // the properties contained within a constructor function will be part
  // of each object created with this function
  this.name = name;
  this.hp = hp;
}

// the prototype usually defines the methods within a "class"
// It is shared across all Minion instances
Minion.prototype.toString = function() {return this.name;};

var orc = new Minion('orc', 100);
console.log(orc);
// => [object Object] {
//  hp: 100,
//  name: "orc",
//  toString: function () {return this.name;}
//}

console.log(orc.toString());
// => orc

console.log('orc is a Minion: ' + (orc instanceof Minion));
// => true

// we can use classical inheritance by creating a new "class"
// and making it inherit from Minion
// Behold! A Wizard!

function Wizard(element, mana, name, hp){
  // the constructor function calls its parent constructor function
  // using [Function.prototype.call] (or apply)
  Minion.call(this, name, hp);
  this.element = element;
  this.mana = mana;
}

// the prototype of the Wizard is a Minion object
Wizard.prototype = Object.create(Minion.prototype);
Wizard.prototype.constructor = Wizard;
// we augment the prototype with a new method to cast mighty spells
Wizard.prototype.castSpell = function(spell, target){
    console.log(this + ' casts ' + spell + ' on ' + target);
    this.mana -= spell.mana;
    spell(target);
};
// override and extend methods
Wizard.prototype.toString = function(){
    return Minion.prototype.toString.apply(this, arguments) + ", the " + this.element +" Wizard";
};

var gandalf = new Wizard("Grey", /* mana */ 50, "Gandalf", /* hp */ 50);
console.log('Gandalf is a Wizard: ' + (gandalf instanceof Wizard));
// => Gandalf is a Wizard: true
console.log('Gandalf is a Minion: ' + (gandalf instanceof Minion));
// => Gandalf is a Minion: true

console.log(gandalf.toString());
// => Gandalf, the Grey Wizard

var lightningSpell = function(target){
  console.log('A bolt of lightning electrifies ' + target + '(-10hp)');
  target.hp -= 10;
};
lightningSpell.mana = 5;
lightningSpell.toString = function(){ return 'lightning spell';};
gandalf.castSpell(lightningSpell, orc);
// =>Gandalf, the Grey Wizard casts lightning spell on orc
// => A bolt of lightning electrifies orc (-10hp)


console.log('===== Classes in ES6 ======');

class ClassyMinion{
  constructor(name, hp){
    this.name = name;
    this.hp = hp;
  }
  toString(){
    return this.name;
  }
}

let classyOrc = new ClassyMinion('classy orc', 50);
console.log(classyOrc);
// => [object Object] {
//  hp: 100,
//  name: "classy orc"
//}

console.log(classyOrc.toString());
// => classy orc

console.log('classy orc is a ClassyMinion: ' + (classyOrc instanceof ClassyMinion));
// => classy orc is a ClassyMinion: true

class ClassyWizard extends ClassyMinion{
  constructor(element, mana, name, hp){
    // super lets you access the parent class methods
    super(name, hp);
    this.element = element;
    this.mana = mana;
  }
  toString(){
    return super.toString() + ", the " + this.element +" Wizard";
  }
  castSpell(spell, target){
    console.log(this + ' casts ' + spell + ' on ' + target);
    this.mana -= spell.mana;
    spell(target);
  }
}

let classyGandalf = new Wizard("Grey", /* mana */ 50, "Classy Gandalf", /* hp */ 50);
console.log('Classy Gandalf is a ClassyWizard: ' + (classyGandalf instanceof ClassyWizard));
// => Classy Gandalf is a ClassyWizard: true
console.log('Classy Gandalf is a ClassyMinion: ' + (classyGandalf instanceof ClassyMinion));
// => Classy Gandalf is a ClassyMinion: true

console.log(classyGandalf.toString());
// => Classy Gandalf, the Grey Wizard

classyGandalf.castSpell(lightningSpell, classyOrc);
// => Classy Gandalf, the Grey Wizard casts lightning spell on classy orc
// => A bolt of lightning electrifies classy orc(-10hp)


console.log('===== Mixins ======');

// let's say that we have yet another class for Thieves
class ClassyThief extends ClassyMinion{
  constructor(name, hp){
    super(name, hp);
  }
  toString(){
    return super.toString() + ", the Thief";
  }
  steal(target, item){
    console.log(`${this} steals ${item} from ${target}`);
  }
}

// what happens if you want to create a new class that can both cast spells
// and steal? Something like a Bard?

// class Bard
// should be able to:
// - cast powerful spells
// - steal many items
// - play beautiful music

// we cannot get to a good solution to implement Bard in C#
// but with JavaScript we can create it using object composition and mixins!
// let's decompose all behaviors in smaller objects

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
function TheWizard(element, mana, name, hp){
  let wizard = {element, 
                mana, 
                name, 
                hp};
  Object.assign(wizard, 
               canBeIdentifiedByName,
               canCastSpells);
  return wizard;
}

function TheThief(name, hp){
  let thief = {name, 
               hp};
  Object.assign(thief,
               canBeIdentifiedByName,
               canSteal);
  return thief;
}

function TheBard(instrument, mana, name, hp){
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

let wizard = TheWizard('fire', 100, 'Randalf, the Red', 10);
wizard.castsSpell(lightningSpell, orc);
// => Randalf, the Red casts lightning spell on orc
// => A bolt of lightning electrifies orc(-10hp)

let thief = TheThief('Locke Lamora', 100);
thief.steals('orc', /*item*/ 'gold coin');
// => Locke Lamora steals gold coin from orc

let bard = TheBard('lute', 100, 'Kvothe', 100);
bard.playsMusic();
// => Kvothe grabs his lute and starts playing music
bard.steals('orc', /*item*/ 'sandwich');
// => Kvothe steals sandwich from orc
bard.castsSpell(lightningSpell, orc);
// => Kvothe casts lightning spell on orc
// =>A bolt of lightning electrifies orc(-10hp)

// we can even mix classes with mixins
class ClassyBard extends ClassyMinion{
  constructor(instrument, mana, name, hp){
    super(name, hp);
    this.instrument = instrument;
    this.mana = mana;
  }
}

Object.assign(ClassyBard.prototype,
       canSteal,
       canCastSpells,
       canPlayMusic);

// and verify that it works
let anotherBard = new ClassyBard('guitar', 100, 'Jimmy Hendrix', 100);
anotherBard.playsMusic();
// => Jimmy Hendrix grabs his guitar and starts playing music
anotherBard.steals('orc', /*item*/ 'silver coin');
// => Jimmy Hendrix steals silver coin from orc
anotherBard.castsSpell(lightningSpell, orc);
// => Jimmy Hendrix casts lightning spell on orc
// => A bolt of lightning electrifies orc(-10hp)


