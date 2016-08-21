/* 
 *
 * Mastering The Arcane Art of JavaScriptMancy - Chapter 10
 * JavaScript ES 6 - Arrow Functions
 *
 */

/* ARROW FUNCTIONS */
console.log("======== ARROW FUNCTIONS ==========");
console.log("===== Arrow functions have a terse syntax =====")


// *Arrow functions* are a great feature in ES6 that feel just 
// like C# lambda expressions. They give you a beautiful and 
// terse syntax that let's you write:

let createWater = mana => `${mana} liters of water`;
console.log(createWater(10));
// => 10 liters of water

// instead of the whole function expression
let createWaterOldSchool = function (mana){
    return `${mana} liters of water`;
}



//Like in C# you'll see *arrow functions* often used 
// in conjunction with array methods such as `filter` 
// (the JavaScript version of *LINQ*'s `Where`):

let monsters = ['orc chieftain', 'orc grunt', 'small orc', 'goblin'];
let orcs = monsters
  .filter(m => m.includes('orc'));
console.log(orcs);
// => ["orc chieftain", "orc grunt", "small orc"]



console.log("===== You can define them with any number of arguments =====")
// you can define arrow functions with any number of arguments. For instance no arguments at all:

let helloMiddleEarth = () => "hello Middle Earth!";
console.log(helloMiddleEarth());
// => hello Middle Earth!



// Or one:
let frodo = {
  toString(){ return 'Frodo'},
  destroyTheOneRing() { 
    console.log(`${this} throws the one ring into the entrails of Mount Doom`);
  },
  hideFrom(enemy, how) {
    console.log(`${this} hides from the ${enemy} ${how}`);
  }
};

let destroyDaRing = (hobbit) => hobbit.destroyTheOneRing();

destroyDaRing(frodo);
// => Frodo throws the one ring into the entrails of Mount Doom




// Or two:
let nazgul = {
  toString(){ return 'scary nazgul';}
};
let useElvenCloak = (hobbit, enemy) => hobbit.hideFrom(enemy, 'with an elven cloak');

useElvenCloak(frodo, nazgul);
// => Frodo hides from the scary nazgul



//Or many arguments using the *rest syntax*:
useElvenCloak = (hobbit, ...enemies) => hobbit.hideFrom(enemies, 'with an elven cloak');
useElvenCloak(frodo, nazgul, 'orc', 'troll');
// => Frodo hides from the scary nazgul,orc,troll with an elven cloak



// and you can use destructuring and defaults in those arguments WOW!

// defaults
destroyDaRing = (hobbit=frodo) => hobbit.destroyTheOneRing();
destroyDaRing();
// => Frodo throws the one ring into the entrails of Mount Doom

// destructuring
let companyOfTheRing = {
  smartestHobbit: frodo,
  wizard: 'Gandalf',
  ranger: 'Aragorn',
  // etc
};
destroyDaRing = ({smartestHobbit}) => smartestHobbit.destroyTheOneRing();

destroyDaRing(companyOfTheRing);
// => Frodo throws the one ring into the entrails of Mount Doom



// you can pack more than one statement inside an arrow function
let eatRation = (hobbit, rations) => {
  let ration = rations.shift();
  if (ration) {
    hobbit.hp += ration.hp;
    console.log(`${hobbit} eats ${ration} and recovers ${ration.hp} hp`);
  } else {
    console.log(`There are no rations left! We're all gonna die!!!!`);
  }
}
let rations = [{
  name: 'sandwich',
  hp: 5,
  toString(){ return this.name;}
}];
eatRation(frodo, rations);
// => Frodo eats sandwich and recovers 5 hp


// but if you do you need to return a value explicitly
let carveWood = (wood, shape) => {
  console.log(`You carve a piece of ${wood} into a ${shape}`);
  return {name: shape, material: wood};
}
let pipe = carveWood('oak', 'pipe');
// => You carve a piece of oak into a pipe

// an arrow function call also return an object initializer
// but you'll need to wrap it it () so the JavaScript runtime
// understand it is an object initializer and not a block of code
let createHealthPotion = () => ({
  name: 'potion of health', 
  hp: 10,
  toString(){
    return `${this.name} (+${this.hp}hp)`;
  }});
let healthPotion = createHealthPotion();
console.log(healthPotion.toString());
// => potion of Health (+10 hp)


console.log("===== Solving the 'this' issues ======");
console.log("Arrow functions have no `this` nor `arguments`");
console.log("when you use `this` or `arguments` inside an arrow function you refer to the enclosing environment `this` or `arguments`")

// if we use normal functions
let gollum = {
    name: 'Golum! Golum!',
    toString(){ return `${this.name}!!!`;},
    saysHi(){ 
      console.log(`Hi! I am ${this}`);
      setTimeout(function(){
        console.log(`${this} stabs you in the back and steals your wedding ring while saying 'My Preciouuuuuus'`)
      },/*waitPeriodInMilliseconds*/ 500);
    }
};
// call it in the context of the gollum object
gollum.saysHi();
// => Hi! I am Gollum! Gollum!!!!
// => "[object Window] stabs you in the back and steals your wedding ring while saying 'My Preciouuuuuus'"
// => BANG!

// what happens if we use an arrow function instead?
let gollumWithArrowFunctions = {
    name: 'Golum! Golum!',
    toString(){ return `${this.name}!!!`;},
    saysHi(){ 
      console.log(`Hi! I am ${this}`);
      setTimeout(() =>
        console.log(`${this} stabs you in the back and steals your wedding ring while saying 'My Preciouuuuuus'`)
      ,/*waitPeriodInMilliseconds*/ 500);
    }
};
gollumWithArrowFunctions.saysHi();
// => Hi! I am Gollum! Gollum!!!!
// => Golum! Golum!!!! stabs you in the back and steals your wedding ring while saying 'My Preciouuuuuus'
// => Worked!

// Another example with jQuery
// This is the original example
// that showcased the problem with 'this' and callbacks
console.log("===== this is what happens when trying to use `this` within a callback ====");
function UsersCatalogJQuery(){
    "use strict";
    var self = this;
    
    this.users = [];
    getUsers()
    
    function getUsers(){
        $.getJSON('https://api.github.com/users')
        .success(function(users){
            // console.log(users);
            // console.log(this);
            try {
              this.users.push(users);
            } catch(e) {
              console.log(e.message);
            }
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

console.log("===== but we can fix it with the arrow function! ====");
function UsersCatalogJQueryArrowFunction(){
    "use strict";
    this.users = [];
    this.getUsers = function getUsers(){
        $.getJSON('https://api.github.com/users')
        .success(users => this.users.push(users)); // hello arrow function
    };
    
    this.getUsers();
}
var catalog = new UsersCatalogJQueryArrowFunction();

console.log("Arrow function gotchas: beware of using arrow functions in object literals");

let raistlin = {
  name: 'Raistlin',
  toString(){ return this.name;},
  deathRay: () => console.log(`${this} casts a terrible ray of deaaaath!`)
}
raistlin.deathRay();
// => undefined casts a terrible ray of deaaaath!
// => Babel uses strict mode, that's why this evaluates to undefined instead of window. Remember, arrow functions have no this, the arrow function is a closure that refers to the enclosing this (which is either Window or undefined)


console.log("Arrow function gotchas: you cannot bind arrow functions")
// if you try to bind an arrow function to an object it won't work

let saruman = {
  name: 'Saruman, the White',
  toString(){ return this.name;},
  raiseUrukhai(){
    console.log(`${this} raises a Urukhai from the pits of Isengard`);
    return {name: 'Uruk', hp: 500, strength: 18};
  },
  telekineticStaffAttack: () => 
    console.log(`${this} uses his staff to throw you across the room "telekinetically" speaking`)
}

// we have defined a couple of methods
// raiseUrukhai is a normal function
// telekineticStaffAttack is an arrow function
// if we call them
saruman.raiseUrukhai();
// => Saruman, the White raises a Urukhai from the pits of Isengard

saruman.telekineticStaffAttack()
// => undefined uses his staff to throw you across the room \"telekinetically\" speaking
// => Babel uses strict mode, that's why this evaluates to undefined instead of window. Remember, arrow functions have no this, the arrow function is a closure that refers to the enclosing this (which is either Window or undefined)

// if we try to bind these two methods to a new object
let boromir = {name: 'Boromir of Gondor', toString(){return this.name;}};
let raiseUrukhaiBound = saruman.raiseUrukhai.bind(boromir);
raiseUrukhaiBound();
// => Boromir of Gondor raises a Urukhai from the pits of Isengard

let telekineticStaffAttackBound = saruman.telekineticStaffAttack.bind(boromir);
telekineticStaffAttackBound();
// => undefined uses his staff to throw you across the room \"telekinetically\" speaking
// didn't work, not telekinetic staff attack for Boromir



console.log('>> Even though arrow functions are not bound functions' +
           'they behave in much the same way');
let Warg = function(name, size){
   this.size = size;
   this.name = `${name}, the ${size} warg`;
   // wargs don't bark, they wark
   this.wark = () => console.log(`${this.name} warks!: Wark! Wark!`);
   this.jump = (function(){
     console.log(`${name} jumps around`);
   }).bind(this);
}
let willyTheWarg = new Warg('willy', 'litte');

// this is an arrow function
willyTheWarg.wark();
// => willy, the litte warg warks!: Wark! Wark!

// and this is the bound function
willyTheWarg.jump();
// => willy jumps around

console.log('If we extract the bound function from willyTheWarg');
// this is all well and good. But what happen if we are mean and take the functions away from willy? 
// the bound function remains bound to willyTheWarg
let jump = willyTheWarg.jump;
jump();
// => willy, the litte warg warks!: Wark! Wark!

let goblin = {jump: jump};
goblin.jump();
// => willy, the litte warg warks!: Wark! Wark!

console.log('And if we do the same with the arrow function')
let wark = willyTheWarg.wark;
wark();
// => willy, the litte warg warks!: Wark! Wark!

goblin.wark = wark;
goblin.wark();
// => willy, the litte warg warks!: Wark! Wark!



console.log(`>> You cannot use apply or call on arrow functions either. Again they don't have their own *this* so it doesn't make sense to set it via apply or call`)
let caragor = {toString(){return 'scary caragor';}}
let howl = function({times}){
  console.log(`${this} howls to the moon ${times} times!`);
}
// a normal function let's you set its context explicitly via apply or call
howl.apply(caragor, [{times: 3}]);
// => scary caragor howls to the moon 3 times!
howl.call(caragor, {times: 4});
// => scary caragor howls to the moon 4 times!

// an *arrow function* completely ignores the value of `this` passed as argument
willyTheWarg.wark.apply(caragor);
// => willy, the litte warg warks!: Wark! Wark!
willyTheWarg.wark.call(caragor);
// => willy, the litte warg warks!: Wark! Wark!



console.log(`>>*arrow functions* don't have arguments object`)
// any normal function in javascript has an arguments object
// that you can use to access the arguments with which a function was called
function rememberWhatISaid(){
  console.log(`you said: ${Array.from(arguments).join(', ')}`);
}
rememberWhatISaid('hello', 'you', 'there');
// => you said: hello, you, there
rememberWhatISaid('supercalifragilisticusespialidosus')
// => you said: supercalifragilisticusespialidosus



// but what happens with arrow functions?
//let forgetWhatISaid = () => {
//  console.log(`I am going to forget that you said: ${arguments}`);
//}
//forgetWhatISaid('I said Wazzaaaaa');
// => error ReferenceError: arguments is not defined



// the *arrow function* tries to access a non existing variable in its environment and throws a reference error
// let's define arguments in the outer scope
//var arguments = ['trying something crazy'];
//let forgetWhatISaid = () => {
//  console.log(`I am going to forget that you said: ${arguments}`);
//}
//forgetWhatISaid('I said Wazzaaaaa');
// => I am going to forget that you said: trying something crazy



// or we can wrap the arrow function in another function 
function createMemoryWisp(){
  return () => console.log(`*MemoryWisp*: You said... ${Array.from(arguments).join(', ')}`);
}
let wispRememberThis = createMemoryWisp(1, 2, 3, 4, 'banana!');
wispRememberThis('important password', '123456789');
// => *MemoryWisp*: You said... 1, 2, 3, 4, banana!


// how can we take a multiple and arbitrary number or arguments with arrow functions? Use the rest operator:
function createMemoryWispWithRest(){
  return (...thingsToRemember) => 
        console.log(`*MemoryWisp*: You said... ${thingsToRemember.join(', ')}`);
}
let wispRememberThisAgain = createMemoryWispWithRest();
wispRememberThisAgain('important password', '123456789');
// => *MemoryWisp*: You said... important password, 123456789

