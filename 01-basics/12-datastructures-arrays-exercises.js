// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();
/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript for C# Devs
Chapter 12 - JavaScript Arrays, the All in one data structure

*/

/* EXERCISES */
narrate("=== 1. Let's Go Through All These Boxes ===");
narrate("There's numerous boxes with all kind of things. Use array functions to find wands and put them in yet another box.");

let blueBox = ['feather', 'ring', 'rotten piece of meat', 'wooden stick', 
               {name: 'wand', type: 'wand', power: 10}];
let redBox = [{name: 'bronze sword', type: 'sword', damage: 30},
              {name: 'iron shield', type: 'shield', defense: 20},
              {name: 'battle axe', type: 'wand', power: 150}];
let greenBox = ['bundle of hair that looks suspicious', 
                {name: 'helmet', type: 'helmet', defense: 10},
                {name: 'dark schepter', type: 'wand', power: 100},
                {name: 'firestaff', type: 'wand', power: 120},
                {name: 'vanilla popsicle', type: 'wand', power: 20}];
            
 function getMeWandzSpell(...boxes){
   let wands = [];
   for(let box of boxes){
     for(let item of box){
       if (item.type === 'wand') wands.push(item);
     }
   }
   return wands;
 }
 
 let wands = getMeWandzSpell(blueBox, redBox, greenBox);
 console.log(`${wands.map(w => w.name)}`);
 // => wand,battle axe,dark schepter,firestaff,vanilla popsicle
 
mooleen.says('done!');

narrate("=== 2. Now Perfect it With LINQ... Err... Array.Prototype Methods! ===");
narrate("Use `Array.prototype` methods like `map` and `filter` to perfect the pervious function!");

function getMeWandzSpellWithLINQ(...boxes){
    return boxes
        .reduce((items, box) => [...items, ...box], [])
        .filter(item => item.type === 'wand');
}
 
let wandsLinq = getMeWandzSpellWithLINQ(blueBox, redBox, greenBox);
console.log(`${wandsLinq.map(w => w.name)}`);
// => wand,battle axe,dark schepter,firestaff,vanilla popsicle
 
mooleen.says('Check that out! Much better right?');

narrate("=== 3. Find The Most Powerful Wand! ===");
narrate("Use whichever array method you've found to find the most powerful wand.");

const sortByPower = (wand, anotherWand) => wand.power - anotherWand.power;
const sortByPowerDescending = (wand, anotherWand) => -1 * sortByPower(wand, anotherWand);

function findTheMostPowerfulWand(wands){
    const sortedWands = wands.sort(sortByPowerDescending);
    const [mostPowerfulWand] = sortedWands;
    return mostPowerfulWand;
}

let mooleensWand = findTheMostPowerfulWand(wands);
console.log(`Behold Mooleen, this is your wand! The ${mooleensWand.name}!!!!`);
// => Behold Mooleen, this is your wand! The battle axe!!!!

mooleen.says('Yeeeees!!!!');
randalf.says("I so didn't see this coming");
mooleen.says('I knew it! It was meant to be!');

randalf.says('All right, all right. Now you are ready!');
mooleen.says('To find my way home?');

randalf.says('No! To save Asturi!');






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
    window.bandalf = Character('Bandalf');
    window.zandalf = Character('Zandalf');
    window.gort = Character('Gort');
    
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
