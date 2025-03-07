const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5500; // 포트 번호

// body-parser 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 정적 파일 제공 (HTML, CSS, 클라이언트 JS 등)
app.use(express.static('public'));

// POST /send-email 엔드포인트
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lgh9293@gmail.com', // 실제 발신자 계정
      pass: 'rwatzbdnylowldzv'         // 실제 비밀번호 또는 앱 비밀번호
    }
  });

  const mailOptions = {
    from: email,
    to: 'tax@taeshintrade.com',
    subject: `${name}님의 태신무역 홈페이지에서의 메일발송`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);

      return res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      return res.redirect('/');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
