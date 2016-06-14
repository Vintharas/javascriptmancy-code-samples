/* 
 *
 * JavaScript-mancy 
 * Arrays: The All-in-One Data Structure
 *
 */

console.log('========== JavaScript\'s Array ============');

// The easiest way to instantiate an array is using the literal form:
var rightPocket = [];
console.log('This is what I have in my right pocket: ' + rightPocket);
// => This is what I have in my right pocket: 
// => 

// Although you can use the Array constructor as well
var leftPocket = Array();
console.log('And this is what I have in my left pocket: ' + leftPocket);
// => And this is what I have in my left pocket: 
// => 

// which behaves a little bit more inconsistently than []
// you can create arrays of size X filled with undefines
console.log(Array(1));
// => [undefined]
console.log(Array(3));
// => [undefined, undefined, undefined]
// or have the equivalent to []
console.log(Array(1, 2, 3));
// => [1, 2, 3]

// As you would expect from any array worth its salt,
// You can set items in the array by index
rightPocket[0] = 'bearded axe';
leftPocket[0] = '10 gold coins';

console.log('right pocket: ' + rightPocket);
// => right pocket: bearded axe
console.log('left pocket: ' + leftPocket);
// => left pocket: 10 gold coins


// You can also retrieve these items by indexing the array
console.log('I have a ' + rightPocket[0] + ' bearded axe in my right pocket. I am maniac... and I have to patent this pants...');
// => I have a bearded axe bearded axe in my right pocket. I am maniac... and I have to patent this pants...


// Arrays have a dynamic size and they grow as you add more items to them
console.log('The size of my right pocket is: ' + rightPocket.length);
// => The size of my right pocket is: 1
rightPocket[1] = "orb of power";
console.log('And now it is: ' + rightPocket,length);
// => And now it is 2

// Specially interesting is the fact that you can
// have elements of different types within an Array
var leatherBag = ['20 gold coins', {name: 'wand of invisibility', charges: 1, toString(){return this.name;}}];
console.log('You examine your leather bag and find: ' + leatherBag);
// => You examine your leather bag and find: 20 gold coins,wand of invisibility





console.log('========== An Extremely Flexible Data Structure ============');

// the JavaScript Array is an all-purpose collection
// it can work as a stack with its push and pop methods
rightPocket.push('chewing gum');
console.log('You get the ' + rightPocket.pop());
// => You get the chewing gum


// it can work as a queue with its push and shift methods
leftPocket.push('cheese sandwich');
console.log('You pay the cheese sandwich with ' + leftPocket.shift() + '. That was a pricy sandwich...');
// => You pay the cheese sandwich with 10 gold coins. That was a pricy sandwich...

// you can also add an item to the beginning of the array:
leftPocket.unshift('beautiful stone');
console.log('You examine the ' + leftPocket[0] + ' in wonder.');
// => You examine the beautiful stone in wonder.

// both push and unshift let you add multiple items at the same time
leatherBag.push('dried meat', 'white feather');
leatherBag.unshift('1 copper coin', 'skeleton skull');
console.log('You look inside your leather bag and find: ' + leatherBag);
// => You look inside your leather bag and find: 
//    1 copper coin,skeleton skull,20 gold coins,
//    wand of invisibility,dried meat,white feather

// You can use the splice method to remove items from any arbitrary position 
// in an array

// For instance, remove item from the beginning of the array
var firstItem = leatherBag.splice(/* start */ 0, /* numberOfItemsToRemove */ 1);
console.log('extracted first item => ' + firstItem);
// => extracted first item => 1 copper coin

// you can use negative indexes to start from the end of the array
var lastItem = leatherBag.splice(-1, 1);
console.log('extracted last item => ' + lastItem);
// => extracted last item => white feather

var someRandomItemsInTheMiddle = leatherBag.splice(1, 2);
console.log('extracted items in the middle => ' + someRandomItemsInTheMiddle);
// => extracted items in the middle => 20 gold coins,wand of invisibility

// splice can even add items at a given point
console.log(rightPocket);
// => ["bearded axe", "orb of power"]
rightPocket.splice(1, 0, "candlestick", "yerky");
console.log(rightPocket);
// => ["bearded axe", "candlestick", "yerky", "orb of power"]

// or remove items and insert items at once
let candle = rightPocket.splice(1, 1, "secret message", "wax");
console.log(rightPocket);
// => ["bearded axe", "secret message", "wax", "yerky", "orb of power"]




console.log('========== Sorting Arrays ============');

// the sort method lets your order the elements of an array in-place
// let's sort our potions

function Potion(name, quantity){
  return {
    name, 
    quantity, 
    toString(){return `(${this.quantity}) ${this.name}`;}
  };
}

var potionsCase = [
  Potion('potion of firebreathing', 2),
  Potion('potion of vigor', 1),
  Potion('potion of major healing', 3),
  Potion('potion of cure poison', 1)
];
// the compare function f(a,b) should return:
// < -1 if a < b
// 0 if a === b
// > 1 if a > b
potionsCase.sort((p1,p2) => p1.quantity - p2.quantity);
console.log("You examine your potion case closely... " + potionsCase);
// => You examine your potion case closely... 
//     (1) potion of cure poison,
//     (1) potion of vigor,
//     (2) potion of firebreathing
//     (3) potion of major healing,

// You can use the reverse method to reverse the position
// of the items within an array
console.log("Let's' see what I can sell... " + potionsCase.reverse());
// => Let's' see what I can sell... 
//    (3) potion of major healing,
//    (2) potion of firebreathing,
//    (1) potion of cure poison,
//    (1) potion of vigor


console.log('========== Array Safe Methods ============');

// concatenate arrays with concat
var superPocket = rightPocket.concat(leftPocket);
console.log(superPocket);
// => ["bearded axe", "secret message", "wax", "yerky", 
//    "orb of power", "beautiful stone", "cheese sandwich"]

// join the elements of an array to form a string using
// an arbitrary separator
function beautifyPocket(pocket){
  return pocket.join('\n=============\n');
}
console.log(`You examine your inventory: \n
${beautifyPocket(rightPocket)}`);
// => You examine your inventory: 
//    
//    bearded axe
//    =============
//    secret message
//    =============
//    wax
//    =============
//    yerky
//    =============
//    orb of power

// the indexOf method returns the position of an item within an array
var indexOfBeardedAxe = rightPocket.indexOf('bearded axe');
console.log('The bearded axe is at position: ' + indexOfBeardedAxe);
// it is often used to find out whether or not an array contains a given item like this
if (rightPocket.indexOf('red stone') === -1)
{
    console.log("You don't have a precious red stone in your pocket");
}
// indexOf returns the first ocurrence of an item in an array, alternative you can use lastIndexOf to find the last ocurrence of an item

// The last safe array method is `slice` which a non-destructive alternative to `splice`
console.log('leather bag has ' + leatherBag.length + ' items: ' + leatherBag);
// => leather bag has 2 items: skeleton skull,dried meat
// let's be god and reproduce the dried meat
console.log(leatherBag.slice(/* start */ 1, /* end */ 3));

// slice allows for negative indexes and the end parameter is optional
// to extract an array with the last item of an array do:
var lastItem = leatherBag.slice(-1);
console.log(lastItem);
// => ["dried meat"]

console.log('========== Iterating Arrays ============');
console.log('========== Prior to ES6 - for/in forEach ================');

// the for/in loop iterates over the properties of any object(*)
// (* those that are enumerable, we'll learn more about this in the future)
console.log('You examine your inventory: ');
for(var index in leatherBag){
  console.log(leatherBag[index]);
}
// => You examine your inventory: 
//    skeleton skull"
//    dried meat"

// the forEach method lets you iterate directly on each item
console.log('You examine your inventory.... closer: ')
leatherBag.forEach(function(item) {
  console.log('You examine ' + item + ' closely');
});
// => You examine your inventory.... closer: 
//    You examine skeleton skull closely
//    You examine dried meat closely

// and additionally gives you access to index and the array itself
console.log('You examine your inventory.... veeery closely: ')
leatherBag.forEach(function(item, index, array) {
  console.log('You examine ' + item + ' closely (' + (index+1) + '/' + array.length + ')');
});
// => You examine your inventory.... veeery closely:
//    You examine skeleton skull closely (1/2)
//    You examine dried meat closely (2/2)


console.log('========= ES6 - Iterators and for/of loop ================');

console.log('You look at the stuff in your bag:');
for(let item of leatherBag){
  console.log(item);
}
// => You look at the stuff in your bag:
//    skeleton skull
//    dried meat

console.log('========= JavaScript Arrays and LINQ ========');
var shop = [
  {name: 'sword of truth', type: 'sword', damage: 60, price: 1000},
  {name: 'shield of stamina', type: 'shield', defense: 50, price: 500, 
   modifiers: [{value: 2, characteristic: 'stamina'}]},
  {name: 'minor potion of healing', type: 'potion', price: 1,
   effects: [{value: 10, characteristic: 'hitPoints'}]},
  {name: 'grand potion of healing', type: 'potion', price: 7,
   effects: [{value: 50, characteristic: 'hitPoints'}]}
];

console.log('The shopkeeper looks at you greedily and tells you:');
console.log('*These are the potions we have today sir...' +
           'they are the best in the kingdowm!*');
var potions = shop
      .filter(item => item.type === 'potion')
      .map(potion => potion.name);
for(let potion of potions){
    console.log(potion);
}
// => The shopkeeper looks at you greedily and tells you:
//    *These are the potions we have today sir...they are the best in the kingdowm!*
//    minor potion of healing
//    grand potion of healing


var totalPrice = shop
      .map(function(item){return item.price;})
      .reduce(function(total, itemPrice){
        return total + itemPrice;
      }, /* initialTotal */ 0);
console.log('The total price of the items is ' + totalPrice + 
            ' silvers');
// => The total price of the items is 1508 silvers

console.log('===== New Array Features in ES6 ========');
console.log('=== ARRAY.FROM ===');

// Array.from
// You can use it to convert array-likes to arrays
// (in this case it'd better to use the rest syntax ...items)
function sortItems(){  
  var items = Array.from(arguments);
  return items.sort();
}
console.log(sortItems('mandragora', 'amber', "elf's tongue"));
// => ["amber", "elf's tongue", "mandragora"]

// Or any iterable object
var library = new Map();
library.set('horror', ['It', 'The thing', 'horrors of Swarland']);
library.set('love', ['Romance and Betrayal', 'Beauty I']);
library.set('history', ['The fall of the Kraagg Empire']);

console.log('Welcome to the library of Anriva!\n' +
           ' These are our most valuable books');
Array.from(library).forEach(keyValuePair => {
  console.log(keyValuePair);
});
// => ["horror", ["It", "The thing", "horrors of Swarland"]]
//    ["love", ["Romance and Betrayal", "Beauty I"]]
//    ["history", ["The fall of the Kraagg Empire"]]

// Array.from has an optional map function as second argument
// just like LINQ's select, map let's you perform transformations
// in each item within the array


function sortItemsProperty(selector, ...args){  
  var items = Array.from(args, selector);
  return items.sort();
}

console.log(sortItemsProperty(i => i.price,
  {name: 'mandragora', price: 2}, 
  {name: 'amber', price: 10}));
// => [10, 2]

console.log('=== ARRAY.ISARRAY ===');
// This is how we use to check for an array
console.log('Shop is an array: ' + (shop instanceof Array));
// Now we can use Array.isArray
console.log('Shop is an array: ' + Array.isArray(shop));

console.log('=== ARRAY.OF ===');
// The Array.of method let's you instantiate arrays from a series
// of items. It works pretty much like []
let ingredients = Array.of('bat wings', 'unicorn horn', 'sesame seeds');
// => ['bat wings', 'unicorn horn', 'sesame seeds']

// why or when would you use it then?
// when creating your own Array subclasses
class ItemsArray extends Array{
  price(){
    return this.map(i => i.price).reduce((a, p) => a + p, 0);
  }
}
// how can you instantiate an array of ItemsArray in a consistent way
let itemsArray = ItemsArray.of(
  {name: 'bat wings', price: 10},
  {name: 'unicorn horn', price: 10000},
  {name: 'sesame seeds', price: 1}
)
console.log(`the price of all your wares is ${itemsArray.price()} golden coins`);
// => the price of all your wares is 10011 golden coins

console.log('=== ARRAY.COPYWITHIN ===');
/*
`Array.prototype.copyWithin()` provides a way to copy items within the same array, that is, pick a portion of an array and copy it within the same array:
*/

[1, 2, 3, 4, 5].copyWithin(/* target index */ 0, /* start */ 3, /* end */ 4);
// copies the items between indexes 3 and 4 => the item 4
// into the index 0 of the array
// [4, 1, 3, 4, 5]

// if you leave the end out, it defaults to the length of the array
[1, 2, 3, 4, 5].copyWithin(/* target index */ 0, /* start */ 3);
// [4, 5, 3, 4, 5]

console.log('=== ARRAY.FILL ===');

// Array.prototype.fill() provides a convenient way 
// to fill an existing array with a specific item:

// [].fill(item, start=0, end=this.length)
[1, 2, 3].fill(':)');               // [':)', ':)', ':)']
[1, 2, 3].fill(':)', 1);            // [1, ':)', ':)']
[1, 2, 3].fill(':)', 1, 2);         // [1, ':)', 3]


console.log('===== New Array Features in ES7 ========');
console.log('=== ARRAY.INCLUDES ===');
// array.includes provides a nice way to check for the existence
// of items within an array 
if (!rightPocket.includes('red stone'))
{
  console.log("You don't have a precious red stone in your pocket");
}
// => You don't have a precious red stone in your pocket

// much better than with indexOf
/*
// indexOf returns -1 when it can't find an item
if (rightPocket.indexOf('red stone') === -1)
{
    console.log("You don't have a precious red stone in your pocket");
}
*/



let herbs = ['sage', 'salvia', 'aloe vera'];
console.log(`Is sage the last item in my herb poach?:  ${herbs.includes('sage', herbs.length - 1)}`); 
// => Is sage the last item in my herb poach?: false
console.log(`Is aloe vera the last item in my herb poach?:  ${herbs.includes('aloe vera', herbs.length - 1)}`); 
// => Is aloe vera the last item in my herb poach?:  true


