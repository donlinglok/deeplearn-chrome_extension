navigator.webkitGetUserMedia({ audio: true, video: true }, function () {
  console.log('webcam ok');
}, function (e) {
  console.log('webcam not ok');
});