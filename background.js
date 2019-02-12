chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
			alert(request.data.ASINList);
			// alert(request.data.searchBox);
    }
);
