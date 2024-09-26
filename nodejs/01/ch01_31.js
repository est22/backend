function fetchData(callback) {
  setTimeout(() => {
      const data = ' 서버에서 받은 데이터입니다';
      callback(data);
  }, 2000);
}

fetchData(function (data) {
    console.log('콜백으로 받은 데이터: ', data);
});