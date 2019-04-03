'use strict'

	const wkd = steem;
	wkd.api.setOptions({ url: 'wss://standby.weku.io:8190' });
	wkd.config.set('address_prefix', 'WKA');
	wkd.config.set('chain_id','b24e09256ee14bab6d58bfa3a4e47b0474a73ef4d6c47eeea007848195fa085e');

	var query = {
		community: 'community-deals',
		limit: 100
	};

	wkd.api.getDiscussionsByCreated(query, (err, res) => {
  	var post = res;
  	for (var i = 0; i < post.length; i++) {
  		var author = post[i].author;
  		var title = post[i].title;
  		var permalink = post[i].permlink;
  		var net_votes = post[i].net_votes
  		document.querySelector('.hijo-1').innerHTML += '<ul><li>' + '<h4 class="author">'+author+'</h4>' + '<h4 class="title">'+title+'</h4>' + '<h4 class="net_votes">'+net_votes+'</h4>' + '</li></ul>';
  	}
});