// const numbers = [1, 2, 3, 4, 5];
// console.log(numbers[0]);

// for (let i; i < numbers.length; i++) {
//   console.log(numbers[i]);
// }

// let array = new Array(2);
// console.log(array);
// array = new Array(1, 2, 3, 4, 5);
// console.log(array);

// numbers[3] = -4;
// numbers[5] = 6;
// console.log(numbers);
// delete numbers[1];
// console.log(numbers);

// let bts1 = ["진", "슈가", "제이홉", "RM"];
// console.log(bts1);
// let bts2 = new Array("지민", "뷔", "정국");
// console.log(bts2);

// console.log(bts1.indexOf("슈가"));
// console.log(bts1.indexOf("RM"));
// console.log(bts1.indexOf("지민"));

// // append
// bts1.push("차은우");
// console.log(bts1);
// console.log(bts1.length);
// bts1.unshift("이도현"); // append to the front
// console.log(bts1);

// //delete
// let first = bts1.shift(); // delete 1st item
// console.log(bts1);
// console.log(first);

// let last = bts1.pop(); // delete 1st item
// console.log(last);
// console.log(bts1);

// const deleted = bts1.splice(1, 1);
// console.log(bts1);
// console.log(deleted);
// bts1.splice(1, 0, "ckdmsdn", "dlehgus");
// console.log(bts1);

// let bts3 = bts1.slice(0, 2);
// console.log(bts3);
// console.log(bts1);

// bts3 = bts1.slice(-1);
// console.log(bts3);
// bts3 = bts3.slice(-3);
// console.log(bts3);

// const bts = bts1.concat(bts2);
// console.log(bts);
// const rbts = bts.reverse();
// console.log(rbts);
// let members = bts.join(", ");
// console.log(members);


// const anyone = ['슈가', '차은우', '박서준', '이도현', '제이홉', '주우재', '지민'];
// const bts = ['진', '슈가', '제이홉', 'RM', '지민', '뷔', '정국']
// let array = new Array();

// for (let member=0, member < anyone.length, member++){
//     if (list[member] in bts) {
//         array.append(list[member])
//     }
   
// }
// console.log(array)


const anyone = ['슈가', '차은우', '박서준', '이도현', '제이홉', '주우재', '지민'];
const bts = ['진', '슈가', '제이홉', 'RM', '지민', '뷔', '정국'];
let array = [];

for (let member = 0; member < anyone.length; member++) {
    if (bts.includes(anyone[member])) {
        array.push(anyone[member]);
    }
}

console.log(array);


