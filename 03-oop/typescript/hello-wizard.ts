console.log('==== ## Your first TypeScript function ====');

function sayHello(who: string) {
  console.log(`Hello ${who}! I salute you JavaScript-mancer!`);
}

// sayHello(42);
// => Doesn't compile
// => [ts] Argument of type '42' is not assignable to parameter of type 'string'.

sayHello('<Your name here>');
// => Hello <Your name here>! I salute you JavaScript-mancer!

console.log('==== ## Cool TypeScript Features ====');
console.log('==== ### TypeScript Classes ====');

// ES2015 classes
/*
class Gladiator {
    constructor(name, hitPoints){
        this.name = name;
        this.hitPoints = hitPoints;
    }
    toString(){
        return `${this.name} the gladiator`
    }
}
*/

console.log('==== #### TypeScript Classes: Class Members  ====');
// class members
class Gladiator {
    name: string;
    hitPoints: number;

    constructor(name: string, hitPoints: number){
        this.name = name;
        this.hitPoints = hitPoints;
    }

    toString(){
        return `${this.name} the gladiator`
    }
}

console.log('==== #### TypeScript Classes: Parameter Properties  ====');
// parameter roperties define and initialize 
// members via constructor in one go
class SleekGladiator {
    constructor(public name: string, public hitPoints: number){}

    toString(){
        return `${this.name} the gladiator`
    }
}

console.log('==== #### TypeScript Classes: Access Modifiers - ReadOnly  ====');
// As we can see from the example above (and the public keyword)
// TypeScript brings support to access modifiers
// - readonly
// - private, protected, public

class FixedGladiator {
    constructor(readonly name: string,
                public hitPoints: number){}
    toString(){
        return `${this.name}, the gladiator`
    }
}

const maximo = new FixedGladiator('Maximo', 5000);
// maximo.name = "Aurelio";
// => [ts] Cannot assign to 'name' because it is a constant or a read-only property.


console.log('==== #### TypeScript Classes: Access Modifiers - Private  ====');

// Example we used in chapter 6 to achieve data hiding
/*
class PrivateBarbarian {

    constructor(name){
        // private members
        let weapons = [];
        // public members
        this.name = name;
        this["character class"] = "barbarian";
        this.hp = 200;

        this.equipsWeapon = function (weapon){ 
            weapon.equipped = true;
            // the equipsWeapon method encloses the weapons variable
            weapons.push(weapon);
            console.log(`${this.name} grabs a ${weapon.name} ` + 
                        `from the cavern floor`);
        };
        this.toString = function(){
          if (weapons.length > 0) {
            return `${this.name} wields a ` + 
                   `${weapons.find(w => w.equipped).name}`;
          } else return this.name
        };
    }

    talks(){ 
        console.log("I am " + this.name + " !!!");
    }

    saysHi(){ 
        console.log("Hi! I am " + this.name);
    }
};
*/

// in TypeScript
class PrivateBarbarian {
    // private members
    private weapons = [];

    // public members
    ["character class"] = "barbarian";
    hp = 200;

    constructor(public name: string) {}

    equipsWeapon(weapon) { 
        weapon.equipped = true;
        // the equipsWeapon method encloses the weapons variable
        this.weapons.push(weapon);
        console.log(`${this.name} grabs a ${weapon.name} ` + 
                    `from the cavern floor`);
    }
    toString() {
        if (this.weapons.length > 0) {
        return `${this.name} wields a ` + 
                `${this.weapons.find(w => w.equipped).name}`;
        } else return this.name
    };

    talks(){ 
        console.log("I am " + this.name + " !!!");
    }

    saysHi(){ 
        console.log("Hi! I am " + this.name);
    }
};

const conan = new PrivateBarbarian("shy Conan");
// const privateWeapons = conan.weapons;
// => [ts] Property 'weapons' is private and only accessible within class 'PrivateBarbarian'.

console.log('==== ### TypeScript Enums ====');

// how would you represent schools of elemental magic in JavaScript? Fire, Earth, Water, Air?

// 1. perhaps magic strings 
// They are not very intentional/informative and susceptible to typos
const fireballSpell = {
  type: 'fire',
  damage: 30,
  cast(target){
    const actualDamage = target.inflictDamage(this.damage, this.type);
    console.log(`A huge fireball springs from your ` +  
        `fingers and impacts ${target} (-${actualDamage}hp)`);
  }
};

// 2. wrap them inside an object
// better but still susceptible to typos
// and there's nothing preventing you from writing `type: 'banana'`
const schoolsOfElementalMagic = {
  fire: 'fire',
  water: 'water',
  air: 'air',
  earth: 'earth'
};

const betterFireballSpell = {
  type: schoolsOfElementalMagic.fire,
  damage: 30,
  cast(target){
    const actualDamage = target.inflictDamage(this.damage, this.type);
    console.log(`A huge fireball springs from your ` +  
        `fingers and impacts ${target} (-${actualDamage}hp)`);
  }
};

// 3. Use a TypeScript enum
// Statically strongly typed way to represent a limited number of things/states
enum SchoolsOfMagic {
  Fire,
  Water,
  Air,
  Earth
}

// now we can define a Spell interface
interface Spell {
  type: SchoolsOfMagic,
  damage: number,
  cast(target: any);
}

// when we define a new spell. TypeScript will enforce the SchoolsOfMagic
// not only that, when using an editor will give us the available options
// via code completion
const enumifiedFireballSpell: Spell = {
  type: SchoolsOfMagic.Fire,
  damage: 30,
  cast(target){
    const actualDamage = target.inflictDamage(this.damage, this.type);
    console.log(`A huge fireball springs from your ` +  
        `fingers and impacts ${target} (-${actualDamage}hp)`);
  }
}
// providing other than a SchoolsOfMagic enum would result in this error
// [ts] Type '{ type: string; damage: number; cast(target: any): void; }' 
//      is not assignable to type 'Spell'.
//   Types of property 'type' are incompatible.
//   Type 'string' is not assignable to type 'SchoolsOfMagic'.

// Enums are transpiled to JavaScript and 
// they are two-way mappings between numbers/strings 
// that represent the enum name
console.log(`SchoolsOfMagic.Fire: ${SchoolsOfMagic.Fire}`); 
// => 0
console.log(`SchoolsOfMagic[SchoolsOfMagic.Fire]: ${SchoolsOfMagic[SchoolsOfMagic.Fire]}`);
// => 'Fire'

console.log('==== #### String-literal Types ====');
// still prefer strings?
// TypeScript has a special type for string literals
type SchoolsOfMagicII = "fire" | "earth" | "air" | "water";

// now we can define a Spell interface
interface SpellII {
  type: SchoolsOfMagicII,
  damage: number,
  cast(target: any);
}

// we can now create spells with the assurance
// that only the schools of magic or our choosing are valid
/*
const FireballSpellII: SpellII = {
  type: "necromancy", 
  damage: 30,
  cast(target){
    const actualDamage = target.inflictDamage(this.damage, this.type);
    console.log(`A huge fireball springs from your ` +  
        `fingers and impacts ${target} (-${actualDamage}hp)`);
  }
}
*/
// => [ts] Type '{ type: "necromancy"; damage: number; cast(target: any): void; }' 
//         is not assignable to type 'SpellII'.
//    Types of property 'type' are incompatible.
//    Type '"necromancy"' is not assignable to type 'SchoolsOfMagicII'.


console.log('==== ### Object Spread and Rest ====');

// Remember ES2015 spread and rest? Object Spread and rest are the similar
// but instead of using arrays you use objects  

// rest parametersimprove the developer experience 
// of declaring functions with multiple arguments
// Instead of using the `arguments` object like we used to do prior to ES2015:

function obliterate(){
  // Unfortunately arguments is not an array :O
  // so we need to convert it ourselves
  var victims = Array.prototype.slice.call(arguments, 
                              /* startFromIndex */ 0);

  victims.forEach(function(victim){
    console.log(victim + " wiped off of the face of the earth");
  });
  console.log('*Everything* has been obliterated, ' + 
              'oh great master of evil and deceit!');
}

// We can use rest syntax to collect all 
// incoming arguments directly into an array `victims`:
function obliterateWithRest(...victims){
  victims.forEach(function(victim){
    console.log(`${victim} wiped out of the face of the earth`);
  });
  console.log('*Everything* has been obliterated, ' + 
              'oh great master of evil and deceit!');
}

// spread operator works sort of in an opposite way to rest parameters. 
// Instead of taking a variable number of arguments and pack them into an array, 
// the spread operator takes and array and expands it into its compounding items
// It has many use cases like concatenating arrays:

let knownFoesLevel1 = ['rat', 'rabbit']
let newFoes = ['globin', 'ghoul'];
let knownFoesLevel2 = [...knownFoesLevel1, ...newFoes];

// Or cloning arrays:

let foes = ['globin', 'ghoul'];
let clonedFoes = [...foes];

// Object Spread and Rest brings this same type of functionality 
// that is available in Arrays to Objects 
// A great use case for the **Object spread operator** are mixins. 
// In previous chapters we used `Object.assign` to 
// mix the properties of two or more different objects: 

// mixin that encapsulates logic to identify object by name
let canBeIdentifiedByName = {};
// mixin that encapsulates logic to cast spells
let canCastSpells = {};
// factory function to create wizards
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

// We can rewrite the example above 
// using object spread as follows:

function WizardWithSpread(element, mana, name, hp){
  let wizard = {element, 
                mana, 
                name, 
                hp};
  return {...wizard, 
          ...canBeIdentifiedByName,
          ...canCastSpells
         };
}

// The opposite to object spread are object rest parameters. 
// They work in a similar fashion to ES2015 rest parameters but 
// with objects and they're particularly helpful together with ES2015 destructuring. 

// If you remember, we used destructuring and rest parameters 
// to extract elements within an array:

let [first, second, ...rest] = ['dragon', 'chimera', 'harpy', 'medusa'];
console.log(first); // => dragon
console.log(second); // => chimera
console.log(rest); // => ['harpy', 'medusa']

// With the Object Spread Operator we can follow the same 
// pattern to extract and collect properties from objects:
let {weaponName, type, ...stats} = {
  weaponName: 'Hammer of the Morning',
  type: 'two-handed war hammer',
  weight: '40 pounds',
  material: 'nephirium',
  state: 'well kept'
};
console.log(weaponName); // => Hammer of Morning
console.log(type); // => two-handed war hammer
console.log(stats); 
// => {weight: '40 pounds', 
//     material: 'nephirium', 
//     state: 'well kept'}

console.log('==== ## Type annotations ====');
console.log('==== ### Type annotations are not limited to primitive types ====');

// you can specify the types for arrays
let saddleBag: string[] = [];
saddleBag.push('20 silvers');
saddleBag.push('pair of socks');
// saddleBag.push(666);
// => [ts] Argument of type '666' is not assignable to parameter of type 'string'.

// and event tuples
let position : [number, number];
position = [1, 1];
position = [2, 2];

// position = ['orange', 'delight'];
// => [ts] Type '[string, string]' is not assignable to type '[number, number]'.
//    Type 'string' is not assignable to type 'number'.


// functions
let predicate: (...args: number[]) => boolean;
predicate = (a, b) => a > b
console.log(`1 greated than 2? ${predicate(1, 2)}`);
// => 1 greated than 2? false

// predicate = (text:string) => text.toUpperCase();
// => [ts] Type '(text: string) => string' is not assignable 
//         to type '(...args: number[]) => boolean'.
//     Types of parameters 'text' and 'args' are incompatible.
//     Type 'number' is not assignable to type 'string'.

function frost(minion: {hitPoints: number}) {
  const damage = 10;
  console.log(`${minion} is covered in frozy icicles (-${damage} hp)`)
  minion.hitPoints -= damage;
}

const duck = {
  toString(){ return 'duck';}, 
  hitPoints: 100
};

frost(duck);
// => duck is covered in frozy icicles (-10hp)

const theAir = {
    toString(){ return 'air';}
};
// frost(theAir);
// => doesn't compile
// => Argument of type '{ toString(): string; }' is not assignable to parameter of type '{ hitPoints: number; }'.
// Property 'hitPoints' is missing in type '{ toString(): string; }'.

console.log('==== ### Interfaces help you write reusable and concise type annotations ====');

// And even better way to annotate objects is through **interfaces**. 
// They are reusable and less verbose than straight object type annotations. 
interface Minion {
  hitPoints: number;
}

// frost function now with interface
function frosty(minion: Minion){
  const damage = 10;
  console.log(`${minion} is covered in frozy icicles (-${damage} hp)`)
  minion.hitPoints -= damage;
}

// const duck = {
//  toString(){ return 'duck';}, 
//  hitPoints: 100
//  };
frosty(duck);
// => duck is covered in frozy icicles (-10hp)

class Tower {
    constructor(public hitPoints=500, public defense=100){}
    toString(){ return 'a mighty tower';}
}
const tower = new Tower();

frosty(tower);
// => a mighty tower is covered in frozy icicles (-10hp)

frosty({hitPoints: 100});
// => [object Object] is covered in frozy icicles (-10hp)

// frosty({hitPoints: 120, toString(){ return 'a bat';}})
// => doesn't compile
// => Argument of type '{ hitPoints: number; toString(): string; }' is not assignable to parameter of type 'Minion'.
//  Object literal may only specify known properties, and 'toString' does not exist in type 'Minion'.

let aBat = {
    hitPoints: 120, 
    toString(){ return 'a bat';}
};
frosty(aBat);
// => a bat is covered in frozy icicles (-10hp)

console.log('==== ### How does TypeScript Determine What a Minion Is? Structural Typing! ====');

// Typescript follows structural typing
// Types are equivalent if they have the same properties/structure
// All these types are equivalent

interface Wizard {
    hitPoints: number;
    toString(): string;
    castSpell(spell:any, targets: any[]);
}

const bard = {
    hitPoints: 120,
    toString() { return 'a bard';},
    castSpell(spell: any, ...targets: any[]){
        console.log(`${this} cast ${spell} on ${targets}`);
        spell.cast(targets);
    }
}

class MagicCreature {
    constructor(public hitPoints: number){}
    toString(){ return "magic creature";}
    castSpell(spell: any, ...targets: any[]){
        console.log(`${this} cast ${spell} on ${targets}`);
        spell.cast(targets);
    }
}

// this work because structural typing looks at the structure
// of the objects and not whether they explicitly implement X interface
// or inherit Y class
let wizard: Wizard = bard;
let antotherWizard: Wizard = new MagicCreature(120);

// What about this error then?
// frosty({hitPoints: 120, toString(){ return 'a bat';}})
// => doesn't compile
// => Argument of type '{ hitPoints: number; toString(): string; }' 
//    is not assignable to parameter of type 'Minion'.
//  Object literal may only specify known properties, 
//  and 'toString' does not exist in type 'Minion'.

// when using object literals TypeScript enters a special mode
// where it is extra careful to avoid mistakes from your part
// you can easily tell TypeScript this is OK by casting to the
// desired type
frosty({hitPoints: 120, toString(){ return 'a bat';}} as Minion);
// => a bat is covered in frozy icicles (-10hp)

frosty((<Minion>{hitPoints: 120, toString(){ return 'a bat';}}));
// => a bat is covered in frozy icicles (-10hp)

console.log('==== ### TypeScript helps your write less type annotations by inferring types from your code automagically ====');

const aNumber = 1;
const anotherNumber = 2 * aNumber;
// aNumber: number
// anotherNumber:number

const double = (n: number) => 2*n;
// double: (n:number) => number

console.log('==== ### From Interfaces to Classes ====');

class ClassyMinion {
    constructor(public hitPoints:number=100) {}
    toString(){
        return 'a classy minion';
    }
}

function classyFrosty(minion: ClassyMinion){
  const damage = 10;
  console.log(`${minion} is covered in frozy icicles (-${damage} hp)`)
  minion.hitPoints -= damage;
}

classyFrosty(new ClassyMinion());
// => a classy minion is covered in frozy icicles (-10hp)
classyFrosty(aBat);
// => a bat is covered in frozy icicles (-10hp)
classyFrosty(bard);
// => a bard is covered in frozy icicles (-10hp)

console.log('==== ### Advanced Type Annotations ====');
console.log('==== #### Generics ====');

// Generics is a common technique used in statically typed programming languages 
// like C# and Java to generalize the application of a data structure or algorithm 
// to more than one type. 

// For instance, instead of having a separate `Array` implementation for each different type: 
// `NumberArray`, `StringArray`, `ObjectArray`, etc:

interface NumberArray {
  push(n: number);
  pop(): number;
  [index: number]: number;
  // etc
}

interface StringArray {
  push(s: string);
  pop(): string;
  [index: number]: string;
  // etc
}

// etc...

// We use generics to describe an `Array` of an arbitrary type `T`:
// Note that Array is a built-in type in TypeScript 
// (so the example below is a fictitional one)
/*
interface Array<T>{
  push(s: T);
  pop(): T;
  [index: number]: T;
  // etc
}
*/

let numbers: Array<number>;
let characters: Array<string>;
// and so on...

// you can also use generics with classes
class Cell<T> {
  private prisoner: T;

  inprison(prisoner: T) { 
    this.prisoner = prisoner; 
  }

  free(): T { 
    const prisoner = this.prisoner; 
    this.prisoner = undefined;
    return prisoner;
  }
}

// Constrained generics
// T can only be a type compatible with Minion
interface ConstrainedCell<T extends Minion>{
  inprison(item: T);
  free(): T;
}

let compatibleBox: ConstrainedCell<MagicCreature>;

// let incompatibleBox: ConstrainedBox<{name: string}>;
// => [ts] Type '{ name: string; }' does not satisfy the constraint 'Minion'.
//    Property 'hitPoints' is missing in type '{ name: string; }'.

console.log('==== #### Intersection and Union Types ====');

// Remember mixins
/*
function Wizard(element, mana, name, hp){
  let wizard = {element, 
                mana, 
                name, 
                hp};

  // now we use object spread
  return {...wizard, 
          ...canBeIdentifiedByName,
          ...canCastSpells
         };
}
*/

// How can we represent a mixin result type?
// Its a combination of several different Types
// WE can start by decomposing the previous factory function
// it its compounding types

interface WizardProps{
  element: string;
  mana: number;
  name: string;
  hp: number;
}

interface NameMixin {
  toString(): string;
}

interface SpellMixin {
  castsSpell(spell:Spell, target: Minion);
}

// And we can see the result type Wizard
// as a combination of all of these different types
// In TypeScript we can use intersection types to represent
// the resulting type:
// WizardProps & NameMixin & SpellMixin

let canBeIdentifiedByNameMixin: NameMixin = {
    toString(){ return this.name; }
};

let canCastSpellsMixin: SpellMixin = {
    castsSpell(spell:Spell, target:Minion){
      // cast spell
    }
}

function WizardIntersection(element: string, mana: number, name : string, hp: number): 
         WizardProps & NameMixin & SpellMixin {
  let wizard: WizardProps = {element, 
                mana, 
                name, 
                hp};

  // now we use object spread
  return {...wizard, 
          ...canBeIdentifiedByNameMixin,
          ...canCastSpellsMixin
         };
}

const merlin = WizardIntersection('spirit', 200, 'Merlin', 200);
// merlin.steal(conan);
// => [ts] Property 'steal' does not exist on type 'WizardProps & NameMixin & SpellMixin'.

// union types
// like intersection but instead of being a combination
// you can only have one type at a time of a collection of types

// useful for function overloads
function raiseSkeleton(numberOrCreature){
  if (typeof numberOrCreature === "number"){
    raiseSkeletonsInNumber(numberOrCreature);
  } else if (typeof numberOrCreature === "string") {
    raiseSkeletonCreature(numberOrCreature);
  } else {
    console.log('raise a skeleton');
  }

  function raiseSkeletonsInNumber(n){
    console.log('raise ' + n + ' skeletons');
  }
  function raiseSkeletonCreature(creature){
    console.log('raise a skeleton ' + creature);
  };
}

// this function raises skeletons slightly differently based
// on the type of the arguments
raiseSkeleton(22);
// => raise 22 skeletons
raiseSkeleton('dragon');
// => raise a skeleton dragon

// we can add some TypeScript goodness with union types

function raiseSkeletonTS(numberOrCreature: number | string){
  if (typeof numberOrCreature === "number"){
    raiseSkeletonsInNumber(numberOrCreature);
  } else if (typeof numberOrCreature === "string") {
    raiseSkeletonCreature(numberOrCreature);
  } else {
    console.log('raise a skeleton');
  }

  function raiseSkeletonsInNumber(n: number){
    console.log('raise ' + n + ' skeletons');
  }
  function raiseSkeletonCreature(creature: string){
    console.log('raise a skeleton ' + creature);
  };
}

//raiseSkeletonTS(['kowabunga'])
// => [ts] Argument of type 'string[]' is not assignable 
//         to parameter of type 'string | number'.
// Type 'string[]' is not assignable to type 'number'.



console.log('==== #### Type Aliases ====');

// alias work great together with intersection and union types
// tired of typing WizardProps & NameMixin & SpellMixin
// create an alias!
type Wizardd = WizardProps & NameMixin & SpellMixin;

function WizardAlias(element: string, mana: number, 
                name : string, hp: number): Wizardd {
  let wizard: WizardProps = {element, 
                mana, 
                name, 
                hp};

  // now we use object spread
  return {...wizard, 
          ...canBeIdentifiedByNameMixin,
          ...canCastSpellsMixin
         };
}
