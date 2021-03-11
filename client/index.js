let socket;

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

let content = document.getElementById('content');

startButton.addEventListener('click' , () => {
    openConnection();
    socket.onopen = () => {
        startReceivingData();
    }
});
stopButton.addEventListener('click' , () => closeConnection());


function openConnection() {
    socket = new WebSocket('ws://localhost:1337');
    socket.onerror = error => console.log('WebSocket error: ' + error);
    socket.onclose = () => console.log('the server just closed the webSocket Connection');
}

function startReceivingData() {
    socket.send('hello from the client');

    socket.onmessage = message => {
        // console.log('this is data received from server : ' , message);
        // console.log('type : ' , typeof message);
        content.innerHTML += message.data +'<br />';
    };
}

function closeConnection() {
    socket.close()
}

