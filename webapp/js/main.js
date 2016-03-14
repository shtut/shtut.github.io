function loadJSON(url, callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function init() {
    //loadJSON('data/config.json',function(response) {
    // Parse JSON string into object

    var actual_JSON = //JSON.parse(response);
    //for local debugging
    {
    "notification": "The data of UTF BI would be updated at 16:00 pm.",
    "quickActions": [
        {
            "label": "Select<br>Reporting Platform",
            "icon": "action-report-new",
            "actionsLabel": "Choose QS report",
            "actions": [
                {
                    "label": "Corporate",
                    "url": "http://netcraft.co.il"
                }, {
                    "label": "Simple",
                    "url": "http://netcraft.co.il"
                }, {
                    "label": "Business",
                    "url": "http://netcraft.co.il"
                }
            ]
        }, {
            "label": "Select<br>Dashboard",
            "icon": "action-report-top",
            "actionsLabel": "Choose Dashboard",
            "actions": [
                {
                    "label": "Account Dashboard",
                    "url": "http://netcraft.co.il"
                }, {
                    "label": "Daily Huddle Dashboard",
                    "url": "http://netcraft.co.il"
                }, {
                    "label": "Tier 2 Dashboard",
                    "url": "http://netcraft.co.il"
                }, {
                    "label": "ADM Dashboard",
                    "url": "http://netcraft.co.il"
                }
            ]
        }, {
            "label": "Help &amp;<br>Tutorials",
            "icon": "actions-help",
            "actionsLabel": "Choose guide",
            "actions": [
                {
                    "label": "Real Time",
                    "url": "http://netcraft.co.il"
                }, {
                    "label": "Past Data",
                    "url": "http://netcraft.co.il"
                }, {
                    "label": "Corporate Data",
                    "url": "http://netcraft.co.il"
                }
            ]
        }
    ],
    "tabsList": [
        {
            "options": {
                "rowLabel": "Report"
            }
        }, {
            "options": {
                "url": "http://www.paulirish.com/"
            }
        }, {
            "options": {
                "rowLabel": "Folder"
            }
        }, {
            "options": {
                "url": "http://addyosmani.com/"
            }
        }
    ]
};

    updatePage(actual_JSON);
    updateNotificationArea(actual_JSON.notification);

// });
}



function updatePage(data){
    updateNotificationArea(data.notification);
    updateNavSection(data.quickActions);
    updateTabs(data.tabsList);
    tabChange();

}

function updateNotificationArea(data){
    if(data != undefined){
        $(".notifications").innerHTML = data;
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
    //$("#myFoldersExpandTarget").href = data[1].options.url;
    $("#my-folder-frame").src = data[1].options.url;
    //$("#publicFoldersExpandTarget").href = data[3].options.url;
    $("#public-folder-frame").src = data[3].options.url;
}


function tabChange(){
    // Grab the tab links and content divs from the page
      var tabListItems = document.getElementById('tab-headers').childNodes;
      for ( var i = 0; i < tabListItems.length; i++ ) {
        if ( tabListItems[i].nodeName == "LI" ) {
          var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
          var id = getHash( tabLink.getAttribute('href') );
          tabLinks[id] = tabLink;
          contentDivs[id] = document.getElementById( id );
        }
      }

      // Assign onclick events to the tab links, and
      // highlight the first tab
      var i = 0;

      for ( var id in tabLinks ) {
        tabLinks[id].onclick = showTab;
        tabLinks[id].onfocus = function() { this.blur() };
        if ( i == 0 ) tabLinks[id].className += 'current-frame';
        i++;
      }

      // Hide all content divs except the first
      var i = 0;

      for ( var id in tabLinks ) {
        if ( i === 0 ) tabLinks[id].className += ' current-tab';
        i++;
      }
}

function $(selector) {
    return document.querySelector(selector);
}

function $all(selector) {
    return document.querySelectorAll(selector);
}

function getFirstChildWithTagName( element, tagName ) {
      for ( var i = 0; i < element.childNodes.length; i++ ) {
        if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
      }
    }

function getHash( url ) {
      var hashPos = url.lastIndexOf ( '#' );
      return url.substring( hashPos + 1 );
    }

function showTab() {
      var selectedId = getHash( this.getAttribute('href') );

      // Highlight the selected tab, and dim all others.
      // Also show the selected content div, and hide all others.
      for ( var id in contentDivs ) {
        if ( id == selectedId ) {
          tabLinks[id].className += ' current-tab';
          contentDivs[id].className += ' current-frame';
        } else {
          tabLinks[id].className = '';
          contentDivs[id].className = 'frame';
        }
      }

      // Stop the browser following the link
      return false;
    }


var tabLinks = new Array();
var contentDivs = new Array();

window.onLoad = init();