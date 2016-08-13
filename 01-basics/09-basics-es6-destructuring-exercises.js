// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();
/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript for C# Devs
Chapter 09 - Upgrading Your Everyday JavaScript Magic With ES6: Destructuring - Exercises

*/

/* EXERCISES */
narrate("=== 1. You Have One Try Left! ===");
narrate("Use ES6 Destructuring to find out what gort has in his back pocket");

/*
let gort = {
  name: 'Gort',
  title: 'the android', 
  backPocket: 'cucumber'
};
*/
gort.backPocket = 'cucumber';

let {backPocket} = gort;
mooleen.says(`It's a ${backPocket}!!`);
// => Mooleen says: It's a cucumber!!
gort.says('Correct!');
gort.says('What is at the end of this corridor? Turn north? Turn east?');

narrate("=== 2. What is at The End of This Corridor? ===");
narrate("Use ES6 Destructuring to find out what lies beyond at the end of the corridor, then to the north and then to the east. Save the destination in a variable called destiny");

let map = {
  startOfTheCorridor: 'an infinite wall of blackness',
  endOfTheCorridor: {
    north: {
        east: 'A white house, with a boarded front door'
        }
    }
};

let { endOfTheCorridor: { north: { east:destiny }}} = map;
mooleen.says(`It's ${destiny}!!`);
// => It's A white house, with a boarded front door!!

gort.says('Excellent! You are on a streak!');
gort.says('For the last test in this tutorial');
gort.says('What is the name of the second book in this bookshelf?')

/* A bookshelf materializes from thin air */

narrate("=== 3. The Second Book in The BookShelf ===");
narrate("Use ES6 Destructuring to find out which is the second book in the bookshelf:");

let bookshelf = [
  'Dungeons and Dragons 2nd Ed',
  'The Blade Itself',
  'The Silmarillion',
  'Mistborn',
  'The Wheel of Time'];

let [,book,] = bookshelf;
mooleen.says(`The name of the book is ${book}!`);
// => The name of the book is The Blade Itself!

gort.says('Congratulations! You have completed this tutorial!');
gort.says(`Say 'next' to continue or 'try again' to repeat`);

mooleen.says(`I think I'll go with NEXT, thank you very much`);


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
