'use strict'
// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript for C# Devs
Chapter 05 - The Basics of JavaScript Functions - Function Overloading

*/

randalf.sighs();
randalf.says("it didn't last long at all");
randalf.says("You know? Not everyone could tap into the power of the REPL...");

randalf.says(`
Only a few could harness it. And some of them, some of them were crooked, either
that or they just couldn't handle the power.

Before Branden could do anything about it, they shattered the world, enslaved the normals, herded and annihilated those of us who opposed them and that's the state of things. 

We are governed by a bunch of egocentric megalomaniac mad men and women.
`);


mooleen.says("How is it that you're still here then?");
randalf.says("Well they did something worse to me. They took it");

mooleen.says("You cannot cast spells any more?");
randalf.says("I cannot. But I do remember everything");
randalf.says("Talking about knowledge. " + 
             "Have you heard about the marvels of overloading?");


console.log("============ Function Overloading in JS ===============\n\n")

console.log("============ The Problem With Function Overloading ======\n")
// One does not simply overload functions in JavaScript willy nilly
function raiseSkeleton(){
    console.log('You raise a skeleton!!!');
}

function raiseSkeleton(mana){
    console.log('You raise ' + mana + ' skeletons!!!');
}

raiseSkeleton();
// => You raise undefined skeletons!!!
// functions get overwritten if you declare them multiple times, even if they have different signatures


console.log("\n\n====== Function overloading by inspecting arguments ======\n")
// Instead
// #1 you can do argument checking, which sucks
// - less readable and maintainable
function raiseSkeletonWithArgumentInspecting(){
    if (typeof arguments[0] === "number"){
        raiseSkeletonsInNumber(arguments[0]);
    } else if (typeof arguments[0] === "string") {
        raiseSkeletonCreature(arguments[0]);
    } else {
        console.log('raise a skeleton');
    }
    
    function raiseSkeletonsInNumber(n){
        console.log('raise ' + n + ' skeletons');
    }
    function raiseSkeletonCreature(creature){
        console.log('raise a skeleton ' + creature);
    };
}

raiseSkeletonWithArgumentInspecting();
// => raise a skeleton
raiseSkeletonWithArgumentInspecting(4);
// => raise 4 skeletons
raiseSkeletonWithArgumentInspecting('king');
// => raise skeleton king


console.log("\n\n====== Function 'overloading' by using options object ======\n")
// #2 or use an object to wrap parameters with rules
// - it gives you named arguments
// - and painless extension if more arguments are required 
function raiseSkeletonWithOptions(spellOptions){
    spellOptions = spellOptions || {};
    var armySize = spellOptions.armySize || 1,
        creatureType = spellOptions.creatureType || '';
    
    if (creatureType){
        console.log('raise a skeleton ' + creatureType);
    } else {
        console.log('raise ' + armySize + ' skeletons ' + creatureType);
    }

}

raiseSkeletonWithOptions();
// => raise a skeleton
raiseSkeletonWithOptions({armySize: 4});
// => raise 4 skeletons
raiseSkeletonWithOptions({creatureType:'king'});
// => raise skeleton kin


function myLogger(){
    return {
        startLogging: function(){
            console.log = createToHTMLLogger(console.log);
        }
    };
    // *** Logger code ***
    function createToHTMLLogger(logFn){
      return function log(){
        var args = Array.prototype.slice.call(arguments),
            message;
        
        logFn.apply(console, args);
        message = args.reduce(function(acc, item){
            if (item instanceof Array){
                item = "[" + item.join(', ') + "]";
            }
            return acc + item;
        }, "");
        var myConsole = document.getElementById("myConsole");
        myConsole.innerHTML = myConsole.innerHTML + message + "\n";
      }
    }
}

console.log("\n\n===== Function overloading ES6 defaults ===== ");
function castIceCone(mana=5, {direction='in front of you'}={}){
    console.log(`You spend ${mana} mana and casts a ` + 
      `terrible ice cone ${direction}`);
}
castIceCone();
// => You spend 5 mana and casts a terrible ice cone in front of you
castIceCone(10, {direction: 'towards Mordor'});
// => You spend 10 mana and casts a terrible ice cone towards Mordor


console.log("\n\n====== Function overloading polymorphic functions ======");

function raiseSkeletons(number){
    if (Number.isInteger(number)){ return `raise ${number} skeletons`;}
}

function raiseSkeletonCreature(creature){
    if (creature) {return `raise a skeleton ${creature}`;}
}

function raiseSingleSkeleton(){
    return 'raise a skeleton';
}

// this is a higher order function
// that returns a new function
// something like a function factory
// we could reuse it to our heart's content
function dispatch(...fns){
    return function(...args){
        for(let f of fns){
          let result = f.apply(null, args);
          if (exists(result)) {return result;}
        }
    };
}

function exists(value){
  return value !== undefined;
}

let raiseSkeletonFunctionally = dispatch(raiseSkeletons, raiseSkeletonCreature, raiseSingleSkeleton);

console.log(raiseSkeletonFunctionally());
// => raise a skeleton
console.log(raiseSkeletonFunctionally(4));
// => raise 4 skeletons
console.log(raiseSkeletonFunctionally('king'));
// => raise skeleton king


// But wait! There is more!
// Let's extend our raise skeleton function!
function raiseOnSteroids({number=0, type='skeleton'}={}){
  if(number){return `raise ${number} ${type}s`;}
}

let raiseAdvanced = dispatch(raiseOnSteroids, raiseSkeletonFunctionally);

console.log(raiseAdvanced());
// => raise a skeleton
console.log(raiseAdvanced(4));
// => raise 4 skeletons
console.log(raiseAdvanced('king'));
// => raise skeleton king
console.log(raiseAdvanced({number: 10, type: 'ghoul'}))
// => raise 10 ghouls








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
