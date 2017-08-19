// start world to enable characters
var world = startWorld();
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
var MagicElement;
(function (MagicElement) {
    MagicElement["Fire"] = "fire";
    MagicElement["Water"] = "water";
    MagicElement["Earth"] = "earth";
    MagicElement["Air"] = "windy air";
    MagicElement["Stone"] = "hard stone";
    MagicElement["Ice"] = "frozen ice";
})(MagicElement || (MagicElement = {}));
var Wall = (function () {
    function Wall(element, specs) {
        this.element = element;
        this.specs = specs;
    }
    Wall.prototype.toString = function () {
        return "A wall of " + this.element + ". It appears to be about " +
            (this.specs.height + " feet high and extends for what ") +
            ("looks like " + this.specs.length + " feet.");
    };
    return Wall;
}());
var iceWall = new Wall(MagicElement.Ice, {
    height: 100,
    depth: 7,
    length: 700
});
console.log(iceWall.toString());
// => A wall of frozen ice. It appears to be about 100 feet high
//    and extends for what looks like 700 feet long.
// iceWall.element = MagicElement.Fire;
// => [ts] Cannot assign to 'element' because it is a constant or a read-only property.
// iceWall.wallOptions.height = 100;
// => [ts] Cannot assign to 'height' because it is a constant or a read-only property.
world.randalf.gapes();
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
var DamageType;
(function (DamageType) {
    DamageType[DamageType["Physical"] = 0] = "Physical";
    DamageType[DamageType["Ice"] = 1] = "Ice";
    DamageType[DamageType["Fire"] = 2] = "Fire";
    DamageType[DamageType["Poison"] = 3] = "Poison";
})(DamageType || (DamageType = {}));
function frost(target, mana) {
    // from the example looks like damage 
    // can be calculated based on mana
    var damage = mana * 100;
    console.log("The air surrounding the target starts quickly forming a " +
        "frozen halo as the water particles start congealing. " +
        "All of the sudden it explodes into freezing ice crystals " +
        ("around the " + target.toString() + "."));
    target.takeDamage(DamageType.Ice, damage);
}
console.log('A giant lizard leaps inside the wall!');
var giantLizard = world.getLizard();
world.mooleen.says('And that is as far as you go');
frost(giantLizard, /* mana */ 2);
// => 
/* world :) */
/**** World interface *****/
function createWorld() {
    var world = createWorldAPI(console);
    return world;
    // *** World/Logger code ***
    function createWorldAPI(console) {
        var logFn = console.log, errorFn = console.error, infoFn = console.info;
        return {
            log: function log() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var message = formatLogMessage.apply(this, args);
                logFn.apply(console, args);
                addWorldEvent(message);
            },
            error: function error() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var message = formatLogMessage.apply(this, arguments);
                errorFn.apply(console, args);
                addWorldEvent(message, 'error');
            },
            info: function info() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var message = formatLogMessage.apply(this, arguments);
                infoFn.apply(console, args);
                addWorldEvent(message, 'info');
            },
            spell: function spell() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var message = formatLogMessage.apply(this, arguments);
                logFn.apply(console, args);
                addWorldEvent(message, 'spell');
            },
            narrate: narrate
        };
        function formatLogMessage() {
            var args = Array.prototype.slice.call(arguments), message = args.reduce(function (acc, item) {
                if (item instanceof Array) {
                    item = "[" + item.map(function (i) { return i.toString(); }).join(', ') + "]";
                }
                else if (item instanceof Function) {
                    item = item.toString();
                }
                else if (typeof item === 'symbol') {
                    item = item.toString();
                }
                return acc + item;
            }, "");
            return message;
        }
        function addWorldEvent(message, type) {
            if (type === void 0) { type = 'event'; }
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
function startWorld() {
    /**** load logging ****/
    var world = createWorld();
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
    function weaveSpell(spell) {
        eval(spell);
    }
    function Character(name) {
        var character = {
            name: name,
            says: function (msg) { world.log(name + ' says: ' + msg + '\n\n'); },
            weaves: function (spell) {
                world.spell(name + ' starts weaving a spell!');
                world.spell('***' + spell + '***');
                eval(spell);
            },
            toString: function () { return this.name; },
            giggles: function () { world.log(name + ' giggles'); },
            gapes: function () { world.log(name + ' gapes'); },
            sighs: function () { world.log(name + ' sighs'); },
            slicksTheTopOfAFingerAndRaisesItToTheAir: function () { },
            shrugs: function () { world.log(name + ' shrugs'); },
            standsOnTwoLegsAndStartsMarching: function () { },
            laughs: function () { world.log(name + ' laughs'); },
            breathesASighOfRelieve: function () { world.log(name + ' breathes a sigh of relieve'); },
            smilesWithJoy: function () { world.log(name + ' smiles with joy'); },
            laughsWithGlee: function () { world.log(name + ' laughs with glee'); },
            pauses: function () { world.log(name + ' pauses'); },
            shouts: function (msg) { world.log(name + " shouts: ***" + msg.toUpperCase() + "***"); }
        };
        character.stomach = { says: function (msg) { return world.log(name + " stomach: " + msg); } };
        return character;
    }
    return world;
}
function narrate() {
    console.info.apply(console, arguments);
}
function GiantLizard() {
    return {
        hitPoints: 200,
        jumps: function () {
            console.log("The giant lizard gathers strength in its 4 limbs and takes a leap through the air.");
        },
        attacks: function (target) {
            console.log("The giant lizard attacks " + target + " with great fury.");
        },
        breathesFire: function (target) {
            console.log("The giant lizard opens his jaws unnaturally wide takes a breath and breathes a torrent of flames towards " + target.toString());
        },
        takeDamage: function (damageType, damage) {
            var actualDamage = damage;
            if (DamageType.Physical) {
                console.log("The giant lizard has extremely hard scales" +
                    "that protect it from physical attacks (Damage 50%)");
                actualDamage = damage / 2;
            }
            else if (DamageType.Ice) {
                console.log("The giant lizard is very sensitive to cold." +
                    "It wails and screams. (Damage 200%)");
                actualDamage = damage * 2;
            }
            else {
                console.log("The giant lizard has extremely hard scales" +
                    "that protect it from physical attacks (Damage 50%)");
            }
            console.log("You damage the giant lizard (-" + actualDamage + "hp)");
            this.hitPoints -= actualDamage;
            if (giantLizard.hitPoints <= 0) {
                console.log(this + " dies.");
            }
        },
        toString: function () { return 'giant lizard'; }
    };
}
function getLizard() {
    return GiantLizard();
}
