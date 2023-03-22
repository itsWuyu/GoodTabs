// Background 

const numItemsToGenerate = 1; 
var CTime = new Date();
var CDay = CTime.getDate();
CTime = CTime.getHours();
let uhrzeit = localStorage.getItem("time");
let ru = localStorage.getItem("bg")
let day = localStorage.getItem("day")

if(CDay != day && localStorage.getItem('darkbg') != 1 &&  localStorage.getItem('darkbg') != 1){
//localStorage.setItem("time", CTime);
localStorage.setItem("day", CDay);
renderItem(); 
} 
else {  keepbg(ru); }

//Initialise LocalStorageKeys
if(localStorage.getItem("HideSearchBar") == null ){ localStorage.setItem("HideSearchBar", 1); }
if(localStorage.getItem("affiliate") == null ){ localStorage.setItem("affiliate", 0); }
if(localStorage.getItem("ShowAds") == null ){ localStorage.setItem("ShowAds", 0); }
if(localStorage.getItem("mostv") == null ){ localStorage.setItem("ShowAds", 1); }

//Quick Check for SearchBar Settings
if(localStorage.getItem("HideSearchBar") == 0 ){ $("#searchbar").addClass('active-3-NoDisplay'); }
//get BG
function renderItem(){
  fetch(`https://source.unsplash.com/1920x1080/?wallpapers`).then((response)=> {   
 
       document.body.style.backgroundImage = `url('${response.url}')`;       
       localStorage.setItem("bg", response.url);
       localStorage.setItem('darkbg', 0);
       
  }) 
}


function keepbg(bg_img){
    if(localStorage.getItem('darkbg') == 1){  $(document.body).css( "background", "black" );}
    else {
    localStorage.setItem('darkbg', 0);    
    document.addEventListener("DOMContentLoaded", function(event){
        document.body.style.backgroundImage=`url('${bg_img}')`;  
    })
    }
    
            
}




//Time

function settingClock() {
    var today = new Date();
    var hour = today.getHours();
    var minute = today.getMinutes();
    
    

    if(hour < 10) {
            hour = "0" + hour; 
    } 
    if (minute < 10) {
            minute = "0" + minute;
    }

   

    var frame = document.getElementById("time");
  
    frame.innerHTML = hour + ":" + minute;    

}

setInterval(settingClock, 500);


//Tab Counter


function tabCounter(){
    let current = 0;
    if(localStorage.getItem("tab") != null){
        current = localStorage.getItem("tab");
        let intCurrent = parseInt(current);
        intCurrent = intCurrent + 1;
        localStorage.setItem("tab", intCurrent);      
        document.getElementById("tabs").innerHTML = intCurrent;

    }
    else {
        localStorage.setItem("tab", 1);
        document.getElementById("tabs").innerHTML = 1;
    }
}
 
tabCounter();



// Menu Settings

    $(document).ready(function () {
    
        //enfernt es und setzt es sofort wieder da er in die else schleife kommt

        $('.s-menu').on('click', function(){
            if($('#settings-menu').hasClass('active')){
                $('#settings-menu').removeClass('active');        
                
            }    
            else{
                $('#settings-menu').toggleClass('active');            
               
            }   
        
        });
    
        
   

        $(document).mouseup(function (e) {
            var container = $("#settings-menu");
            if(!container.is(e.target) && container.has(e.target).length === 0 && !$(e.target).hasClass('s-menu')) {
              $('#settings-menu').removeClass('active'); 
                chooseSelected(-1); //Get/Set Current Search Engien 
                
                
            }
        });

    
    });
    //Keep Selected

    function keepSelected(){   
        if(localStorage.getItem("se") != null){      
        var se = parseInt(localStorage.getItem("se"));
        document.getElementById("selector").options[se-1].setAttribute("selected", "selected");   
        chooseSelected(se);      
        }

        if(localStorage.getItem("darkbg") == 1){
            $('#black').attr('src', 'assets/img/toggle-on-solid.svg'); 
        }
    }
    keepSelected()

    // Select Search Engien
    function chooseSelected(input) {
        var e = document.getElementById("selector");
        if(input == -1){
        var strUser = e.value;
        }
        else {
            var strUser = input ;
        }

        if(strUser == 1){
            $('form').attr('action', 'https://www.google.de/search?q=');
            localStorage.setItem("se", 1);
        }
        else if(strUser == 2){
            $('form').attr('action', 'https://duckduckgo.com/');
            localStorage.setItem("se", 2);
        }
        else if(strUser == 3){
            $('form').attr('action', 'https://www.ecosia.org/search?q=');
            localStorage.setItem("se", 3);
        }
        else if(strUser == 4){
            $('form').attr('action', 'https://www.bing.com/?q=');
            localStorage.setItem("se", 4);
        }
        else{
            $('form').attr('action', 'https://duckduckgo.com/');
            localStorage.setItem("se", 2);
        }      
    }


// Toggle Icons
    function ChangeBg(id){
        $(id).on('click', function(){
            $('#black').attr('src', 'assets/img/toggle-off-solid.svg');
               renderItem();
        });
    }

    ChangeBg("#bg");


      
//HideTopSite
    function HideTopSite(id, mfav){
        if(localStorage.getItem("mostv") == 1){$(mfav).addClass('active-2'); $(id).attr('src', 'assets/img/toggle-on-solid.svg');}
        else{$(mfav).removeClass('active-2'); $(id).attr('src', 'assets/img/toggle-off-solid.svg');}
        $(id).on('click', function(){
            if(localStorage.getItem("mostv") == 0 ){                
                $(mfav).toggleClass('active-2');
                localStorage.setItem("mostv", 1);   
                $(id).attr('src', 'assets/img/toggle-on-solid.svg');            
            }
            else {
                $(mfav).removeClass('active-2');
                localStorage.setItem("mostv", 0);
                $(id).attr('src', 'assets/img/toggle-off-solid.svg');                   
            }        
            
     });
    }

    HideTopSite("#hmv", "#mostv")


 // Menu choices
 
 $('nav div div').click(function(e) {

    //e.preventDefault();
    $('nav div').removeClass('active-nav');
    $(this).addClass('active-nav');
    if(this.id =='id-bg'){
        
      $('.settings-content-general').addClass('noshow');
      $('.settings-content-bg').removeClass('noshow');
      
    }
    else if(this.id === 'id-general') {
      $('.settings-content-general').removeClass('noshow');
      $('.settings-content-bg').addClass('noshow');
     
    }
    else if(this.id === 'id-goodtabs-website'){


    }


 })

 //Dark Background

 $('#black').click(function(e){
    e.preventDefault();
    if(localStorage.getItem("darkbg") == 0){$('#black').attr('src', 'assets/img/toggle-on-solid.svg'); localStorage.setItem('darkbg', 1);  $(document.body).css( "background", "black" );}
    else if(localStorage.getItem("darkbg") == 1){$('#black').attr('src', 'assets/img/toggle-off-solid.svg'); localStorage.setItem('darkbg', 0); renderItem();}
    else { localStorage.setItem('darkbg', 0); }
    
 })

 //Own Background

 function upload_img(id){
    const image_input = document.querySelector("#" + id);
    var upload_img = "";

    image_input.addEventListener("change", function(){
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            upload_img = reader.result;
            $(document.body).css( "background-image", `url('${upload_img}')` );  
            localStorage.setItem('UserBackground', 1);  
            localStorage.setItem('darkbg', 0);
            localStorage.setItem("bg", upload_img);
            $('#black').attr('src', 'assets/img/toggle-off-solid.svg');
            
        })
        reader.readAsDataURL(this.files[0]);
        window.location.reload();
        
        
    })
    
 }


$(document).ready(function(){
    // Get value on button click and show alert
    $("#change-bg-button").click(function(){
        var cbg = $('input[name=cbg]').val();
        if(cbg == 0) { return;}
      //document.body.style.backgroundImage = `url('${cbg}')`;  
      $(document.body).css( "background-image", `url('${cbg}')` );   
      localStorage.setItem("bg", cbg);
      localStorage.setItem('darkbg', 0);
      localStorage.setItem('UserBackground', 1);
      //window.location.reload();
    });

    $("#reset-button").click(function(){
        renderItem();
        $('#black').attr('src', 'assets/img/toggle-off-solid.svg');

    });

    upload_img("upload-bg-button");
   
   

});







//Top Sites

    function top_site(urls)
    {   
        var l = urls.length;
        if(l > 10){ l = 8;}
        
        for (var i = 0; i < l; i++) 
        {
            var favicon = "http://www.google.com/s2/favicons?domain=" + urls[i].url
            $('#mostv').append("<div class='mostv-con'><a  class='favicon' href = " + urls[i].url + "><div class='mostv-idiv'><img src=" + favicon +" > </div> <span class='mostv-text'>" + urls[i].title + "</span></a></div>");        
           
               
        }
       
        
    }try{chrome.topSites.get(top_site);}catch (error){}
   
   
   //Ads
   function loadAds(adC, link){
       if(Math.floor(Math.random()* 2) == 1){
        $(adC).attr('src', link); 
        //console.log('on')
       }
       else {
        $(adC).attr('src', ''); 
        //console.log('off')
       }
   }
//On load
//loadAds('.ad1', 'https://rlvnt-media.de/nonofyourbusiness/toldu/ad1.html' );
// every 60 seconds
//setInterval(() => {
//    loadAds('.ad1', 'https://rlvnt-media.de/nonofyourbusiness/toldu/ad1.html' )
//}, 60000)

//ToogleMenu
function ToggleMenuSettings(Id, LocalStorageKey){
    if(localStorage.getItem(LocalStorageKey) == 1){$(Id).attr('src', 'assets/img/toggle-on-solid.svg');}
    else{$(Id).attr('src', 'assets/img/toggle-off-solid.svg');}
    $(Id).on('click', function(){
        //HideSearchbar
        if(Id == "#hsb"){
            if (localStorage.getItem(LocalStorageKey) == 0) {
                $("#searchbar").removeClass('active-3-NoDisplay')
                $("#searchbar").addClass('active-2');
                localStorage.setItem(LocalStorageKey, 1);
                $(Id).attr('src', 'assets/img/toggle-on-solid.svg');
            } else {
                $("#searchbar").removeClass('active-2');
                $("#searchbar").addClass('active-3-NoDisplay');
                localStorage.setItem(LocalStorageKey, 0);
                $(Id).attr('src', 'assets/img/toggle-off-solid.svg');
            }
        }
        else { //Everything else
            if (localStorage.getItem(LocalStorageKey) == 0) {
                localStorage.setItem(LocalStorageKey, 1);
                $(Id).attr('src', 'assets/img/toggle-on-solid.svg');
            } else {
                localStorage.setItem(LocalStorageKey, 0);
                $(Id).attr('src', 'assets/img/toggle-off-solid.svg');
            }
        }

    });
}

ToggleMenuSettings("#hsb", "HideSearchBar")
ToggleMenuSettings("#AllowAffiliate", "affiliate")
ToggleMenuSettings("#hsa", "ShowAds")

