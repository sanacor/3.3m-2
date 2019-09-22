chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var NUMERIC_REGEXP = /[-]{0,1}[\d]*[\.]{0,1}[\d]+\u33A1/g;
    string_of_html = request.source;
    var match = string_of_html.match(NUMERIC_REGEXP)
    // https://stackoverflow.com/questions/1183903/regex-using-javascript-to-return-just-numbers
    console.log(match);

  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;