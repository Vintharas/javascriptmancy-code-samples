'use strict'
// log stuff in the home-made console to the write in addition to
// logging it to the browser console
startWorld();

/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript for C# Devs
Chapter 07 - Mysteries of the JavaScript Arcana: JavaScript Quirks and Gotchas Demystified

*/


narrate(`
After weeks of travelling north Mooleen and Randalf arrive a green valley surrounded by majestic white-peaked mountains as far as the eye can see. There's the beginning of a mountain trail and two persons beside it
waiting for them...
`);

randalf.says('Ah... the Misty Mountains. What a beautiful sight!');
randalf.says('Mooleen, I introduce you to zandalf and bandalf');
randalf.says('I trust them like if they were my brothers...');

randalf.says('...because they actually ARE my brothers');
mooleen.says('Ehem... I can see the resemblance');

narrate(`
Randalf, Zandalf and Bandalf look nothing alike. Where Randalf is tall and spindly, with a carefully trimmed beard and a good natured resemblance, Zandalf is freakishly small and plump, and Bandalf is... blue. Literally blue, like the sky in a clear morning.
`);

randalf.says("Great! While we go up I'd like to tell you something");
randalf.says("I've noticed that some of your incantations have been misfiring");
mooleen.says('Misfiring? What? I know what I am doing... most of the time');

randalf.says('So you meant to light that bale of hay on fire?');
mooleen.says('Yeeees');
randalf.says('And the cart beside it?');
mooleen.says('Yeeeeees');
randalf.says('And the two blocks of buildings surrounding it...');
mooleen.says('Yeee....');

randalf.says('What about my finest robes?');
mooleen.says('That was actually on purpose');

randalf.says('Mooleen...');
randalf.says('OK. I see that you are stumbling with some of the quirks ' +
             'and gotchas of JavaScript-mancy');
randalf.says('Let me give you a couple of tips');



// ********* THIS IN JAVASCRIPT ********** //

// 'this' in JavaScript is weird
// You may come from a strongly typed language to JavaScript thinking that
// 'this' works exactly in the way and write code like this:


function UsersCatalog(){
    "use strict";
    var self = this;
    
    this.users = [];
    getUsers()
    
    function getUsers(){
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'https://api.github.com/users', /* async */ true);
        xhr.responseType = 'json';
        xhr.onreadystatechange = function updateUsers(){
            if (xhr.readyState === 4 && xhr.status === 200){
                // console.log(xhr.response);
                this.users.push(xhr.response);
                // BOOOOOOOM!!!!!
                // => Uncaught TypeError: Cannot read property 'push' of undefined
                // 'this' in this context is the XHR object
                // not our original object
                // that's why we usually use a closure here instead:
                // self.products = products;
            }
        };
        xhr.send();
    }
}
var catalog = new UsersCatalog();

// Another example with jQuery
function UsersCatalogJQuery(){
    "use strict";
    var self = this;
    
    this.users = [];
    getUsers()
    
    function getUsers(){
        $.getJSON('https://api.github.com/users')
        .success(function updateUsers(users){
            // console.log(users);
            // console.log(this);
            this.users.push(users);
            // BOOOOOOOM!!!!!
            // => Uncaught TypeError: Cannot read property 'push' of undefined
            // 'this' in this context is the jqXHR object
            // not our original object
            // that's why we usually use a closure here instead:
            // self.products = products;
        });
    }
}
var catalog = new UsersCatalogJQuery();



// 'this' in JavaScript is weird
// unlike in other OOP languages
// 'this' in JavaScript depends on the context in which a function is invoked

console.log('=========This and Objects=========')
// #1. it can be an object
var hellHound = {
    attackWithFireBreath: function(){
        console.log(this + " jumps towards you and unleashes his terrible breath of fire! (-3 hp, +fear)");
    }, 
    toString: function (){ return 'Hellhound';}
}

hellHound.attackWithFireBreath();
// => Hellhound jumps towards you and unleashes his terrible breath of fire! (-3 hp, +fear)

console.log('\n\n=========This UnBound=========')
// #2. but we can also call the function without the context of its object
var attackWithFireBreath = hellHound.attackWithFireBreath;
attackWithFireBreath();
// => [object Window] jumps towards you and unleashes his terrible breath of fire! (-3 hp, +fear)
// ups, by default the context of executions of a function is the Window object
// if you use strict mode it will be undefined => use strict mode

// we could add the same method to another object:
var zandalf = {
    toString: function(){return 'zandalf';}
};
zandalf.attackWithFireBreath = attackWithFireBreath;
  
zandalf.attackWithFireBreath();
// => zandalf jumps towards you and unleashes his terrible breath of fire! (-3 hp, +fear)
         
console.log('\n\n=========This Explicitly=========')
// #3. We can also explicitly set the context of execution of a function
// all functions have call and apply:
attackWithFireBreath.call(zandalf /*, arg1, arg2, */);
// => zandalf...
attackWithFireBreath.apply(hellHound /*, [arg1, arg2, arg3...] */);
// => hell hound...

// in addition to the value of this, you can pass a list of arguments separated by commas to `call`
function attackManyWithFireBreath(){
    var targets = Array.prototype.slice.call(arguments, 0);
    console.log(this + " jumps towards " + targets.join(', ') + " and unleashes his terrible breath of fire! (-3 hp, +fear)");
}

attackManyWithFireBreath.call(hellHound, 'you', 'me', 'the milkman');
// => Hellhound jumps towards you, me, the milkman and unleashes his terrible breath of fire! (-3 hp, +fear)

// and an array or arguments to `apply`
attackManyWithFireBreath.apply(hellHound, ['me', 'you', 'irene']);
// => Hellhound jumps towards me, you, irene and unleashes his terrible breath of fire! (-3 hp, +fear)

console.log('\n\n=========This Bound=========')
// #4. And as of ES5 we can bind the context of execution of a function FOR EVER
var attackBound = attackWithFireBreath.bind(hellHound);
attackBound();
// => Hellhound jumps towards you and unleashes his terrible breath of fire! (-3 hp, +fear)

// even if I give the function to another object
zandalf.attackBound = attackBound;
zandalf.attackBound();
// => Hellhound ...

// You cannot rebind a function that is bound
var attackReBound = attackBound.bind(zandalf);
attackReBound();
// => Hellhound ...
attackBound();
// => hellHound ...

// But you can still bind the original
var attackRebound = attackWithFireBreath.bind(zandalf);
attackRebound();
// => zandalf...




console.log('\n\n===== Solving This======');
// And back to the original example
// we can solve the 'this' issue by

// #1. Accessing member via closure
function UsersCatalogWithClosure(){
    "use strict";
    var self = this;
    
    self.users = [];
    getUsers()
    
    function getUsers(){
        $.getJSON('https://api.github.com/users')
        .success(function(users){
            self.users.push(users);
            console.log('success!');
        });
    }
}
var catalog = new UsersCatalogWithClosure();

//#2. Using bind
function UsersCatalogWithBind(){
    "use strict";
    
    this.users = [];
    getUsers.bind(this)();
    
    function getUsers(){
        $.getJSON('https://api.github.com/users')
        .success(updateUsers.bind(this));
    }
    
    function updateUsers(users){
        this.users.push(users);
        console.log('success with bind!');
    }
}
var catalog = new UsersCatalogWithBind();



// ********* FUNCTION SCOPE AND HOISTING ******** //

console.log("\n\n======= Function Scope ========");
function aFunctiontoIllustrateFunctionScope(){
    
    if (true){
        var x = 10;
    }
    console.log(x);
}
aFunctiontoIllustrateFunctionScope();
// => 10 WAT

console.log("\n\n========= Hoisting ========= ");
function aFunctionToIllustrateHoisting(){
    // in reality
    // var i = undefined
    console.log('before i = ' + i);
    for(var i = 0; i < 10; i++){     
        // jara jara
    }
    console.log('after i = ' + i);
}
aFunctionToIllustrateHoisting();

console.log("\n\n========== Namespacing ========");
console.log("\n\n========== global namespace =======");
// you need to execute this one in the console
var dice = "d12";
dice;
// => d12
window.dice;
// => d12
// ups... we are in the global scope/namespace

console.log("\n\n=========== create a basic namespace with an IIFE =====");
// IIFE - we invoke the function expression as soon as we declare it
(function(armory){
    // armory being the namespace
    armory.sword = {damage: 10, speed: 15};
    armory.axe = {damage: 15, speed: 8};
    armory.mace = {damage: 16, speed: 7};
    armory.dagger = {damage: 5, speed: 20};
    
}(window.armory = window.armory || {} )); // either augment or create the armory namespace
console.log(armory.sword.damage);
// => 10



console.log("\n\n========== Async responses from Ajax Requests ======");












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
