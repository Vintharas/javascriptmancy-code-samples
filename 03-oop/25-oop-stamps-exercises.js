// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();


/* 
 *
 * JavaScript-mancy 
 * Black Tower Summoning Enhanced: 
 * Next Level Object Composition with Stamps
 * Exercises
 *
 */

let stampit = require('stampit');

narrate(` ### Spells For Everyone! Scrolls of Power!

 Mooleen just had a brilliant idea to vanquish The Red Hand: Scrolls of power! Imagine any normal having the ability to cast terrible spells and inflicting chaos and destruction upon our enemies.

 Let's start by defining a stamp to represent the scroll itself. It should be something:
 
 * Describable: It has a name and can be described
 * Inscribable: It can be inscribed with a spell with a maximum number of charges
 * Readable: It can be read to cast a spell and consume one charge
  
 It should satisfy the following interface:
 
 ~~~~~~~~
 // Let's test that it works
 var scrollOfLightning = Scroll();
 
 scrollOfLightning.describe();
 // => You see an ancient parchment scroll. It's empty.
 
 scrollOfLightning.read();
 // => You try to read the scroll but it is empty.
             
 scrollOfLightning.inscribe({
   spell: {
     name: 'Lightning',
     cast(target) { 
       console.log(`${target} is striken by lightning (50 damage)`);
       target.hp -= 50;
     }
   },
   charges: 1
 });
  // => You inscribe the scroll with a spell of Lightning
 
 scrollOfLightning.describe();
 // => You see an ancient parchment scroll. 
 //    Using your knowledge in the runic language you 
 //    decipher its contents, it seems to be a scroll of Lightning
 
 
 scrollOfLightning.read("Inkwell");
 // => Inkwell is striken by lightning (50 damage)
 // => After you cast the spell the scroll dissolves into dust
             
 scrollOfLightning.read("Inkwell");
 // => You can't read dust
 ~~~~~~~~

 Tip: Define three stamps - \`Describable\`, \`Readable\` and \`Inscribable\` - and compose them to create a \`Scroll\` stamp.

`)
            
            
// Describable
const Describable = stampit({
  props: {
    name: 'scroll'
  },
  methods: {
    describe(){
      if (this.name === 'scroll'){
        console.log("You see an ancient parchment scroll. It's empty.");
      } else {
        console.log(`You see an ancient parchment scroll. Using your knowledge in the runic language you decipher its contents, it seems to be a scroll of ${this.name}`);
      }
    }
  }
});

// Inscribable
const Inscribable = stampit({
  props: {
    spell: undefined,
    charges: 1
  },
  methods: {
    inscribe({spell, charges}){
      this.spell = spell;
      if (spell) this.name = spell.name;
      if (charges) this.charges = charges;
      console.log(`You inscribe the scroll with a spell of ${this.name}`);
    },
    read(...args){
      if (this.spell && this.charges) {
        this.charges--;
        console.log(`You start reading the scroll slowly entonating each rune...  Klaatu barada nikto...`);
        this.spell.cast(...args);
        if (this.charges === 0) console.log('...after you cast the spell the scroll dissolves into dust');
      } else if(this.spell && !this.charges) {
        console.log("You can't read dust");
      } else {
        console.log('You try to read the scroll but it is empty');
      }
    }
  }
});

// The Scroll stamp!           
const Scroll = stampit().compose(Describable, Inscribable);


// Let's test that it works
var scrollOfLightning = Scroll();

scrollOfLightning.describe();
// => You see an ancient parchment scroll. It's empty.

scrollOfLightning.read();
// => You try to read the scroll but it is empty.
            
scrollOfLightning.inscribe({
  spell: {
    name: 'Lightning',
    cast(target) { 
      console.log(`${target} is striken by lightning (50 damage)`);
      target.hp -= 50;
    }
  },
  charges: 1
});
 // => You inscribe the scroll with a spell of Lightning

scrollOfLightning.describe();
// => You see an ancient parchment scroll. 
//    Using your knowledge in the runic language you 
//    decipher its contents, it seems to be a scroll of Lightning


scrollOfLightning.read("Inkwell");
// => Inkwell is striken by lightning (50 damage)
// => After you cast the spell the scroll dissolves into dust
            
scrollOfLightning.read("Inkwell");
// => You can't read dust

mooleen.says("Die you evil inkwell!!");
mooleen.laughs();
mooleen.says("haha I have so much fun on my own");

rat.says("wasn't that the inkwell I got you to celebrate" +
         " our monthiversary as master and familiar?");
mooleen.says("Hmm... no...?");
mooleen.says("I left that in the... Caves of Mist..." + 
            "it's too valuable to bring to war.");
mooleen.breathesASighOfRelieve();

rat.says('Btw, did you notice your method for ' + 
         'assigning charges is very insecure?');








narrate(`

### Charges are Insecure!

The current definition of Inscribable is not very secure. Anyone with a pinch of deviousness could tamper with it an create itself a scroll of power with unlimited charges by just doing this:

~~~~~~~~
spell.charges = 10000;
// mohahahahaha
~~~~~~~~

Rewrite the Inscribable stamp to not allow setting charges once they've been defined. 
Tip: use the init property in stamps.

`);

// Inscribable
const SecureInscribable = stampit({
  init() {
    let _spell,
        chargesRemaining;
    
    this.inscribe = function inscribe({spell, charges=1}){
      _spell = spell;
      if (spell) this.name = spell.name;
      chargesRemaining = charges;
      console.log(`You inscribe the scroll with a spell of ${this.name}`);
    };
    
    this.read = function read(...args){
      if (_spell && chargesRemaining) {
        chargesRemaining--;
        console.log(`You start reading the scroll slowly entonating each rune...  Klaatu barada nikto...`);
        _spell.cast(...args);
        if (chargesRemaining === 0) 
          console.log('...after you cast the spell the scroll dissolves into dust');
      } else if(_spell && !chargesRemaining) {
        console.log("You can't read dust");
      } else {
        console.log('You try to read the scroll but it is empty');
      }
    };
  }
});

// The Scroll stamp!           
const ScrollOfPower = stampit().compose(Describable, SecureInscribable);


// Let's test that it works
var scrollOfLightningV2 = ScrollOfPower();

scrollOfLightningV2.describe();
// => You see an ancient parchment scroll. It's empty.

scrollOfLightningV2.read();
// => You try to read the scroll but it is empty.
            
scrollOfLightningV2.inscribe({
  spell: {
    name: 'Lightning',
    cast(target) { 
      console.log(`${target} is striken by lightning (50 damage)`);
      target.hp -= 50;
    }},
  charges: 1
});
 // => You inscribe the scroll with a spell of Lightning

scrollOfLightningV2.read("Ashtray");
// => Ashtray is striken by lightning (50 damage)
// => After you cast the spell the scroll dissolves into dust
            
scrollOfLightningV2.read("Ashtray");
// => You can't read dust

scrollOfLightningV2.charges = 10000;

scrollOfLightningV2.read("Ashtray");
// => You can't read dust

mooleen.says('Aha!');
mooleen.says('No more sneaky extending scroll charges');
mooleen.says('Thank you rat!');

rat.says("Wasn't that the ashtray I got your birthday");
rat.says("The one I made with my bare pawns and tail?");

mooleen.says("Errr... no...?");
mooleen.says("I keep that in... inside my chest of awesomeness!");
mooleen.says("Yes! In the Caves of Mist where I keep my most " + 
             "precious posessions! Yes!");

rat.says("That makes me so happy");
rat.smilesWithJoy();


mooleen.says("Ok, now let's try to formalize some spells...");









narrate(`### What's in a Spell?

Hmm how to define a Spell... Let's start with the basics! It is something... a power within the universe that you can harness, shape and **cast** forward to produce a desire effect in the real world. So it's something that:

* Can be described with a name and a describe method
* Can be casted into the world to produce an effect

Write a Spell stamp that fulfills the following:

~~~~~~~~
let spell = Spell({
  name: 'Fire',
  describe: () => 'A spell of Fire',
  spell: () => world.spell('A flame surges from the palm of your hand');
});

spell.describe();
// => A spell of Fire

spell.cast();
// => You cast spell of Fire
// => A flame surges from the palm of your hand
~~~~~~~~

`);

// Spells
const GenericDescribable = stampit({
  props: {
    name: 'something'
  },
  methods: {
    describe(){
      console.log(this.toString());
    },
    toString(){
      return this.name;
    }
  },
  init({name, describe}){
    if (name) this.name = name;
    if (describe) this.toString = describe;
  }
});

const Thing = stampit().compose(GenericDescribable);

let fryingPan = Thing({name: 'A frying pan'});
fryingPan.describe();
// => A frying pan

let fork = Thing({
  name: 'a fork',
  describe(){ return `You see ${this.name}`;}
});
fork.describe();
// => You see a fork


// Castable
const Castable = stampit({
  props: {
    spell() { console.log('nothing happens'); }
  },
  methods: {
    cast(...args) {
      // this is just a console.log with some formatting
      world.spell(`You cast spell of ${this.name}`);
      this.spell(...args);
    }
  },
  init({spell}){
    if (spell) this.spell = spell;
  }
});

const Spell = stampit().compose(Thing, Castable);

let spell = Spell({
  name: 'Fire',
  describe: () => 'A spell of Fire',
  spell: () => world.spell('A flame surges from the palm of your hand')
});

spell.describe();
// => A spell of fire

spell.cast();
// => You cast spell of Fire
// => A flame surges from the palm of your hand

mooleen.says('Ok ok, that sets some basics');
rat.says('Indeed indeed a very good start');

mooleen.says("Now let's get serious");
mooleen.says("What makes a damaging spell?...");









narrate(` ### What Makes a Damaging Spell?

Now let's make a serious spell. Something that you can use in the heat of battle to destroy a foe. A Damaging spell is like a normal spell that you can describe and cast but in addition to that it should damage the target you cast it upon. For instance:

~~~~~~~~
const magicArrowSpell = DamagingSpell({
  name: 'Magic Arrow',
  damage: 20,
  incantation(target){
    console.log(\`A magic arrow flies from your hand and impacts \${target} (\${this.damage} damage)\`);
  }
})
magicArrowSpell.cast('the wall');
// => A magic arrow flies from your hand and 
//    impacts the wall (20 damage)
~~~~~~~~

Create a new stamp DamagingSpell that fulfills the example above.
`);

// Damaging
const Damaging = stampit({
  props: {
    damage: 50,
    // default incantation
    inchantation(target){
      console.log(`You do ${this.damage} to ${target}`)
    },
    // the spell encapsulates the damaging behavior
    spell(target){
      this.incantation(target);
      target.hp -= this.damage;
    }
  },
  init({damage, incantation}){
    if (damage) this.damage = damage;
    // you can personalize the incantation for each spell
    if (incantation) this.incantation = incantation;
  }
});

const DamagingSpell = stampit().compose(Spell, Damaging);

const magicArrowSpell = DamagingSpell({
  name: 'Magic Arrow',
  damage: 20,
  incantation(target){
    // just a console.log with additional formatting
    world.spell(`A magic arrow flies from your hand and impacts ${target} (${this.damage} damage)`);
  }
})
magicArrowSpell.cast('the wall');
// => A magic arrow flies from your hand and 
//    impacts the wall (20 damage)

mooleen.laughsWithGlee();
rat.says('Wow! That was amazing master!');
mooleen.says('haha Thank you!');

mooleen.says('Now for the final touch! An elemental spell that we can inscribe in a powerfull scroll');
rat.says('uyuyuyuyuy');
rat.says("This is really going to turn the tides!");







narrate(`

`);

// Elemental
const Elemental = stampit({
  props: {
    element: 'fire',
    spell(target){
      let elementalDamage = this.calculateElementalDamage(target)
      target.hp -= elementalDamage;
      // console.log with additional formatting
      world.spell(`The ${this.name} impacts the ${target} with ${elementalDamage} damage`);
    }
  },
  methods: {
    calculateElementalDamage(target){
      if (target.resistances && target.resistances.includes(this.element)){
        
        // console.log with additional formatting
        world.spell(`The ${target} has ${this.element} resistance! /2 damage!!`)
        return this.damage/2;
      }
      else if (target.weaknesses && target.weaknesses.includes(this.element)){
        world.spell(`The ${target} has ${this.element} weakness! x2 damage!!`)
        // console.log with additional formatting
        return this.damage*2;
      }
      return this.damage;
    }
  },
  init({spell, element}){
    if (spell) this.spell = spell;
    if (element) this.element = element;
  }
});


const ElementalSpell = stampit().compose(Spell, Damaging, Elemental);

const fireballSpell = ElementalSpell({
  name: 'Fireball',
  damage: 100,
  element: 'fire'
});

const waterWisp = {
  toString: () => 'Water Wisp',
  hp: 100,
  weaknesses: ['fire']
};

fireballSpell.cast(waterWisp);
// => You cast the spell of Fireball
// => The Water Wisp has fire weakness!!! x2 Damage!!
// => The Fireball impacts the water wisp with 200 damage

// Put spells inside a scroll for normals to cast
var fireballScroll = ScrollOfPower();
fireballScroll.inscribe({spell: fireballSpell, charges: 2});
// => You inscribe the scroll with a spell of Fireball

fireballScroll.read(waterWisp);
// => You cast spell of Fireball
//    The Water Wisp has fire weakness! x2 damage!!
//    The Fireball impacts the Water Wisp with 200 damage

rat.says('Poor wisp...');
mooleen.says('Poor wisp indeed..');

// simultaneoulsy
rat.says("wait...");
mooleen.says("wait...")

mooleen.says("What's a water wisp doing here?");
rat.says('Bew....'); // gurgling sounds...

narrate(`
Something hard smacks Mooleen in the back of her head and she drops to the floor. Before she loses consciousness she fills a coldness slowly enveloping her hands, her wrists, her arms...
`);


            
            

            









/**** World interface *****/
function createWorld(){
    var world = createWorldAPI(console);
    /*
    global.addEventListener('error', function(e){
        world.error(e.message);
    });   
    */
    return world;
    
    // *** World/Logger code ***
    function createWorldAPI(console){   
        var logFn = console.log,
            errorFn = console.error,
            infoFn = console.info;
        
        return { 
            log: function log(){
                var args = Array.prototype.slice.call(arguments),
                    message = formatLogMessage.apply(this, args);
                logFn.apply(console, args);
                addWorldEvent(message);
            },
            error: function error(){
                var args = Array.prototype.slice.call(arguments),
                    message = formatLogMessage.apply(this, arguments);
                errorFn.apply(console, args);
                addWorldEvent(message, 'error');
            },
            info: function info(){
                var args = Array.prototype.slice.call(arguments),
                    message = formatLogMessage.apply(this, arguments);
                infoFn.apply(console, args);
                addWorldEvent(message, 'info');
            },
            spell: function spell(){
                var args = Array.prototype.slice.call(arguments),
                    message = formatLogMessage.apply(this, arguments);
                logFn.apply(console, args);
                addWorldEvent(message, 'spell');
            }

        };
        
        function formatLogMessage(){
            var args = Array.prototype.slice.call(arguments), 
                message = args.reduce(function(acc, item){
                    if (item instanceof Array){
                        item = "[" + item.join(', ') + "]";
                    } else if (item instanceof Function) {
                        item = item.toString();
                    }
                    else if (item instanceof Object) {
                        var properties = [],
                            ctor = item.constructor.name;
                        for(prop in item) {
                            properties.push(prop + ': ' + item[prop]);
                        }
                        item = ctor + ' {' + properties.join(', ') + '}';
                    }
                    return acc + item;
                }, "");
            return message;
        }           
        
        function addWorldEvent(message, type){
            /*
            var theWorld = document.getElementById("theWorld"),
                span = document.createElement('span'),
                type = type || 'event';
            span.className = 'world world-' + type;
            span.innerHTML = message;
            theWorld.appendChild(span);
            */
        }
    }
}


function startWorld(){
    /**** load logging ****/
    global.world = createWorld();
    // hijack logs
    console.log = world.log;
    console.info = world.info;
    console.error = world.error;
    
    /**** characters *****/
    global.mooleen = Character('Mooleen');
    global.randalf = Character('Randalf, the Red');
    global.great = Character('Great');
    global.bandalf = Character('Bandalf');
    global.zandalf = Character('Zandalf');
    global.gort = Character('Gort');
    global.rat = Character('Rat');
    global.redBrute = Character('Red brute');
    
    function weaveSpell(spell){
        eval(spell);
    }
    function Character(name){
      var character = {
        name,
        says: function(msg){ world.log(name + ' says: ' + msg + '\n\n');},
        weaves: function(spell){ 
            world.spell(name + ' starts weaving a spell!'); 
            world.spell('***' + spell + '***');
            eval(spell); 
        },
        toString(){return this.name;},
        sighs(){ world.log(name + ' sighs'); },
        slicksTheTopOfAFingerAndRaisesItToTheAir(){},
        standsOnTwoLegsAndStartsMarching(){},
        laughs(){ world.log(name + ' laughs');},
        breathesASighOfRelieve(){ world.log(name + ' breathes a sigh of relieve');},
        smilesWithJoy(){ world.log(name + ' smiles with joy');},
        laughsWithGlee(){ world.log(name + ' laughs with glee');}
      };
      character.stomach = {says: (msg) => world.log(`${name} stomach: ${msg}`)};
      return character;
    }
}

function narrate(){
    world.info.apply(console, arguments);
}

function fireball(...targets){
    if (!fireball.mana || fireball.mana < 1000000)
      world.spell(`A giant fireball blasts ${targets.join(' and ')}`);
    else
      world.spell(`An inmense and unending torrent of molten lava surges from your fingers and impacts ${targets.join(' and ')}`);
}
