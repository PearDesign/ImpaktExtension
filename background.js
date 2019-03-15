/* Listen for events emitted by the extension when a user visits Amazon
 *
 * Inputs:
 *	request[obj]: Data passed in from the extension, including an array
 *								of ASIN IDs
 *	sender[obj]:	Data about the page
 *	sendResponse[callback]: Function that can send response data back
 */
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		var resp = sendResponse;
		var responseData = {
			ASINList: request.ASINList,
		}

		// Retrieve data from the Impakt API
		var xhr = new XMLHttpRequest();
		var url = "https://impakt.app/api/v1/companies/?";
		url += "ASINList=" + request.ASINList.shift()
		for (ASIN of request.ASINList) {
			url += "&ASINList=" + ASIN;
		}

		xhr.open("GET", url, true);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4){
				var response = JSON.parse(xhr.responseText);
				resp(response);
			}
		}
		xhr.send();
		return true;  // Required to keep resp open for async response
	}
);
