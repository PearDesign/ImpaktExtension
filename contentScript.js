var searchBox = document.querySelector('#twotabsearchtextbox')

// Get list of all sellers on page
function getASINList() {
	let ASINs = [];
	let listItems = document.querySelectorAll('#s-results-list-atf li')
	for(var item of listItems) {
		ASINs.push(item.getAttribute('data-asin'))
	}
	return ASINs
}

// Send off an alert about current products
chrome.runtime.sendMessage({
	data: {
		searchBox: searchBox.value,
		foo: 'bar',
		ASINList: getASINList(),
	}, function(response){
		console.log("Got a response");
	}
})

