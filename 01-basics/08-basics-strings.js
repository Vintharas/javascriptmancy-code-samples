/*

JavaScript-mancy: Mastering the Arcane Art of Writing Awesome JavaScript for C# Devs
Chapter 08 - A Guide to Strings, Finding the Right Words and Proper Spell Intonation

*/



console.log('===== #1. The Basics of Strings in JavaScript ======');

// you can create a string using double quotes
console.log("this is a: " + typeof "Klaatu... verata... n... Necktie. Nectar. Nickel. Noodle.")
// => string

// or using single quotes
console.log('this is a: ' + typeof 'Klaatu... verata... n... Necktie. Nectar. Nickel. Noodle.')
// => string

// you'll often use a ' to escape "
console.log("Ya ain't gonna need that fairy dust!")
// => ya ain't gonna need that fairy dust!

// and vice versa
console.log('it was, in essence, a sophisticated heat beam which we called a "laser."')
// => it was, in essence, a sophisticated heat beam which we call a "laser"

// you can use the + operator to concatenate two strings
console.log("Three rings " + "for the elves")
// => three rings for the elves

// the + operator is often used to inject data into text templates
var conan = {toString: function() {return 'Conan, the cimmerian';}}
console.log(conan + " was a famous hero of a past age")
// => Conan, the cimmerian was a famous hero of a past age

// and you can also use it to create multiline strings:
console.log("There are few men with more blood on their hands than me. " + "None, that I know of. " + 
"The Bloody-Nine they call me, my enemies, and there’s a lot of ’em")
// => "There are few men with more blood on their hands than me. None, that I know of.The Bloody-Nine they call me, my enemies, and there’s a lot of ’em"

// alternatively you can use a backslash at the end of each row
console.log("There are few men with more blood on their hands than me.\ None, that I know of.\
The Bloody-Nine they call me, my enemies, and there’s a lot of ’em")
// => "There are few men with more blood on their hands than me. None, that I know of.The Bloody-Nine they call me, my enemies, and there’s a lot of ’em"

// you can also create multiline strings by using the newline character /n

console.log("There are few men with more blood on their hands than me.\n None, that I know of.\n The Bloody-Nine they call me, my enemies, and there’s a lot of ’em")
// => "There are few men with more blood on their hands than me.
// None, that I know of.
// The Bloody-Nine they call me, my enemies, and there’s a lot of ’em"

// JavaScript uses the backslash as escape character \
console.log('\'')
// => '
console.log("\"")
// => "


console.log('===== #2. Strings are not arrays of characters, they are array-like objects ======');

var justDoIt = 'Just DO IT!';

// they have a length property
console.log('length of justDoIt: ' + justDoIt.length);
// => length of justDoIt: 11

// they can be enumerated
for (var c in justDoIt) console.log(justDoIt[c]);
// => J
// => u
// => etc...

// they don't have array methods
console.log(justDoIt.forEach)
// => undefined

// you can use some of the array methods on a string.
// for instance we can use the forEach array method to traverse a 
console.log('--- traversing a string with forEach')
Array.prototype.forEach.call(justDoIt, function(c){console.log(c);})
// => J
// => u
// => etc...

console.log('--- inject a character between string characters')
console.log(Array.prototype.join.call(justDoIt, '--'))
// => J--u--s--t-- --D--O-- --I--T--!

// but if you try to use an array method that would cause the array to mutate
console.log('--- reversing a string with reverse')
try{
  var TiOdTsuj = Array.prototype.reverse.call(justDoIt)
  console.log(TiOdTsuj) 
} catch (error){
  console.log(error.message);
  // BOOM!
  // => TypeError: cannot assign to read only property '0'....
}

console.log('===== #3. String methods ======')

// Strings have a limited series of utility methods
// You can use concat to concatenate strings
console.log(String.prototype.concat('hello my nemesis', 'we meet again'));
// => hello my nemesis we meet again
console.log(justDoIt.concat(' - Shia Labeaouf'))
// => Just DO IT! - Shia Labeaouf

// uppercase and lowercase
console.log(justDoIt.toUpperCase());
// => JUST DO IT!
console.log(justDoIt.toLowerCase());
// => just do it!

// you can extract characters via charAt
console.log(justDoIt.charAt(0))
// => j

// or find whether a given text is part of a string
console.log(justDoIt.indexOf('DO'))
// => 5

// which you would often see used to find if the text is part of the string
console.log(justDoIt.indexOf('DO') !== -1)
// => true

// alternatively you can use `search` that expects a regex as argument
console.log(justDoIt.search(/DO/))
// => 5

// or `match` to match a string with a regular expression
console.log(justDoIt.match(/DO/))
// => ["DO"]
console.log(justDoIt.match(/DO.*/))
// => ["DO IT!"]

// the replace method let's you replace a piece of text with another
console.log(justDoIt.replace('DO IT!', 'DANCE!'))
// => Just DANCE!

// it can replace multiple occurrences
// you just use a regular expression with the g (global flag)
console.log('a dragon is a creature that can breathe fire'.replace(/a /g, 'the '))
// => the dragon is the creature that can breathe fire

// the substr(startIndex, length) method lets you extract a substring 
console.log('a dragon is a creature that can breathe fire'.substr(2, 6))
// => dragon

// and so does the substring(startIndex, endIndex)
console.log('a dragon is a creature that can breathe fire'.substring(2, 6))
// => drag

// you can split an string in pieces using `split`
console.log('a dragon is a creature that can breathe fire'.split(' '))
// => ["a", "dragon", "is", "a", "creature", "that", "can", "breathe", "fire"]


console.log('===== #4. ES6 new String methods ======')
// ES6 brings more string methods! yey!
// with startsWith you can check whether or not a string starts with some text
console.log('thunder and lightning!'.startsWith('thunder'))
// => true

// in a similar way endsWith checks whether or not a string ends with some text
console.log('thunder and lightning!'.endsWith('lightning!'))
// => true

// includes just like C# contains checks whether a string contains some text within 
console.log('thunder and lightning!'.includes('thunder'))
// => true
console.log('thunder and lightning!'.includes('lightning!'))
// => true
console.log('thunder and lightning!'.includes('and'))
// => true

// finally ES6 brings the repeat method that lets you create a new string
// by repeating an existing one
console.log('NaN'.repeat(10) + ' BatMan!')
// => NaNNaNNaNNaNNaNNaNNaNNaNNaNNaN BatMan!


console.log('===== #5. ES6 Template literals ======')

// ES6 provides a new and very powerful way to work with strings:
// ES6 template literals

// You can create template literal using backticks
console.log(`Rain fire and destruction upon thy enemies!`)
// => Rain fire an destruction upon thy enemies!

// You can include single and double quotes within template literals
console.log(`Rain fire n' destruction upon thy "enemies"!`)
//=> Rain fire n' destruction upon thy "enemies"!

// A great strength of template literals is string interpolation
let target = 'Sauron', spell = 'balefire'
console.log(`Blast ${target} with ${spell}!`)
// => blast Sauron with balefire!

// Additionally you can inject any valid JavaScript expression in a template literal
function calculateDamage(modifier){ 
  return Math.round(modifier*Math.random())
}
console.log(`Blast ${target} with ${spell} making ${calculateDamage(10)} damage`)
// => Blast Sauron with balefire making 4 damage

// You can also write multiline strings in a much straightforward way
let multiline = `I start in this line,
and then I go to the next,
because there are few things in life,
that I like best`
console.log(multiline);
// => I start on this line, ....

console.log('===== #6. ES6 Tags ======')

// template literals come with an additional feature called tags
// tags allow you to customize how a template literal is parsed into a string
// to use a tag you prepend it to the template literal
let clothes = 'boots',
    orcLikesBoots = orcSpeech`I like those ${clothes} that you're wearing!`

// a tag is merely a function that takes each string portion of a template 
// literal and each substitution (the expressions that you are going to inject in the string)
function orcSpeech(literals, ...substitutions){
  console.log(literals); // => ['I like those ', ' that you're wearing']
  console.log(substitutions); // => ['boots']
  
  let phrase = literals[0];
  substitutions.forEach(function(s, idx){
    phrase += `${s}${literals[idx+1]}`
  });
  
  return phrase.replace(/s/g, 'sss').replace(/r/g, 'rr')
}

console.log(orcLikesBoots);
// => I like thossse bootsss that you'rre wearring!


// you can also access the raw string literals
// that include special characters like /n (end of line), /t (tab), etc
function orcSpeechRaw(literals, ...substitutions){
  console.log(literals.raw); // => ['I like those ', ' that you're wearing']
  console.log(substitutions); // => ['boots']
  
  let phrase = literals.raw[0];
  substitutions.forEach(function(s, idx){
    phrase += `${s}${literals.raw[idx+1]}`
  });
  
  return phrase.replace(/s/g, 'sss').replace(/r/g, 'rr')
}

console.log(orcSpeech`I like those ${clothes}\n\n that you're \twearing!`)
// => ["I like those ", "
// 
// that you're  wearing!"]
// ['boots']
// I like thossse bootsss
//
// that you'rre wearring

console.log(orcSpeechRaw`I like those ${clothes}\n\n that you're \twearing!`)

// => ["I like those ", "\n\n that you're \twearing!"]
// ["boots"]
// "I like thossse bootsss\n\n that you'rre \twearring!"


// an interesting example of template literals could be
// to create your own HTML templating engine

function html(literals, ...substitutions){
  let phrase = literals[0];
  substitutions.forEach(function(s, idx){
    if (Array.isArray(s)) s = s.join('\n'); // if array convert ot string
    phrase += `${s}${literals[idx+1]}`;
    // you could also add some special characters processing
    // for parsing non HTML compliant characters like &
  });
  return phrase;
}

function ul(literals, ...substitutions){
  return `<ul>${html(literals, ...substitutions)}</ul>`;
}

function li(literals, ...substitutions){
  return `<li>${html(literals, ...substitutions)}</li>`;
}

let inventory = [{name: 'rusty sword', price: 2},
                {name: 'health potion', price: 10},
                 {name: 'medallion of Valor', price: 300}];

console.log(ul`
${inventory.map(function(item){ return li`${item.name}: ${item.price} silvers`})}
`)
// => "<ul>
// <li>rusty sword: 2 silvers</li>
// <li>health potion: 10 silvers</li>
// <li>medallion of Valor: 300 silvers</li>
// </ul>"

// and if we used arrow functions it will be even more beautiful
// but let's not get ahead of ourselves XD
console.log(ul`
${inventory.map(item => li`${item.name}: ${item.price} silvers`)}
`)












