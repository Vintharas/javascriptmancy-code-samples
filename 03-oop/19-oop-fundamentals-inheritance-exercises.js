// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/* 
 *
 * JavaScript-mancy - Summoning Fundamentals: 
 * An Introduction to Object Oriented Programming in JavaScript
 * Inheritance 
 *
 * Exercises!
 *
 */

/* EXERCISES */
narrate("=== 1. A Cow And __proto__ ===");
narrate(`Remember the sheep from the previous chapter?`);

/*
var sheep = {
  position: {x:0, y:0},
  legs: 0,
  toString: function(){
    return "You look at what you think is a sheep. It's hard to be sure though was it's a legless lump on the ground";
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
*/

narrate("Create a new minion `cow`, extract the common behaviors between `sheep` and `cow` inside a prototype `minion` and take advantage of prototypical inheritance to reuse these behaviors in `sheep` and `cow`. **Tip: use the `__proto__` property inside an object initializer**.");

// the minion prototype
// encapsulates the common behaviors
// of describing a minion and moving
var minion = {
  describe: function(){
    console.log(this.toString());
  },
  goesTo: function(x,y){
    this.position.x = x;
    this.position.y = y;
    console.log(`The ${this.name} slowly crawls to position (${x},${y})`);
  }
};

var sheep = {
  "__proto__": minion,
  name: "sheep",
  position: {x:0, y:0},
  legs: 0,
  toString: function(){
    return "You look at what you think is a sheep. It's hard to be sure though was it's a legless lump on the ground";
  },
  baa: function(){
    console.log(`'Baaaaaaaaa'
The sheep makes a wailing sound vaguely resembling bleating that gives you goose bumps`);
  }
};

var cow = {
  "__proto__": minion,
  name: "cow",
  position: {x:0, y:0},
  legs: 0,
  toString: function(){
    return "You look at what you think is a cow. It's hard to be sure though was it's a big legless lump on the ground";
  },
  moo: function(){
    console.log(`'Moooooooo'
The cow makes a torturing sound vaguely resembling mooing.`);
  }
};

sheep.describe();
// => You look at what you think is a sheep. It's hard to be sure though was it's a legless lump on the group
sheep.goesTo(1,1);
// => The sheep slowly crawls to position (1,1)

cow.describe();
// => You look at what you think is a cow. It's hard to be sure though was it's a big legless lump on the ground
cow.goesTo(2,2);
// => The cow slowly crawls to position (2,2)

randalf.says('Take a look at that!');
mooleen.says('Yes haha see how I reuse those two behaviors in the sheep and the cow');
rat.says('Marvellous!');





narrate("=== 2. A Goat and Object.create ===");
narrate(`
Now let's review the sheep factory function from the previous chapter:`);

/*
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
*/

narrate(`Create a new factory function createGoat and take advantage of prototypical inheritance to reuse the behaviors defined by the minion prototype in both sheeps and goats. **Tip: take advantage of Object.create inside the factory function**.
`);

function createSheep(legs, x, y){
  var sheep = Object.create(minion);
  
  return Object.assign(sheep, {
    name: 'sheep',
    position: {x:x, y:y},
    legs: legs,
    toString: function(){
      return `You look at what you think is a ${this.name}. It has ${legs} legs`;
    },
    baa: function(){
      console.log(`'Baaaaaaaaa'
The ${this.name} makes a wailing sound vaguely resembling bleating
that gives you goose bumps
    `);
  }});
}

function createGoat(legs, x, y){
  var goat = Object.create(minion);
  
  return Object.assign(goat, {
    name: 'goat',
    position: {x:x, y:y},
    legs: legs,
    toString: function(){
      return `You look at what you think is a ${this.name}. It has ${legs} legs`;
    },
    scream: function(){
      console.log(`'Waaaaaaa'
The ${this.name} makes a wailing sound resembling a person being tortured.
    `);
  }});
}

var newSheep = createSheep(4, 0, 0);
newSheep.describe();
// => You look at what you think is a sheep. It has 4 legs
newSheep.goesTo(1,1);
// => The sheep slowly crawls to position (1,1)

var goat = createGoat(4, 2, 2);
goat.describe();
// => You look at what you think is a goat. It has 4 legs
goat.goesTo(1, 1);
// => The goat slowly crawls to position (1,1)


randalf.says('Great! See how Object.create works perfectly and how `describe` and `goesTo` are delegated to the prototype?');
mooleen.says('Yes!');





narrate("=== 3. The Mighty Badger ===");
narrate(`Ok and now it's time for the mighty and mean badger. Remember this constructor function from the previous chapter?
`);

/*

function Sheep(legs, x, y){
  this.legs = legs;
  this.position = {x:x, y:y};
  this.toString = function(){
    return `You look at a beautiful sheep! It has ${this.legs} legs`;
  };
  this.describe = function(){ 
    return console.log(this.toString());
  };
  this.baa = function(){
    console.log(`'Baaaaaaaaa'
The sheep makes a beautiful musical sound reminiscent 
of spring and wildberries.
    `);
  };
  this.goesTo = function(x,y){
    this.position.x = x;
    this.position.y = y;
    console.log(`The sheep promptly goes to position (${x},${y})`);
  };
}

*/

narrate("Rewrite this function and create a new constructor function `Badger` that take advantage of prototypical inheritance to reuse the behaviors defined by the minio prototype. **Hint: Remember `constructorFunction.prototype`**");

function Sheep(legs, x, y){
  this.name = "sheep";
  this.legs = legs;
  this.position = {x:x, y:y};
  this.toString = function(){
    return `You look at a beautiful sheep! It has ${this.legs} legs`;
  };
  this.baa = function(){
    console.log(`'Baaaaaaaaa'
The sheep makes a beautiful musical sound reminiscent 
of spring and wildberries.
    `);
  };
}
Sheep.prototype = Object.create(minion);
Sheep.prototype.constructor = Sheep;

function Badger(legs, x, y){
  this.name = "badger";
  this.legs = legs;
  this.position = {x:x, y:y};
  this.toString = function(){
    return `You look at a mighty mean badger! It has ${this.legs} legs`;
  };
  this.growl = function(){
    console.log(`'Grrrrrrr'
The badger growls fiercely.
    `);
  };
}
Badger.prototype = Object.create(minion);
Badger.prototype.constructor = Badger;

var beautySheep = new Sheep(4, 2, 2);
beautySheep.describe();
// => You look at a beautiful sheep! It has 4 legs
beautySheep.goesTo(1, 1);
// => The sheep slowly crawls to position (1,1)

var badger = new Badger(4, 1, 1);
badger.describe();
// => You look at a mighty mean badger! It has 4 legs
badger.goesTo(2, 2);
// => The badger slowly crawls to position (2,2)

randalf.says('Good job! You have mastered it!');
mooleen.says('Thanks!');
rat.says('Wait... Why is the mighty badger crawling?');






narrate("=== 4. Wait! Why is my badger crawling?? === ");
narrate(`The badger from the previous example doesn't move at the speed it befits a mighty badger. Take advantage of the prototypical chain to add a goesTo method that is only used with badgers. The result should be like this:

var yetAnotherBadger = new Badger(4, 0, 0);
yetAnotherBadger.goesTo(4, 4);
// => swift like the wind the mighy badger goes to (4,4)

No sheep should be affected by this change:

beautySheep.goesTo(2, 2);
// => The sheep slowly crawls to position (2,2)

`);

Badger.prototype.goesTo = function(x,y){
  this.position.x = x;
  this.position.y = y;
  console.log(`Swift like the wind the mighy badger goes to (${x},${y})`);
}

var yetAnotherBadger = new Badger(4, 0, 0);
yetAnotherBadger.goesTo(4, 4);
// => Swift like the wind the mighy badger goes to (4,4)

beautySheep.goesTo(2, 2);
// => The sheep slowly crawls to position (2,2)

mooleen.says("And that's it!");
randalf.says('Exactly, now that you have implemented a new method in the badger prototype this method gets called instead of the one within the minion prototype');

mooleen.says('Yep the chain goes badger object => badger prototype => minion prototype');

randalf.says('Btw, did you notice that now all badgers are swift?');
rat.says('Yes! Even the ones created before augmenting the prototype!');

narrate("=== 5. Did You Notice That All Badgers Are Swift? === ");
narrate(`
An interesting property of the prototypical chain is that when you augment a prototype all objects that share it automatically get access to the new behavior. Take a look at the original badger:

{lang="javascript"}
~~~~~~~~
badger.goesTo(1, 1)
// => Swift like the wind the mighy badger goes to (4,4)
~~~~~~~~

Take advantage of this property to gift all your minions with the ability to fly. Hell yeah!
`);

badger.goesTo(1,1);
// => Swift like the wind the mighy badger goes to (4,4)

mooleen.says(`Wo... it's true!`);
mooleen.says(`Hmm this gives me an idea... that'll make this army unstoppable`);

minion.fly = function(x, y){
  this.position.x = x;
  this.position.y = y;
  console.log(`The ${this.name} takes off suddenly and flights soaring like an eagle until it gets to position (${x},${y})`);
};

sheep.fly(1,1);
// => The sheep takes off suddenly and flights soaring like an eagle until it gets to position (1,1)
goat.fly(1, 1);
// => The goat takes off suddenly and flights soaring like an eagle until it gets to position (1,1)
badger.fly(2, 2);
// => The badger takes off suddenly and flights soaring like an eagle until it gets to position (2,2)

mooleen.says('Amazing!');
rat.says('Superb!');
randalf.says('Indeed it is!');

/* 
The entrails of the earth, up into the rock, onto the top
of a white peaked mountain, and a majestic endless mountain range.
Up into a sea of clouds, the world... and freaking a goat breaching 
into the stratosphere...
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
