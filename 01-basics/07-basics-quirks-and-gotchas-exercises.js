// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();
/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript for C# Devs
Chapter 07 - Mysteries of the JavaScript Arcana: JavaScript Quirks and Gotchas Demystified - Exercises

*/

narrate("\
The small group starts walking up the mountain trail slowly. The path becomes narrower and steeper as they gain altitude, the air colder and crispier until it starts snowing. All of the sudden the group is surrounded by a thick mist that removes any sense of time or orientation.\
\
The group continues walking for what feels like an eternity. Suddenly Bandalf stops. This makes Zandalf crash into him, Randalf into Zandalf and Mooleen into Randalf, Zandalf and Bandalf. Ordinarily this wouldn't have been a problem if it weren't for the six sand golems, the crazy monkey, the pterodactyl and the dozen of creatures that were following right behind.\
")

mooleen.says("That was awkward");
bandalf.says("We're here!");

narrate("\
As it by art of magic the mist starts disolving revealing an inmense cavern.\
");

randalf.says("Welcome to The Caves of Infinity, " + 
             "headquarters of the Resistance, last remnant of the High " + 
             "Order of JavaScript-mancy")

/* EXERCISES */
narrate("=== Find The Bug! Get Access to the JavaScript-NomiCon ===");
narrate(" The following piece of code has a bug. Fix the problem and gain access to the oh-so-powerful JavaScript-NomiCon! The most valued treaty of JavaScript-mancy known to men, elves, dwarves and gnomes alike. ");

/* 
function LibraryOfTheHighOrder(){
    this.books = [];
    
    this.summonBooks = function(){
      $.getJSON('https://api.myjson.com/bins/3tp73')
         .then(function updateBooks(books){
            this.books.push(...books);
            // caBOOOOOOM!!!!
            // ERROOOOOORRRR!!!
            // Cannot read property push of undefined
            for(let book of books){
              console.log(book.name + ": " + book.type);
            }
         });
    };
}
var library = new LibraryOfTheHighOrder();
library.summonBooks();
*/

function LibraryOfTheHighOrder(){
    this.books = [];
    
    this.summonBooks = function(){
      $.getJSON('https://api.myjson.com/bins/3tp73')
         .then(function updateBooks(books){
            this.books.push(...books);
            for(let book of books){
              console.log(book.name + ": " + book.type);
            }
         }.bind(this));
    };
}
var library = new LibraryOfTheHighOrder();
library.summonBooks();
// => JavaScript-NomiCon: treaty of the dark and arcane arts of JavaSCript-mancy
//    30 minute meals with Jamie Oliver: comfort food that you can cook at home!
//    Pride and Prejudice: Novel
mooleen.says('Yes! Pride and Prejudice! I love that one!');


narrate("=== ### Protect The Library From Name Collisions! ===");
narrate(" Protect the library from name collisions by creating a new namespace called `javascriptmacy`. ");

(function(javascriptmancy){
  javascriptmancy.LibraryOfTheHighOrder = LibraryOfTheHighOrder;
  
  function LibraryOfTheHighOrder(){
    this.books = [];
    this.summonBooks = function(){
      $.getJSON('https://api.myjson.com/bins/3tp73')
         .then(function updateBooks(books){
            this.books.push(...books);
            for(let book of books){
              console.log(book.name + ": " + book.type);
            }
         }.bind(this));
    };
  }
}(window.javascriptmancy = window.javascriptmancy || {}));
var li = new window.javascriptmancy.LibraryOfTheHighOrder();
console.log(li);
// => LibraryOfTheHighOrder {books: Array[0]}


narrate("=== ### There's a Hard To Detect Bug In This Snippet! Stric Mode To the Rescue! ===");
narrate(" Enable strict mode in this function and find out the error ");

/*
(function(){
  secretBook = 'Diary of Mooleen';
}());
*/
(function(){
  "use strict";
  secretBook = 'diary of mooleen';
  // => Uncaught ReferenceError: secretBook is not defined;
  // We were adding a property to the window object!!! :O
}());



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
