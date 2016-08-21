// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();
/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript for C# Devs
Chapter 10 - Upgrading Your Everyday JavaScript Magic With ES6: Arrow Functions - Exercises

*/

/* EXERCISES */
narrate("=== 1. You Shall Make a Magic Bow! ===");
narrate("Use ES6 Arrow functions to convert this ordinary wooden bow into a magic bow that can pierce the targets in this tutorial.");

/*
let woodenBow = {
  shoot(target){
     console.log(`You shoot a arrow to the ${target}`);
  }
}
*/

let magicBow = {
  shoot: (target) => console.log(`You shoot a magic arrow to the ${target}`)
};
mooleen.weaves('magicBow.shoot("first target")');

/* as mooleen shots the target it vanishes in thin air */

mooleen.says(`ha! Look at that! I'm awesome!`);
mooleen.says(`Now there's only one left!`);

gort.says(`Excellent job!`);
gort.says(`You shall make a better bow!`);

mooleen.says(`But this bow is awesome!`);
gort.says(`Can you pierce these with that bow?`);

/* All of the sudden 5 more targets materialize from thin air */

mooleen.says('Really?');

narrate("=== 2. You Shall Make a Better Bow! ===");
narrate("Improve your bow to be able to shoot elemental arrows to multiple targets. You should be able to satisfy the following interface.");

/*
elementalBow.shoot('fire', 'target 1');
// => you shoot a fire arrow to target 1
elementalBow.shoot('ice', 'target 2', 'target 3');
// => you shoot a ice arrow to target 2 and target 3
*/

let elementalBow = {
  shoot: (element, ...targets) => 
    console.log(`you shoot a ${element} arrow to ${targets.join(' and ')}`)
};

mooleen.weaves(`elementalBow.shoot('fire', 'target 1', 'target 2', 'target 3', 'target 4' , 'target 5')`);
// => you shoot a fire arrow to target 1 and target 2 and target 3 and target 4 and target 5

mooleen.says(`That's how I roll`);

gort.says('Congratulations! You have completed this tutorial!');
gort.says(`Say 'next' to continue into the last and most difficult trial`);

mooleen.says(`NEEEEXT!!!`);





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
