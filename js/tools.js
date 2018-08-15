function autoScreenDisplay(size){
    var html = document.documentElement;
    var hW = html.offsetWidth;
    var fontsize = Math.floor((hW/size)*16);
    if (fontsize<4){fontsize = 4;}
    html.style.fontSize = fontsize + "px";  
}


function scrollDisplay_2(delay,f1 = '',f2 = ''){
    var top = $(document).scrollTop();
    if(top>delay){
        f1(top);
    }else{
        f2(top);
    }
    delay = top;
    return delay;
}

function scrollDisplay(scrolltop,f1 = '',f2 = f1){
    var top = $(document).scrollTop();
    if(top>=scrolltop){
        f1();
    }else{
        f2();
    }
}

function automatic(banner,tab,max,ms,f1 = '',f2 = f1){
    var index = 0;
    var ainterval;
    $(tab+':eq(0)').addClass("Selected");
    function f(){
        index++;
        if(index>max){
            index = 0;
        }
        f1(banner,tab,index);
        /*function(banner,tab,index){
			$(banner).css("opacity",0);
			$(banner+":eq("+index+")").css("opacity",1);
		}*/
        $(tab).removeClass("Selected");
        $(tab+":eq("+index+")").addClass("Selected");
    }
    $(tab).click(function(){
        index = $(this).index(tab);
        clearInterval(ainterval);
        f2(banner,tab,index);
        $(tab).removeClass("Selected");
        $(tab+":eq("+index+")").addClass("Selected");
        ainterval = setInterval(f,ms);
    });
    ainterval = setInterval(f,ms);
}