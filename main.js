// 新しいワーカーを作成し、"generate.js" にあるコードを与える。
const worker = new Worker('./generate.js');

// ユーザーが "Generate primes" をクリックしたら、ワーカーにメッセージを送信する。
// メッセージのコマンドは "generate" で、メッセージは "quota" も含みます。
// これは生成するプリムの数です。
document.querySelector('#generate').addEventListener('click', () => {
  const quota = document.querySelector('#quota').value;
  worker.postMessage({
    command: 'generate',
    quota,
  });
});

// Worker がメイン スレッドにメッセージを送り返すとき。
// 出力ボックスを更新し、ユーザへのメッセージと、生成された素数の数を表示します。
// メッセージデータから取得した生成された素数の数を含む、ユーザーへのメッセージを出力ボックスに更新します。
worker.addEventListener('message', (message) => {
  document.querySelector('#output').textContent = `Finished generating ${message.data} primes!`;
});

document.querySelector('#reload').addEventListener('click', () => {
  document.querySelector('#user-input').value = 'Try typing in here immediately after pressing "Generate primes"';
  document.location.reload();
});




