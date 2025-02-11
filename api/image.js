export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const isFacebookBot = /facebookexternalhit|Facebot/i.test(userAgent);

  // فیک تصویر کا راستہ
  const fakeImagePath = "/fake-image.jpeg";
  
  // اصل تصویر کا راستہ
  const realImagePath = "/real-image.jpg";

  // Facebook کو فیک تصویر بھیجیں
  if (isFacebookBot) {
    res.writeHead(302, {
      Location: `${process.env.VERCEL_URL}${fakeImagePath}`
    });
    res.end();
  } 
  // عام صارفین کو اصل تصویر بھیجیں
  else {
    res.writeHead(302, {
      Location: `${process.env.VERCEL_URL}${realImagePath}`
    });
    res.end();
  }
}
