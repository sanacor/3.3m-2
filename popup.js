chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      message.innerText = request.source;
      console.log("191.49\u33A1")
      // var regex = new RegExp("[0-9]+(.[0-9]{2})?$");
      var regex = new RegExp("191.49\u33A1");
      console.log(message.innerText)
      var match = regex.exec(message.innerText);
      console.log(match[0]);   
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