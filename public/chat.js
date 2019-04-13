let socket = io.connect('http://localhost:8000');

let message = document.getElementById("message"),
    nickname = document.getElementById("nickname"),
    btn = document.getElementById("send"),
    output = document.getElementById("output"),
    feedback = document.getElementById("feedback");

btn.addEventListener("click", function(){
  socket.emit('chat', {
    message: message.value,
    nickname: nickname.value});
  message.value = "";
});

message.addEventListener("keypress", function(){
  socket.emit('typing', nickname.value);
});

socket.on('chat', function(data){
  output.innerHTML += '<p><strong>[' + data.nickname + ']: </strong>' + data.message + '</p>';
  feedback.innerHTML = '';
});

socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing message </em></p>';
})
