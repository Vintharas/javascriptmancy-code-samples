'use strict'
// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript
Chapter 02 - The Basics of JavaScript Functions - Exercises

*/

randalf.says('Oh no... we are going to die.');
mooleen.says('Wait? What? This is just a dream...');

randalf.says('Does the unbearable heat of that torrent of flames feel dreamy to you?');
mooleen.says('Damn...');
mooleen.says(`Well... JavaScriptmancer of the First Order,
guardian of the secret flame, can you do something!?`);

randalf.says('Sacred Flame...')
randalf.says('hmm I kind of ...ehem.. have lost my power');
mooleen.says('Shit');

narrate("=== ### Oh No! You Are About To Be Incinerated!? === ")
narrate("**Write a function expression** to cast a magic shield around you and protect you from sure death.")

var castMagicShield = function(target){
    console.log('The air shimmers around ' + target + ' as ' + 
    target + ' is surrounded by a magic shield');
    target.defense = 1000000;
}

mooleen.weaves('castMagicShield(mooleen)');
// => The air shimmers around Mooleen as Mooleen is surrounded by a magic shield
mooleen.weaves('castMagicShield(randalf)');
// => The air shimmers around Randalf, the Red as Randalf, the Red is surrounded by a magic shield

great.weaves('fireball(mooleen, randalf)');
// => A giant fireball blasts Mooleen and Randalf, the Red

/*
* While all the surrounding vegetation springs into flames
* the space surrouding Mooleen and Randalf remains eerily 
* intact.
*/

great.says(`What!? How are you alive?! It can't be! You old fool lost the ability to weave long ago`);
great.says(`It doesn't matter, If I cannot burn you, I'll bury you both`);

/*
*  The earth starts rumbling under your feet as Great concentrates...
*/

narrate("=== Tap Into the Source and Fight Back!=== ");
narrate("Hoisting can be problematic. Find the bug in these spell and release destruction upon your enemies!");
    
    
(function(source){

  // the bug was here
  // at this point supercharge is undefined
  // it is the equivalent to:
  // var supercharge;
  //source.supercharge = supercharge;
  
  var supercharge = function(spell){
    console.log('you tap into the One True Source an are inundated by power');
    console.log('you concentrate all your power in ' + spell.name);
    spell.mana = 1000000;
  }
  
  source.supercharge = supercharge;

}(window.source = {}));
    
mooleen.weaves('source.supercharge(fireball)');
// => you tap into the One True Source and are inundated by Power
// => you concentrate all your power in fireball
mooleen.weaves('fireball(great)');
// => An inmense and unending torrent of molten lava surges from your fingers and impacts Great

great.says('Glurrrp');
randalf.says("Omg! You are awesome! Now, let's flee!");
    
narrate("=== Escape with a Function Declaration.=== ");
narrate("Write a teleportation spell using a function declaration while Great recovers!");

function teleport(where, ...who){
	console.log(`${who.join(' and ')} teleport ${where}`);
}

mooleen.weaves('teleport("out of the forest", mooleen, randalf)');
// => Mooleen and Randalf, the Red teleport out of the forest
mooleen.says('I feel so tired...');

/* 
Mooleen collapses into the ground...
*/
    
    


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
            world.log(name + ' starts weaving a spell!'); 
            world.log('***' + spell + '***');
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
