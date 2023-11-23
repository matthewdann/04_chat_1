// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved }
  from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

import { getFormattedDateTime, scrollToBottom, getBot } from "./functions.js";

// Your web app's Firebase configuration
const firebaseConfig = config;
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); //RealtimeDBに接続
const dbRef = ref(db, "chat"); //RealtimeDB内の"chat"を使う

// firebaseにデータを送る関数
function sendMessage() {
  const nickname = $('#nickname').val();
  let text = $('#text').val();
  const timeStamp = getFormattedDateTime();

  // 改行を<br>に変換
  text = text.replace(/\n/g, '<br>');

  const msg = {
    nickname: nickname,
    text: text,
    timeStamp: timeStamp,
  };

  const newPostRef = push(dbRef);
  set(newPostRef, msg);

  // チャットボットの応答を取得
  const bot = getBot();
  const botMsg = {
    nickname: bot.name,
    text: bot.text,
    // timeStamp: getFormattedDateTime(),
  };

  // チャットボットの応答を表示
  const botPostRef = push(dbRef);
  set(botPostRef, botMsg);

  $('#text').val(''); // メッセージを送信した後、入力欄を空にする
}

// // 送信ボタンがクリックされたらメッセージを送信
// $('#send-button').on('click', function () {
//   sendMessage();
// });
  
// Enterキーが押され、かつShiftキーが押されていない場合にメッセージを送信
$('#text').on('keypress', function (event) {
  const textareaValue = $(this).val();
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

// メッセージ削除関数
function deleteMessage(key) {
  const messageRef = ref(db, `chat/${key}`);
  remove(messageRef);
}

// メッセージ表示関数
function displayMessage(key, msg) {
  let html = `
    <div class="${key}">
      <p class="nickname">${msg.nickname}</p>
      <p class="text">${msg.text}</p>
      ${msg.timeStamp ? `<p class="time-stamp">${msg.timeStamp}</p>` : ''}
      <button class="delete-btn" data-key="${key}">削除</button>
    </div>  
  `;

  $('#display-area').append(html);

  // 削除ボタンのクリックイベントを設定
  $(`.${key} .delete-btn`).on('click', function () {
    const keyToDelete = $(this).data('key');
    deleteMessage(keyToDelete);
  });
}

// 最初にデータ取得＆onSnapshotでリアルタイムにデータを取得
onChildAdded(dbRef, function (data) {
  const msg = data.val();
  const key = data.key;

  displayMessage(key, msg);

  // 新しいメッセージが表示されるときに表示領域を最下部にスクロール
  scrollToBottom();
});

// メッセージ削除時のイベント
onChildRemoved(dbRef, function (data) {
  const key = data.key;
  // 対応する要素を削除
  $(`.${key}`).remove();
});

// すべてのメッセージを削除する関数
function clearAllMessages() {
  // データベース内の"chat"ノード以下のすべてのデータを削除
  remove(ref(db, "chat"));
}

// #clear-btnがクリックされたらすべてのメッセージを削除
$('#clear-btn').on('click', function () {
  clearAllMessages();
});