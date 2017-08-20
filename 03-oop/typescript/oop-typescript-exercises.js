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
    DamageType["Physical"] = "Physical";
    DamageType["Ice"] = "Ice";
    DamageType["Fire"] = "Fire";
    DamageType["Poison"] = "Poison";
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
// => The air surrounding the target starts quickly forming a 
//    frozen halo as the water particles start congealing. 
//    All of the sudden it explodes into freezing ice crystals 
//    around the giant lizard.
//    The giant lizard is very sensitive to cold.
//    It wails and screams. (Damage 200%)
//    You damage the giant lizard (-400hp)
//    The giant lizard dies.
world.mooleen.laughsWithGlee();
// => Mooleen laughs with Glee
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
world.rat.says("And I bet you'd want to ride on my back" +
    "I'm not putting up with that");
console.log("=== 3) Wholesale Destruction! ===");
/*
Killing the beasts one by one won't cut it. We need a more powerful spell that can annihilate them in groups. Design an `iceCone` spell that can impact several targets at once.

It should fulfill the following snippet of code:

{lang="javascript"}
~~~~~~~~
iceCone(lizard, smallerLizard, greaterLizard);
// => Cold ice crystals explode from the palm of your hand
//    and impact the lizard, smallerLizard, greaterLizard.
//    The lizard is very sensitive to cold.
//    It wails and screams. (Damage 200%)
//    You damage the giant lizard (-500hp)
//    The smaller lizard is very sensitive to cold.
//    It wails and screams. (Damage 200%)
//    You damage the giant lizard (-500hp)
//    etc...
~~~~~~~~

Hint: you can use rest parameters and array type annotations!
*/
function iceCone() {
    var targets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        targets[_i] = arguments[_i];
    }
    var damage = 500;
    console.log("\nCold ice crystals explode from the palm of your hand\nand impact the " + targets.join(', ') + ".");
    for (var _a = 0, targets_1 = targets; _a < targets_1.length; _a++) {
        var target = targets_1[_a];
        target.takeDamage(DamageType.Ice, damage);
    }
}
iceCone(getLizard(), getLizard(), getLizard());
// => Cold ice crystals explode from the palm of your hand
// and impact the giant lizard, giant lizard, giant lizard.
// The giant lizard is very sensitive to cold.
// It wails and screams. (Damage 200%)
// You damage the giant lizard (-1000hp)
// The giant lizard dies.
// The giant lizard is very sensitive to cold.
// It wails and screams. (Damage 200%)
// You damage the giant lizard (-1000hp)
// The giant lizard dies.
// The giant lizard is very sensitive to cold.
// It wails and screams. (Damage 200%)
// You damage the giant lizard (-1000hp)
// The giant lizard dies.
world.mooleen.says('Yes!');
/*
Mooleen looks around. She's fending off the lizards fine but
her companions are having some problems.

Red is deadly with the lance and shield but his lance,
in spite of of his massive strength, hardly penetrates
the lizards' thick skin.

Bandalf is slowly catching up and crafting ice spells
and Randalf, though, a master with the quarterstaff can
barely fend off the attacks from a extremely huge lizard.

Things start to look grimmer and grimmer as more lizards jump over
the wall around the obelisk.
*/
world.mooleen.says('I need to do something quick');
console.log("=== 4) Empower Your Companions with Enchantments! ===");
/*
Things are looking grim. Your only chance is to empower your companions so that you can offer a strong united front against the growing host of enemies. Craft an `enchant` spell that can enchant weapons and armor with elemental properties.

The `enchant` spell should satisfy the following snippet of code:

{lang="javascript"}
~~~~~~~~
quarterstaff.stats();
// => Name: Crimson Quarterstaff
// => Damage Type: Physical
// => Damage: d20
// => Bonus: +20
// => Description: A quarterstaff of pure red

enchant(quarterstaff, MagicElement.Ice);
// => You enchant the Crimson Quarterstaff with a frozen ice incantation
//    The weapon gains Ice damage and +20 bonus damage

quarterstaff.stats();
// => Name: Crimson Quarterstaff
// => Damage Type: Ice
// => Damage: d20
// => Bonus: +40

cloak.stats();
// => Name: Crimson Cloak
// => Type: cloak
// => Protection: 20
// => ElementalProtection: none
// => Description: A cloak of pure red

enchant(cloak, MagicElement.Fire);
// => You enchant the Crimson Cloak with a fire incantation
//    The Crimson Cloak gains +20 fire protection

cloak.stats();
// => Name: Crimson Cloak
// => Type: cloak
// => Protection: 20
// => ElementalProtection: Fire (+20)
// => Description: A cloak of pure red
~~~~~~~~

Hint: Use union types and type guards within the `enchant` spell to allow it to enchant both `Weapon` and `Armor`
*/
var Weapon = (function () {
    function Weapon(name, damageType, damage, bonusDamage, description) {
        this.name = name;
        this.damageType = damageType;
        this.damage = damage;
        this.bonusDamage = bonusDamage;
        this.description = description;
    }
    Weapon.prototype.stats = function () {
        return "\nName: " + this.name + "\nDamage Type: " + this.damageType + "\nDamage: d" + this.damage + "\nBonus: +" + this.bonusDamage + "\nDescription: " + this.description + "\n        ";
    };
    Weapon.prototype.toString = function () { return this.name; };
    return Weapon;
}());
var ArmorType;
(function (ArmorType) {
    ArmorType["Cloak"] = "cloak";
    ArmorType["Platemail"] = "plate mail";
})(ArmorType || (ArmorType = {}));
var Armor = (function () {
    function Armor(name, type, protection, description) {
        this.name = name;
        this.type = type;
        this.protection = protection;
        this.description = description;
        this.elementalProtection = [];
    }
    Armor.prototype.stats = function () {
        return "\nName: " + this.name + "\nType: " + this.type + "\nProtection: " + this.protection + "\nElementalProtection: " + (this.elementalProtection.join(', ') || 'none') + "\nDescription: " + this.description + "\n        ";
    };
    Armor.prototype.toString = function () { return this.name; };
    return Armor;
}());
function enchant(item, element) {
    console.log("You enchant the " + item + " with a " + element + " incantation");
    if (item instanceof Weapon) {
        enchantWeapon(item, element);
    }
    else {
        enchantArmor(item, element);
    }
    function enchantWeapon(weapon, element) {
        var bonusDamage = 20;
        weapon.damageType = mapMagicElementToDamage(element);
        weapon.bonusDamage += bonusDamage;
        console.log("The " + item + " gains " + bonusDamage + " " + weapon.damageType + " damage");
    }
    function enchantArmor(armor, element) {
        var elementalProtection = {
            damageType: mapMagicElementToDamage(element),
            protection: 20,
            toString: function () { return this.damageType + " (+" + this.protection + ")"; }
        };
        armor.elementalProtection.push(elementalProtection);
        console.log("the " + item + " gains " + elementalProtection.protection + " " + elementalProtection.damageType + " incantation");
    }
}
function mapMagicElementToDamage(element) {
    switch (element) {
        case MagicElement.Ice: return DamageType.Ice;
        case MagicElement.Fire: return DamageType.Fire;
        default: return DamageType.Physical;
    }
}
var quarterstaff = getQuarterstaff();
console.log(quarterstaff.stats());
// => Name: Crimson Quarterstaff
//    Damage Type: Physical
//    Damage: d20
//    Bonus: +20
//    Description: A quarterstaff of pure red
enchant(quarterstaff, MagicElement.Ice);
// => You enchant the Crimson Quarterstaff with a frozen ice incantation
//    The Crimson Quarterstaff gains 20 Ice damage
console.log(quarterstaff.stats());
// Name: Crimson Quarterstaff
// Damage Type: Ice
// Damage: d20
// Bonus: +40
// Description: A quarterstaff of pure red
var cloak = getCloak();
console.log(cloak.stats());
// Name: Crimson Cloak
// Type: cloak
// Protection: 20
// ElementalProtection: none
// Description: A cloak of pure red
enchant(cloak, MagicElement.Fire);
// You enchant the Crimson Cloak with a fire incantation
// the Crimson Cloak gains 20 Fire incantation
console.log(cloak.stats());
// Name: Crimson Cloak
// Type: cloak
// Protection: 20
// ElementalProtection: Fire (+20)
// Description: A cloak of pure red
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
                console.log("The " + this + " dies.");
            }
        },
        toString: function () { return 'giant lizard'; }
    };
}
function getLizard() {
    return GiantLizard();
}
function getQuarterstaff() {
    return new Weapon('Crimson Quarterstaff', DamageType.Physical, 20, 20, 'A quarterstaff of pure red');
}
function getCloak() {
    return new Armor('Crimson Cloak', ArmorType.Cloak, 20, 'A cloak of pure red');
}
