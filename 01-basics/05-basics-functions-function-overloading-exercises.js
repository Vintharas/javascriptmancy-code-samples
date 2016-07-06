'use strict'
// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript
Chapter 05 - Useful Function Patterns: Function Overloading - Exercises

*/

randalf.says("haha! And that's what you need to known about overloading!");
mooleen.says("What am I doing here?");

randalf.says("Oh yeah that...");
randalf.says("You are the Chosen one!");

mooleen.says("Yes, yes, the chosen for what?");

randalf.says("You are going to fix everything! " + 
             "Bring balance to the force and all that");

randalf.says("But first you need to learn!");
randalf.says("Right now you wouldn't stand a chance");

mooleen.says("Well 'Great' wouldn't agree would he?");
randalf.says("Oh child, that was just an avatar");
randalf.says("Do you think that this paranoid psychotic megalomaniac " + 
             "would come to you in the flesh??");

// Exercises

narrate("=== ### Create Your Own Avatar === ");
narrate("Write a function `createAvatar` using function overloading by inspecting arguments that satisfies the following snippet:");

/*
createAvatar('a blue wisp hovering around');
// => you create an avatar in the form of a blue wisp hovering around
 
createAvatar({ appearance: 'a blue wisp', stance: 'hovering around'});
// => you create an avatar in the form of a blue wisp hovering around
*/

mooleen.says('An avatar...');
mooleen.says('Let me see if I can do it myself...');

function createAvatar(){
  if (typeof arguments[0] === "string"){
    var description = arguments[0];
    console.log('you create an avatar in the form of ' + description);
  } else {
    var attributes = arguments[0],
        appearance = attributes.appearance,
        stance = attributes.stance;
    console.log('you create an avatar in the form of ' + appearance + " " + stance);
  }
}

mooleen.weaves("createAvatar('a blue wisp hovering around')");
// => you create an avatar in the form of a blue wisp hovering around
mooleen.weaves("createAvatar({ appearance: 'a blue wisp', stance: 'hovering around'})");
// => you create an avatar in the form of a blue wisp hovering around

narrate("=== ### And Another One! === ");
narrate("Update the `createAvatar` function to use an options object that satisfies the following:");

/*
createAvatar({ description: 'a blue wisp hovering around'});
// => you create an avatar in the form of a blue wisp hovering around
 
createAvatar({ appearance: 'a blue wisp', stance: 'hovering around'});
// => you create an avatar in the form of a blue wisp hovering around
*/

function createAvatarOptions(options){
  var appearance = options.appearance || 'no form',
      stance = options.stance || 'standing',
      description = options.description || appearance + " " + stance;
  console.log('you create an avatar in the form of ' + description);
}

mooleen.weaves("createAvatarOptions({ description: 'a blue wisp hovering around'})");
// => you create an avatar in the form of a blue wisp hovering around
 
mooleen.weaves("createAvatarOptions({ appearance: 'a blue wisp', stance: 'hovering around'})");
// => you create an avatar in the form of a blue wisp hovering around


narrate("=== ### And Now Create an Avatar Like Mooleen === ");
narrate("Write a `createAvatar` function that is a polymorphic function. It should satisfy the following snippet:");

/*
createAvatar('a beautiful freckled young woman standing defiantly');
// => you create an avatar in the form of a beautiful freckled 
      young woman standing defiantly

createAvatar({ appearance: 'a beautiful young woman', 
               stance: 'standing defiantly'});
// => you create an avatar in the form of a beautiful freckled 
      young woman standing defiantly

createAvatar();
// => you create an avatar in a shapeless form
*/

function dispatch(...fns){
    return function(...args){
        for(let f of fns){
          let result = f.apply(null, args);
          if (exists(result)) return result;
        }
    };
}

function exists(value){
    return value !== undefined
}

function createByDescription(description){
  if (typeof description === "string"){
    return 'you create an avatar in the form of ' + description;
  }
}

function createByAttributes(attributes){
  if (typeof attributes === 'object'){
    var attributes = arguments[0],
        appearance = attributes.appearance,
        stance = attributes.stance;
    return 'you create an avatar in the form of ' + appearance + " " + stance;
  }
}

function createDefault(){
   return 'you create an avatar in a shapeless form';
}

function createAvatarFp(){
  var createFn = dispatch(
                  createByDescription,
                  createByAttributes,
                  createDefault);
  console.log(createFn.apply(null, arguments));
}

createAvatarFp('a beautiful freckled young woman standing defiantly');
// => you create an avatar in the form of a beautiful freckled 
// young woman standing defiantly

createAvatarFp({ appearance: 'a beautiful young woman', 
               stance: 'standing defiantly'});
// => you create an avatar in the form of a beautiful freckled 
//      young woman standing defiantly

createAvatarFp();
// => you create an avatar in a shapeless form

mooleen.says('Damn! That was creepy');














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
