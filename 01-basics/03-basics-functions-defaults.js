'use strict'
// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript
Chapter 03 - The Basics of JavaScript Functions - Default Arguments

*/

narrate("***** Defaults with the || operator *****\n");
function castIceCone(mana, options){
    // we take advantage of the || operator to define defaults
    var mana = mana || 5,
        options = options || {direction: 'in front of you', damageMod: 10},
        direction = options.direction || 'in front of you',
        damageMod = options.damage || 10,
        damage = 2*mana + damageMod;
    
    console.log("You spend " + mana + " mana and casts a terrible ice cone " + direction + " (" + damage + " DMG).");
}

castIceCone();
// => You spend 5 mana and casts a terrible ice cone in front of you (20 DMG)
castIceCone(10);
// => You spend 5 mana and casts a terrible ice cone in front of you (20 DMG)
castIceCone(10, { damage: 200});
// => You spend 5 mana and casts a terrible ice cone in front of you (220 DMG)
castIceCone(10, { direction: 'towards Mordor'})
// => You spend 10 mana and casts a terrible ice cone towards Mordor (30 DMG)
castIceCone(10, { direction: 'towards Mordor', damage: 200})
// => You spend 10 mana and casts a terrible ice cone towards Mordor (220DMG)

narrate("\n\n***** Defaults using an object *****\n");
// In addition to using the || operator, you can use an object
// to gather your default values and 'mix-it' with the arguments
// being passed a function called. The default values will only
// be applied if they are not passed as arguments to the function.

// You can achieve this behavior with jQuery $.extend,
// underscores _.defaults (or _.extend) or with the native ES6 Object.assign
// Let's take a look at it

function castLightningBolt(details){
    // we define the defaults as an object
    var defaults = {
    	mana: 5,
      direction: 'in front of you'
    };
    // extend details with defaults
    // properties are overwritten from right to left
    details = mergeDefaults(details, defaults);
    
    console.log('You spend ' + details.mana + 
        ' and cast a powerful lightning bolt ' + 
        details.direction + '!!!');
}

function mergeDefaults(args, defaults){
    if (!args) args = {};
    for (var prop in defaults) {
        if (defaults.hasOwnProperty(prop) && !args[prop]) {
            args[prop] = defaults[prop];
        }
    }
    return args;
}

castLightningBolt();
// => You spend 5 and cast a powerful lightning bolt in front of you!!!
castLightningBolt({mana: 100});
// => You spend 100 and cast a powerful lightning bolt in front of you!!!
castLightningBolt({direction: 'to the right'});
// => You spend 5 and cast a powerful lightning bolt to the right!!!
castLightningBolt({mana: 10, direction: 'towards Mordor'});
// => You spend 10 and cast a powerful lightning bolt towards Mordor!!!

narrate("\n\n***** Defaults using an object and open source! *****\n");

function castLightningBoltOSS(details){
    // we define the defaults as an object
    var defaults = {
    	  mana: 5,
        direction: 'in front of you'
    };
    // extend details with defaults
    // properties are overwritten from right to left
    details = $.extend({}, defaults, details);
    //details = _.extend({}, defaults, details);
    
    // to use defaults switch argument places
    // properties are only overwritten if they are undefined
    //details = _.defaults({},details, defaults);
    
    // with ES6
    // details = Object.assign({}, defaults, details);

    console.log('You spend ' + details.mana + 
        ' and cast a powerful lightning bolt ' + 
        details.direction + '!!!');
}

castLightningBoltOSS();
// => You spend 5 and cast a powerful lightning bolt in front of you!!!
castLightningBoltOSS({mana: 100});
// => You spend 100 and cast a powerful lightning bolt in front of you!!!
castLightningBoltOSS({direction: 'to the right'});
// => You spend 5 and cast a powerful lightning bolt to the right!!!
castLightningBoltOSS({mana: 10, direction: 'towards Mordor'});
// => You spend 10 and cast a powerful lightning bolt towards Mordor!!!

narrate("\n\n***** ES6 Native Defaults *****\n");

function castIceConeES6(mana=5){
    console.log(`You spend ${mana} mana and casts a terrible ice cone`);
}

castIceConeES6();
// => You spend 5 mana and casts a terrible ice cone
castIceConeES6(10);
// => You spend 10 mana and casts a terrible ice cone

narrate("\n\n***** ES6 Native Defaults - Objects *****\n");

// defaults are not limited to constant values, you can even use objects
function castIceConeMore(mana=5, options={direction:'in front of you'}){
    console.log(`You spend ${mana} mana and casts a ` + 
      `terrible ice cone ${options.direction}`);
}

castIceConeMore();
// => You spend 5 mana and casts a terrible ice cone in front of you
castIceConeMore(10);    
// => You spend 10 mana and casts a terrible ice cone in front of you
castIceConeMore(10, {direction: 'towards Mordor'});
// => You spend 10 mana and casts a terrible ice cone towards Mordor
castIceConeMore(10, {duck: 'cuack'});
// => You spend 10 mana and casts a terrible ice cone undefined

// defaults are not limited to constant values, you can even use objects
function castIceConeWithDestructuring(mana=5, 
            {direction='in front of you'}={direction:'in front of you'}){
    console.log(`You spend ${mana} mana and casts a ` + 
      `terrible ice cone ${direction}`);
}
castIceConeWithDestructuring();
// => You spend 5 mana and casts a terrible ice cone in front of you
castIceConeWithDestructuring(10, {duck: 'cuack'});
// => You spend 10 mana and casts a terrible ice cone in front of you


    
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
      return {
        name,
        says: function(msg){ world.log(name + ' says: ' + msg + '\n\n');},
        weaves: function(spell){ 
            world.log(name + ' starts weaving a spell!'); 
            world.log('***' + spell + '***');
            eval(spell); 
        },
        toString(){return this.name;}
      }
    }
}

function narrate(){
    world.info.apply(console, arguments);
}
