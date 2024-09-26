let gender = 'male';
let age = 25;
const adult = 19;

if (age < adult) {
    console.log("당신은 미성년자입니다.")
} else {
    console.log("당신은 성인입니다.")
}



if (age > adult) {
    if (gender === 'male') {
        console.log("당신은 성인 어른입니다")
    } else {
        console.log("당신은 미성년 여성입니다")
    }
    
}

const browser = '크롬';
let browserName;

if (browser=='크롬') {
    browserName = 'Chrome'
} else if (browser == '인터넷익스플로러'){
    browserName = 'IE'
} else if (browser == '사파리'){
    browserName = 'Safari'
} else {browserName = 'Firefox'}

console.log(`브라우저명은 ${browserName}`)



let score = 14;
let grade;
if (score > 90) {
    grade = 'A'
} else if (score > 80){
    grade = 'B'
} else if (score > 70){
    grade = 'C'
} else if (score > 60){
    grade = 'D'
} else if (score > 50){
    grade = 'E'
} else { grade = 'F'}

console.log(`성적은 ${grade}`)