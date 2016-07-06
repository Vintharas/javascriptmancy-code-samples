'use strict'
// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript
Chapter 04 - Useful Function Patterns: Arbitrary Arguments - Exercises

*/

randalf.says('He did it. He gained access to the REPL');
randalf.says('He understood its secret language and everything changed');

/* 
* All of the sudden he gained the power to command the world around him.
* No longer did he need to use his bare hands he could just create things
* out of nothingness. 
*
* Disturbing but amazing to witness.
*
* And then he started teaching it, and a golden age of civilization began.
*/

randalf.says('and it all started with eggs...');
randalf.stomach.says('brrrrrrr....');
randalf.says('hmm... care for some eggs??');

// exercises

narrate("=== ### Boil Some Eggs! === ");
narrate("Transform this function to enable boiling an arbitrary number of eggs using and the arguments object.");


function boil(item){
  console.log('You summon a bubble of boiling water that boils the ' + item);
}
mooleen.weaves("boil('egg')");
// => You summon a bubble of boiling water that boils the egg

// now boil all of these!
var dragonEgg = 'dragon egg',
    egg = 'a unasumming egg',
    goldenEgg = 'a golden egg';


// solution!
mooleen.says('I think I am getting the hang of it...');

function boilMany(){
  var items = Array.prototype.slice.apply(arguments);
  items.forEach(function(item) { 
    boil(item); 
  });
}
mooleen.weaves('boilMany(dragonEgg, egg, goldenEgg)');
// => You summon a bubble of boiling water that boils the dragon egg
// You summon a bubble of boiling water that boils the a unasumming egg
// You summon a bubble of boiling water that boils the a golden egg


narrate("=== ### Now Improve it With ES6 === ");
narrate("Use ES6 rest parameters to improve `boilMany`.");

mooleen.says('All right! I reckon that if I... ');
function boilManyES6(...items){
  items.forEach(function(item) { 
    boil(item); 
  });
}
mooleen.weaves('boilManyES6(dragonEgg, egg, goldenEgg)');
// => You summon a bubble of boiling water that boils the dragon egg
// You summon a bubble of boiling water that boils the a unasumming egg
// You summon a bubble of boiling water that boils the a golden egg

mooleen.says('Booom!');

narrate("=== ### Wait! Can You Boil This Array of Veggies? === ")
narrate("Randalf found these veggies in one of his many pockets. Could you boil them without changing the body of the previous function?");

let veggies = ['cucumber', 'iceberg salad', 'onion', 'zucchini', 'tomato'];

mooleen.says("didn't you say something about a spread operator?");

mooleen.weaves('boilManyES6(...veggies)');
// => You summon a bubble of boiling water that boils the cucumber
// You summon a bubble of boiling water that boils the iceberg salad
// You summon a bubble of boiling water that boils the onion
// You summon a bubble of boiling water that boils the zucchini
// You summon a bubble of boiling water that boils the tomato

mooleen.says("Ok! Ready, will you now tell me what am I doing here?");
randalf.says("I'm getting there");
randalf.says("...golden age of civilization... yeah!");
randalf.says("Well, that didn't last long");


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
        toString(){return this.name;}
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
