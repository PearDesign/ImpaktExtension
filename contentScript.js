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
		response.map((company) => {
			processCompany(company)
		})
	}
});

/* Alter page markup to indicate issues */
function processCompany(data){
	const selector = '.s-result-item[data-asin="' + data.ASIN + '"]'
	let wrapper = document.querySelector(selector)
	let notificationMarkup = `
		<div class='impaktNotification'>
			<h1>Ethical Shopping Notification</h1>
			<div class='impaktInfo'>The company selling this product has been flagged by Impakt, the Ethical Shopping Browser extension.</div>
			<button type='button' class='impaktBtn' data-ASIN="${data.ASIN}">
				Read more.
			</button>
			<div class='previousContent'>${wrapper.innerHTML}</div>
		</div>
	`
	wrapper.className += ' impaktNotificationWrapper'
	wrapper.innerHTML = notificationMarkup

	// Handle button clicks
	const btnSelector = `.impaktBtn[data-ASIN="${data.ASIN}"]`
	document.querySelector(btnSelector).addEventListener("click", () => {
		showImpaktInfo(data, wrapper)
	})
}

