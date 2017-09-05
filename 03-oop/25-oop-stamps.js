/* 
 *
 * JavaScript-mancy 
 * Black Tower Summoning Enhanced: 
 * Next Level Object Composition with Stamps
 *
 */

let stampit = require('stampit');

console.log("===== Class Free Inheritance =====");
console.log("===== Next Level Object Composition with Stamps =====\n\n");

console.log("==== What are stamps? ====");
console.log("Composable factory functions FTW!");

// Imagine that you have two normal factory functions?
// one to create swords that you can wield
let Sword = function(){
  return {
    description: 'common sword',
    toString(){ return this.description;},
    wield(){
      console.log(`You wield ${this.description}`);
    }
  };
};

// another one to create knifes that you can throw
let Knife = function(){
  return {
    description: 'rusty knife',
    toString(){ return this.description},
    throw(target){
      console.log(`You throw the ${this.description} towards the ${target}`);
    }
  };
};

// they let you create swords that you can wield and knives that you can throw
console.log("=== normal factory functions ===");
var sword = new Sword();
sword.wield();
// => You wield the common sword
var knife = new Knife();
knife.throw('orc');
// => You throw the rusty knife towards the orc

// wouldn't it be nice if we could compose these two factories
// to be able to create sword that you can throw or knives that you can wield?
// Stamps let you do just that!

// You can define a separate stamp for each 
// behavior that you want to reuse
// like throwing something
let Throwable = stampit({
  methods: {
    throw(target){
      console.log(`You throw the ${this.description} towards the ${target}`);
    }
  }
});

// wielding something
let Wieldable = stampit({
  methods: {
    wield(){
      console.log(`You wield the ${this.description}`);
    }
  }
});

// or describing something
let Describable = stampit({
  methods: {
    toString(){
      return this.description;
    }
  },
  // default description
  props: {
    description: 'something' 
  },
  // let's you initialize description
  init({description = this.description}){
    this.description = description; 
  }
});

let Weapon = stampit()
  .compose(Describable, Wieldable, Throwable);

console.log("=== stamps ===");
let anotherSword = Weapon({description: 'migthy sword'});
anotherSword.wield();
// => You wield the mighty sword
anotherSword.throw('ice wyvern');
// => You throw the mighty sword towards the ice wyvern

let anotherKnife = Weapon({description: 'sacrificial knife'});
anotherKnife.wield();
// => You wield the sacrificial knife
anotherKnife.throw('heart of the witch');
// => You throw the sacrificial knife towards the heart of the witch








console.log("\n\n\n\n==== Stamps By Example ====");
console.log("==== Prototypical Inheritance and Stamps ====");

// continuing with the previous example of swords and knives...

// Let's start from scratch creating a Weapon stamp
// We'll begin by defining some common methods
// that could be shared across all weapons
// and therefore be part of the weapons prototype
let AWeapon = stampit({
  methods: {
    toString(){
      return this.description;
    },
    wield(target){
      console.log(`You wield the ${this.description} and attack the ${target}`);
    },
    throw(target){
      console.log(`You throw the ${this.description} at the ${target}`);
    }
  },
  props: {
    description: 'weapon'
  },
  init({description}){
    this.description = description || this.description;
  }
});

let aSword = AWeapon({description: 'a sword'});
aSword.wield('giant rat');
// => You wield the sword and attack the giant rat

// we can verify how all these functions defined within
// the 'methods' property are part of the aSword object prototype
console.log("All these functions within methods end up in the prototype:")
console.log(Object.getPrototypeOf(aSword));
// => [object Object] {
//    throw:....
//    toString:...
//    wield:...}







console.log("\n\n\n\n\n==== Mixins and Stamps ====");

// you can use mixins to add properties or methods
// to your stamp
// use the ref property to mixin values or methods
// or the props property if you need to mixins objects or arrays
// props are deeply cloned so they make sure that no state is shared across
// objects created via the stamp
let AWeightedWeapon = stampit({
  methods: {
    toString(){
      return this.description;
    },
    wield(target){
      console.log(`You wield the ${this.description} and attack the ${target}`);
    },
    throw(target){
      console.log(`You throw the ${this.description} at the ${target}`);
    },
    examine(){
      console.log(`You examine the ${this.description}. 
It's made of ${this.material} and ${this.examineWeight()}.
${this.examineEnchanments()}.`)
    },
    examineWeight(){
      let weight = Number.parseInt(this.weight);
      if (weight > 5) return 'it feels heavy';
      if (weight > 3) return 'it feels light';
      return 'it feels surprisingly light';
    },
    examineEnchanments(){
      if (this.enchantments.length === 0) return 'It is not enchanted.';
      return `It seems enchanted: ${this.enchantments}`;
    },
    enchant(enchantment){
      console.log(`You enchant the ${this} with ${enchantment}`);
      this.enchantments.push(enchantment)
    }
  },
 props: {
   weight: '4 stones',
   material: 'iron',
   description: 'weapon'
 },
 deepProps: {
   enchantments: []
 },
 init({description}){
   this.description = description || this.description;
 }
});

let aWeightedSword = AWeightedWeapon({description: 'sword of iron-ness'});
aWeightedSword.examine();
// => You examine the sword of iron-ness. 
//It's made of iron and it feels light.
//It is not enchanted.
aWeightedSword.enchant('speed +1');
// => You enchant the sword of iron-ness with speed +1
aWeightedSword.examine();
// => You examine the sword of iron-ness. 
//    It's made of iron and it feels light.
//    It seems enchanted: speed +1.









console.log("\n\n\n\n\n==== Data Privacy and Stamps ====");

// you can use closures to achieve data privacy
// with the init property
// let's make our enchanments engine implementation private
console.log("==== A private weapon ====");
let APrivateWeapon = stampit({
  methods: {
    toString(){
      return this.description;
    },
    wield(target){
      console.log(`You wield the ${this.description} and attack the ${target}`);
    },
    throw(target){
      console.log(`You throw the ${this.description} at the ${target}`);
    },
    examine(){
      console.log(`You examine the ${this.description}. 
It's made of ${this.material} and ${this.examineWeight()}.
${this.examineEnchanments()}.`)
    },
    examineWeight(){
      let weight = Number.parseInt(this.weight);
      if (weight > 5) return 'it feels heavy';
      if (weight > 3) return 'it feels light';
      return 'it feels surprisingly light';
    }
  },
 props: {
   weight: '4 stones',
   material: 'iron',
   description: 'weapon'
 },
 init: function({description}){
   var enchantments = []; // this private variable is the one being enclosed
   this.description = description || this.description;
   
   Object.assign(this, {
     examineEnchanments(){
        if (enchantments.length === 0) return 'It is not enchanted.';
        return `It seems enchanted: ${enchantments}`;
     },
     enchant(enchantment){
        console.log(`You enchant the ${this} with ${enchantment}`);
        enchantments.push(enchantment)
     }
   });
   
 }
});

// let's try it out
let aPrivateWeapon = APrivateWeapon({description: 'sword of privacy'});
console.log(aPrivateWeapon.enchanments);
// => undefined;
aPrivateWeapon.examine();
// => You examine the sword of privacy. 
//It's made of iron and it feels light.
//It is not enchanted.
aPrivateWeapon.enchant('privacy: wielder cannot be detected');
// => You enchant the sword of privacy with privacy: wielder cannot be detected
aPrivateWeapon.examine();
// => You examine the sword of privacy. 
//    It's made of iron and it feels light.
//    It seems enchanted: privacy: wielder cannot be detected.


// the init function can also take arguments!
// let's say that we want to limit the number of enchanments per weapon
// we can rewrite our init method like this:
console.log("==== A configurable private weapon ====");
let ALimitedEnchantedWeapon = stampit({
  methods: {
    toString(){
      return this.description;
    },
    wield(target){
      console.log(`You wield the ${this.description} and attack the ${target}`);
    },
    throw(target){
      console.log(`You throw the ${this.description} at the ${target}`);
    },
    examine(){
      console.log(`You examine the ${this.description}. 
It's made of ${this.material} and ${this.examineWeight()}.
${this.examineEnchanments()}.`)
    },
    examineWeight(){
      let weight = Number.parseInt(this.weight);
      if (weight > 5) return 'it feels heavy';
      if (weight > 3) return 'it feels light';
      return 'it feels surprisingly light';
    }
  },
 props: {
   weight: '4 stones',
   material: 'iron',
   description: 'weapon'
 },
 init: function({maxNumberOfEnchantments=10, description}={}){
   var enchantments = []; // this private variable is the one being enclosed
   this.description = description || this.description;
  
   Object.assign(this, {
     examineEnchanments(){
        if (enchantments.length === 0) return 'It is not enchanted.';
        return `It seems enchanted: ${enchantments}`;
     },
     enchant(enchantment){
        if(enchantments.length === maxNumberOfEnchantments) {
            console.log('Oh no! This weapon cannot be enchanted any more!');
        } else {
            console.log(`You enchant the ${this} with ${enchantment}`);
            enchantments.push(enchantment);
        }
     }
   });
   
 }
});

// and then we can instantiate new weapons with limited enchantments:
let onlyOneEnchanmentWeapon = ALimitedEnchantedWeapon({description: 'sword of one enchanment' , maxNumberOfEnchantments: 1});
console.log(onlyOneEnchanmentWeapon.enchanments);
// => undefined;
onlyOneEnchanmentWeapon.examine();
// => You examine the sword of privacy. 
//It's made of iron and it feels light.
//It is not enchanted.
onlyOneEnchanmentWeapon.enchant('luck +1');
// => You enchant the sword of one enchanment with luck +1
onlyOneEnchanmentWeapon.enchant('touch of gold: everything you touch becomes gold');
// => Oh no! This weapon cannot be enchanted any more!







console.log("\n\n\n\n\n==== Composing Stamps ====");

// stamps are great at object composition
// not only by composing prototypes, mixins and closures to create a stamp
// but at composing stamps with each other

// imagine that we get a new requirement into our system
// we want to be able to represent not only weapons
// but also other types of items like potions, or an armor, 
// what do we do? oh! What do we do?

// we can break down the weapon stamp into smaller stamp
// and compose stamps together to produce weapons, potions and armors
// let's see how we can do it

// the init function can also take arguments!
// let's say that we want to limit the number of enchanments per weapon
// we can rewrite our init method like this:

// You can define a separate stamp for each 
// behavior that you want to reuse
// like throwing something

/* 

these have already being defined in the beginning of the example: 

let Throwable = stampit({
  methods: {
    throw(target){
      console.log(`You throw the ${this.description} towards the ${target}`);
    }
  }
});

// wielding something
let Wieldable = stampit({
  methods: {
    wield(target){
      console.log(`You wield the ${this.description} and attack the ${target}`);
    }
  }
});

// or describing something
let Describable = stampit({
  methods: {
    toString(){
      return this.description;
    }
  }
});
*/

let Weighted = stampit({
  methods: {
    examineWeight(){
      let weight = Number.parseInt(this.weight);
      if (weight > 5) return 'it feels heavy';
      if (weight > 3) return 'it feels light';
      return 'it feels surprisingly light';
    }
  },
  props: {
   weight: '4 stones'
  },
  init({weight}){
    this.weight = weight || this.weight;
  }
});

let MadeOfMaterial = stampit({
  methods: {
    examineMaterial(){
      return `It's made of ${this.material}`;
    }
  },
  props: {
    material: 'iron'
  },
  init({material}){
    this.material = material || this.material;
  }
});

let Enchantable = stampit({
 init: function({maxNumberOfEnchantments=10}={}){
   var enchantments = []; // this private variable is the one being enclosed
   
   Object.assign(this, {
     examineEnchantments(){
        if (enchantments.length === 0) return 'It is not enchanted.';
        return `It seems enchanted: ${enchantments}`;
     },
     enchant(enchantment){
        console.log(`You enchant the ${this} with ${enchantment}`);
        if(enchantments.length === maxNumberOfEnchantments) {
            console.log('Oh no! This weapon cannot be enchanted any more!');
        } else {
            enchantments.push(enchantment);
        }
     }
   });
 }
});
  
let Item = stampit().compose(Describable, Weighted, MadeOfMaterial);

let AComposedWeapon = stampit({
  methods: {
    examine(){
      console.log(`You examine the ${this}. 
${this.examineMaterial()} and ${this.examineWeight()}.
${this.examineEnchantments()}.`)
    },
  }
}).compose(Item, Wieldable, Throwable, Enchantable);

// now we can use the new weapon as before
let swordOfTruth = AComposedWeapon({description: 'The Sword of Truth'});
swordOfTruth.examine();
// => You examine the The Sword of Truth. 
//    It's made of iron and it feels light.
//    It is not enchanted.."
swordOfTruth.enchant("demon slaying +10");
// => You enchant the The Sword of Truth with demon slaying +10
swordOfTruth.examine();
// => You examine the The Sword of Truth. 
//    It's made of iron and it feels light.
//    It seems enchanted: demon slaying +10.

// now we can define potions and armors 
// composing these behaviors with new ones

let Potion = stampit({
    methods: {
      drink(){
        console.log(`You drink the ${this}. ${this.effects}`);
      }
    },
    props: {
      effects: 'It has no visible effect'
    },
    init({effects = this.effects}){
      this.effects = effects;
    }
  })
  .compose(Item, Throwable);

let healingPotion = Potion({description: 'Potion of minor healing', effects: 'You heal 50 hp (+50hp)!'});
healingPotion.drink();
// => You drink the Potion of minor healing. You heal 50 hp (+50hp)!

let Armor = stampit({
  methods: {
    wear(){
      console.log(`You wear ${this} in your ${this.position} gaining +${this.protection} armor protection.`);
    },
    examine(){
      console.log(`You examine the ${this}. 
${this.examineMaterial()} and ${this.examineWeight()}.
${this.examineEnchantments()}.`);
    },
  },
  props: { // these act as defaults
    position: 'chest',
    protection: 50
  },
  init({position=this.position, protection=this.protection}){
    this.position = position;
    this.protection = protection;
  }
}).compose(Item, Enchantable);


let steelBreastPlateOfFire = Armor({
  description: 'Steel Breastplate of Fire',
  material: 'steel',
  weight: '50 stones',
});
steelBreastPlateOfFire.enchant('Fire resistance +100');
// => You enchant the Steel Breastplate of Fire with Fire resistance +100
steelBreastPlateOfFire.wear();
// => You wear Steel Breastplate of Fire in your chest gaining +50 armor protection.
steelBreastPlateOfFire.examine();
// => You examine the Steel Breastplate of Fire. 
//    It's made of steel and it feels heavy.
//    It seems enchanted: Fire resistance +100.








console.log("\n\n\n\n\n==== Composing Stamps and prototypical inheritance ====");

// Composing stamps doesn't create a prototypical inheritance chain between stamps. It flattens all prototype methods inside the same prototype

let ElementalWeapon = stampit({
  methods: {
    elementalAttack(target){
      console.log(`You wield the ${this.description} and perform a terrifying elemental attack on the ${target}`);
    }
  }
}).compose(AComposedWeapon);

let aFireSword = ElementalWeapon({description: 'magic sword of fire'});
console.log(Object.getPrototypeOf(aFireSword));
// => [object Object] {
//  elementalAttack: ...
//  examine: ...
//  examineMaterial: ...
//  examineWeight: ...
//  throw: ...
//  toString: ... 
//  wield: ...
// }









console.log("\n\n\n\n\n==== Composing Stamps and collinding private variables ====");

// Composing stamps doesn't affect any "private" variables defined through the init property. Since these variables are captured using a closure, they are not really a part of the object itself. Each function closure will affect only its own private variables

// if we redefine the elemental weapon to store its elemental properties
// as enchanments of some sort:

let AnElementalWeapon = stampit({
  init({enchantments=[]}){   
    Object.assign(this, {
        elementalAttack(target){
            console.log(`You wield the ${this.description} and perform a terrifying elemental attack of ${enchantments} on the ${target}`);
    }});

  }
}).compose(AComposedWeapon);

// and if you remember that AComposedWeapon is composed with the Enchantable stamp that also defines the enchant closure which in turn encloses an enchanments variable.

// we can see how these two do not collide
// when we instantiate a new igneous lance and enchant it

let igneousLance = AnElementalWeapon({
  description: 'igneous Lance', 
  enchantments: ['fire']
});
igneousLance.elementalAttack('rabbit');
// => You wield the igneous Lance and perform a terrifying elemental attack of fire on the rabbit
igneousLance.enchant('protect + 1');
// => You enchant the igneous Lance with protect + 1
igneousLance.elementalAttack('goat');
// => You wield the igneous Lance and perform a terrifying elemental attack of fire on the goat






console.log("\n\n\n\n\n==== Using the Stamps fluent interface ====");

// In addition to the declarative interface that you've seen thus far
// where you pass a configuration object to the stampit function
// you can use the fluent interface.

// Here is the Armor stamp rewritten in terms of that fluent interface

let FluentArmor = stampit()
  .methods({
    wear(){
      console.log(`You wear ${this} in your ${this.position} gaining +${this.protection} armor protection.`);}})
  .props({ // these act as defaults
    position: 'chest',
    protection: 50})
  .init(function init({position=this.position, protection=this.protection}){
    this.position = position;
    this.protection = protection;
  })
  .compose(Item, Enchantable);

var fluentArmor = FluentArmor({description: 'leather jacket', protection: 70});
fluentArmor.wear();
// => You wear leather jacket in your chest gaining +50 armor protection









