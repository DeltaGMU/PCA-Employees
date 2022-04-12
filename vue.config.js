var fs = require('fs');

module.exports = {
    devServer: {
      host: '0.0.0.0',
      port: 443,
      https: true,
      disableHostCheck: true,
      key: fs.readFileSync('src/certs/web-interface-key.pem', 'utf-8'),
      cert: fs.readFileSync('src/certs/web-interface-cert.pem', 'utf-8'),
    }
};