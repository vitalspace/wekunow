'use strict'

const wkd = steem;
wkd.api.setOptions({ url: 'wss://standby.weku.io:8190' });
wkd.config.set('address_prefix', 'WKA');
wkd.config.set('chain_id','b24e09256ee14bab6d58bfa3a4e47b0474a73ef4d6c47eeea007848195fa085e');

// wkd.api.streamBlockNumber((err, lastBlock) => {
//   wkd.api.getBlock(lastBlock, (err, block) => {
//     document.querySelector('.prueba').innerHTML += block.timestamp + ' - ' + lastBlock + ' - ' + block.witness +  '</br>';
//     console.log(block);
//   });
// });

let test;
let getDynamicGlobalPropertiesHandler = () => {
	wkd.api.getDynamicGlobalProperties((err, properties) => {
		if ( ! err) {
			test = properties.total_vesting_shares;
		}
	});
}

getDynamicGlobalPropertiesHandler();

wkd.api.getWitnessesByVote('', 100, (err, witnesses) => {
  let witnessRank = 0;
  let accountsWit = [];

  witnesses.forEach((witness) => {
    witnessRank++;
    accountsWit.push(witness.owner);
    const tableWitness = document.querySelector('.tbody');
    const witnessOwn = witness.owner;
    const witnessUrl = witness.url;
    const oneM = Math.pow(10, 6);
    const votes = parseFloat(witness.votes / oneM / oneM / 1000).toFixed();
    const percentage = (100 * (witness.votes / oneM / test.split(' ')[0])).toFixed(2);
    const witnessMissed = witness.total_missed;
    const lastBlockCon = witness.last_confirmed_block_num;
    const wkdRate = witness.sbd_exchange_rate.quote;
    const wkdBase = witness.sbd_exchange_rate.base;
    const wkdUpdate = witness.last_sbd_exchange_update;
    const wkdAccountCF = witness.props.account_creation_fee;
    const wkdInterestRate = witness.props.sbd_interest_rate;
    const blockSize = witness.props.maximum_block_size;
    const wkdVersion = witness.running_version;
    tableWitness.innerHTML += `
    <tr>
      <td><p><h4>${witnessRank}</h4></p></td>
    <td>
      <img class="imginfo" data-username="${witness.owner}" src="" width="50" height="50" title="${witness.owner} - img">
      <p class="witness-pro"><a class="color-black" href="https://main.weku.io/@${witnessOwn}"><h4>@${witness.owner}</h4></a></p>
      <p class="witness-thr"><a class="color-black" href="${witnessUrl}"><h4>Witness thread.</h4></a></p>
    </td>
    <td>
      <p><h4>${votes}</h4></p>
    </td>
    <td>
      <p><h4><span class="percentage">${percentage}%</span></h4></p>
    </td>
    <td>
      <p><h4>${witnessMissed}</h4></p>
    </td>
    <td>
      <p><h4><span class="lastBlock">${lastBlockCon}<span></h4></p>
    </td>
    <td>
      <p><h4>${wkdRate}</h4></p>
      <p><h4>${wkdBase}</h4></p>
      <p><h4>${wkdUpdate}</h4></p>
    </td>
    <td>
      <p><h4>${wkdAccountCF}</h4></p>
      <p><h4>${wkdInterestRate / 100}%</h4></p>
      <p><h4>${blockSize}</h4></p>
    </td>
    <td>
      <p><h4><span class="wkdVersion">${wkdVersion}<span></h4></p>
    </td>
    </tr>`;
  });
    wkd.api.getAccounts(accountsWit, (err, res) => {
      if ( ! err) {
        res.forEach((account) => {
          try {
            let jsonMetadata = JSON.parse(account.json_metadata);
            if (jsonMetadata.profile && jsonMetadata.profile.profile_image)
              document.querySelector('img[data-username="' + account.name + '"]').src = jsonMetadata.profile.profile_image;
          }
          catch {
            const withoutImage = "http://www.logospng.com/images/64/user-pro-avatar-login-account-svg-png-icon-free-64755.png";
              document.querySelector('img[data-username="' + account.name + '"]').src = withoutImage;
          }
        });
      }
    });
  });
