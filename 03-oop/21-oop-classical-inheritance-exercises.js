// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/* 
 *
 * JavaScript-mancy - Summoning Fundamentals: 
 * Mimicking Classical Inheritance
 *
 * Exercises!
 *
 */

/* EXERCISES */
narrate("=== Take Advantage of the High Terrain With Archers! ===");
narrate(`
Thanks to Bandalf we have some time to prepare a surprise for this host of angry enemies. Create an army of archers to decimate their ranks from the advantageous position on top of the hills.

Create an 'archer' class that inherits from this minion:

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
        console.log(this + " goes to position (" + this.position.x + "," + this.position.y + ")");
    }
};

Create an 'archer' class that inherits from this minion:

archer.firesArrowTo(redBrute);
// => archer fires arrow to red brute causing 10 damage

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
        console.log(this + " goes to position (" + this.position.x + "," + this.position.y + ")");
    }
};


// archer -> Minion
function Archer(){
  Minion.call(this, 'archer', 100);
}
Archer.prototype = Object.create(Minion.prototype);
Archer.prototype.firesArrowTo = function(target){
  console.log(this + " fires arrow to " + target + " causing 10 damage");
  target.hp -= 10;
}

// red brutes are coming!!
var redBrute = {
  hp: 100,
  toString: function(){ return 'red brute';}
};

mooleen.says("I'm almost ready!!!");

var archer = new Archer();
archer.firesArrowTo(redBrute);
// => archer fires arrow to red brute causing 10 damage

randalf.says("Keep them coming!!");
randalf.says("There are more coming up the hill!");

var anotherArcher = new Archer();
anotherArcher.firesArrowTo(redBrute);
// => archer fires arrow to red brute causing 10 damage





narrate("=== Take Advantage of the High Terrain With Archers! ===");
narrate(`

It looks like your archers have stirred a hornet's nest. A huge column of angry reddish brutes is charging up the hill wielding axes, clubs, humongous double-edged swords. We need to stop their advance before they reach the archers and cut them to pieces. Build a 'Phalanx' unit to form an impenetrable and inhospitable wall with shields and lances.

The Phalax unit should inherit from 'Minion' and have these methods:

phalanx.formsShieldWall();
// => Phalanx adopts the shield wall stance +100 defense (+100 defense per extra unit in the formation)
phalanx.attacksWithLance(redBrute);
// => Phalanx pierces red brute with the sharp end of her lance causing 50 damage

`);

function Phalanx(){
  Minion.call(this, 'Phalanx', 500);
  this.defense = 100;
}
Phalanx.prototype = Object.create(Minion.prototype);
Phalanx.prototype.formsShieldWall = function(){
  console.log("Phalanx adopts the shield wall stance +100 defense (+100 defense per extra unit in the formation)");
  this.defense += 100;
}
Phalanx.prototype.attacksWithLance = function(target){
  console.log(this + " pierces " + target + " with the sharp end of her lance causing 50 damage");
  target.hp -= 50;
}

var phalanx = new Phalanx();
phalanx.formsShieldWall();
// => Phalanx adopts the shield wall stance +100 defense (+100 defense per extra unit in the formation)
phalanx.attacksWithLance(redBrute);
// => Phalanx pierces red brute with the sharp end of her lance causing 50 damage

randalf.says("Excellent! Form a complete wall! More phalanxes");

rat.says("errr... guys?");
narrate(`
A 12 foot tall four-legged horned beast crosses the portal 
into the beach and roars a blood freezing roar. As it walks 
each step makes the earth rumble.
`);
mooleen.says('No phalanx is going to stop that');


narrate("=== Magic Archers for Magic Beasts ===");
narrate(`

Our archers and phalanxes will be no match for that mighty creature from hell. Create a new 'MagicArcher' unit that will be able to enchant and shoot magic arrows at the beast.

The 'MagicArcher' should inherit from the 'Archer' unit and extend its 'firesArrowTo' method. It should also have an 'enchantArrow' method to produce magic arrows.

var fireArrow = magicArcher.enchant('fire', /* magical damage */ 100);
// => Magic archer enchats arrow with fire magic (+100 magical damage)
magicArcher.firesArrowTo(hellBeast, fireArrow);
// => Magic archer fires arrow to hell beast causing 10 damage
//    The arrow is a fire arrow that causes additional 100 magical damage

`);

function MagicArcher(){
  Archer.call(this);
  this.name = 'magic archer';
  this.mana = 100;
}
MagicArcher.prototype = Object.create(Archer.prototype);
MagicArcher.prototype.enchant = function(magicType, magicalDamage) {
  return {
    magicType: magicType,
    magicalDamage: magicalDamage,
    toString: function(){ return magicType + " arrow";}
  };
}
MagicArcher.prototype.firesArrowTo = function(target, arrow){
  Archer.prototype.firesArrowTo.call(this, target);
  console.log('The arrow is a ' + arrow + ' that causes additional ' + arrow.magicalDamage + ' magical damage');
}

var hellBeast = {
  hp: 20000,
  toString: function(){ return 'hell beast';}
};

var magicArcher = new MagicArcher();
var fireArrow = magicArcher.enchant('fire', 500);
// => magic archer fires arrow to hell beast causing 10 damage
magicArcher.firesArrowTo(hellBeast, fireArrow);
// => The arrow is a fire arrow that causes additional 500 magical damage

narrate(` 
As the arrow impacts the beast, it roars in pain and rage
and charges up the hill to be welcomed by a shower of magical
arrows that succeed it slowing it and help the phalanx hold 
it a bay.
`);

mooleen.says('Uff, that was close');
randalf.says('Great job student!');

rat.says('Hate to be the bearer of bad news, but I think ' + 
         'that guy in red just opened two more portals');
mooleen.says('Damn! These spells are to slow to craft, too intricate...');
randalf.says("Let me think...");

randalf.says(`Yes! There's another way, it was discovered in the 
later years. ES6 classes!`);





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
