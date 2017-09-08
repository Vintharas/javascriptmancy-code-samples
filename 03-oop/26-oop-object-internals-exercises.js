// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/* 
 *
 * JavaScript-mancy 
 * 
 * 
 * Exercises
 *
 */

narrate(` ### 1. Open the Shackles!!

Use what you've learned about object internals to find a secret way to open the shackles and free yourself.

~~~~~~~~
console.log(shackles);
// => A pair of blood stained shackles slapped around your wrists.
// => They are painfully uncomfortable
~~~~~~~~

Hints: Use \`Object.keys\` to inspect the shackles and find the first clue.
`);

// I've defined a shackles variable but don't look!
console.log(shackles);
// => A pair of blood stained shackles slapped around your wrists.
// => They are painfully uncomfortable

mooleen.says("Hmm... let's see...");

console.log(Object.keys(shackles));
// => [toString, open, readInstructions]

mooleen.says("Could it be this easy?");
shackles.open();
// => You try to pry the shackles open but they will not budge. Good try but no. 
    

mooleen.says("Ok... Looks like there's something written here...");
shackles.readInstructions();
// => If how to open these shackles you forget,
//    remember the hidden 'lever' to 'reset'.
//    - Cloud

mooleen.says("Interesting, that sounds promising");
console.log(shackles.lever);
// => A mysterious lever
mooleen.says("Aha! Found it!");

console.log(Object.keys(shackles.lever));
// => [reset, toString]
            
shackles.lever.reset();
// => You find a hidden portrusion well hidden on the rough surface of the shackles and *click*, the shackles open. 

mooleen.giggles();
mooleen.says("haha free!");





narrate(` ### 2. Unlock The Door Without Raising The Alarm!

After freeing everyone the next problem arises: A heavy wooden door reinforced with veins of cold metal. How to open it without magic?

{lang="javascript"}
~~~~~~~~
console.log(reinforcedWoodenDoor);
// => A solid, heavy wooden door reinforced 
//    with veins of cold metal
~~~~~~~~

Hint: Inspect the door with \`Object.keys\` but beware to \`unlock\` the door because there's a hidden trap. Use \`Object.defineProperty\` to define a new \`unlock\` method that neutralizes the alarm before opening the door.

`);

console.log(reinforcedWoodenDoor);
// => A solid, heavy wooden door reinforced   
//    with veins of cold metal
            
mooleen.says("Let's use the same trick...");
console.log(Object.keys(reinforcedWoodenDoor));
// => [toString, unlock]

console.log(reinforcedWoodenDoor.unlock);
// => function unlock() {
//     if (this.alarmIsActive) {
//       console.error("Sound explodes all around alerting the dungeon guards");
//     }
//       console.info("The door opens");
//     }
            
mooleen.says('A hidden alarm!');
rat.says('Devious bastards');

mooleen.says("I'll try to deactivate it without " + 
  "changing its apparent state... " + 
  "That way no one will notice we've left " + 
  "until it's too late");
            
Object.defineProperty(reinforcedWoodenDoor, '_unlock', {
  value: reinforcedWoodenDoor.unlock,
  writable: true,
  enumerable: false,
  configurable: true
});
Object.defineProperty(reinforcedWoodenDoor, 
   'unlock', {
  value(){
    this.alarmIsActive = false;
    this._unlock();  
    this.alarmIsActive = true;
  },
  writable: true,
  enumerable: true,
  configurable: true
})

mooleen.says('And now the door looks exactly the same: ');
console.log(Object.keys(reinforcedWoodenDoor));
//  => [toString, unlock] 

mooleen.says('but...');
reinforcedWoodenDoor.unlock();
// => The door opens

mooleen.says('I feel like a master burglar');
rat.says('A burrahobbit!');

mooleen.says('Did you say burrahobbit?');
rat.says('Yes master, the best burglars there be');

mooleen.pauses();
randalf.says("Quickly! There's not a moment to lose");

narrate(` ### 3. Deactive All the Alarms!
 
 The dungeons doors are filled with alarms. Can you devise a way to reuse your alarm deactivation logic? How would you deactivate the alarm in an object like this one without modifying any method?
 
 {lang="javascript"}
 ~~~~~~~~
 class Door extends AlarmedDevice {
   constructor(){ super(); }
   toString(){
     return "A solid, heavy wooden door reinforced " + 
            "with veins of cold metal"
   }
   unlock(){
     if (this.alarmIsActive){
       console.error("Sound explodes all around " + 
                     "alerting the dungeon guards");
     }
       console.info("The door opens");
     }
   };
 }
 ~~~~~~~~

 Hint: Wrap your alarm deactivation logic in a decorator!
`)

class AlarmedDevice{
  constructor(){
    this.alarmIsActive = true;
  }
}

class Door extends AlarmedDevice {
  constructor(){ super(); }
  
  toString(){
    return "A solid, heavy wooden door reinforced " + 
           "with veins of cold metal"
  }
  @deactivateAlarm
  unlock(){
    if (this.alarmIsActive){
      console.error("Sound explodes all around " + 
                    "alerting the dungeon guards");
    }
      console.info("The door opens");
    }
}

function deactivateAlarm(target, property, descriptor){
  const alarmedFunction = descriptor.value;
  descriptor.value = function(...args){
    this.alarmIsActive = false;
    alarmedFunction.apply(this, args);
    this.alarmIsActive = true;
  }
}

const deactivatedDoor = new Door();
deactivatedDoor.unlock();
// => The door opens







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
                    // commenting out for this
                    // chapter
                    /*
                    else if (item instanceof Object) {
                        var properties = [],
                            ctor = item.constructor.name;
                        for(prop in item) {
                            properties.push(prop + ': ' + item[prop]);
                        }
                        item = ctor + ' {' + properties.join(', ') + '}';
                    }
                    */
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
    global.shackles = getShackles();
    global.reinforcedWoodenDoor = getReinforcedWoodenDoor();
    
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
        giggles(){ world.log(name + ' giggles');},
        sighs(){ world.log(name + ' sighs'); },
        slicksTheTopOfAFingerAndRaisesItToTheAir(){},
        standsOnTwoLegsAndStartsMarching(){},
        laughs(){ world.log(name + ' laughs');},
        breathesASighOfRelieve(){ world.log(name + ' breathes a sigh of relieve');},
        smilesWithJoy(){ world.log(name + ' smiles with joy');},
        laughsWithGlee(){ world.log(name + ' laughs with glee');},
        pauses(){ world.log(name + ' pauses');}
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

function getShackles(){
  const shackles = {
    toString(){
      return `
A pair of blood stained shackles slapped around your wrists.
They are painfully uncomfortable.

`;
    },
    open(){
      console.info('You try to pry the shackles open but they will not budge. Good try but no.');
    },
    readInstructions() {
      console.info(`
If how to open these shackles you forget,
remember the hidden 'lever' to 'reset'.
- Cloud
`);
    }
  };
  
  Object.defineProperty(shackles, 'lever', {
     value: {
       reset(){
         console.info('You find a hidden portrusion well hidden on the rough surface of the shackles and *click*, the shackles open.');
       },
       toString(){
         return "A mysterious lever";
       }
     },
     writable: false, 
     enumerable: false,
     configurable: false
  });
  
  return shackles;
}

function getReinforcedWoodenDoor(){
  const door = {
    toString(){
      return "A solid, heavy wooden door reinforced   with veins of cold metal"
    },
    unlock(){
      if (this.alarmIsActive){
        console.error("Sound explodes all around alerting the dungeon guards");
      }
      console.info("The door opens");
    }
    
  };
  Object.defineProperty(door, 'alarmIsActive', {
    value: true,
    writable: true,
    enumerable: false,
    configurable: false
  });
    
  return door;
}
  
