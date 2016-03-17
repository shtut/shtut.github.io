function initialize() {
    UTILS.ajax("data/config.json", {done: updatePage});

}

function updatePage(data){
    updateNotificationArea(data.notification);
    updateNavSection(data.quickActions);
    updateTabs(data.tabsList);
}

function updateNotificationArea(data){
    if(data != undefined){
        $(".notifications").innerHTML = data;
        $(".notifications").classList.remove('hidden');
    }
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
    //$("#myFoldersExpandTarget").href = data[1].options.url;
    $("#my-folder-frame").src = data[1].options.url;
    //$("#publicFoldersExpandTarget").href = data[3].options.url;
    $("#public-folder-frame").src = data[3].options.url;

    var frames = $all("iframe");
    var expands = $all(".expand-link");

    for(var i=0; i<data.length;i++){
        expands[i].href = frames[i].src;

    }
}

function $(selector) {
    return document.querySelector(selector);
}

function $all(selector) {
    return document.querySelectorAll(selector);
}

window.onLoad = initialize();