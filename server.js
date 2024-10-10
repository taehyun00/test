// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 'public' 폴더에 있는 정적 파일을 제공
app.use(express.static(path.join(__dirname, 'public')));

// NFC 데이터를 수신하는 엔드포인트
app.use(express.json());
app.post('/nfc-data', (req, res) => {
    const { uid } = req.body;
    console.log(`수신된 NFC UID: ${uid}`);
    
    // 여기서 받은 UID 데이터를 처리할 수 있습니다.
    res.status(200).send('NFC 데이터 수신 완료');
});

// 서버 실행
app.listen(port, () => {
    console.log(`서버가 실행 중입니다: http://localhost:${port}`);
});
