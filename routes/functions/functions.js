const wkd = require('steem');

wkd.api.setOptions({ url: 'wss://standby.weku.io:8190' });
wkd.config.set('address_prefix', 'WKA');
wkd.config.set('chain_id','b24e09256ee14bab6d58bfa3a4e47b0474a73ef4d6c47eeea007848195fa085e');

module.exports = wkd;