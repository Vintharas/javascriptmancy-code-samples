// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/* 
 *
 * JavaScript-mancy - Summoning Fundamentals: 
 * An Introduction to Object Oriented Programming in JavaScript
 * Encapsulation 
 *
 * Exercises!
 *
 */

/* EXERCISES */
narrate("=== 1. Create a New Sheep 3.0 ===");
narrate(`Mooleen is about to try out a new version of the Sheep! Help her by creating the weirdest sheep you can imagine using an object initializer. Free your creativity! At least it should satistfy the following:`);

/*
sheep.describe();
// => You look at what you think is a sheep
sheep.baa();
// => 'Baaaaaaaaa'
// => The sheep makes a wailing sound vaguely resembling bleating
//    that gives you goose bumps
sheep.goesTo(1, 1);
// => The sheep slowly moves to position (1,1)
*/

mooleen.says(`Ok... let me see... what about his version?`);

var leglessSheep = {
  position: {x:0, y:0},
  legs: 0,
  toString: function(){
    return "You look at what you think is a sheep. It's hard to be sure though was it's a legless lump on the group";
  },
  describe: function(){ return console.log(this.toString());},
  baa: function(){
    console.log(`'Baaaaaaaaa'
The sheep makes a wailing sound vaguely resembling bleating
that gives you goose bumps
    `);
  },
  goesTo: function(x,y){
    this.position.x = x;
    this.position.y = y;
    console.log(`The sheep slowly crawls to position (${x},${y})`);
  },
};

mooleen.says('Voila!');

leglessSheep.describe();
// => You look at what you think is a sheep. It's hard to be sure 
//    though was it's a legless lump on the group
leglessSheep.baa();
// => 'Baaaaaaaaa'
//    The sheep makes a wailing sound vaguely resembling bleating
//    that gives you goose bumps
leglessSheep.goesTo(1,1);
//=> The sheep slowly crawls to position (1,1)


randalf.says(`That's the saddest sheep I've ever seen`);
mooleen.says(`It's incredibly light and suited for stealth missions`);
rat.says('Look at that crawl! Majestic!');

narrate("=== 2. Good try! But Can you Do Better!? ===");
narrate(`
Now try again using a factory function. You can call it createSheep and it should return a new version of a sheep with an arbitrary number of legs:

var sheep = createSheep(/* legs */ 5);

It should satisfy the same interface as the sheep in the previous exercise.
`);

function createSheep(legs, x, y){
  return {
  position: {x:x, y:y},
  legs: legs,
  toString: function(){
    return `You look at what you think is a sheep. It has ${legs} legs`;
  },
  describe: function(){ return console.log(this.toString());},
  baa: function(){
    console.log(`'Baaaaaaaaa'
The sheep makes a wailing sound vaguely resembling bleating
that gives you goose bumps
    `);
  },
  goesTo: function(x,y){
    this.position.x = x;
    this.position.y = y;
    console.log(`The sheep slowly goes to position (${x},${y})`);
  },
};
}

var newAbominationSheep = createSheep(50, 2, 2);
newAbominationSheep.describe();
// => You look at what you think is a sheep. It has 50 legs

randalf.says('Ok what is the purpose of a sheep having 50 legs?');
mooleen.says('Reliability, have you heard about the concept of fault tolerance?');
mooleen.says('Even wounded this sheep will be able to keep going and crush our enemies');
rat.says('Boooya!');


/*
let leglessSheepInES6 = {
  position: {x: 0, y: 0},
  legs:0,
  toString(){},
  describe(){},
  baa(){},
  goesTo(x,y){}
};
*/











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
    let world = createWorld();
    global.world = world;
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
