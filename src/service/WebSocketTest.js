import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

  export function WebsocketOpen(setConnected, stompClient, username) {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, (frame) => {
      setConnected(true);
      console.log('Connected: ' + frame);
      // stompClient.current.subscribe('/topic/greetings', (greeting) => {
      //   showGreeting(JSON.parse(greeting.body).content);
      // });
      stompClient.current.subscribe('/user/' + username + '/alarm', (greeting) => {
        ShowGreeting(greeting);
      });
    });

    return stompClient
  }

  export function SendName(stompClient, username) {
    stompClient.current.send("/app/hello", {}, JSON.stringify({ 'name': username, 'sendto': '가냐' }));
  }

  export function ShowGreeting(Setmsg, message) {
    console.log("1111111111", message.body)
    Setmsg(message.body)
  }

