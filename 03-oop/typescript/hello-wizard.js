var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
console.log('==== ## Your first TypeScript function ====');
function sayHello(who) {
    console.log("Hello " + who + "! I salute you JavaScript-mancer!");
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
var Gladiator = (function () {
    function Gladiator(name, hitPoints) {
        this.name = name;
        this.hitPoints = hitPoints;
    }
    Gladiator.prototype.toString = function () {
        return this.name + " the gladiator";
    };
    return Gladiator;
}());
console.log('==== #### TypeScript Classes: Parameter Properties  ====');
// parameter roperties define and initialize 
// members via constructor in one go
var SleekGladiator = (function () {
    function SleekGladiator(name, hitPoints) {
        this.name = name;
        this.hitPoints = hitPoints;
    }
    SleekGladiator.prototype.toString = function () {
        return this.name + " the gladiator";
    };
    return SleekGladiator;
}());
console.log('==== #### TypeScript Classes: Access Modifiers - ReadOnly  ====');
// As we can see from the example above (and the public keyword)
// TypeScript brings support to access modifiers
// - readonly
// - private, protected, public
var FixedGladiator = (function () {
    function FixedGladiator(name, hitPoints) {
        this.name = name;
        this.hitPoints = hitPoints;
    }
    FixedGladiator.prototype.toString = function () {
        return this.name + ", the gladiator";
    };
    return FixedGladiator;
}());
var maximo = new FixedGladiator('Maximo', 5000);
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
var PrivateBarbarian = (function () {
    function PrivateBarbarian(name) {
        this.name = name;
        // private members
        this.weapons = [];
        // public members
        this["character class"] = "barbarian";
        this.hp = 200;
    }
    PrivateBarbarian.prototype.equipsWeapon = function (weapon) {
        weapon.equipped = true;
        // the equipsWeapon method encloses the weapons variable
        this.weapons.push(weapon);
        console.log(this.name + " grabs a " + weapon.name + " " +
            "from the cavern floor");
    };
    PrivateBarbarian.prototype.toString = function () {
        if (this.weapons.length > 0) {
            return this.name + " wields a " +
                ("" + this.weapons.find(function (w) { return w.equipped; }).name);
        }
        else
            return this.name;
    };
    ;
    PrivateBarbarian.prototype.talks = function () {
        console.log("I am " + this.name + " !!!");
    };
    PrivateBarbarian.prototype.saysHi = function () {
        console.log("Hi! I am " + this.name);
    };
    return PrivateBarbarian;
}());
;
var conan = new PrivateBarbarian("shy Conan");
// const privateWeapons = conan.weapons;
// => [ts] Property 'weapons' is private and only accessible within class 'PrivateBarbarian'.
console.log('==== ### TypeScript Enums ====');
// how would you represent schools of elemental magic in JavaScript? Fire, Earth, Water, Air?
// 1. perhaps magic strings 
// They are not very intentional/informative and susceptible to typos
var fireballSpell = {
    type: 'fire',
    damage: 30,
    cast: function (target) {
        var actualDamage = target.inflictDamage(this.damage, this.type);
        console.log("A huge fireball springs from your " +
            ("fingers and impacts " + target + " (-" + actualDamage + "hp)"));
    }
};
// 2. wrap them inside an object
// better but still susceptible to typos
// and there's nothing preventing you from writing `type: 'banana'`
var schoolsOfElementalMagic = {
    fire: 'fire',
    water: 'water',
    air: 'air',
    earth: 'earth'
};
var betterFireballSpell = {
    type: schoolsOfElementalMagic.fire,
    damage: 30,
    cast: function (target) {
        var actualDamage = target.inflictDamage(this.damage, this.type);
        console.log("A huge fireball springs from your " +
            ("fingers and impacts " + target + " (-" + actualDamage + "hp)"));
    }
};
// 3. Use a TypeScript enum
// Statically strongly typed way to represent a limited number of things/states
var SchoolsOfMagic;
(function (SchoolsOfMagic) {
    SchoolsOfMagic[SchoolsOfMagic["Fire"] = 0] = "Fire";
    SchoolsOfMagic[SchoolsOfMagic["Water"] = 1] = "Water";
    SchoolsOfMagic[SchoolsOfMagic["Air"] = 2] = "Air";
    SchoolsOfMagic[SchoolsOfMagic["Earth"] = 3] = "Earth";
})(SchoolsOfMagic || (SchoolsOfMagic = {}));
// when we define a new spell. TypeScript will enforce the SchoolsOfMagic
// not only that, when using an editor will give us the available options
// via code completion
var enumifiedFireballSpell = {
    type: SchoolsOfMagic.Fire,
    damage: 30,
    cast: function (target) {
        var actualDamage = target.inflictDamage(this.damage, this.type);
        console.log("A huge fireball springs from your " +
            ("fingers and impacts " + target + " (-" + actualDamage + "hp)"));
    }
};
// providing other than a SchoolsOfMagic enum would result in this error
// [ts] Type '{ type: string; damage: number; cast(target: any): void; }' 
//      is not assignable to type 'Spell'.
//   Types of property 'type' are incompatible.
//   Type 'string' is not assignable to type 'SchoolsOfMagic'.
// Enums are transpiled to JavaScript and 
// they are two-way mappings between numbers/strings 
// that represent the enum name
console.log("SchoolsOfMagic.Fire: " + SchoolsOfMagic.Fire);
// => 0
console.log("SchoolsOfMagic[SchoolsOfMagic.Fire]: " + SchoolsOfMagic[SchoolsOfMagic.Fire]);
// => 'Fire'
console.log('==== ### Object Spread and Rest ====');
// Remember ES2015 spread and rest? Object Spread and rest are the similar
// but instead of using arrays you use objects  
// rest parametersimprove the developer experience 
// of declaring functions with multiple arguments
// Instead of using the `arguments` object like we used to do prior to ES2015:
function obliterate() {
    // Unfortunately arguments is not an array :O
    // so we need to convert it ourselves
    var victims = Array.prototype.slice.call(arguments, 
    /* startFromIndex */ 0);
    victims.forEach(function (victim) {
        console.log(victim + " wiped off of the face of the earth");
    });
    console.log('*Everything* has been obliterated, ' +
        'oh great master of evil and deceit!');
}
// We can use rest syntax to collect all 
// incoming arguments directly into an array `victims`:
function obliterateWithRest() {
    var victims = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        victims[_i] = arguments[_i];
    }
    victims.forEach(function (victim) {
        console.log(victim + " wiped out of the face of the earth");
    });
    console.log('*Everything* has been obliterated, ' +
        'oh great master of evil and deceit!');
}
// spread operator works sort of in an opposite way to rest parameters. 
// Instead of taking a variable number of arguments and pack them into an array, 
// the spread operator takes and array and expands it into its compounding items
// It has many use cases like concatenating arrays:
var knownFoesLevel1 = ['rat', 'rabbit'];
var newFoes = ['globin', 'ghoul'];
var knownFoesLevel2 = knownFoesLevel1.concat(newFoes);
// Or cloning arrays:
var foes = ['globin', 'ghoul'];
var clonedFoes = foes.slice();
// Object Spread and Rest brings this same type of functionality 
// that is available in Arrays to Objects 
// A great use case for the **Object spread operator** are mixins. 
// In previous chapters we used `Object.assign` to 
// mix the properties of two or more different objects: 
// mixin that encapsulates logic to identify object by name
var canBeIdentifiedByName = {};
// mixin that encapsulates logic to cast spells
var canCastSpells = {};
// factory function to create wizards
function Wizard(element, mana, name, hp) {
    var wizard = { element: element,
        mana: mana,
        name: name,
        hp: hp };
    Object.assign(wizard, canBeIdentifiedByName, canCastSpells);
    return wizard;
}
// We can rewrite the example above 
// using object spread as follows:
function WizardWithSpread(element, mana, name, hp) {
    var wizard = { element: element,
        mana: mana,
        name: name,
        hp: hp };
    return __assign({}, wizard, canBeIdentifiedByName, canCastSpells);
}
// The opposite to object spread are object rest parameters. 
// They work in a similar fashion to ES2015 rest parameters but 
// with objects and they're particularly helpful together with ES2015 destructuring. 
// If you remember, we used destructuring and rest parameters 
// to extract elements within an array:
var _a = ['dragon', 'chimera', 'harpy', 'medusa'], first = _a[0], second = _a[1], rest = _a.slice(2);
console.log(first); // => dragon
console.log(second); // => chimera
console.log(rest); // => ['harpy', 'medusa']
// With the Object Spread Operator we can follow the same 
// pattern to extract and collect properties from objects:
var _b = {
    weaponName: 'Hammer of the Morning',
    type: 'two-handed war hammer',
    weight: '40 pounds',
    material: 'nephirium',
    state: 'well kept'
}, weaponName = _b.weaponName, type = _b.type, stats = __rest(_b, ["weaponName", "type"]);
console.log(weaponName); // => Hammer of Morning
console.log(type); // => two-handed war hammer
console.log(stats);
// => {weight: '40 pounds', 
//     material: 'nephirium', 
//     state: 'well kept'}
console.log('==== ## Type annotations ====');
console.log('==== ### Type annotations are not limited to primitive types ====');
// you can specify the types for arrays
var saddleBag = [];
saddleBag.push('20 silvers');
saddleBag.push('pair of socks');
// saddleBag.push(666);
// => [ts] Argument of type '666' is not assignable to parameter of type 'string'.
// and event tuples
var position;
position = [1, 1];
position = [2, 2];
// position = ['orange', 'delight'];
// => [ts] Type '[string, string]' is not assignable to type '[number, number]'.
//    Type 'string' is not assignable to type 'number'.
// functions
var predicate;
predicate = function (a, b) { return a > b; };
console.log("1 greated than 2? " + predicate(1, 2));
// => 1 greated than 2? false
function frost(minion) {
    var damage = 10;
    console.log(minion + " is covered in frozy icicles (-" + damage + " hp)");
    minion.hitPoints -= damage;
}
var duck = {
    toString: function () { return 'duck'; },
    hitPoints: 100
};
frost(duck);
// => duck is covered in frozy icicles (-10hp)
var theAir = {
    toString: function () { return 'air'; }
};
// frost(theAir);
// => doesn't compile
// => Argument of type '{ toString(): string; }' is not assignable to parameter of type '{ hitPoints: number; }'.
// Property 'hitPoints' is missing in type '{ toString(): string; }'.
console.log('==== ### Interfaces help you write reusable and concise type annotations ====');
// frost function now with interface
function frosty(minion) {
    var damage = 10;
    console.log(minion + " is covered in frozy icicles (-" + damage + " hp)");
    minion.hitPoints -= damage;
}
// const duck = {
//  toString(){ return 'duck';}, 
//  hitPoints: 100
//  };
frosty(duck);
// => duck is covered in frozy icicles (-10hp)
var Tower = (function () {
    function Tower(hitPoints, defense) {
        if (hitPoints === void 0) { hitPoints = 500; }
        if (defense === void 0) { defense = 100; }
        this.hitPoints = hitPoints;
        this.defense = defense;
    }
    Tower.prototype.toString = function () { return 'a mighty tower'; };
    return Tower;
}());
var tower = new Tower();
frosty(tower);
// => a mighty tower is covered in frozy icicles (-10hp)
frosty({ hitPoints: 100 });
// => [object Object] is covered in frozy icicles (-10hp)
// frosty({hitPoints: 120, toString(){ return 'a bat';}})
// => doesn't compile
// => Argument of type '{ hitPoints: number; toString(): string; }' is not assignable to parameter of type 'Minion'.
//  Object literal may only specify known properties, and 'toString' does not exist in type 'Minion'.
var aBat = {
    hitPoints: 120,
    toString: function () { return 'a bat'; }
};
frosty(aBat);
// => a bat is covered in frozy icicles (-10hp)
console.log('==== ### How does TypeScript Determine What a Minion Is? Structural Typing! ====');
var bard = {
    hitPoints: 120,
    toString: function () { return 'a bard'; },
    castSpell: function (spell) {
        var targets = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            targets[_i - 1] = arguments[_i];
        }
        console.log(this + " cast " + spell + " on " + targets);
        spell.cast(targets);
    }
};
var MagicCreature = (function () {
    function MagicCreature(hitPoints) {
        this.hitPoints = hitPoints;
    }
    MagicCreature.prototype.toString = function () { return "magic creature"; };
    MagicCreature.prototype.castSpell = function (spell) {
        var targets = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            targets[_i - 1] = arguments[_i];
        }
        console.log(this + " cast " + spell + " on " + targets);
        spell.cast(targets);
    };
    return MagicCreature;
}());
// this work because structural typing looks at the structure
// of the objects and not whether they explicitly implement X interface
// or inherit Y class
var wizard = bard;
var antotherWizard = new MagicCreature(120);
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
frosty({ hitPoints: 120, toString: function () { return 'a bat'; } });
// => a bat is covered in frozy icicles (-10hp)
console.log('==== ### TypeScript helps your write less type annotations by inferring types from your code automagically ====');
var aNumber = 1;
var anotherNumber = 2 * aNumber;
// aNumber: number
// anotherNumber:number
var double = function (n) { return 2 * n; };
// double: (n:number) => number
console.log('==== ### From Interfaces to Classes ====');
var ClassyMinion = (function () {
    function ClassyMinion(hitPoints) {
        if (hitPoints === void 0) { hitPoints = 100; }
        this.hitPoints = hitPoints;
    }
    ClassyMinion.prototype.toString = function () {
        return 'a classy minion';
    };
    return ClassyMinion;
}());
function classyFrosty(minion) {
    var damage = 10;
    console.log(minion + " is covered in frozy icicles (-" + damage + " hp)");
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
var numbers;
var characters;
// and so on...
// you can also use generics with classes
var Cell = (function () {
    function Cell() {
    }
    Cell.prototype.inprison = function (prisoner) {
        this.prisoner = prisoner;
    };
    Cell.prototype.free = function () {
        var prisoner = this.prisoner;
        this.prisoner = undefined;
        return prisoner;
    };
    return Cell;
}());
var compatibleBox;
// let incompatibleBox: ConstrainedBox<{name: string}>;
// => [ts] Type '{ name: string; }' does not satisfy the constraint 'Minion'.
//    Property 'hitPoints' is missing in type '{ name: string; }'.
// etc
console.log('==== #### Intersection and Union Types ====');
console.log('==== #### Nullable Types ====');
console.log('==== #### Type Guards ====');
console.log('==== #### Type Aliases ====');
console.log('==== #### String-literal Types ====');
console.log('==== #### Polymorphic this, Index Types and Mapped Types ====');
console.log('==== ### Cool TypeScript Features ====');
