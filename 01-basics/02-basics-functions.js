'use strict'
// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript
Chapter 02 - The Basics of JavaScript Functions

*/

/* 
 * ...In the previous chapter...
 * stranger.says('...err... who the hell are you? and whaaaat is a kender?!');
 *
 */

randalf.says(`Well... I am Randalf. Randalf the Red... JavaScriptmancer
 of the First Order... Guardian of the Sacred Flame... 
Freedom fighter and Poet...`);

stranger.says('uh?');

randalf.says(`Yes! And you are the Chosen one! The Child of Prophecy! 
The one that will bring balance to the force! Muad'Dib! The Dragon reborn!
Brought to this land in the twelfth moon of the twelfth month of the 
twelfth year of the Wyrm to save the world from certain destruction!`);

stranger.says(`I am Mooleen actually... 
and this is the weirdest dream I've ever had...`);
let mooleen = stranger;

randalf.says(`There's no time for this child. You need to learn how to 
defend yourself, it isn't safe here... It all starts with functions, 
functions are the key...`);

narrate("============= Function Are The Key... =============");

// there's two ways to write functions in javascript
// function expressions:

// anonymous function expression
var castFireballSpellExpression = function(){
  // chaos and mayhem
};

// and function declarations
function castFireballSpellDeclaration(){
  // it's getting hot in here...
}

narrate("======= Function Expresssions =============");

// We use the *function expression* style whenever we declare a function like an expression, either by assigning it to a variable:

// an anonymous function expression
var castFireballSpell = function(){
    console.log('...chaos and mayhem');
};
castFireballSpell();
// => ...chaos and mayhem

// another anonymous function expression as a property of an object
var magician = {
    castFireballSpell: function() {
        console.log('muahaha! Eat this fireball!');
    }
};
magician.castFireballSpell();
// => muahaha! Eat this fireball!

// yet another anonymous function expression passed as an argument
var castCombo = function(spellOne, spellTwo){
    console.log('Combo Magic!!!!');
    spellOne();
    spellTwo();
}
castCombo(function(){
    console.log('FireBalllllzzz!!');
}, function(){
    console.log('And Spectral Shield!!');
});
// => Combo Magic!!!!
// => FireBalllllzzz!!
// => And Spectral Shield!!

narrate("\n\n====== JavaScript Arcana: Function Scope and Hoisting ====");
narrate("A short digression about function scope and hoisting");

function openPandoraBox(){

    if (true){
        var x = 'mouse';
    }
    console.log('the pandora box holds a: **' + x + '**');
}
openPandoraBox();
// => the pandora box holds a: **mouse**
// WAT!? x is declared inside an if block. How can it be picked up by the console.log??
// one word: function-scope 

// in reality the variable definition is hoisted to the top of the function
function openPandoraBox(){
    // The variable definition is hoisted up here
    var x = undefined;
    if (true){
        x = 'mouse';
    }
    console.log('the pandora box holds a: **' + x + '**');
    // => the pandora box holds a: **mouse**
}

// and another example of hoisting
function aMagicFunctionToIllustrateHoisting(){
    // in reality
    // var i = undefined
    console.log('before i = ' + i);
    // => before i = undefined
    for(var i = 0; i < 10; i++){
        // jara jara
    }
    console.log('after i = ' + i);
    // => after i = 10
}
aMagicFunctionToIllustrateHoisting();

narrate("\n\n=== Functions cope and functions as structural elements of an application === ")
// Functions being the stewards of scope of an application is pretty interesting because, all of the sudden, a function is not only used for encapsulating and abstracting a piece of logic but also for structural reasons. That is, a way to organize and distribute bits and pieces of functionality and code.

// declaring a function inside a function?
// Ain't that weird????
function blessMany(many){
  many.forEach(bless);
  
  function bless(target){
    console.log('You bless ' + target + '. (+5 WillPower) ');
  }
}

blessMany(['john snow', 'sansa stark']);
// => You bless John Snow (+5 Willpower) 
// => You bless Sansa Stark (+5 Willpower)


narrate("\n\n====== ES6 brings block scope with let and const!");
function openPandoraBoxWithBlockScope(){
    // console.log(treasure); // => undefined
    if (true){
        let treasure = 'mouse';
        // console.log(treasure); // => mouse
    }
    try{
    console.log('the pandora box holds a: **' + treasure + '**');
    } catch (error){
        console.log(error);
    }
}
openPandoraBoxWithBlockScope();
// ReferenceError: treasure is not defined
// fiuuuu now everything makes sense again

function shallIPass(){ // new scope for youShallNotPass block
    let youShallPass = 'you Shall Pass!', 
        youShallNotPass = 'You Shall Not Pass!';
    // console.log(canIPass); // => ReferenceError

    if (true){ // new scope for if block
        let canIPass = youShallNotPass;
        // uncomment to test
        //const canIPass = youShallNotPass;
        console.log(canIPass); // => 'You Shall Not Pass!'
        try{
          canIPass = youShallPass; // => TypeError: Assignment to a constant variable
        } catch (e){
            console.log(e);
        }
    }

    try{
    console.log(canIPass); // => undefined
    } catch(e){
        console.log(e);
    }
    // ReferenceError: x is not defined
}
shallIPass();
// => you Sall not Pass!
// => TypeError: Assignment to a constant variable

console.log('let and const do not hoist variables');
function openPandoraBoxWithBlockScopeAndHoisting(){ // new scope for function block

    if (true){ // new scope for if block
        try{
        console.log('the pandora box holds a: **' + treasure + '**');
        }catch(e)
        {
            console.log(e);
        }
        // ReferenceError: treasure is not defined
        let treasure = 'mouse';
    }
}
openPandoraBoxWithBlockScopeAndHoisting();
// ReferenceError: treasure is not defined

narrate("\n\n====== All these functions are anonymous ====");
narrate("you can inspect the name property of a function and see it is an empty string");
var castFireballSpell = function(){
    console.log('...chaos and mayhem');
};
console.log('name of function stored in castFireballSpell: ', castFireballSpell.name);
// => 'name of function stored in castFireballSpell: <nothing>'



narrate("\nyou can however examine the call stack and see how an anonymous function that is bound to a variable shows the variable name");
var castFireballSpellWithError = function(){
    console.log('...chaos and mayhem');
    try {
        throw new Error();
    } catch (e) {
        console.log('stack: ', e.stack);
    }
};
castFireballSpellWithError();
//=> stack:  Error
//     at castFireballSpellWithError (http://fiddle.jshell.net/_display/:53:15)
//     at window.onload (http://fiddle.jshell.net/_display/:58:1)


narrate("\nif you use this function as a lambda the name is still shown in the call stack");
var spellLauncher = function(f){ f(); }
spellLauncher(castFireballSpellWithError);
// => stack:  Error
//    at castFireballSpellWithError (http://fiddle.jshell.net/_display/:56:15)
//    at spellLauncher (http://fiddle.jshell.net/_display/:68:35)
//    at window.onload (http://fiddle.jshell.net/_display/:69:1)

narrate("\nit is only if you use a strict anonymous function that the name doesn't appear in the call stack");
spellLauncher(function(){
    console.log('...chaos and mayhem');
    try {
        throw new Error();
    } catch (e) {
        console.log('stack: ', e.stack);
    }
});
//=> stack:  Error
//    at http://fiddle.jshell.net/_display/:76:15
//    at spellLauncher (http://fiddle.jshell.net/_display/:68:35)
//    at window.onload (http://fiddle.jshell.net/_display/:73:1)

narrate("\nyou can use recursion when an anonymous function is bound to a variable");
var castManyFireballsSpell = function(n){
    console.log('... SHOOOOOOOOOSH ....');
    if (n > 0) 
        castManyFireballsSpell(n-1);
};
castManyFireballsSpell(3);
// => ... SHOOOOOOOOOSH ....
//    ... SHOOOOOOOOOSH ....
//    ... SHOOOOOOOOOSH ....
//    ... SHOOOOOOOOOSH ....

narrate("\nbut there's no way for an anonymous function to call itself in any other way");
(function(n){
    console.log('... SHOOOOOOOOOSH ....');
    if (n > 0) {
        // I cannot call myself... :(
    }
}(5));

narrate("\n\n=========== Named Function Expressions ===========");
// named function expression
var castFireballSpell = function castFireballSpell(){
  // mayhem and chaos
};
console.log("this function's name is: ", castFireballSpell.name);
// => castFireballSpell

narrate("\nA named function expression always appears in the call stack, even when used as a lambda not bound to a variable");
spellLauncher(function spreadChaosAndMayhem(){
    console.log('...chaos and mayhem');
    try {
        throw new Error();
    } catch (e) {
        console.log('stack: ', e.stack);
    }
});
// stack:  Error
//     at spreadChaosAndMayhem (http://fiddle.jshell.net/_display/:134:15)
//     at functionCaller (http://fiddle.jshell.net/_display/:68:35)
//     at window.onload (http://fiddle.jshell.net/_display/:131:1)


narrate("\na function expression's name is only used internally, you cannot call a function expression by it's name from the outside");
var castFireballSpell = function cucumber(){
    // cucumber?
};
try{
  cucumber();
} catch (e)
{
  console.log(e);
}
// => ReferenceError: cucumber is not defined

narrate('\nbut you can call it from the function body which is helpful for recursioon');
(function fireballSpellWithRecursion(n){
    console.log('... SHOOOOOOOOOSH ....');
    if (n > 0) {
        fireballSpellWithRecursion(n-1);
    }
}(5));
// => ... SHOOOOOOOOOSH ....
//    ... SHOOOOOOOOOSH ....
//    ... SHOOOOOOOOOSH ....
//    ... SHOOOOOOOOOSH ..... etc..


narrate("\nfunction expressions and the problems of variable hoisting");
// you cannot do this with function expressions
(function (magic){
    // this function represents a module 'magic'
    // it's just a way to group like-minded pieces of code

    // exposing enchant as the API for the 'magic' module
    magic.enchant = enchant;
    // => hoisting issue, enchant is undefined at this point
    // so we are just exposing an undefined variable thinking it is a function

    // if uncommented this would cause an exception
    // enchant();
    // => TypeError: enchant is not a function
    // => hoisting issue, enchant is undefined at this point

    var enchant = function enchant(ingredients){
        var mixture = mix(ingredients),
            dough = work(mixture),
            cake = bake(dough);
        return cake;
    };

    // if uncommented this would cause an exception
    // enchant();
    // => TypeError: mix is not a function (it's undefined at this point)
    // hoisting issue, mix is undefined at this point

    var mix = function mix(ingredients){
        console.log('mixin ingredients:', ingredients.join(''));
        return 'un-appetizing mixture';
    }

    var work = function work(mixture){
        console.log('working ' + mixture);
        return 'yet more un-appetizing dough';
    };

    var bake = function bake(dough){
        oven.open();
        oven.placeBaking(dough);
        oven.increaseTemperature(200);
        // insta-oven!
        return oven.claimVictory();
    };

    var oven = {
        open: function(){},
        placeBaking: function(){},
        increaseTemperature: function(){},
        claimVictory: function(){ return 'awesome cake';}
    };

}(window.magic || (window.magic = {})));

try{
    var cake = magic.enchant(['flour', 'mandragora', 'dragon', 'chicken foot']);
    console.log(cake);
}catch (e){
    console.error('ups!!!!!! ', e);
    // => ups!!!!!! TypeError: magic.enchant2 is not a function
}



narrate("\n=========== Function Declaration ===============");
// function declaration
function castFireballSpell(){
  // it's getting hot in here...
}

// with function declarations you can write functions like this
// and not worry about hoisting issues
(function(magic){
    
    magic.enchant = enchant;
    
    function enchant(ingredients){
        var mixture = mix(ingredients),
            dough = work(mixture),
            cake = bake(dough);
        return cake;
    }
    
    function mix(ingredients){
        console.log('mixin ingredients: ', ingredients.join(' '));
        return 'un-appetizing mixture';
    }
    
    function work(mixture){
        console.log('working ' + mixture);
        return 'yet more un-appetizing dough';
    }
    
    function bake(dough){
        oven.open();
        oven.placeBaking(dough);
        oven.increaseTemperature(200);
        // insta-oven!
        return oven.claimVictory();
    }
    
    var oven = { 
        open: function(){}, 
        placeBaking: function(){}, 
        increaseTemperature: function(){}, 
        claimVictory: function(){ return 'awesome cake';}
    };


}(window.magic || (window.magic = {})));

var cake = magic.enchant(['flour', 'mandragora', 'dragon', 'chicken foot']);
console.log(cake);

narrate("\n===== we can also use function declarations as lambdas ====");

var orc = {toString: function(){return 'a mighty evil orc';}};
var warg = {toString: function(){return 'a terrible warg';}};
var things = [1, orc, warg, false];

things.forEach(disintegrate);

function disintegrate(thing){
    console.log(thing + ' suddenly disappears into nothingness...');
}

// => 1 suddenly disappears into nothingness...
// a mighty evil orc suddenly disappears into nothingness...
// a terrible warg suddenly disappears into nothingness...
// false suddenly disappears into nothingness...


    
    
    
    
    
    
    
    
    
    
    
    
    


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
    window.stranger = {
        says: function(msg){ world.log('The stranger says: ' + msg + '\n\n');},
        weaves: function(spell){ 
            world.log('The stranger starts weaving a spell!'); 
            world.log('***' + spell + '***');
            eval(spell); 
        }
    }
    window.randalf = {
        says: function(msg){ world.log('Randalf the Red says: ' + msg + '\n\n');},
        weaves: function(spell){ 
            world.log('Randalf the Red starts weaving a spell!');
            world.log('***' + spell + '***');
            eval(spell); 
        }
    }
    
    function weaveSpell(spell){
        eval(spell);
    }
}

function narrate(){
    world.info.apply(console, arguments);
}
