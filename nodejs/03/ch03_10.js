const fs = require("fs");
const { type } = require("os");
const result = fs.readFileSync("test.json", "utf-8");
// console.log(result); // JSON으로 출력 


const data = JSON.parse(result);
// console.log(data); // 객체 모양으로 출력 
// console.log("-----------------")
// console.log(data["result"]); // 객체 모양 배열으로 출력 


const arr = data["result"];
console.log(typeof(arr)); // object

arr.forEach((x) => {
    console.log(x.title, "/", x.content);
    // console.log("-----------------");
});


