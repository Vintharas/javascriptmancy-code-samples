// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();
/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript for C# Devs
Chapter 11 - Upgrading Your Everyday JavaScript Magic With ES6: Spread Operator - Exercises

*/

/* EXERCISES */
narrate("=== 1. You Are Going to Need Some Wings To Get Out of This One! ===");
narrate("Time is of the essence. Unless you create some wings for Mooleen she'll encounter a horrible death at the hands of gravity. Use the ES6 spread operator to gather all these wings from diverse birds together in one single array!");

let scatteredFeathers = ['dove feather', 'colibri feather'];
let aGoldenFeather = 'golden feather';
let eagle = {
  hp: 50,
  description: 'a majestic eagle',
  inventory: ['25 eagle feathers']
};

mooleen.says('feathers... feathers... really? Poor eagle...')
let feathersForMagicWings = [...scatteredFeathers, aGoldenFeather, ...eagle.inventory];
mooleen.says(`Voila! Here are the feathers ${feathersForMagicWings}`);

gort.says(`Good! Now I'll unveil one the greatest spells of our time: the abilito to fly!`);

narrate("=== 2. Now Fly! ===");
narrate("Use the spread operator to create a new pair of wings using the `Wings` spell below. Remember to use the `new` operator to create the new wings:");

function Wings(peacefulBirdFeather, quickestFlappingBirdFeather, goldenFeather, eagleFeathers){
  if (peacefulBirdFeather !== 'dove feather' ||
      quickestFlappingBirdFeather !== 'colibri feather' ||
      goldenFeather !== 'golden feather' ||
      !eagleFeathers.includes('eagle'))
    throw new Error(`You don't have all the ingredients needed!!!`);
    
  console.log('A beautiful pair of translucent magic wings suddently appear in your back!');
  
  this.fly = function(){
    console.log('You soar into the air like a majestic eagle');
  };
}

let magicWings = new Wings(...feathersForMagicWings);
// => A beautiful pair of translucent magic wings suddently appear in your back!
magicWings.fly();
// => You soar into the air like a majestic eagle

/*** mooleen starts flying and barely misses the dusty earth ***/
mooleen.says('Phewwwww!!!');

gort.says('Congratulations!')
gort.says(`Now you're a full-fledged JavaScriptmancer!`)
gort.says('Welcome to the order master!');

/* gort vanishes */

mooleen.says('Wait... How do I get back?');




/**** World interface *****/
function createWorld(){
    var world = createWorldAPI(console);
    window.addEventListener('error', function(e){
        world.error(e.message);
    });   
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
            var theWorld = document.getElementById("theWorld"),
                span = document.createElement('span'),
                type = type || 'event';
            span.className = 'world world-' + type;
            span.innerHTML = message;
            theWorld.appendChild(span);
        }
    }
}


function startWorld(){
    /**** load logging ****/
    window.world = createWorld();
    // hijack logs
    console.log = world.log;
    console.info = world.info;
    console.error = world.error;
    
    /**** characters *****/
    window.mooleen = Character('Mooleen');
    window.randalf = Character('Randalf, the Red');
    window.great = Character('Great');
    window.bandalf = Character('Bandalf');
    window.zandalf = Character('Zandalf');
    window.gort = Character('Gort');
    
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
        sighs(){ world.log(name + ' sighs'); }
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
