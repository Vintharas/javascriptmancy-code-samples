'use strict'
// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript
Chapter 04 - The Basics of JavaScript Functions - Arbitrary Arguments

*/

/* 
* An endless beach, the rumor of the sea, fire crackling nearby...
*/

randalf.says('It was a long time ago...');
randalf.says('Damn! Just thinking about it makes me feel ancient...');

randalf.says('The birth of JavaScript-mancy.');
randalf.says('I remember it clearly...');
randalf.says('I was there the very second it happened');

/*
Branden was special. He looked at the world in a different light. He would 
often wander and ponder about the workings of the world and how to make it 
better for everyone. He would build wondrous inventions, some of them 
useless I'll grant, some of them even dangerous. He studied and pursuited 
his goals with a near mad passion and intent, and one day he found it. 

He found what would change the world for ever: JavaScript-mancy and 
the sacred REPL.
*/

mooleen.says('wait, wait... do you mean the Read-Evaluate-Print-Loop??');
randalf.says('What? No child, the REPL is just... well, the REPL');

/*
Anyhow, historians always claim he was working on a great wonder when he 
found it. You know what? He wasn't!

He was boiling eggs!! He had made this useless machine to boil an egg and 
was racking his brain to boil an arbitrary number of eggs. Can you believe it?
*/

console.log("======== JavaScript, parameters and arguments ========\n");
// JavaScript is very flexible when handling parameters. You can define
// a function as taking a number of parameters and then call it without arguments

function heal(person, inchantation, modifier){
    var healedHp;
    modifier = modifier || 1;
    healedHp = modifier * 100;
    
    console.log('you heal ' + person + ' with ' + inchantation + ' spell (+' + healedHp + 'hp)' );
    person.hp += healedHp;
}

// function arity! The number of parameters:
console.log(heal.length);
// => 3

// call without any arguments at all
try{
  heal();
} catch (e) {
  console.log(e)
}
// => you heal undefined with undefined spell (+100hp)
// => typeError: cannot read property hp of undefined

// or with as many arguments as you want
var JonSnow = {name: 'Jon Snow', hp: 5, toString: function(){return this.name;}}; 
heal(JonSnow);
// => you heal Jon Snow with undefined spell (+100hp)
heal(JonSnow, 'cure');
// => you heal Jon Snow with cure spell (+100hp)
heal(JonSnow, 'super heal', /* modifier */ 2);
// => you heal Jon Snow with super heal spell (+200hp)

// even more than the parameters defined in the original function
heal(JonSnow, 'heal', 1, 3, 2, 3, 'cucumber', {a: 1, b:2}, 'many arguments');
// => you heal Jon Snow with heal spell (+100hp)


console.log("\n\n======== JavaScrip multiple arguments ========\n");

// Imagine an obliterate function that you could use to wipe out an enemy
function obliterateOne(enemy){
    console.log(enemy + " wiped out of the face of the earth");
}

obliterateOne('batman');
// => batman wiped out of the face of the earth


// What if you could use it to wipe out many enemies at once !?

// Taking a variable number of parameters in JavaScript
// In C# we use params
// In JavaScript we take advantage of the arguments object available within every function
function obliterate(){
    // Unfortunately arguments it is not an array :O
    // so we need to convert it ourselves
    var victims = Array.prototype.slice.call(arguments, 0);
    victims.forEach(function(victim){
        console.log(victim + " wiped out of the face of the earth");
    });
    console.log('*Everything* has been obliterated, oh great master of evil and deceit!');
}

obliterate("John Doe", getPuppy(), 1, new Minion('Willy', 'troll'));
/*
John Doe wiped out of the face of the earth
cute puppy wiped out of the face of the earth
1 wiped out of the face of the earth
Willy the troll wiped out of the face of the earth
*Everything* has been obliterated, oh great master of evil and deceit!
*/

function getPuppy(){
    return {
        cuteWoof: function(){console.log('wiii');},
        toString: function(){return 'cute puppy';}
    };
};

function Minion(name, type){
    this.name = name;
    this.type = type;
    this.toString = function(){ return name + " the " + type;};
}




// Also in the case we have two fixed parameters and 
function obliterateWith(spellName /*, victims */){
    // Unfortunately arguments it is not an array :O
    // so we need to convert it ourselves
    var victims = Array.prototype.slice.call(arguments, 1);
    victims.forEach(function(victim){
        console.log(victim + " wiped out of the face of the earth with a " + spellName + " spell");
    });
    console.log('*Everything* has been obliterated, oh great master of evil and deceit!');
}

obliterateWith("fireball", "John Doe", getPuppy());
/*
John Doe wiped out of the face of the earth with a fireball spell
cute puppy wiped out of the face of the earth with a fireball spell
*Everything* has been obliterated, oh great master of evil and deceit!
*/


/* 
The arguments object is an array-like object (it behaves like an array... some... times XD)
You can index it and it has a length property
*/

console.log("\n\n======= The Arguments object ======\n");
console.log("The arguments object is an array-like object. You can index it and it has a length property:");
function inspectArguments(){
    console.log("the first argument is ", arguments[0]);
    console.log("the second argument is ", arguments[1]);
    console.log("there are " + arguments.length + " arguments");
    
    // the arguments are enumerable like 
    // any common array or object, and thus you could use 
    // the for/in loop
    for (var idx in arguments) { 
       console.log("item at position " + idx + " is " + arguments[idx]);
    }
}
inspectArguments("cucumber", "dried meat", "dagger", "rock");
// => the first argument is cucumber
// => the second argument is dried meat
// => there are 4 arguments

console.log('But it does not have any of the array functions that you would expect:');
function inspectArgumentsFunctions(){
    console.log("arguments.foreach is ", arguments.foreach);
    console.log("arguments.map is ", arguments.map);
    console.log("arguments.some is", arguments.some);
}
inspectArgumentsFunctions();
// => arguments.foreach is undefined
// => arguments.map is undefined
// => arguments.some is undefined

// converting to array using slice
console.log("You can convert arguments to an array using Array.prototype.slice that is what we did with the obliterate function at the top");

console.log("\n\n======== ES6 rest syntax ========\n");

function obliterateES6(...victims){
    victims.forEach(function(victim){
        console.log(victim + " wiped out of the face of the earth");
    });
    console.log('*Everything* has been obliterated, oh great master of evil and deceit!');
}

obliterateES6("John Doe", getPuppy(), 1, new Minion('Willy', 'troll'));
/*
=> John Doe wiped out of the face of the earth
=> cute puppy wiped out of the face of the earth
=> 1 wiped out of the face of the earth
=> Willy the troll wiped out of the face of the earth
=> *Everything* has been obliterated, oh great master of evil and deceit!
*/

console.log("\n======== ES6 rest syntax - combine with normal parameters  ========\n");
// you can combine rest parameters with normal parameters
function obliterateEvil(unfortunateVictim, ...victims){
    console.log(unfortunateVictim + " wiped out of the face of EXISTENCE " +
               "as if it had never existed.... Woooo");
    victims.forEach(function(victim){
        console.log(victim + " wiped out of the face of the earth");
    });
    console.log('*Everything* has been obliterated, oh great master of evil and deceit!');
}
obliterateEvil("John Doe", getPuppy(), 1, new Minion('Willy', 'troll'));
/*
John Doe wiped out of the face of EXISTENCE as if it had never existed.... Woooo
cute puppy wiped off of the face of the earth
1 wiped off of the face of the earth
Willy the troll wiped off of the face of the earth
*Everything* has been obliterated, oh great master of evil and deceit!
*/

console.log("\n======== ES6 rest syntax - combo with spread operator  ========\n");
// using the spread operator
// to call a function that supports an arbitrary number of arguments
let mortalEnemies = ["John Doe", getPuppy(), 1, new Minion('Willy', 'troll')];
obliterateES6(...mortalEnemies); // this is the spread operator

/*
John Doe wiped out of the face of the earth
cute puppy wiped out of the face of the earth
1 wiped out of the face of the earth
Willy the troll wiped out of the face of the earth
*Everything* has been obliterated, oh great master of evil and deceit!
*/






    
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
        toString(){return this.name;}
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
