class mTop {
  constructor(square_meter) {
      this.square_meter = String(square_meter);
      this.pyeong = String((Number(square_meter.replace('\u33A1', ''))/3.305785).toFixed(1)+'평');
  }
}

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var NUMERIC_REGEXP = /[-]{0,1}[\d]*[\.]{0,1}[\d]+\u33A1/g;
    string_of_html = request.source;
    var match = string_of_html.match(NUMERIC_REGEXP)
    // https://stackoverflow.com/questions/1183903/regex-using-javascript-to-return-just-numbers
    console.log(match);

    for (i = 0; i < match.length; i++) {
      console.log("match[i]: "+match[i]);
      var p = new mTop(match[i]);
      var node = document.createElement("LI");
      var textnode = document.createTextNode(p.square_meter + " " + p.pyeong);
      console.log("p.pyeong[i]: "+p.pyeong);
      node.appendChild(textnode);
      node.classList.add("list-group-item");
      var element = document.getElementById("mTop");
      element.appendChild(node);
    }

    
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