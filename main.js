const result = document.querySelector('.result');
const error = document.querySelector('.error');


if (window.Worker) {
  const myWorker = new Worker("worker.js");


  myWorker.onmessage = function(e) {
    const parsedMsg = e.data.split(":");

    if (parsedMsg.length == 1)
      parsedMsg[1] = parsedMsg[0];
    const source = parsedMsg.shift();
    const msg = (parsedMsg.length>1)? parsedMsg.join(":"): parsedMsg[0];

    switch (source){
      case "Error":
        error.textContent = msg;
        result.textContent = "";
        break;
      default:   
        result.textContent = msg;
        error.textContent = "";
        break;
    }
    

    console.log('Message received from worker');
  }
} else {
  console.log('Your browser doesn\'t support web workers.');
}
