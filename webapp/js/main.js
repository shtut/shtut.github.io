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
//                 "url": "http://hackertyper.com/"
//             }
//         }
//     ]
// };
	
//     updatePage(actual_JSON);

}

function updatePage(data){
    updateNotificationArea(data.notification);
    updateNavSection(data.quickActions);
    loadLinks();
    updateTabs(data.tabsList);
    linkToFrame();
}

function updateNotificationArea(data){
	//if there are notifications- update html and remove the hidden class
    if(data != undefined && data!=""){
        $(".notifications").innerHTML += data;
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

    //updates expand icons
    updateExpandLinks();


    //set the options button of the "my team folders" section
    $("#folders-options").addEventListener('click', function(){
		$('#folders-set').classList.toggle('hidden');
		$('#folders-options').classList.toggle('active');
		$('#folder-name-1').focus();
	});

    //set the cancel button of the "my team folders" section
	$("#folders-cancel").addEventListener('click', function(){
		$('#folders-set').classList.toggle('hidden');
		$('#folders-options').classList.toggle('active');
	});

	//set the save button of the "my team folders" section
	$("#folders-save").addEventListener('click', save);

	//set the options button of the "quick reports" section
	$("#report-options").addEventListener('click', function(){
		$('#report-set').classList.toggle('hidden');
		$('#report-options').classList.toggle('active');
		$('#report-name-1').focus();
	});

	//set the cancel button of the "quick reports" section
	$("#report-cancel").addEventListener('click', function(){
		$('#report-set').classList.toggle('hidden');
		$('#report-options').classList.toggle('active');
	});

	//set the save button of the "my team folders" section
	$("#report-save").addEventListener('click', save);

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

function save(){
	var hash = window.location.hash.substr(1);
	var saveStr = "";

	//if we're in the my-team-folder section
	if(hash.indexOf("team") > -1){
		var lines = $all("#folders-set .name-url");
		for(var i=0;i<lines.length;i++){
			var name = "#folder-name-"+(i+1);
			var url = "#folder-url-"+(i+1);
			var result= validateLine($(name).value,$(url).value);

			//if line is valid, save it
			if(result == 1){
				//saveLink("#folder-links",$(name).value,$(url).value);
				$("#folder-links").innerHTML += "<li><a href="+$(url).value+">"+$(name).value+"</a></li>";
				saveStr += $(name).value+";"+$(url).value+"###";
			}
		}
		//save links
		saveLink("#folder-links",saveStr);
		//close window
		$('#folders-set').classList.toggle('hidden');
		$('#folders-options').classList.toggle('active');

	}
	//else- reports section
	else{
		var lines = $all("#report-set .name-url");
		for(var i=0;i<lines.length;i++){
			var name = "#report-name-"+(i+1);
			var url = "#report-url-"+(i+1);
			var result= validateLine($(name).value,$(url).value);

			//if line is valid, save it
			if(result == 1){
				//saveLink("#report-links",$(name).value,$(url).value);
				$("#report-links").innerHTML += "<li><a href="+$(url).value+">"+$(name).value+"</a></li>";
				saveStr += $(name).value+";"+$(url).value+"###";
			}
		}
		//save links
		saveLink("#report-links",saveStr);
		//close window
		$('#report-set').classList.toggle('hidden');
		$('#report-options').classList.toggle('active');
	}
	//update links after save
	loadLinks();
}

function validateLine(name, url){
	//if only 1 of the fields is full- return error
	if(((name === "")&&(url !=="")) ||
		((url === "")&&(name !==""))){
		var x= "error";
	}
	//if both are empty- return ok;
	else if(name === "" && url === ""){
		return 1;
	}

	//if both are full- verify url is valid
	else{
		var reg = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/;
		var m;
		//if valid- return ok
		if ((m = reg.exec(url)) !== null) {
        	return 1;
    	}
    	//else- return error
    	else{
    		return -1;
    	}
	}
}

//saves links in the format:  name1;url1###name2;url2###..
function saveLink(list,str){
	//if we're under 'my-team-folder'
	if(list.indexOf("folder") > -1){
		localStorage.folderLinks = str;

	//else- we're under 'quick-reports'
	}else{
		localStorage.reportLinks= str;
		
	}
	linkToFrame();	
}	

function loadLinks(){
	//delete all previous li items
	lists= $all(".links");
	for(var i=0;i<lists.length;i++){
		lists[i].innerHTML="";
		var id = (i==0)?"report":"folder";
		lists[i].innerHTML="<li id='selected-"+id+"'><a></a></li>";
	}
	//update li items
	if(localStorage.folderLinks){
		lines = localStorage.folderLinks.split("###");
		for(var i=0;i<lines.length-1;i++){
			nameUrl= lines[i].split(";");
			name = nameUrl[0];
			url = nameUrl[1];
			//update list
			if(name !== "" && url!==""){
				$("#folder-links").innerHTML += "<li><a title='"+url+"'>"+name+"</a></li>";
			}
			if(i==0){
				$("#selected-folder a").innerHTML = name;
				$("#selected-folder a").title = url;
			}
			//update form
			$("#folder-name-"+(i+1)).value = name;
			$("#folder-url-"+(i+1)).value =url;
		}
	}
	if(localStorage.reportLinks){
		line = localStorage.reportLinks.split("###");
		for(var i=0;i<line.length-1;i++){
			nameUrl= line[i].split(";");
			name = nameUrl[0];
			url = nameUrl[1];
			//update list
			if(name !== "" && url!==""){
				$("#report-links").innerHTML += "<li><a title='"+url+"'>"+name+"</a></li>";
			}
			if(i==0){
				$("#selected-report a").innerHTML = name;
				$("#selected-report a").title = url;
			}
			//update form
			$("#report-name-"+(i+1)).value = name;
			$("#report-url-"+(i+1)).value =url;


		}
	}
	setLinks();
}

//
function setLinks(){
	var reports = $all("#report-links li");
	for(var i=1;i <reports.length;i++){
		reports[i].addEventListener('click',  function(){
			$("#selected-report a").innerHTML = reports[i].innerHTML;
			$("#selected-report a").title = reports[i].title;
			linkToFrame();
	});
	}

	var folders = $all("#folder-links li");
	for(var i=1;i <folders.length;i++){
		folders[i].addEventListener('click', function(){
			$("#selected-folder a").innerHTML = folders[i].innerHTML;
			$("#selected-folder a").title = folders[i].title;
			linkToFrame();
	});
	}
}


function linkToFrame(){
	$('#team-folder-frame').src = $("#selected-folder a").title;
	$('#reports-frame').src = $("#selected-report a").title;

}

function updateExpandLinks(){
	var frames = $all("iframe");
    var expands = $all(".expand-link");

    //update expand buttons to match frame links
    for(var i=0; i<frames.length;i++){
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