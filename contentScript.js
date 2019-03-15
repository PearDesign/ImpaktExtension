/* Get list of all sellers on page */
function getASINList() {
	let ASINs = [];
	let listItems = document.querySelectorAll('.s-result-list div')
	for(var item of listItems) {
		var asin = item.getAttribute('data-asin')
		if(asin){
			ASINs.push(item.getAttribute('data-asin'))
		}
	}
	return ASINs
}

/* Send message to backend scripts when a user navigates to Amazon */
chrome.runtime.sendMessage({ASINList: getASINList()}, function(response) {
	if(response.length){
		processResponse(response)
	}
});

/* Alter page markup to indicate issues */
function processResponse(companyData){
	console.log(companyData)
}
