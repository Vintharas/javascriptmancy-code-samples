// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();
/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript for C# Devs
Chapter 08 - A Guide to Strings, Finding the Right Words and Proper Spell Intonation - Exercises

*/

/* EXERCISES */
narrate("=== Word Barrage! ===");
narrate("Create a multiline string (a string that spans several lines) in three different ways. ");

let magicWords1 = "Roses are grey, " +
"Violets are grey, " + 
"I'm a dog";

let magicWords2 =  "Roses are grey,\
Violets are grey,\
I'm a dog";

// this keeps whitespace
let magicWords3 = `Roses are grey,
Violets are grey,
I'm a dog`;

narrate("=== Rack Your Brains! ===");
narrate("Mooleen has no idea what the magic words could be so she starts thinking, and reflecting, racking her brains for a long, long time. Write a function that fulfills the following snippet using ES5:");

/*
rackBrains(12);
// => mooleen racks her brains for 12 long minutes
*/

function rackBrains(minutes){
  console.log('Mooleen racks her brain for ' + minutes + ' long minutes');
}
rackBrains(12);
// => Mooleen racks her brain for 12 long minutes

narrate("=== Rack Your Brains With ES6! ===");
narrate("Update the `rackBrains` function to use ES6 template literals.");

function rackBrainsES6(minutes){
  console.log(`Mooleen racks her brain for ${minutes} long minutes`);
}
rackBrainsES6(12);
// => Mooleen racks her brain for 12 long minutes

narrate("=== ### Create The Moolen DSL with Tags! ===");
narrate("Use tags to create a Mooleen Domain Specific Language. It should work like this:");

/*
console.log(rackBrains`for 15 minutes`);
// => mooleen racks her brains for 12 long minutes
console.log(says`what is going on?`);
// => mooleen says: "What is going on?"
*/

function rackBrains(literals, ...substitutions){
  
  let phrase = literals[0];
  substitutions.forEach(function(s, idx){
    phrase += `${s}${literals[idx+1]}`
  });
  
  return `Mooleen racks her brains ${phrase}`;
}

function says(literals, ...substitutions){ 
  let phrase = literals[0];
  substitutions.forEach(function(s, idx){
    phrase += `${s}${literals[idx+1]}`
  });
  return `Mooleen says: ${phrase}`;
}

console.log(rackBrains`for 15 minutes`);
// => mooleen racks her brains for 12 long minutes
console.log(says`what is going on?`);
// => mooleen says: "What is going on?"

narrate("Count the Ocurrences!")
narrate("Create a `count` function that counts the ocurrence of a piece of text in a string.")

function count(phrase, text){
  return phrase.match(new RegExp(text, 'g')).length;
}
let phrase = "in this city, in this land, there's no place for you";
let inCount = count(phrase, "in");
console.log(`There are ${inCount} 'in' in the phrase`);
// => 


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
