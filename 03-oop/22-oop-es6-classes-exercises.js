// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/* 
 *
 * JavaScript-mancy - White Tower Summoning Enhanced: 
 * The Marvels of ES6 Classes
 *
 * Exercises!
 *
 */

/* EXERCISES */
narrate("=== Take Advantage of the High Terrain With Archers! ===");
narrate(` Quick! There's seconds separating us from the netherworld. Create a SandGolem class that inherits from the same Minion from the previous chapter
  
 function Minion(name, hp){
   this.name = name;
   this.hp = hp;
   this.position = {x: 0, y: 0};
 }
 Minion.prototype = {
   constructor: Minion,
   toString: function(){
     return this.name;
   },
   goesTo: function (x, y){ 
     console.log(this + " goes to position (" + 
       this.position.x + "," + this.position.y + ")");
   }
 };

 The SandGolem should have two methods bash and absorb the first one to bash enemies heads and the second one to stop them in their tracks by absorbing their attacks inside its body of sand.

 sandGolem.bash(redBrute);
 // => Sand golem bashes red brute with 
 //    terrible force causing 30 damage
 sandGolem.absorb(redBrute);
 // => Sand golem absorbs red brute into its body of sand.
 //    The red brute can't move
`);

 function Minion(name, hp){
   this.name = name;
   this.hp = hp;
   this.position = {x: 0, y: 0};
 }
 Minion.prototype = {
   constructor: Minion,
   toString: function(){
     return this.name;
   },
   goesTo: function (x, y){ 
     this.position.x = x;
     this.position.y = y;
     console.log(this + " goes to position (" + 
       this.position.x + "," + this.position.y + ")");
   }
 };

var redBrute = {hp:100, toString(){ return 'red brute';}};


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

const sandGolem = new SandGolem();
sandGolem.goesTo(1, 1)
// => sand golem goes to position (1,1)
sandGolem.bash(redBrute);
// => sand golem bashes red brute with terrible force causing 30 damage
sandGolem.absorb(redBrute);
// => Sand golem absorbs red brute into its body. The red brute can't move


mooleen.says('Aha! Look how I combined the sand golem' + 
             'with my old Minion!');
rat.says('Majestic!');
randalf.says("And it looks like it's working to stop " + 
             "the tide of barbarians! Awesome!");

mooleen.says("And now for the final number... GIANTS!!");


narrate(` === GIANTS!!!! ===
 
 Let's deliver our last blow to this army of red barbarians. Create a SandGiant that extends the SandGolem with two new methods: A bash method that destroys enemies and a stomp method that makes the earth shake.

 {lang="javascript"}
 ~~~~~~~~
 sandGiant.bash(redBrute);
 // => Sand giant bashes red brute and turns it into a pulp
 sandGiant.stomp();
 // => Sand giant stomps the ground in fury. The earth 
 /     shakes stopping everyone around the giant.
 ~~~~~~~~

`);

class SandGiant extends SandGolem {
 constructor(name='Sand giant', hp=9999){
   super(name, hp)
 } 
 bash(target){
   console.log(`${this} bashes ${target} and turns it into a pulp`);
   target.hp = 0;
 }
 stomp(){
   console.log(`${this} stomps the ground in fury. The earth shakes stopping everyone around the giant.`);
 }
}

const sandGiant = new SandGiant();
sandGiant.goesTo(2,2);
// => Sand giant goes to position (2,2)
sandGiant.bash(redBrute);
// => Sand giant bashes red brute and turns it into a pulp
sandGiant.stomp();
// => Sand giant stomps the ground in fury. The earth shakes stopping everyone around the giant.

/*

The sudden appearance of the sand giants turns the
battlefield into chaos. The brute army tries to
rally and mount an attack but they are overwhelmed.

One by one the portals start fading and disappear.

*/

mooleen.says('Enemies! Tremble upon my wrath!');
rat.says('moahahaha');
randalf.says('moahahaha');
mooleen.says('moahahaha');
bandalf.says('moahahaha');

mooleen.says('Wait, where have you been all this time?');
bandalf.says("I was entertaining the red wizard, in an" +
             " epic insult sword fighting");
mooleen.says("Insult sword fighting that sounds vaguely familiar...");











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
