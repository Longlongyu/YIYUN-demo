$(document).ready(function(){
    var delay = 0;
    var opacity = 0.9;
    $(window).scroll(function(){
        scrollDisplay($("header").height()-$("nav").height(),function(){
            $(".Saying").css("position","fixed");
            $(".Saying").css("top",$("nav").height());
            $("#IMGBox").css("margin-top",$(".Saying").height());
        },function(){
            $(".Saying").css("position","relative");
            $(".Saying").css("top",0);
            $("#IMGBox").css("margin-top",0);
        })
    });
    $(".imgpanel>svg").click(function(){
        if($(this).css("opacity")==0.7){
            $(this).css("opacity",0.8);
            $(this).css('background-color','red');
        }else{
            $(this).css("opacity",0.7);
            $(this).css('background-color','black');
        }
    });
    
    function bannerchange(){
        $("#banner>div").each(function(){
            if($(this).css("opacity")==1){
                $(this).css("opacity",0);
            }
            else{
                $(this).css("opacity",1);
            }
        })
        $("#banner>div").css("top",'0em');
        $(".button").css("top",'28em');
        $(".button,#banner>div").stop();
        setTimeout(function(){
            $(".button").animate({top:'10em'},"slow");
            $(".button").animate({top:'13em'},"fast");
            $("#banner>div").animate({top:'1em'},"slow");
            $("#banner>div").animate({top:'0.8em'},"fast");
            $("#banner>div").animate({top:'1em'},"fast");
        },0);
        $("#discoverBox>span").each(function(){
            var time = Math.random()*1000;
            var ithis = $(this);
            ithis.css("top",'-4em');
            ithis.css("opacity",0);
            setTimeout(function(){
                ithis.animate({top:0,opacity:1},time);
                ithis.animate({top:'-0.8em'},"fast");
                ithis.animate({top:0},"fast");
            },0);
        })
    }
    bannerchange();
    setInterval(bannerchange,5000);
});