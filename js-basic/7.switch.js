let browser;
let browserName;


switch (browser){
    case 'Chrome':
        browserName = '크롬'; break;
    case 'FF':
        browserName = '파이어폭스'; break;
    case 'Safari':
        browserName = '사파리'; break;
    case 'IE':
        browserName = '인터넷익스플로러'; break;
    default:
        browserName = '알려지지 않은 브라우저'
}

console.log(`브라우저 명은 ${browserName}`)


let score;
let grade;

switch (grade){
    case score >= 90:
        grade = 'A'; break;
        case score >= 80:
            grade = 'B'; break;
        case score >= 70:
            grade = 'C'; break;
        case score >= 60:
            grade = 'D'; break;
        case score >= 50:
            grade = 'E'; break;
        default:
            grade = 'F'; 

}

console.log(`성적은 ${grade}`)