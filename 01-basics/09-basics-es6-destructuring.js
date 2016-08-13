/* 
 *
 * JavaScript-mancy Chapter 9 - ES 6 Destructuring
 *
 */

// destructuring lets you extract properties within an object inside variables of your own choosing
console.log('========= DESTRUCTURING =========');
console.log('\n========= DESTRUCTURING OBJECTS =========');
console.log(`destructuring let's you extract properties within an object inside variables of your own choosing`);
let pouch = {coins: 10};
let {coins} = pouch;
console.log(`extracted ${coins} coins from my pouch`);
// => extracted 10 coins from my pouch



console.log('And a real world destructuring example...')
let conan = {
        firstName: 'Conan',
        lastName: 'the barbarian',
        height: 178,
        weight: 90,
        email: 'conan.thecimmerian@akilonia.com',
        toString() {
            return this.firstName;
        }
    };
let javascriptmancyCourse = {
    signUp(person){
      let {firstName, lastName} = conan;
      console.log(`Thank you ${firstName}, ${lastName}!! 
You have successfully signed up to our very special JavaScript course!
Welcome and prepare to learn some JavaScript!`);
}};

javascriptmancyCourse.signUp(conan);
// => Thank you Conan, the barbarian!! You have succesfully signed up to
//    our very special JavaScriptmancy course! Welcome and prepare to
//    learn some JavaScript!



console.log('You are not forced to use the same variable names as the name of the properties you are extracting. You can use this destructuring syntax to use a different name:')
let { lastName:title } = conan;
// this is the same as doing let title = conan.lastName;
console.log(`Got Conan lastName as a title! Behold! ${title}!`);
// => Got Conan lastName as a title! Behold! the barbarian!



console.log('Additionally, if you try to destructure a property that does not exist you get undefined. What did you expect?')
let {bills} = pouch;
console.log(`there's ${bills} bills in my pouch`);
// => there's undefined bills in my pouch



console.log('You can use defaults to provide a safe value (not undefined) when a property is not found within an object')
let {billsByDefault=10} = pouch;
console.log(`I did not have no bills in ma pouch but now I got ${billsByDefault}, magic!`);
// => I did not have no bills in ma pouch but now I got 10



// destructuring with existing variables: don't do it
console.log('You cannot use destructuring with an existing variable:')
console.log(`This doesn't work:
let coins = 0
{coins} = pouch;
`);



// destructuring deep inside an object
console.log('But you can use destructuring with properties deep within an object graph');
let bag = { 
    leftPocket: {
        tobaccoPouch: ['pipe', 'tobacco']
    }, 
    rightPocket: [pouch],
    interior: ['10 pieces of dried meat', 'toilet paper', 'leprechaun']
};

let {leftPocket: {tobaccoPouch}} = bag;
console.log(`Let's see what I've got in my tobaccoPouch: ${tobaccoPouch}`);
// => Let's see what I've got in my tobaccoPouch: pipe,tobacco

let {leftPocket: {secretPouch}} = bag;
console.log(`Let's see what I've got in my secret pouch: ${secretPouch}`);
// => Let's see what I've got in my secret pouch: undefined

// but be careful because if you try to extract a deep property and
// there's a missing object along the object graph you'll get an error
try {
  let {centralPocket: {superSecretPouch}} = bag;
}catch (e){
  console.log(e.message);
  // => Cannot read property 'superSecretPouch' of undefined
}




console.log('\n\n\n========= DESTRUCTURING ARRAYS =========');
console.log('You can use destructuring on arrays as well:')
let [one, two, three] = ['globin', 'ghoul', 'ghost', 'white walker'];
console.log(`one is ${one}, two is ${two}, three is ${three}`)
// => one is globin, two is ghoul, three is ghost



console.log('You can jump over items in the array:')
let [firstMonster, , , fourthMonster] = 
  ['globin', 'ghoul', 'ghost', 'white walker'];
console.log(`the first monster is ${firstMonster}, the fourth is ${fourthMonster}`)
// => the first monster is globin, the fourth is white walker



console.log('this comes very handy if you want to get the first element of an array');
let [first, ...rest] = ['goblin', 'ghoul', 'ghost', 'white walker'];
console.log(`first is ${first} and then go all the rest: ${rest}`)
// => first is goblin and then go all the rest ghoul, ghost, white walker



console.log('Unfortunately this trick doesn\'t work for the last element because the rest operator is very greedy (so [...initialOnes, last] wouldn\'t make sense)' +
'But you could be a super crafty fox and do something like this');
let [last] = Array.from(['goblin', 'ghoul', 'ghost', 'white walker']).reverse();
console.log(`last is ${last}`);
// => last is white walker



console.log('Another use case for array destructuring is swapping values of variables')
console.log(`first is ${first}, last is ${last}`);
// => first is goblin, last is white walker
[first, last] = [last, first];
console.log(`but wait! Now first is ${first}, last is ${last}`)
// => but wait! Now first is white walker, last is goblin



console.log('You can also use defaults with array destructuring:')
let [aMonster, anotherMonster, yetAnotherMonster='cucumber'] 
    = ['globin', 'ghoul'];
console.log(`We've got a monster that is a ${aMonster}, another that is ${anotherMonster}, and yet another one that is a ${yetAnotherMonster}`)
// => We've got a monster that is a globin, another that is ghoul, and yet another one that is a cucumber


console.log('\n\n\n========= DESTRUCTURING ARGUMENTS =========');
// With destructuring we can unpack the direction from
// the incoming object and use it right away
function castIceCone(mana, {direction}){
    var caster = this || 'God almighty';

    // new template strings
    console.log(`${caster} spends ${mana} mana 
and casts a terrible ice cone ${direction}`);
}
// => Randalf the Mighty spends 10 mana and 
//    casts a terrible ice cone towards Mordor

let randalf = {
    toString: function(){return 'Randalf the Mighty';},
    castIceCone: castIceCone
};
let options = { direction: 'towards Mordor'}
randalf.castIceCone(10, options);

// It also works with arrays
function castMiniIceCone(mana, [target, ...others]){
    var caster = this || 'God almighty';

    // new template strings
    console.log(`${caster} spends ${mana} mana 
and casts a super teeny tiny ice cone that only reaches
${target} but misses ${others} because it is so tiny and cute`);
}
randalf.castMiniIceCone = castMiniIceCone;
randalf.castMiniIceCone(10, ['giant', 'troll', 'death knight']);
// => Randalf the Mighty spends 10 mana 
//    and casts a super teeny tiny ice cone that only reaches
//    giant but misses troll,death knight because it is so tiny and cute

        




