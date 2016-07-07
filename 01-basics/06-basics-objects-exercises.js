'use strict'
// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript
Chapter 06 - The Basics Of Objects - Exercises

*/


narrate(`This must be the weirdest piece of dune man has ever known. There's two wizards surrounded by a critter, a mouse, a giant bat, a venomous frog, a monster, a teeny tiny and a giant spider, a stealthy monster, a crazy monkey, a dark spider, a sugary critter?, an ooze and a ptero... a pterodactyl whatever that may be.
`);

randalf.says("And that's how you summon creatures to your cause! An army!");

mooleen.says("Ahá");
mooleen.says("Summon them from where?");

randalf.says("hmm... good question!");
randalf.says("Powerful javascriptmancers can create stuff out of nothing");
randalf.says("Initiates summon creatures from..." +
             "wherever creatures come from");

randalf.says("There's a lot of sand here... why not create a sand golem?");

// Exercises

narrate("### Create a Sand Golem! === ");
narrate("Use an object initializer to create a sand golem. It should satisfy the following snippet of code:");

/*
sandGolem.toString();
// (returns) => Giant Sand Golem
sandGolem.walksTo(1,1);
// => Giant Sand Golem walks to (1,1);
sandGolem.grabs('spider');
// => Giant Sand Golem grabs spider
sandGolem.grabs('monkey', 'venomous frog');
// => Giant Sand Golem grabs monkey and venomous frog
sandGolem.grabbedStuff;
// (returns) => ['spider', 'monkey', 'venomous frog']

*/

mooleen.concentrates();

narrate("A sudden wind appears from out of nowhere, a small whirlwind that sucks the sand beside mooleen and grows, and grows, and grows until it becomes and imposing giant figure that vaguely resembles something human.");

let sandGolem = {
  position: {x: 0, y: 0},
  walksTo(x, y){
    console.log(this + ' walks to (' + x + ',' + y + ')');
    this.position.x = x;
    this.position.y = y;
  },
  toString(){
    return 'Giant Sand Golem';
  },
  grabbedStuff: [],
  grabs(...items){
    this.grabbedStuff.push(...items);
    console.log(this + ' grabs ' + items.join(' and '));
  }
}

console.log(sandGolem.toString());
// (returns) => Giant Sand Golem
sandGolem.walksTo(1,1);
// => Giant Sand Golem walks to (1,1);
sandGolem.grabs('spider');
// => Giant Sand Golem grabs spider
sandGolem.grabs('monkey', 'venomous frog');
// => Giant Sand Golem grabs monkey and venomous frog
console.log(sandGolem.grabbedStuff);
// (returns) => ['spider', 'monkey', 'venomous frog']

mooleen.says('voilá!');

narrate("### How Much More Weight Can it Carry? === ");
narrate(" By the immutable laws of physics, a sand golem can only lift up to 40 items at once. Create a `spaceAvailableOnBoard` getter that retrieves the amount of space available in a golem at a given time.");

let sandGolemImproved = {
  position: {x: 0, y: 0},
  walksTo(x, y){
    console.log(this + ' walks to (' + x + ',' + y + ')');
    this.position.x = x;
    this.position.y = y;
  },
  toString(){
    return 'Giant Sand Golem';
  },
  grabbedStuff: [],
  grabs(...items){
    this.grabbedStuff.push(...items);
    console.log(this + ' grabs ' + items.join(' and '));
  },
  get spaceAvailableOnboard(){
    const maxSpace = 40;
    return maxSpace - this.grabbedStuff.length;
  }
}

sandGolemImproved.grabs('pterodactyl');
// => Giant Sand Golem grabs pterodactyl
console.log(sandGolemImproved.spaceAvailableOnboard);
// => 39

narrate("### Golems for Everyone! === ");
narrate("Write a factory function that allows you to create as many golems as you like. You are welcome to use ES6 short-hand syntax if you so choose.");

function SandGolem(name){
  return {
    name,
    position: {x: 0, y: 0},
    walksTo(x, y){
      console.log(this + ' walks to (' + x + ',' + y + ')');
      this.position.x = x;
      this.position.y = y;
    },
    toString(){
      return 'Giant Sand Golem (' + name + ')';
    },
    grabbedStuff: [],
    grabs(...items){
      this.grabbedStuff.push(...items);
      console.log(this + ' grabs ' + items.join(' and '));
    },
    get spaceAvailableOnboard(){
      const maxSpace = 40;
      return maxSpace - this.grabbedStuff.length;
    }
  };
}

let sand = SandGolem('sand');
let dune = SandGolem('dune');
let beach = SandGolem('beach');
sand.grabs(dune);
// => Giant Sand Golem (sand) grabs Giant Sand Golem (dune)

mooleen.says('hehe that was fun');

narrate("### Hide the Details === ");
narrate("Update your sand golem to hide its `position` and `grabbedStuff` from external access.");

function SandGolem(name){
  let position = {x: 0, y: 0},
      grabbedStuff = [];
  return {
    name,
    walksTo(x, y){
      console.log(this + ' walks to (' + x + ',' + y + ')');
      position.x = x;
      position.y = y;
    },
    toString(){
      return 'Giant Sand Golem (' + name + ')';
    },
    grabs(...items){
      grabbedStuff.push(...items);
      console.log(this + ' grabs ' + items.join(' and '));
    },
    get spaceAvailableOnboard(){
      const maxSpace = 40;
      return maxSpace - grabbedStuff.length;
    }
  };
}

var shy = SandGolem('shy');
console.log(shy.position);
// => undefined
shy.walksTo(1,1);
// => Giant Sand Golem (shy) walks to (1,1)
console.log(shy.grabbedStuff);
// => undefined
shy.grabs('ooze');
// => Giant Sand Golem (shy) grabs ooze

randalf.says('Excellent! Now we are ready to start our journey');
mooleen.says('Where are we going?');
randalf.says('To the north! I have some friends left there');
mooleen.says('To the north then...');

narrate(`

And to the nort started the weirdest procession anyone has ever seen. Two wizards, a sand golem, sand, dune and beach, shy, a critter, a mouse, a giant bat, a teeny tiny and a giant spider, a crazy monkey...

`);







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
        toString(){return this.name;},
        concentrates(){ world.log(name + ' concentrates');}
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
