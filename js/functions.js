// 現在の日付と時刻を取得し、形式を整えて返す関数
export function getFormattedDateTime() {
  const now = new Date();
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  return now.toLocaleDateString('ja-JP', options);
}

// 新しいメッセージが表示されるときに表示領域を最下部にスクロール
export function scrollToBottom() {
  const displayArea = $('#display-area');
  displayArea.scrollTop(displayArea.prop('scrollHeight'));
}

// チャットボットのランダムな応答
export function getBot() {
  const responses = [
    { name: '花一匁', text: '君の白い袖を<br>汚したのは僕だよ' },
    { name: '不法侵入', text: '君の触る音には<br>意味がある' },
    { name: '不法侵入', text: '君を撫でるみたいに<br>祈ってた' },
    { name: '不法侵入', text: '君じゃなきゃだめなんだよ' },
    { name: '不法侵入', text: '君へのlyric<br>隠したlipstick<br>あばくのは御法度です'},
    { name: '不法侵入', text: '君をあやすように<br>祈ってた' },
    { name: '不法侵入', text: '君のぬくもりが不法侵入' },
    { name: '夏枯れ', text: '君の相槌が<br>妙に嬉しくて' },
    { name: '夏枯れ', text: '君にとって<br>も同じ想いだってきっと' },
    { name: '夏枯れ', text: '君に会えた<br>それだけで<br>ただ<br>泣きそうで<br>訊けなくて' },
    { name: '夏枯れ', text: '君までも<br>朽ち果ててしまう気がした' },
    { name: '夏枯れ', text: '君が返した<br>雫は僕を<br>困らせて<br>許してくれて' },
    { name: '夏枯れ', text: '君に会えた<br>それだけで<br>もう<br>生きてもいいような<br>気がして' },
  ];
  const randomIndex = Math.floor(Math.random() * responses.length);
  const response = responses[randomIndex];
  return { name: response.name, text: response.text };
}