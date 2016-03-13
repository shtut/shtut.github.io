function loadJSON(url, callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function init() {
 loadJSON('data/config.json',function(response) {
  // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
    updateNotificationArea(actual_JSON.notifications);

 });
}

function updateNotificationArea(data){
    if(data != undefined){
        $(".notifications").innerHTML = data;
    }
}

function $(selector) {
    return document.querySelector(selector);
}

window.onLoad = init();