// メインスレッドからのメッセージを待ちます。
// メッセージコマンドが "generate" の場合、`generatePrimes()` を呼び出す。
addEventListener("message", (message) => {
    if (message.data.command === 'generate') {
        generatePrimes(message.data.quota);
    }
});

// 素数を生成する（非常に非効率的）。
function generatePrimes(quota) {

    function isPrime(n) {
        for (let c = 2; c <= Math.sqrt(n); ++c) {
            if (n % c === 0) {
                return false;
            }
        }
        return true;
    }

    const primes = [];
    const maximum = 1000000;

    while (primes.length < quota) {
        const candidate = Math.floor(Math.random() * (maximum + 1));
        if (isPrime(candidate)) {
            primes.push(candidate);
        }
    }

    // 終了したら、メインスレッドにメッセージを送信する。
    // 生成した素数の数を含むメッセージをメインスレッドに送る．
    postMessage(primes.length);
}
