// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();
/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript for C# Devs
Chapter 13 -  ES6 Maps

*/

/* EXERCISES */
narrate("=== 1. Upload The Maps To Your Familiar ===");
narrate(`It is said that a human can only maintain 7 things in short-term memory and although they can maintain much more in the long-term one, it requires time and we need to save the world in the next chapter before we finish the book.

Familiars are great aid to JavaScript-mancers because not only do they help you perform menial tasks, they also have a innate knack for remembering things. Create a Map to hold Great known locations and give it to your familiar. These locations are in turn stored in a map that looks like this:
`);

// intelligence Archives gathered by Bandalf and Zandalf
let intelligenceArchives = new Map();
intelligenceArchives.set('Great lieutenant', {
  minions: [],
  fortresses: [],
  knownLocations: { /* known locations object */ toString(){ return 'Beach house';}},
  knownWeaknesses: ['Allergy to gluten']
});
intelligenceArchives.set('Great', {
  minions: ['dragon', 'balrog', '400 orcs' ,'12213 goblins'],
  fortresses: ['Tower of doom', 'Cave of calimity','Beach house'],
  knownLocations: { /* known locations object */ toString(){ return 'Ultrasecret base';}},
  knownWeaknesses: ['mild lactose intolerance']
});
intelligenceArchives.set('Sauron', {
  minions: ['immense army'],
  fortresses: ['many fortresses'],
  knownLocations: { /* known locations object */ },
  knownWeaknesses: ['Hyperopia']
});

// Get the keys
let keysThatContainGreat = [...intelligenceArchives.keys()].filter(k => k.includes('Great'));
console.log('Persons of interest: ', keysThatContainGreat);
// Create the new map
let knownLocationsKeyValuePair = keysThatContainGreat
    .map(k => [k, intelligenceArchives.get(k).knownLocations]);
let knownLocations = new Map(knownLocationsKeyValuePair);

for(let [evilDude, location] of knownLocations){
  console.log(`${evilDude} is in ${location}`);
}
// => Great lieutenant is in Beach house
//    Great is in Ultrasecret base

rat.says('Understood chief!')
mooleen.says(`Then it's time to kick some ass!`);






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
    window.rat = Character('Rat');
    
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
