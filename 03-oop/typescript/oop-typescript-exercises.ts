// start world to enable characters
let world = startWorld();

console.log("=== 1) Earn Some Time! A wall of ice! ===");
/* 
The beasts are quickly approaching, gain some breathing room 
by erecting an ice wall between them and the group. The wall 
should be at least `100` feet high, `7` feet deep and `700`
feet long to be able to surround the group.

The Wall should satisfy the following snippet:

{lang="javascript"}
~~~~~~~~
const iceWall = new Wall(MagicElement.Ice, {
                          height: 100,
                          depth: 7, 
                          length: 700});

console.log(iceWall.toString());
// => A wall of frozen ice. It appears to be about 100 feet high
//    and extends for what looks like 700 feet.

iceWall.element = MagicElement.Fire;
// => [ts] Cannot assign to 'element' because it is 
//         a constant or a read-only property.
iceWall.wallOptions.height = 100;
// => [ts] Cannot assign to 'height' because it is 
//         a constant or a read-only property.
~~~~~~~~

Hint: You can use an enum to represent the `MagicElement`, 
an interface to represent the `WallSpecifications` and a class 
for the `Wall` itself. Remember to add type annotations!
*/

enum MagicElement {
    Fire = "fire",
    Water = "water",
    Earth = "earth",
    Air = "windy air",
    Stone = "hard stone",
    Ice = "frozen ice"
}

interface WallSpecs{
    readonly height: number,
    readonly depth: number,
    readonly length: number
}

class Wall {
    constructor(readonly element: MagicElement, 
                readonly specs: WallSpecs){ }

    toString(){
        return `A wall of ${this.element}. It appears to be about ` +
               `${this.specs.height} feet high and extends for what ` +
               `looks like ${this.specs.length} feet.`;
    }
}

const iceWall = new Wall(MagicElement.Ice, {
                          height: 100,
                          depth: 7, 
                          length: 700});

console.log(iceWall.toString());
// => A wall of frozen ice. It appears to be about 100 feet high
//    and extends for what looks like 700 feet long.

// iceWall.element = MagicElement.Fire;
// => [ts] Cannot assign to 'element' because it is a constant or a read-only property.
// iceWall.wallOptions.height = 100;
// => [ts] Cannot assign to 'height' because it is a constant or a read-only property.

world.randalf.gapes()
// => Randalf gapes

world.randalf.says('How?');
world.mooleen.says('I just remembered...');

world.randalf.says('Remember?');
world.randalf.says("You look very young for being a milenia old");

world.mooleen.shrugs();
// => Moleen shrugs
world.mooleen.says("Brace yourselves... they're coming " + 
  "beware if they open their jaws and seem to catch breath " +
  "they breathe fire");


console.log("=== 2) Freeze The Lizards! ===");

/* 

You've earned some time. Now you can take this breather to observe the lizards, model them appropriately and craft a `frost` spell that will send them to the lizard frozen hell.

This is what you can observe:

{lang="javascript"}
~~~~~~~~
giantLizard.jumps();
// => The giant lizard gathers strength in its 
//    4 limbs and takes a leap through the air
giantLizard.attacks(red);
// => The giant lizard attacks Red with great fury
giantLizard.breathesFire(red);
// => The giant lizard opens his jaws unnaturally wide
//    takes a breath and breathes a torrent of flames
//    towards Red
giantLizard.takeDamage(Damage.Physical, 20);
// => The giant lizard has extremely hard scales
//    that protect it from physical attacks (Damage 50%)
//    You damage the giant lizard (-10hp)
giantLizard.takeDamage(Damage.Cold, 20);
// => The giant lizard is very sensitive to cold.
//    It wails and screams. (Damage 200%)
//    You damage the giant lizard (-40hp)
~~~~~~~~

Create a `frost` spell that fulfills this snippet:

{lang="javascript"}
~~~~~~~~
frost(giantLizard, 10);
// => The air surrounding the target starts quickly forming a
//    frozen halo as the water particles start congealing.
//    All of the sudden it explodes into freezing ice crystals
//    around the giant lizard.
//    The giant lizard is very sensitive to cold.
//    It wails and screams. (Damage 200%)
//    You damage the giant lizard (-2000hp)
~~~~~~~~

Hint: Create a interface using the observations above and use that new type in your `frost` function. Reflect about the required contract to cause damage on an enemy.
*/

enum DamageType {
    Physical,
    Ice,
    Fire,
    Poison
}

// We only need an interface that
// describes something that can be damaged
interface Damageable{
    takeDamage(damageType: DamageType, damage: number);
}

function frost(target: Damageable, mana: number){
    // from the example looks like damage 
    // can be calculated based on mana
    const damage = mana * 100;
    console.log(
      `The air surrounding the target starts quickly forming a ` + 
      `frozen halo as the water particles start congealing. ` +
      `All of the sudden it explodes into freezing ice crystals ` +
      `around the ${target.toString()}.`);
    target.takeDamage(DamageType.Ice, damage);
}

console.log('A giant lizard leaps inside the wall!');
const giantLizard = world.getLizard();

world.mooleen.says('And that is as far as you go');

frost(giantLizard, /* mana */ 2);
// => The air surrounding the target starts quickly forming a 
//    frozen halo as the water particles start congealing. 
//    All of the sudden it explodes into freezing ice crystals 
//    around the giant lizard.
//    The giant lizard is very sensitive to cold.
//    It wails and screams. (Damage 200%)
//    You damage the giant lizard (-400hp)
//    The giant lizard dies.

world.moleen.laughsWithGlee();
// => Moleen laughs with Glee

/* 
More and more lizards make it into the fortified area.
Mooleen, Red, randalf and bandalf form a semicircle against
the obsidian obelisk and fight fiercely for every inch.
When the lizards are about to overwhelm the group a huge furry
figure flashes in front of them charging through the lizard 
front line and causing enough damage to let the company regroup.
*/

world.mooleen.says('What?');
world.rat.says('Happy to serve!');

world.mooleen.says('You can do that?!');
world.rat.says('Err... we familiars are very flexible creatures');

world.mooleen.says("Why didn't you say it before?");
world.rat.says("Oh... the transformation is incredibly painful");
world.rat.says("And I bet you'd want to ride me" + 
    "I'm not putting up with that");


console.log("=== 3) Freeze The Lizards! ===");










/* world :) */

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
            log: function log(...args){
                var message = formatLogMessage.apply(this, args);
                logFn.apply(console, args);
                addWorldEvent(message);
            },
            error: function error(...args){
                var message = formatLogMessage.apply(this, arguments);
                errorFn.apply(console, args);
                addWorldEvent(message, 'error');
            },
            info: function info(...args){
                var message = formatLogMessage.apply(this, arguments);
                infoFn.apply(console, args);
                addWorldEvent(message, 'info');
            },
            spell: function spell(...args){
                var message = formatLogMessage.apply(this, arguments);
                logFn.apply(console, args);
                addWorldEvent(message, 'spell');
            },
            narrate
        };
        
        function formatLogMessage(){
            var args = Array.prototype.slice.call(arguments), 
                message = args.reduce(function(acc, item){
                    if (item instanceof Array){
                        item = "[" + item.map(i => i.toString()).join(', ') + "]";
                    } else if (item instanceof Function) {
                        item = item.toString();
                    } else if (typeof item === 'symbol') {
                        item = item.toString();
                    }
                    return acc + item;
                }, "");
                    
            return message;
        }           
        
        function addWorldEvent(message, type='event'){
            /*
            var theWorld = document.getElementById("theWorld"),
                span = document.createElement('span');
            span.className = 'world world-' + type;
            span.innerHTML = message;
            theWorld.appendChild(span);
            */
        }
    }
}


function startWorld(){
    /**** load logging ****/
    let world:any = createWorld();
    // hijack logs
    console.log = world.log;
    console.info = world.info;
    console.error = world.error;
    
    /**** characters *****/
    world.mooleen = Character('Mooleen');
    world.randalf = Character('Randalf, the Red');
    world.great = Character('Great');
    world.bandalf = Character('Bandalf');
    world.zandalf = Character('Zandalf');
    world.gort = Character('Gort');
    world.rat = Character('Rat');
    world.redBrute = Character('Red brute');
    world.red = Character('Red');
    world.getLizard = getLizard;
    
    function weaveSpell(spell){
        eval(spell);
    }
    function Character(name){
      var character: any = {
        name,
        says: function(msg){ world.log(name + ' says: ' + msg + '\n\n');},
        weaves: function(spell){ 
            world.spell(name + ' starts weaving a spell!'); 
            world.spell('***' + spell + '***');
            eval(spell); 
        },
        toString(){return this.name;},
        giggles(){ world.log(name + ' giggles');},
        gapes(){ world.log(name + ' gapes');},
        sighs(){ world.log(name + ' sighs'); },
        slicksTheTopOfAFingerAndRaisesItToTheAir(){},
        shrugs() { world.log(name + ' shrugs');},
        standsOnTwoLegsAndStartsMarching(){},
        laughs(){ world.log(name + ' laughs');},
        breathesASighOfRelieve(){ world.log(name + ' breathes a sigh of relieve');},
        smilesWithJoy(){ world.log(name + ' smiles with joy');},
        laughsWithGlee(){ world.log(name + ' laughs with glee');},
        pauses(){ world.log(name + ' pauses');},
        shouts(msg){ world.log(`${name} shouts: ***${msg.toUpperCase()}***`);}
      };
      character.stomach = {says: (msg) => world.log(`${name} stomach: ${msg}`)};
      return character;
    }
    return world;
}

function narrate(){
    console.info.apply(console, arguments);
}

function GiantLizard() {
    return {
        hitPoints: 200,
        jumps(){
            console.log(`The giant lizard gathers strength in its 4 limbs and takes a leap through the air.`);
        },
        attacks(target){
            console.log(`The giant lizard attacks ${target} with great fury.`);
        },
        breathesFire(target){
            console.log(`The giant lizard opens his jaws unnaturally wide takes a breath and breathes a torrent of flames towards ${target.toString()}`);
        },
        takeDamage(damageType:DamageType, damage: number){
            let actualDamage = damage;
            if (DamageType.Physical) {
                console.log(`The giant lizard has extremely hard scales` +
                `that protect it from physical attacks (Damage 50%)`);
                actualDamage = damage/2;
            } else if (DamageType.Ice) {
                console.log(`The giant lizard is very sensitive to cold.` +
                    `It wails and screams. (Damage 200%)`);
                actualDamage = damage*2;
            } else {
                console.log(
                `The giant lizard has extremely hard scales` +
                `that protect it from physical attacks (Damage 50%)`);
            }
            console.log(`You damage the giant lizard (-${actualDamage}hp)`);
            this.hitPoints -= actualDamage;

            if (giantLizard.hitPoints <= 0){
                console.log(`The ${this} dies.`);
            }
        },
        toString() { return 'giant lizard';}
    }
}

function getLizard() {
    return GiantLizard();
}