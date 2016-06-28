
// OpenTab Function
function openTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" w3-blue", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " w3-blue";
}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

// Default Tab
$(document).ready(function(){
	eventFire(document.getElementById('default-tab'), 'click');
});

// App Instance
var app = new Vue({
	'el':'#app',
	data:{

		url:'https://private-a1e9a-sdminer.apiary-mock.com',
		sessions:'',
		session_number:0,

	},
	methods:{

		reload: function() {
			app.getSessionStatus();
		},
	
		getSessionStatus: function() {
			$.ajax({url: app.url+'/sessions',dataType:'json',success:function(d){
				app.sessions=d;
			}});
		},

	}
});

app.reload();