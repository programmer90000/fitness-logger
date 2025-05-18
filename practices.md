# Practices to follow when making this program

## Console
Use all of the different console statements as required, such as `console.table` and `console.time`

Use `console.trace` to find out where the console statement was called

Use CSS in console log statements to make it clear what the console log statement is. For example: `console.log(‘%c My Friends’, ‘color: orange; font-weight: bold’)`

## Syntax
Use the spread syntax `...`

Avoid deep nesting by using promises instead of callbacks

Avoid large functions. Instead, break the function into multiple smaller functions

Use for...of when using for loops which loop over an entire object or array. For example instead of:

```
let cities = ["City 1", "City 2", "City 3", "City 4", "City 5"];
let cityCount = cities.length;
for(let i = 0; i < cityCount; i++) {
    console.log(cities[i]);
}
```
write
```
for(city of cities) {
    console.log(city);
}
```

## Naming
Use lengthy variable names. Do not shorten variable names

Use kebab-case for variable and function identifiers

Use PascalCase for class identifiers

Unless it is clear what a number stands for, put it into a variable. For example, instead of:
```
for (let i = 0; i < 15; i++) {}
```
write
```
const numberOfReps = 15;
for (let i=0; i < numberOfReps; i++) {}
```

## Styling
Do not use inline styling

Write custom style names before style names from CSS libraries

## Object Destructuring
Use object destructuring in any file I need to

Use object destructuring inside the function, not in the function parenthesis

## Documentation
Use multiline comments at the top of each file to explain the purpose of the file

## Dependencies
Do not use the `./` syntax for files in the same directory

Import dependencies in the following order:
```
External imports (e.g. React)
Internal imports, like relative paths (e.g. ../Buttons/button)
In folder imports (e.g. header.js)
```

## Formatting
Every group must be divided by white space