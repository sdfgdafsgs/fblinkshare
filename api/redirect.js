export default function handler(req, res) {
  const referrer = req.headers['referer'] || '';
  const isFromFacebook = referrer.includes('facebook.com');

  // Facebook سے آنے پر Link 2 پر جائیں
  if (isFromFacebook) {
    res.writeHead(302, { Location: 'https://link2.com' });
  } 
  // ڈائریکٹ آنے پر Link 1 پر جائیں
  else {
    res.writeHead(302, { Location: 'https://link1.com' });
  }
  res.end();
}
