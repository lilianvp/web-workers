const result = document.querySelector('.result');

if (window.Worker) {
  const myWorker = new Worker("worker.js");


  myWorker.onmessage = function(e) {
    result.textContent = e.data;
    console.log('Message received from worker');
  }
} else {
  console.log('Your browser doesn\'t support web workers.');
}
