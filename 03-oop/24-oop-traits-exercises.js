let Trait = require('traits.js');

// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/* 
 *
 * JavaScript-mancy - Black Tower Summoning: 
 * Safer Object Composition with Traits
 *
 * Exercises!
 *
 */

/* EXERCISES */
narrate("=== ### 1. Repel the Boarders With Ballistas! ===");
narrate(` There's enemies on the bridge! Build several Ballistas to clean the deck before it is overran!

You'll need to define several traits to build a ballistas: 

* TNameable that represents something that can be named and described
* TPlaceable that represents something that can be positioned in a two dimensional space
* TShootable that represents something that can be shot

An object composed from these traits would satisfy the following interface:
 
~~~~~~~~
let b = Ballista('vera', 1, 1);

// Interface provided by TNameable
console.log(b.name); // => ballista 'vera'
console.log(b) // => ballista 'vera'

// Interface provided by TPlaceable
console.log(b.x); // => 1 
console.log(b.y); // => 1
console.log(b.position); // => (1,1)
b.place(2, 2);
// => You place ballista 'vera' in position (2,2)

// Interface provided by TShootable
b.shoot(draconianWarrior)
// => You shoot draconian Warrior with ballista 'vera' causing 25 damage
~~~~~~~~
  
`);

let draconianWarrior = {
  hp: 50,
  toString(){
    return 'draconian warrior';
  }
};

function TNameable(name){
  return Trait({ 
    name,
    toString(){
      return this.name;
    }
  });
}

function TPlaceable(x=0, y=0){
  return Trait({
    get x(){ return x;},
    set x(newX){ x = newX;},
    
    get y(){ return y;},
    set y(newY) { y = newY;},
    
    get position(){ return `(${x}, ${y})`;},
    
    place(x, y) {
      this.x = x; 
      this.y = y;
      console.log(`You place ${this} in (${this.x},${this.y})`);
    }
  });
}

function TShootable(damage){
  return Trait({
    shoot(target){
        console.log(`You shoot ${target} with ${this}` +
                    ` causing ${damage} damage`);
        target.hp -= damage;
    }
  });
}

function Ballista(name, x=0, y=0){
  return Trait.create(
    /* proto */ Object.prototype,
    /* traits */ Trait.compose(
      TNameable(`Ballista '${name}'`),
      TPlaceable(x, y),
      TShootable(25)));
}

let ballista = Ballista('Vera', 1, 1);
console.log(ballista.name);
// => Ballista 'Vera'
console.log(ballista.position);
// => (1 , 1)
ballista.shoot(draconianWarrior);
// => You shoot draconian warrior with Ballista 'Vera' causing 25 damage

mooleen.says("Yes! More ballistas! Let's kick'em out!");

narrate(` Mooleen summons more ballistas and you quickly drive the
Draconian assault from the deck of the Zeppelin
`);

rat.says("Hmm... Are those draconian warriors?");
rat.says("They are extremely devious creatures " + 
         "perfectly adapted to air warfare");

mooleen.says("That's discomforting...");
rat.says("Yep... may I be so blunt as to say that all this " + 
         "has the bitter smell of betrayal?");
mooleen.says("... so it does, you can tell me 'I told you so' if " + 
             " we both survive");

rat.says("Oh, familiars are immortal");
rat.says("That's one of the perks of the job");
mooleen.stepsOn(rat.tail);
rat.says("Ouch!!");
mooleen.says("Looks like you do feel pain...");

phalanx.says("Milady they are about to board us " + 
             "with small flying vessels!");
/* 
A crash, a boom, the deck of the Zeppelin lurking and the sound of wood breaking  and splintering. Shouts and a mass of Turians jumping off the small wreckage, and hacking and slashing into a disconcerted phalanx platoon.
*/








narrate("=== ### Now Prevent More Soldiers From Boarding With Siege Ballistas! === ");
narrate(` The smaller ballistas will take care of the boarders and the draconian flying around the Zeppelin. Now you need to build bigger ballistas to prevent the Turians who are formidable at close quarters from boarding your ship. 
 
Siege Ballistas are heavier and slower than the smaller units. In addition to using the TNameable a TPositionable traits you'll need two new traits: 

* TAimable that describes something that can be aimed at a target
* TFireable that describes something that can be fired after having being aimed. This trait requires a property target in the composed object.

An object composed from these traits would satisfy the following interface:

~~~~~~~~
let siegeBallista = SiegeBallista('Dora', 1, 1);

/* TAimable */
siegeBallista.aimAt(troopTransport);
// => you aim the Siege Ballista 'Dora' at troop transport

/* TFireable*/
siegeBallista.fire();
// => you fire the Siege Ballista 'Dora' at troop transport 
//    causing 100 damage
~~~~~~~~

`)

let troopTransport = {
  hp: 200,
  toString(){ return 'flying troop transport';},
  load: [
    /* many Turians */
  ]
};
let moreTuriansOnTheDeck = {
  toString: () => 'more turians on the deck'
};

function TAimable(){
  const state = { target: undefined };
  
  return Trait({
    get target() { return state.target; },
    aimAt(target) { 
      state.target = target; 
      console.log(`You aim ${this} at ${target}`);
    }
  });
}

function TFireable(damage){
  return Trait({
    target: Trait.required,
    fire(){
      if (this.target){
        console.log(`You fire ${this} at ${this.target}` +
                    ` causing ${damage} damage`);
        this.target.hp -= damage;
      } else {
        console.log(`${this} doesn't have a target`);
      }
    }
  })
}

function SiegeBallista(name){
  return Trait.create(
   /* proto */ Object.prototype, 
   /* traits */ Trait.compose(
                  TNameable(`Siege Ballista '${name}'`),
                  TPlaceable(),
                  TAimable(),
                  TFireable(100)
                ));
}

var siegeBallista = SiegeBallista('Brutus', 2, 2);
siegeBallista.aimAt(troopTransport);
// => You aim Siege Ballista 'Brutus' at flying troop transport
siegeBallista.fire();
// => You fire Siege Ballista 'Brutus' at flying troop transport causing 100 damage

mooleen.says('Good! Rally the troops!');
narrate(`/* The new ballistas succeed at keeping the transports at bay */`);
mooleen.says("Looks like we've repelled the attack...");
rat.screams("Behind!");

narrate(`/* Moolen turns in time to see an angry red brute wielding an axe towards her. It's way too late to cast a spell */`);

red.shields(mooleen);

narrate(`/* The axe falls down for what it feels like an eternity and it suddenly comes to a halt. All of the sudden, Red stands between Mooleen and the brute, muscles bulging, roars, lifts the opposing Turian from the ground and throws him off the deck of the ship. */`)

red.laughs();
red.charges(moreTuriansOnTheDeck);

rat.says("Hmmm... that whole thing was very odd");

narrate(`/* An explosion above, the flying ship lurks and starting losing altitude */`);
 
mooleen.says("Damn, looks like if they can't board us they'll sink us");






narrate("=== ### Protect the Zeppelin From the Heights! === ");
 
narrate(` The draconian force has started attacking the Zeppelin itself in an effort to sink it into oblivion. You must summon floating ballistas that can protect the Zeppelin from all heights.

Given a trait TPlaceable3D that looks like this:
  
~~~~~~~~
function TPlaceable3D(z=0){
 return Trait({
   x: Trait.required,
   y: Trait.required,
   get z() { return z;},
   set z(value) { z = value; },
   place(x, y, z){
     this.x = x; 
     this.y = y;
     this.z = z;
     console.log(\`You place \$\{this} in (\$\{this.x},\$\{this.y}, \$\{this.z})\`);
   }
})
}
~~~~~~~~

 Define a FloatingBallista composed using the following traits TNameable, TPlaceable, TPlaceable3D, TShootable. 
 
 Tip: You'll need to explicitly handle the conflict with the place method. The resulting object sould be able to be placed at an arbitrary height.
`)

function TPlaceable3D(z=0){
 return Trait({
   x: Trait.required,
   y: Trait.required,
   get z() { return z;},
   set z(value) { z = value; },
   place(x, y, z){
     this.x = x; 
     this.y = y;
     this.z = z;
     console.log(`You place ${this} in position (${this.x},${this.y}, ${this.z})`);
   }
 });
}

function FloatingBallista(name, x=0, y=0, z=0){
  return Trait.create(
    Object.prototype,
    Trait.compose(
      TNameable(`Floating Ballista '${name}'`),
      Trait.override(TPlaceable3D(z), TPlaceable(x,y)),
      TShootable(50)
    )
  );
}

let floatingBallista = FloatingBallista("Ursa", 1, 1, 20);
floatingBallista.shoot(draconianWarrior);
// => You shoot draconian warrior with Floating Ballista 'Ursa' causing 50 damage
floatingBallista.place(1, 2, 50);
// => You place Floating Ballista 'Ursa' in position (1,2, 50)

narrate(`/* The last enemy forces retreats as the sun raises in the sky again announcing a new beautiful day.*/`);

mooleen.says('Did we fight all night?');
red.says('Yes! And it was glorious!');
rat.says('Epic!');
red.says('Legendary');

randalf.yawns();
randalf.says('What a beautiful morning!');

mooleen.says("Don't tell me you slept through everything...");
randalf.says("everything?");

bandalf.yawns();
bandalf.says('What a beautiful day!');

randalf.says("Bandalf... don't tell me you slept through everything...");
bandalf.says("everything?");

mooleen.facepalms();
// => mooleen epicly facepalms
    
    
    
    
    
    
    
    
    

/*
function TFireableWithRate({fireRate, damage}){
  return Trait({
    target: Trait.required,
    shoot(){
      if (this.target){
        console.log(`You start preparing ${this} for shooting...`);
        setTimeout(() => {
          console.log(`You fire ${this} at ${this.target}` +
                      ` causing ${damage} damage`);
          this.target.hp -= damage;
        }, fireRate);
      } else {
        console.log(`${this} doesn't have a target`);
      }
    }
  })
}


function Canon(){
  return Trait.create(
    Object.prototype,
    Trait.compose(
                   TNameable('Canon'),
                   TPlaceable(),
                   TAimable(),
                   TFireableWithRate({fireRate: 3000, damage: 500})
              ));
}

var c = Canon();
c.place(2, 2);
// => You place Canon in (2,2)
c.aimAt({toString(){return 'flying Ship'}});
// => You aim canon at flying ship
c.shoot();
// => You start preparing Canon for shooting...
// => You fire Canon at flying Ship causing 500 damage



function TPlaceable3D(x=0, y=0, z=0){
  return Trait({
    get x(){ return x; },
    set x(value) { x = value;},
    get y(){ return y; },
    set y(value) { y = value;},
    get z(){ return z; },
    set z(value) { z = value;},
    
    place (x, y, z){
      x = x; 
      z = y;
      y = y;
      console.log(`You place ${this} in (${this.x},${this.y},${this.z})`);
    }
  })
}
*/



console.log(Trait({weapons: ['knife']}).weapons);




























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
            infoFn = console.info,
            warnFn = console.warn;
        
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
            },
            warn: function warn(){
                var args = Array.prototype.slice.call(arguments),
                    message = formatLogMessage.apply(this, arguments);
                warnFn.apply(console, args);
                addWorldEvent(message, 'warn');
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
    console.warn = world.warn;
    
    /**** characters *****/
    global.mooleen = Character('Mooleen');
    global.randalf = Character('Randalf, the Red');
    global.great = Character('Great');
    global.bandalf = Character('Bandalf');
    global.zandalf = Character('Zandalf');
    global.gort = Character('Gort');
    global.rat = Character('Rat');
    global.redBrute = Character('Red brute');
    global.phalanx = Character('phalanx');
    global.red = Character('Red');
    
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
        screams: function(msg) { world.warn(name + ' screams: ' + msg + '\n'); },
        toString(){return this.name;},
        sighs(){ world.log(name + ' sighs'); },
        slicksTheTopOfAFingerAndRaisesItToTheAir(){},
        standsOnTwoLegsAndStartsMarching(){},
        stepsOn(target){ world.log(name + ' steps on ' + target);},
        shields(target){ world.log(name + ' shields ' + target);},
        laughs(){ world.log(name + ' laughs "HaHaHa!!"');},
        charges(target){ world.log(name + ' charges ' + target + ' in fury');},
        yawns(){ world.log(name + ' yawns loudly');},
        facepalms() { world.log(name + ' epicly facepalms');}
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
