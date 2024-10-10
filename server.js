const express = require('express');
const bodyParser = require('body-parser');
const bwipjs = require('bwip-js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // HTML 파일을 서비스하기 위한 폴더

// NFC 데이터를 받아 바코드를 생성
app.post('/nfc-data', (req, res) => {
    const nfcData = req.body.nfcData;

    if (!nfcData) {
        return res.status(400).send('No NFC data received');
    }

    // 바코드 생성
    bwipjs.toBuffer({
        bcid: 'code128',       // 바코드 타입 (Code128 사용)
        text: nfcData,         // NFC 시리얼 번호 또는 데이터
        scale: 3,              // 바코드 크기
        height: 10,            // 바코드 높이
        includetext: true,     // 바코드 아래에 텍스트 포함 여부
        textxalign: 'center',  // 텍스트 정렬
    }, (err, png) => {
        if (err) {
            return res.status(500).send('Error generating barcode');
        }

        // 바코드 이미지 응답
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': png.length,
        });
        res.end(png);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
