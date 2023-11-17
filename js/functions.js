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