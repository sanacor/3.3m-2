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

    var mTop_dict = new Object();
    var mTop_array = new Array();

    for (i = 0; i < match.length; i++) {
      var p = new mTop(match[i]);
  
      if (!(p.square_meter in mTop_dict)) {
        mTop_dict[p.square_meter] = p.pyeong;
      }
     
    }
   
    key_array = Object.keys(mTop_dict);

    for(let i = 0; i < key_array.length; i++){
      key_array[i] = Number(key_array[i].replace('\u33A1', ''))
    }

    key_array.sort(function(a, b) {
      return a - b;
    });
    
    key_array.forEach(function(element) {
        var table = document.getElementById("myTable");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.innerHTML = element;

        cell2.innerHTML = mTop_dict[String(element)+'\u33A1'];
        cell1.innerHTML = cell1.innerHTML+'\u33A1';

        cell1.style.textAlign = "right";
        cell2.style.textAlign = "right";

    });
    
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