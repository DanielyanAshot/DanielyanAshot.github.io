import {PI, pow, hypotenuse, circleArea} from "Math.js"
import format from "format.js"

console.log(format("an area of a circle with a radius of 8", circleArea(8)));
console.log(format("hypotenuse of a triangle with sides 8 and 11", hypotenuse(8, 11).hypotenuse));
console.log(format("5 to the power of 9", pow(5, 9)));