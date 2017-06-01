var url = require('url');

exports.getRedirectUrl = function(originalUrl) {
  	var parsedUrl = url.parse(originalUrl);
  	var redirect = parsedUrl.search;
  	if(!redirect)
  		return false;
  	var isIn = redirect.indexOf('error=');
	if(isIn > 0 ){
  		return true;
  	} else {
		return false;
  	}

}
