'use strict'
// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript
Chapter 03 - Useful Function Patterns: Default Argument - Exercises

*/

randalf.says('See? By using defaults you can make ' + 
              'your spellcasting more effective');
 
mooleen.says('hmm... indeed... indeed...');
mooleen.says('Do I get to know why I am here? And what here is?');
 
randalf.says('Sure! Just start practicing while I go get us lunch');

// exercises

narrate("=== ### Time to light a Fire! === ");
narrate("Improve this fire function using defaults with ES5.");

function fire(mana, target){
  if (mana > 10) console.log('An enormous fire springs to life on ' + target);
  else if (mana > 4) console.log('You light a strong fire on ' + target);
  else if (mana > 2) console.log('You light a small fire on ' + target);
  else if (mana > 0) console.log('You try to light a fire but ' + 
      'only achieve in creating teeny tiny sparks. Beautiful but useless.');
}
    
mooleen.says('damn old man...');
mooleen.says('let me modify this spell for the most cost-effective use case');

function fireImproved(mana, target){
  mana = mana || 3;
  target = target || 'dry wood';
  if (mana > 10) console.log('An enormous fire springs to life on ' + target);
  else if (mana > 4) console.log('You light a strong fire on ' + target);
  else if (mana > 2) console.log('You light a small fire on ' + target);
  else if (mana > 0) console.log('You try to light a fire but ' + 
      'only achieve in creating teeny tiny sparks. Beautiful but useless.');
}

mooleen.weaves('fireImproved()');
// => You light a small fire on dry wood;
mooleen.says('aha!');
    
narrate("=== ### And now try ES6 Defaults === ");
narrate("Improve the fire function using ES6 defaults.");

function fireImprovedES6(mana=3, target='dry wood'){
  if (mana > 10) console.log('An enormous fire springs to life on ' + target);
  else if (mana > 4) console.log('You light a strong fire on ' + target);
  else if (mana > 2) console.log('You light a small fire on ' + target);
  else if (mana > 0) console.log('You try to light a fire but ' + 
      'only achieve in creating teeny tiny sparks. Beautiful but useless.');
}

mooleen.weaves('fireImprovedES6()');
// => You light a small fire on dry wood

randalf.says('Excellent! Nothing like a bonfire for telling a good story!');






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
      return {
        name,
        says: function(msg){ world.log(name + ' says: ' + msg + '\n\n');},
        weaves: function(spell){ 
            world.spell(name + ' starts weaving a spell!'); 
            world.spell('***' + spell + '***');
            eval(spell); 
        },
        toString(){return this.name;}
      }
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
