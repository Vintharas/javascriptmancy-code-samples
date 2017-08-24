// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/* 
 *
 * JavaScript-mancy - Summoning Fundamentals: 
 * An Introduction to Object Oriented Programming in JavaScript
 * Polymorphism 
 *
 * Exercises!
 *
 */

/* EXERCISES */
narrate("=== The Secrets Of Polymorphic Functions ===");
narrate(`Imagine that you have a legion of undead cows, sheep and goats. Brrrr! Horrible! Create a single polymorphic function to exorcize all these evil undead creatures given that they look as follows:
`);

var undeadCow = {
  position: {x: 0, y:0},
  legs: 1, 
  toString: function(){ return 'undeadCow'},
  describe: function(){ 
    return "A terrible sight unfolds before you. A half eaten, half rotten cow, half standing, half crawling looks at you with sightless eerie eyes";
  },
  charge: function (target){
    console.log('UndeadCow charges ' + target + ' with cold rage');
    target.hp -= 50;
  },
  soulPoints: 100
};

var undeadSheep = {
  position: {x: 2, y:10},
  legs: 4, 
  wings: 2,
  toString: function(){ return 'undeadSheep'},
  describe: function(){ 
    return "A horrible sight unfolds before you. A half eaten, half rotten sheep, half standing, half crawling looks at you with sightless eerie eyes";
  },
  bite: function(target){
    console.log('UndeadSheep bites ' + target + ' meanly');
    target.hp -= 60;
  },
  soulPoints: 70
};

var undeadGoat = {
  position: {x: 0, y:0},
  legs: 1, 
  toString: function(){ return 'undeadGoat'},
  describe: function(){ 
    return "A daunting sight unfolds before you. A half eaten, half rotten goat, half standing, half crawling looks at you with sightless eerie eyes";
  },
  soulPoints: 80,
  jumpAttack: function(target){
    console.log('UndeadGoat jumps on ' + target + ' with its full weight');
    target.hp -= 70;
  }
};

narrate("The function should reduce the soulPoints of all the diverse undead host to 0");

function exorcise(undead){
  undead.soulPoints = 0;
  console.log('You exorcise ' + undead + ' freeing its soul from the dark plane.');
}

mooleen.weaves('exorcise(undeadCow)');
// => You exorcise undeadCow freeing its soul from the dark plane.

mooleen.weaves('exorcise(undeadSheep)');
// => You exorcise undeadSheep freeing its soul from the dark plane.

mooleen.weaves('exorcise(undeadGoat)');
// => You exorcise undeadGoat freeing its soul from the dark plane.

mooleen.says('Yeah, it was that easy');

/**** World interface *****/
function createWorld(){
    var world = createWorldAPI(console);
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
