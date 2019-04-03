'user stricr'


	var query = {
		community: 'community-deals',
		limit: 100
	};

	wkd.api.getDiscussionsByCreated(query, (err, res) => { 
		console.log(res);		
	});