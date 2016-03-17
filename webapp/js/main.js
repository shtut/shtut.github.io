function initialize() {
    UTILS.ajax("data/config.json", {done: updatePage});
//      var actual_JSON = 
//     //for local debugging
//     {
//     "notification": "The data of UTF BI would be updated at 16:00 pm.",
//     "quickActions": [
//         {
//             "label": "Select<br>Reporting Platform",
//             "icon": "action-report-new",
//             "actionsLabel": "Choose QS report",
//             "actions": [
//                 {
//                     "label": "Corporate",
//                     "url": "http://netcraft.co.il"
//                 }, {
//                     "label": "Simple",
//                     "url": "http://netcraft.co.il"
//                 }, {
//                     "label": "Business",
//                     "url": "http://netcraft.co.il"
//                 }
//             ]
//         }, {
//             "label": "Select<br>Dashboard",
//             "icon": "action-report-top",
//             "actionsLabel": "Choose Dashboard",
//             "actions": [
//                 {
//                     "label": "Account Dashboard",
//                     "url": "http://netcraft.co.il"
//                 }, {
//                     "label": "Daily Huddle Dashboard",
//                     "url": "http://netcraft.co.il"
//                 }, {
//                     "label": "Tier 2 Dashboard",
//                     "url": "http://netcraft.co.il"
//                 }, {
//                     "label": "ADM Dashboard",
//                     "url": "http://netcraft.co.il"
//                 }
//             ]
//         }, {
//             "label": "Help &amp;<br>Tutorials",
//             "icon": "actions-help",
//             "actionsLabel": "Choose guide",
//             "actions": [
//                 {
//                     "label": "Real Time",
//                     "url": "http://netcraft.co.il"
//                 }, {
//                     "label": "Past Data",
//                     "url": "http://netcraft.co.il"
//                 }, {
//                     "label": "Corporate Data",
//                     "url": "http://netcraft.co.il"
//                 }
//             ]
//         }
//     ],
//     "tabsList": [
//         {
//             "options": {
//                 "rowLabel": "Report"
//             }
//         }, {
//             "options": {
//                 "url": "http://www.paulirish.com/"
//             }
//         }, {
//             "options": {
//                 "rowLabel": "Folder"
//             }
//         }, {
//             "options": {
//                 "url": "http://addyosmani.com/"
//             }
//         }
//     ]
// };

//     updatePage(actual_JSON);

}

function updatePage(data){
    updateNotificationArea(data.notification);
    updateNavSection(data.quickActions);
    updateTabs(data.tabsList);
}

function updateNotificationArea(data){
	//if there are notifications- update html and remove the hidden class
    if(data != undefined && data!=""){
        $(".notifications").innerHTML = data;
        $(".notifications").classList.remove('hidden');
    }
    //if notifications were removed- hide notifications area
    else{
    	$(".notifications").classList.add('hidden');
    }
}

function updateNavSection(data){
    
    if(data != undefined){
        var navSection = $all(".nav-section");
        var menuCaption = $all(".menu-caption");
        var actionList = $all(".action-list");

        for(var i=0; i<navSection.length; i++){
            //updating the nav-section titles
            navSection[i].children[0].innerHTML =data[i].label;
            //updating the nav-section captions
            menuCaption[i].children[0].innerHTML=data[i].actionsLabel;
            
            //creating li's and updating their values
            for (var j=0; j<data[i].actions.length; j++) {
                actionList[i].innerHTML += "<li><a href=" + data[i].actions[j].url + ">" + data[i].actions[j].label + "</a></li>";
            }

        }
    }
    
}

function updateTabs(data){
    //update static tabs- #1
    $("#my-folder-frame").src = data[1].options.url;
    //update static tabs- #2
    $("#public-folder-frame").src = data[3].options.url;

    //determines the active tab and updates the display.
    //if empty- sets first tab as active
    tabChange();


    var frames = $all("iframe");
    var expands = $all(".expand-link");

    //update expand buttons to match frame links
    for(var i=0; i<data.length;i++){
        expands[i].href = frames[i].src;
    }

    //subscribe to hash changes
    window.addEventListener("hashchange", tabChange, false);
}

function tabChange(){
	  //get the tab headers and content
      var tabHeaders = $all(".tab-item");
      var tabHeadersLinks = $all(".tab-link");
      var tabContents = $all(".frame");
      //get current location
      var currentHash = "#"+window.location.hash.substr(1);

      //if hash isn't empty- update tabs
      if(currentHash != "#"){
      	//update tabs according to the currentHash
      	for ( var i = 0; i < tabHeaders.length; i++ ) {
          if(tabHeadersLinks[i].hash == currentHash){
          	tabHeaders[i].classList.add('current-tab');
          	tabContents[i].classList.add('current-frame');
          }else{
          	tabHeaders[i].classList.remove('current-tab');
          	tabContents[i].classList.remove('current-frame');
          }
      	}
      	//if it is  empty- set 1st tab as current-tab
      }else{
      	tabHeaders[0].classList.add('current-tab');
        tabContents[0].classList.add('current-frame');
      }
      
}


function $(selector) {
    return document.querySelector(selector);
}

function $all(selector) {
    return document.querySelectorAll(selector);
}

window.onLoad = initialize();