let date = new Date();
let hours = date.getHours()

if (hours < 11) {
  console.log(`아침`);
} else {
    if (hours < 15) {
      console.log('점시ㅁ');
    } else {
        console.log(`저녁`);
    }
}
