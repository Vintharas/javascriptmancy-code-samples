// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/* 
 *
 * JavaScript-mancy - Black Tower Summoning: 
 * Objects Interweaving Objects with Mixins
 * 
 * Exercises!
 *
 */

/* EXERCISES */
narrate("=== ### 1. Volareeee Oh oH! ===");
narrate(` The Red Stronghold stands in the depths of Everstorm within crimson clouds, fire and lightning. To get there you'll need to fly, moreover your army will need to fly as well. 

Create a "canFly" functional mixin that encapsulates the flying behavior and which can be used to give the wondrous ability of flying to your now summoned army. It should provide the following API.

sandGolem.raise(10);
// => Sand Golem raises 10 feet into the air
sandGolem.dive(10);
// => Sand Golem dives 10 feet down through the air
sandGolem.fliesTo(100)
// => Sand Golem flies to 100 feet above sea level
sandGolem.position.z
// => 100
  
`);

/* Creature classes */
class Minion {
  constructor(name, hp){
   this.name = name;
   this.hp = hp;
   this.position = {x: 0, y: 0};
  }
  toString(){
    return this.name;
  }
  goesTo(x, y){ 
    this.position.x = x;
    this.position.y = y;
    console.log(`${this} goes to position (` + 
     `${this.position.x},${this.position.y})`);
  }
 }


class SandGolem extends Minion {
  constructor(name="Sand golem", hp=200){ 
    super(name, hp);
  }
  bash(target){
    console.log(`${this} bashes ${target} with terrible force causing 30 damage`);
    target.hp -= 30;
  }
  absorb(target){
    console.log(`${this} absorbs ${target} into its body of sand.` + 
                `The ${target} can't move`);
  }
}

/* Mixin */
function canFlyFn(state){
  const canFly = {
    fliesTo(height){ 
      this.position.z = height; 
      console.log(`${this} flies to ${height} feet above sea level`);
    },
    raise(height){ 
      this.position.z += height; 
      console.log(`${this} raises ${height} feet into the air`);
    },
    dive(height){ 
      this.position.z -= height; 
      console.log(`${this} dives ${height} feet through the air`);
    }
  } 
  Object.assign(state, canFly);
  // assuming the target object has a position property
  state.position.z = 0;
}


let sandGolem = new SandGolem();
canFlyFn(sandGolem);

sandGolem.raise(10);
// => Sand Golem raises 10 foot into the air
sandGolem.dive(10);
// => Sand Golem dives 10 foot down through the air
sandGolem.fliesTo(100)
// => Sand Golem flies to 100 foot above sea level
sandGolem.position.z
// => 100

mooleen.says("haha! Look at that, there they fly!");
rat.says("Yippie!");

redBrute.says("Sloppy work...");
randalf.says("but it works");
redBrute.says("What if the golem didn't have a position?");

mooleen.says("What if you were a mighty warrior " + 
             "of a vast superior race and you " + 
             "had lost a battle and a complete army " + 
             "in the process?");

redBrute.says('...');
redBrute.says('still sloppy work')





narrate("=== ### 2. Labeling and Tactics! ===");
narrate(` As your army grows you'll need to group your soldiers into companies, batallions, brigades and divisions to better control them and guide them into battle. A way to keep order into chaos is to label this groupings and given them colors that they can display in their armor, flag and standards.

 Create a new functional mixin "canBeLabeled" that allows you to label your troops with a name and color for their company. It should provide the following API: 

sandGolem.companyName
// => "Scarlett salamanders"
sandGolem.companySymbol
// => "s"
sandGolem.companyColor
// => "red"

Bonus! As a bonus exercise you can update the map generator in chapter 1 to display companies instead of individual soldiers

`);

function canBeLabeledFn(state, name, symbol, color){
  const canBeLabeled = {
    companyName: name,
    companySymbol: symbol,
    companyColor: color
  };
  return Object.assign(state, canBeLabeled);
}

canBeLabeledFn(sandGolem, "Scarlett salamanders", "s", "red");

console.log(sandGolem.companyName);
// => "Scarlett salamanders"
console.log(sandGolem.companySymbol);
// => "s"
console.log(sandGolem.companyColor);
// => "red"

// bonus
console.log(`

=== Bonus Exercise: Generate map of labels ===

`);
function LabeledMap(width, height, creatures){
  
  function paintPoint(x,y){
    var creatureInPosition = creatures
      .find(c => c.position.x === x && c.position.y === y);
    if (creatureInPosition) 
      return creatureInPosition.companySymbol;
    return '_';
  }
  
  return {
    width,
    height,
    creatures,
    paint() {
      console.log("Generating map of companies...")
      let map = '';
      for(let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++)
          map += paintPoint(x,y);
        map += '\n';
      }
      return map;
    }
  }
}

const anotherSandGolem = new SandGolem();
canBeLabeledFn(anotherSandGolem, "Dark Fiends", "d", "black");
anotherSandGolem.goesTo(2, 2);

const myLabeledMap = new LabeledMap(10,10, 
                            [sandGolem, anotherSandGolem]);
console.log(myLabeledMap.paint());
/*
  Generating map of companies...
  s_________
  __________
  __d_______
  __________
  __________
  __________
  __________
  __________
  __________
  __________
*/ 

mooleen.says("good... now I'll have a better control of my batallions");
mooleen.says("I think everything's ready");
mooleen.says("All that remains is to fly");
mooleen.says("How long will it take us to get to the Red Hand?");

redBrute.says("Hmm...");
redBrute.slicksTheTopOfAFingerAndRaisesItToTheAir();
redBrute.says("It'll take between... 2 to 3 weeks");

randalf.says("And we'll be flying all the time");
bandalf.says("And eating, sleeping...");
redBrute.says("Who needs to eat? Sleep? You weaklings...");

rat.says("Doing ...the thing you know... no toilet");
redBrute.says("Gravity will take care of it, " +
              "just don't fly atop each other");

mooleen.says("Hmm showering");
redBrute.says("Now, that is something!" +
  "I can relate to the magic properties of a bubble bath");

mooleen.says("Yeah, we'll need a transport, a big one");






narrate("=== ### 3. Conquest in Comfort with a Zeppelin! ===");
narrate(` Flying is awesome but it can be impractical and inconvenient at times. Like when you need to use a toilet or take a bubble bath. When forced to conquer why not conquer in the comfort of a giant flying fortress in the shape of a Zeppelin? With the basics for transporting a huge army with provisions while including all the amenities of a first-class ticket?

Write a factory function that creates Zeppelins by composing a "state" object with the mixins from previous exercises "canFlyFn", "canBeLabeledFn" and a new one "canTransportFn". This latter should provide the following API:

 zeppelin.load(mooleen);
 // => The zeppelin is loaded with Mooleen
 zeppelin.load(randalf);
 // => The zeppelin is loaded with Randalf
 zeppelin.showLoad();
 // => The zeppelin is loaded with: Mooleen, Randalf
 let load = zeppelin.unload();
 // => The zeppelin unloads Mooleen and Randalf
 console.log(load)
 // [ "Mooleen", "Randalf" ]

`);

function Zeppelin(name, hp=1000){
  let state = {
    name,
    hp,
    position: {x: 0, y: 0},
    toString(){
      return `Zeppelin "${this.name}"`
    },
    floatsTo(x,y){
      this.position.x = x;
      this.position.y = y;
      console.log(`${this} floats to position ` +
                  `(${this.position.x},${this.position.y})`);
    }
  };
  
  return Object.assign(state,
                       canFlyFn(state),
                       canBeLabeledFn(state, 'Armada', 'a', 'black'),
                       canTransportFn(state))
}

function canTransportFn(state){
  const canTransport = {
    contents: [],
    load(...newContent){
      this.contents.push(...newContent);
      console.log(`${this} is loaded with ${newContent}`);
    },
    showLoad(){
      console.log(`${this} is loaded with: ${this.contents}`);
    },
    unload(){
      console.log(`${this} unloads ${this.contents.join(' and ')}`);
      const contents = [...this.contents];
      this.contents = [];
      return contents;
    }
  };
  
  return Object.assign(state, canTransport);
}

let zeppelin = Zeppelin("HMS Intrepid");
zeppelin.fliesTo(20);
// => Zeppelin "HMS Intrepid" flies to 20 feet above sea level

zeppelin.floatsTo(9, 9);
// => Zeppelin "HMS Intrepid" floats to position (10,10)
myLabeledMap.creatures.push(zeppelin);
console.log(myLabeledMap.paint());
/*
Generating map of companies...
s_________
__________
__d_______
__________
__________
__________
__________
__________
__________
_________a
*/

zeppelin.load(mooleen, redBrute);
// => Zeppelin "HMS Intrepid" is loaded with Mooleen,Red brute
zeppelin.load(randalf);
// => Zeppelin "HMS Intrepid" is loaded with Randalf, the Red
zeppelin.showLoad();
// => Zeppelin "HMS Intrepid" is loaded with: Mooleen,Red brute,Randalf, the Red
zeppelin.unload();
// => Zeppelin "HMS Intrepid" unloads Mooleen and Red brute and Randalf, the Red

randalf.says("And now we're ready");
mooleen.says('Assemble the Army!');
mooleen.says('To the Zeppelin!');

rat.standsOnTwoLegsAndStartsMarching();





























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
    global.redBrute = Character('Red brute');
    
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
        sighs(){ world.log(name + ' sighs'); },
        slicksTheTopOfAFingerAndRaisesItToTheAir(){},
        standsOnTwoLegsAndStartsMarching(){}
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
