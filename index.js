'use strict';

exports.handler = async (event, context, callback) => {
    
    let request = event.Records[0].cf.request;
    let uri = request.uri;
    console.log(uri);
    let f = require("./redirects.json");
    
    let match = f.redirects.find(e => e[0] === uri);
    console.log(match);
	if(match){
		//Generate HTTP redirect response to a different landing page.
		const redirectResponse = {
			status: '301',
			statusDescription: 'Moved Permanently',
			headers: {
			  'location': [{
				key: 'Location',
				value: match[1] // redirect url 
			  }],
			  'cache-control': [{
				key: 'Cache-Control',
				value: "max-age=3600"
			  }],
			},
		};
		callback(null, redirectResponse);
	} else {
		// for all other requests proceed to fetch the resources
		callback(null, request);
	} 
};

/*
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(event[0]),
    };
    return response;
};*/
