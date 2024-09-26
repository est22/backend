// console.log(Math.abs(-10));

// console.log(Math.ceil(1.4));
// console.log(Math.floor(1.4));
// console.log(Math.round(1.49));
// console.log(Math.round(1.5));
// console.log(Math.trunc(1.53453));
// console.log(Math.random() * 10);
// console.log(Math.floor(Math.random() * 10) + 1);

// const num = Math.random() * 10;
// const result = Math.floor(num) + 1;

// console.log();

let i = 0
const lottery = new Set();

while (lottery.size < 6) {
  const number = Math.floor(Math.random() * 45) + 1;
  lottery.add(number);

}
console.log(lottery)


