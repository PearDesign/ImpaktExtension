// Fire off on Amazon's search page

chrome.webNavigation.onCompleted.addListener(function() {
	alert("Test");
}, {url: [{urlMatches: "https://www.amazon.com/s/*"}]});
