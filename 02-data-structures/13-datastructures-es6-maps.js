/*jshint esnext: true */

/* 
 *
 * JavaScript-mancy - Chapter 13
 * Maps! JavaScript Dictinary<T,T> :) (a hash table in programming terms)
 *
 */

console.log('========== JavaScripts Map ============');
// just like Dictionary<T,T> but T could be anything anytime :)
const wizardsArchive = new Map();

// you can store stuff by key
// where they key could be anything
wizardsArchive.set('jaime', {name: 'jaime', title: 'The Bold', race: 'ewok', traits: ['joyful', 'hairless']});


// and get items
console.log('Wizard with key jaime => ', wizardsArchive.get('jaime'));
/* => Item with key jaime =>
  [object Object] {
    name: "jaime",
    race: "ewok",
    trait: ["joyful", "hairless"]
  }
*/

console.log('========== A Map can Hold Key/Values of Any Type ============');

wizardsArchive.set(42, "What is the answer to life, the universe and everything?")
console.log(wizardsArchive.get(42));
// => What is the answer to life, the universe and everything?

wizardsArchive.set('firebolt', (target) => console.log(`${target} is consumed by fire`));
wizardsArchive.get('firebolt')('frigate');
// => frigate is consumed by fire

console.log('========== Getting the size of Map ==========  ');
// you can retrieve the size of a map (the number of key value pairs)
console.log(`there are ${wizardsArchive.size} thingies in the archive`)
// => there are 3 thingies in the archive

console.log("========== Delete items with remove ========= ")
wizardsArchive.delete(42);
wizardsArchive.delete('firebolt');

console.log("========= Checking items existence with has ======== ")
                  
console.log(`Wizards archive has info on '42': ${wizardsArchive.has(42)}`);
// => Wizards archive has info on '42': false
console.log(`Wizards archive has info on 'firebolt': ${wizardsArchive.has('firebolt')}`);
// => Wizards archive has info on 'firebolt': false

console.log('========= You can also clear a map super easy! =========== ')
wizardsArchive.clear();
console.log(`there are ${wizardsArchive.size} wizards in the archive`);
// => there are 0 wizards in the archive

console.log('========== Maps are also Iterable Just Like the Array ============');

// let's add stuff back
// the set method is chainable btw!
wizardsArchive
    .set('jaime', {name: 'jaime', title: 'The Bold', race: 'ewok', traits: ['joyful', 'hairless']})
    .set('theRock', {name: 'theRock', race: 'giant', trait: ['big shoulders']});

// you can also iterate over its elements
for(let keyValue of wizardsArchive){
  console.log(`${keyValue[0]} : ${JSON.stringify(keyValue[1])}`);
}
/*
"jaime : {\"name\":\"jaime\",\"race\":\"....
"theRock : {\"name\":\"theRock\",\"race\....
*/

// it becomes nicer if you use destructuring
for(let [key, value] of wizardsArchive){
  console.log(`now with destructuring => ${key} : ${JSON.stringify(value)}`);
}
/*
"now with destructuring => jaime : {\"name\":\"jaime\",\"race\":\"....
"now with destructuring => theRock : {\"name\":\"theRock\",\"race\....
*/

// Alternatively you can use Map.prototype.forEach
wizardsArchive.forEach((key,value) => 
  console.log(`now with forEach => ${key} : ${JSON.stringify(value)}`)
);
// now with forEach => jaime: {\"name\" ...
// now with forEach => theRock: {\"name\" ...

// and over keys, or values
console.log(Array.from(wizardsArchive.keys()).join(', '));
// => jaime, theRock"
console.log(Array.from(wizardsArchive.values()).map(i => i.race).join(', '));
// => ewok, giant

console.log('======== Creating Maps from an Iterable ========= ');
// you can create a man from anything that is iterable
// for instance an array
let jaimeTheWizard = {name: 'jaime', title: 'The Bold', race: 'ewok', traits: ['joyful', 'hairless']};
let theRock = {name: 'theRock', title: 'The Mighty', race: 'giant', trait: ['big shoulders']};
let randalfTheRed = {name: 'randalf', title: 'The Red', race: 'human', traits: ['pyromaniac']};

let wizards = [jaimeTheWizard, theRock, randalfTheRed];

var wizardsByRace = new Map(wizards.map(w => [/*key*/ w.race, /*value*/ w]));
console.log(Array.from(wizardsByRace.keys()));
// => ["ewok", "giant", "human"]
console.log(wizardsByRace.get("human").name);
// => randalf

// we can formalize it by creating a helper method toMap
function* toKeyValue(arr, keySelector){
  for(let item of arr) 
    yield [keySelector(item), item];
}

var wizardsByName = new Map(toKeyValue(wizards, w => w.name));
console.log(Array.from(wizardsByName.keys()));
// => ["jaime", "theRock", "randalf"]

// you could even extend the array prototype
Array.prototype.toKeyValue = function* toKeyValue(keySelector){
  console.log('yolo')
  for(let item of this)
    yield [keySelector(item), item];
}
var wizardsByTitle = new Map(wizards.toKeyValue(w => w.title));
console.log(Array.from(wizardsByTitle.keys()));
// => ["The Bold", "The Mighty", "The Red"]

//noprotect

