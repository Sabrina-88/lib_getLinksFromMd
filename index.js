function getLinksFromMd(str) {
	if (typeof str !== 'string' || str == ''|| str == 'number'){
		throw new Error ('Digite somente texto'); 
	}else {
		const regex_ToText = new RegExp(/(?<=\[).*?(?=\])/g);
		const regex_ToUrl = new RegExp(/(?<=\().*?(?=\))/g);	

		let text = str.match(regex_ToText);
    	let url = str.match(regex_ToUrl);
    	
  
    	let getLink = [];
     if (url === null && text === null) {
       return getLink;
    }else {
        getLink = url.map((element, i) => ({
        "href": url[i],
        "text": text[i]
      }));
      return getLink;
    }
    }
	};
	
	module.exports.getLinksFromMd = getLinksFromMd;

