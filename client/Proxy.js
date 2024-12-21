const corsAnywhere = require('cors-anywhere');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
}).listen(port, host, () => {
  console.log(`CORS Anywhere proxy server is running on ${host}:${port}`);
});
