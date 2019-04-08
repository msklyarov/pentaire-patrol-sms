const SDK = require('ringcentral');

const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min); // min and max included

const sending = (
  platform,
  smsTo,
  aleatory,
  smsFrom,
  text,
  row,
  statusCallback,
  isStoppedCallback,
) => {
  if (!isStoppedCallback()) {
    setTimeout(() => {
      if (!isStoppedCallback()) {
        statusCallback(smsTo);
        platform.post('/account/~/extension/~/sms', {
          from: { phoneNumber: smsFrom[row] },
          to: [{ phoneNumber: smsTo }],
          text: text[row],
        });
      }
    }, aleatory / smsFrom.length);
  }
};

module.exports = (
  proxy,
  auth,
  rcClientId,
  rcClientSecret,
  rcUsername,
  rcPassword,
  rcServerUrl,
  smsFromArray,
  smsToArray,
  textArray,
  statusCallback,
  isStoppedCallback,
) => {
  const proxyParts = proxy.split(':');
  const authParts = proxy.split(':');

  process.env.SOCKS5_PROXY_HOST = proxyParts[0];
  process.env.SOCKS5_PROXY_PORT = proxyParts[1];

  const rcsdk = new SDK({
    server: rcServerUrl,
    appKey: rcClientId,
    appSecret: rcClientSecret,
  });

  const platform = rcsdk.platform();

  platform
    .login({
      username: rcUsername,
      extension: 101,
      password: rcPassword,
    })
    .then(() => {
      let aleatory = 0;
      let row = 0;
      smsToArray.forEach(smsTo => {
        aleatory = aleatory + randomIntFromInterval(5500, 8500);

        sending(
          platform,
          smsTo,
          aleatory,
          smsFromArray,
          textArray,
          row,
          statusCallback,
          isStoppedCallback,
        );
        row++;
        if (row == smsFromArray.length) {
          row = 0;
        }
      });
    })
    .catch(e => {
      console.error(e);
    });
};
