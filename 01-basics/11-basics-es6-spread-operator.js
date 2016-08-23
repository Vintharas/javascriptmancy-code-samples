/* 
 *
 * Mastering The Arcane Art Of JavaScriptmancy
 * Chapter 11 - ES 6 - Spread operator
 *
 */

console.log("========== SPREAD OPERATOR =========");
/* The *spread* operator works sort of in an opposite way to the *rest* operator. Where the *rest* operator takes a variable number of arguments and packs them into an array, the *spread* operator takes and array and **expands** it into its compounding items.*/

// You can use the *spread* operator to easily concatenate arrays with each other. 
console.log("== #1 Use it to concatenate arrays ==")

// Where you would have used the *concat* method in ES5:
let newFoes = ['globin', 'ghoul'];
let knownFoesLevel1 = ['rat', 'rabbit']

let knownFoesLevel2 = knownFoesLevel1.concat(newFoes);
console.log(knownFoesLevel2);
// => ["rat", "rabbit", "globin", "ghoul"]


// in ES6 you can use the spread operator that is much cleaner
let knownFoesLevel2WithSpread = [...knownFoesLevel1, ...newFoes];
console.log(knownFoesLevel2WithSpread);
// => ["rat", "rabbit", "globin", "ghoul"]

// you can even mix regular items with arrays using the spread operator
let undead = ['zombie', 'banshee', 'vampire', 'skeleton'];
let knownFoesLevel3 = [...knownFoesLevel2, 'troll', 'orc', ...undead];
console.log(knownFoesLevel3);
// => ["rat", "rabbit", "globin", "ghoul", "troll", "orc", "zombie", "banshee", "vampire", "skeleton"]



console.log("== #2 Use it instead of apply ==")
// you have an action as an array
let action = ['hobbit', 'attacks', 'rabbit'];
// and a function that expects separate arguments
function performActionViciously(agent1, action, agent2){
    console.log(`${agent1} ${action} ${agent2} viciously`);
}
// in ES5 you would have called apply
//performActionViciously.apply(/* this */ null, action); 
// => hobbit attacks rabbit viciously

// in ES6 you can use spread operator
performActionViciously(...action); 
// => hobbit attacks rabbit viciously


// you can also use it with functions that you don't control
// instead of calling console with apply
// console.log.apply(/* this */ console.log, action);
// => 'hobbit', 'attacks', 'rabbit'
// you can use the spread operator
console.log(...action);
// => 'hobbit', 'attacks', 'rabbit'


// another example, let's say you want to extend and array with another array
let anotherAction = ['jaime', 'cleans', 'the dishes'];
let moreThingsToClean = ['the toilet', 'the hut', 'the stables'];

// in ES5 you would've done this
// Array.prototype.push.apply(anotherAction, moreThingsToClean);
// console.log(anotherAction);
// => ['jaime', 'cleans', 'the dishes', 'the toilet', 'the hut', 'the stables'];

// in ES6 you can do this:
anotherAction.push(...moreThingsToClean);
console.log(anotherAction);
// => ['jaime', 'cleans', 'the dishes', 'the toilet', 'the hut', 'the stables'];

console.log("== #3 Use it convert array-likes to arrays ==")

// select the form element with the id of minion
let form = document.querySelector('form#minion');
// when submitting the form we will call the saveCharacter function
form.addEventListener('submit', saveMinionForReal);

// you'll need to click in the 'Save' button to execute this event handler
function saveMinion(e){
    console.log('saving minion');
    let inputs =  form.querySelectorAll('input'), 
        values = [];
    
    for (let i = 0; i < inputs.length; i++) {
      values.push(inputs[i].value);
    }
    console.log(values);
    // => ["Orc", "Warrior", "18"]
    e.preventDefault();
}

// now with spread
function saveMinionWithSpread(e){
  console.log('saving minion with spread');
    let values = [... form.querySelectorAll('input')]
      .map(i => i.value);
    console.log(values);
    // => ["Orc", "Warrior", "18"]
    // create minion with the values
    e.preventDefault();
}

// You can also convert any iterable into an array using spread
let exits = new Set(['north', 'south', 'east', 'west']);
console.log(exits);
// => [object Set]
console.log([...exits]);
// => ['north', 'south', 'east', 'west];

let box = new Map();
box.set('jewels', ['emerald', 'ruby']);
box.set('gold coins', 100);
console.log(box);
// => [object Map]
console.log([...box])
// => [["jewels", ["emerald", "ruby"]], ["gold coins", 100]]

console.log("== #4 Use it to new + apply ==")

function Minion(name, minionClass, strength){
  this.name = name;
  this.minionClass = minionClass;
  this.strength = strength;
  this.toString = function(){
    return `I am ${name} and I am a ${minionClass}`;
  }
}

// if we update the callback
// now with spread
function saveMinionForReal(e){
  console.log('saving minion with spread');
    let values = [... form.querySelectorAll('input')]
      .map(i => i.value);
    console.log(values);
    // => ["Orc", "Warrior", "18"]
  
    // create minion with the values
    let newMinion = new Minion(...values);
    console.log(`Raise and live my minion: ${newMinion}!!!`)
    // => Raise and live my minion: I am Orc and I am a Warrior!!!
    
    e.preventDefault();
}

// change addEventListener above to use the new callback like this:
//form.addEventListener('submit', saveMinionForReal);
