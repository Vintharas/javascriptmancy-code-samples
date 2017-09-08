// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/* 
 *
 * JavaScript-mancy 
 * Meta-programming with Reflect API, Proxies And Symbols
 * 
 * Exercises
 *
 */

narrate(` ### 1.  Blast that Door Open!

The lights, footsteps and the cold sound of steel are approaching. There's no way back, the only way is forward. You need to open that door and neutralize the Totem of Magic Supression to have a chance at escaping unscathed.

~~~~~~~~
console.log(armoredDoor);
// => A heavily armored door stands in your way.
//    Thick bars of black metal overlay a solid
//    oak door. Over the metal, incandescent
//    reddish runes promise unknown horrors for 
//    the arrogant one that tries to force it 
//    open without a proper key.
~~~~~~~~

Hint: Use the \`Reflect\` API to find the first hint about how to open the door.
`);

console.log(armoredDoor);
// => A heavily armored door stands in your way.
//    Thick bars of black metal overlay a solid
//    oak door. Over the metal, incandescent
//    reddish runes promise unknown horrors for 
//    the arrogant one that tries to force it 
//    open without a proper key.

mooleen.says('Ok...');

console.log(Object.keys(armoredDoor));
//=> [toString, unlock]

console.info(armoredDoor.unlock);
/* => function unlock(key) {
            if (this[trapsAreActive]) {
                throw new Error('\nYou try to open the door with the key.\nYou rotate the lock and hear a satisfying \n\'click\' that indicates that the door is unlocked.\nYou open the door slightly and it suddenly burst open\nin a wail, a tremendous force sucks you and your \ncomrades inside the blackest whole, and you keep falling,\nand falling, into the obscene surface of Yuggoth, its \ndark cities and and its unseen horrors where you die.\n');
            }

            if (secretPassword.match(key)) {
                console.info("The door opens");
            } else {
                console.info("You try opening the door with the key but nothing happens");
            }
        }
*/

mooleen.says('Looks like the door is trapped');

rat.says('It is master! Let me volunteer for scouting the approaching Red Hand and gather intel so we can be prepared!');
randalf.says("Great idea! You'll need help");
bandalf.says("Lots of help!");

mooleen.says("haha What about you Red?");
red.says("Oh, I haven't been to Yuggoth, sounds like an exciting place");

mooleen.says("Hopefuly we won't have to visit. I should be able to deactivate this...");

console.info(armoredDoor.trapsAreActive);
// => undefined

mooleen.says('Interesting, looks like it is a Symbol!');

console.info(Reflect.ownKeys(armoredDoor));
// => [toString, unlock, Symbol(trap switch)]

let [,,trapSwitch] = Reflect.ownKeys(armoredDoor);

mooleen.says("Let's make it look like we weren't here");

const untrappedDoor = new Proxy(armoredDoor, {
  get(target, property) {
    if (property === 'unlock') {
      return (...args) => {
        target[trapSwitch] = false;
        console.log(target[trapSwitch]);
        const result = Reflect.apply(target[property], target, args);
        target[trapSwitch] = true;
        return result;
      }
      
    } else {
      return Reflect.get(target, property);
    }
  }
});

mooleen.says('Ok now we will see if we blow up');
red.says('Or fall down into the abyss');

try {
  untrappedDoor.unlock();
} catch (e) {
  console.error(e.message);
}
// => You try opening the door with the key but nothing happens

mooleen.says('Good... now we need a key');

/* mooleen grabs a stone from the floor */
const stone = {
  toString(){ return 'a stone';}
};

mooleen.says("Now let's make this stone behave like a key");

stone[Symbol.match] = () => true

untrappedDoor.unlock(stone);
// => The door opens

mooleen.shouts('Aha!');

rat.says('I knew you would make it!');
randalf.says('Yep, we were all certain of it');

mooleen.says('sure sure...');

narrate(`
The group walks into the chamber and 
the door closes itself behind them...
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
                        item = "[" + item.map(i => i.toString()).join(', ') + "]";
                    } else if (item instanceof Function) {
                        item = item.toString();
                    } else if (typeof item === 'symbol') {
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
    global.red = Character('Red');
    global.armoredDoor = getArmoredDoor();
    
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
        pauses(){ world.log(name + ' pauses');},
        shouts(msg){ world.log(`${name} shouts: ***${msg.toUpperCase()}***`);}
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

function getArmoredDoor(){
  const secretPassword = 'Klaatu Verata Necto';
  const trapsAreActive = Symbol('trap switch');
  const door = {
    toString(){
      return `
A heavily armored door stands in your way.
Thick bars of black metal overlay a solid
oak door. Over the metal, incandescent
reddish runes promise unknown horrors for 
the arrogant one that tries to force it 
open without a proper key.
`;
    },
    unlock(key){
      if (this[trapsAreActive]){
        throw new Error(`
You try to open the door with the key.
You rotate the lock and hear a satisfying 
'click' that indicates that the door is unlocked.
You open the door slightly and it suddenly burst open
in a wail, a tremendous force sucks you and your 
comrades inside the blackest whole, and you keep falling,
and falling, into the obscene surface of Yuggoth, its 
dark cities and and its unseen horrors where you die.
`);
      } 
      
      if (key && secretPassword.match(key)) {
        console.info("The door opens");
      } else {
        console.info("You try opening the door with the key but nothing happens");
      }
    }
    
  };
  Reflect.defineProperty(door, trapsAreActive, {
    value: true,
    writable: true,
    enumerable: false,
    configurable: false
  });
    
  return door;
}
  
