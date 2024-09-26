/*
function sayHello() {
  return "Hello";
}
console.log(sayHello());

// function multiply(num) {
//   for (let i = 1; i < 11; i++) {
//     console.log(`${num} x ${i} = ${num * i}`);
//   }
// }

// multiply(4);

// function sayHello2(name) {
//   return `Hello ${name}`;
// }

// let greeting = sayHello2("RO");
// console.log(greeting);
// console.log(sayHello2("moring"));

// function add(num1, num2) {
//   return num1 + num2;
// }
// let result = add(5, 4);
// console.log(result);

// function grade(score) {
//   if (score > 90) {
//     return "A";
//   } else if (score > 80) {
//     return "B";
//   } else if (score > 70) {
//     return "C";
//   } else if (score > 60) {
//     return "D";
//   } else if (score > 50) {
//     return "E";
//   } else {
//     return "F";
//   }
// }
// console.log(grade(34));
// console.log(grade(72));
// console.log(grade(81));

// rest 매게변수
// function sum(...nums) {
//   console.log(nums);
// }
// sum(1, 2, 3, 4, 5);

// function sum1(num1, num2, ...nums) {
//   console.log(num1);
//   console.log(num2);
//   console.log(nums); // [ 3, 4, 5 ]
//   console.log(...nums); // 3 4 5 (전개구문)
// }
// sum1(1, 2, 3, 4, 5);

// function sum2(...nums) {
// let sum = 0;
//     for (let i of nums) {
//       sum += i
//   }
//   return sum;
// }
// console.log(sum2(1, 2, 4, 6));

function operator(a, op, b) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
  }
}
// console.log(operator(1,2,"+"))
// console.log(operator(1,3,"-"))
// console.log(operator(1,223,"*"))
// console.log(operator(241, 2, "/"))

// const sayHello3 = sayHello;
// sayHello3();
// sayHello();

// const calculator = operator;
// console.log(calculator(2, "+", 3));

function sayHello1(name) {
  console.log(`Hello ${name}`);
}
function sayHi(name) {
  console.log(`Hi ${name}`);
}

function greet(name, callback) {
  //doSth => 인터넷 데이터수령, 하드디스크에서 데이터 읽어와서 처리
  console.log(name);
  callback(name);
}
greet("우영어", sayHi);
greet("tjstodsla", sayHello1);

function sum(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function mutiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function calc2(a, b, callback) {
  return callback(a, b);
}
console.log(calc2(1, 2, sum));

// 다양한 함수 정의 방식
function add1(n1, n2) {
  return n1 + n2;
}
console.log(add1(1, 2));

const add2 = function (n1, n2) {
  return n1 + n2;
};
console.log(add2(1, 2));

const add3 = (n1, n2) => {
  return n1 + n2;
};
console.log(add3(1, 2));

const add4 = (n1, n2) => n1 + n2;
console.log(add3(4, 3));
console.log(add4(3, 4));


// calc2 함수를 화살표함수로 호출하기
function calc2(n1, n2, callback) {
  return callback(n1, n2);
}
console.log(calc2(1, 2, divide));

console.log(calc2(1, 2, (n1, n2) => n1 + n2));

 */
const numbers = new Set();
function lottery_game() {
    while (true) {
      const number = Math.floor(Math.random() * 45) + 1;
        numbers.add(number);
        if (numbers.size==6){break}
    }
    return [...numbers].sort((a,b)=>a-b);
    // return [...numbers].sort((a,b)=>b-a);
    //const array = Array.from(numbers);
    //return array.sort((a,b)=>a-b)
}
numbers.sort()

console.log(lottery_game());

