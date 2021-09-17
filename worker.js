const eventSource = new EventSource('http://localhost:8081/api/v1/energy-sse');

eventSource.onmessage= (e)=> {
  console.log(`New message: ${e.data}`)
  postMessage(e.data)
}