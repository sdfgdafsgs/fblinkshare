export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const isFacebookShare = /facebookexternalhit\/1.1|Facebot/i.test(userAgent);
  const isDebugger = req.headers['referer']?.includes('developers.facebook.com');

  // Real Image کو صرف Facebook Share Preview کے لیے بھیجیں
  if (isFacebookShare && !isDebugger) {
    res.setHeader('Content-Type', 'image/jpg');
    res.sendFile(process.cwd() + '/secret/real-image.jpg'); // خفیہ فولڈر سے
  } 
  // Debugger یا دیگر کو Fake Image بھیجیں
  else {
    res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(process.cwd() + '/public/fake-image.jpeg');
  }
}
