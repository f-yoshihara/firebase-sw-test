var config = {
  apiKey: "AIzaSyDSI_2RZS-R5oaacyghLJ8l1nt1FlMY9XA",
  authDomain: "skip-d0716.firebaseapp.com",
  databaseURL: "https://skip-d0716.firebaseio.com",
  projectId: "skip-d0716",
  storageBucket: "skip-d0716.appspot.com",
  messagingSenderId: "828199474634"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

// ブラウザがService Workerに対応しているか？
if (navigator.serviceWorker) {
    // Service Workerに対応していれば、Service Workerを登録する 
    navigator.serviceWorker.register('./fb-message.js').then(() => {
        return navigator.serviceWorker.ready;
    }).catch(() => {
        // Service Workerの登録に失敗した場合
    }).then(registration => {
        // Webプッシュ通知を受信するためにServiceWorkerRegistrationを登録する 
        messaging.useServiceWorker(registration);

        // 通知の許可 -> トークンの取得の順でないと、トークンの取得に失敗する 
        messaging.requestPermission().then(() => {
            // 通知許可の取得に成功した場合
            messaging.getToken().then(token => {
                const options = {
                    method  : 'POST',
                    headers : new Headers({ 'Content-Type' : 'application/json' }),
                    body    : JSON.stringify({ token })
                };

                // サーバへトークンをPOSTする
                fetch('/api/push/register', options).then(() => {
                    // トークンの送信に成功した場合
                }).catch(() => {
                    // トークンの送信に失敗した場合
                });
            }).catch(() => {
                // トークンの取得に失敗した場合
            });
        }).catch(() => {
            // 通知許可の取得に失敗した場合
        });
    });
}
