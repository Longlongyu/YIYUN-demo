$(document).ready(function(){
    var mouseDown = false;
    var gapX;
    var imgw = $("#bannerImg>img").width();
    var w = imgw*7-$("#bannerImg").width();
    var n = Math.round(($("#bannerImg").width()-$("#bannerImg>img").width())/2);
    $("#bannerImg>img").css({"left":Math.round(-w/2)+"px"});
    $("#bannerImg").mousedown(function(e){
        if(e.button == 0){
            gapX = e.clientX;
            mouseDown = true;
        }
        return false;
    });
    $(document).mousemove(function(e){
        if(mouseDown){
            var x = e.clientX;
            var left;
            if(gapX>x){
                $("#bannerImg>img").css({"left":"-=30px"});
                left = $("#bannerImg>img").css("left").replace(/[^-*0-9]/ig,"");
                if(left<-w){
                    $("#bannerImg>img").css({"left":-w+1+"px"});
                }
            }
            else if(gapX<x){
                $("#bannerImg>img").css({"left":"+=30px"});
                left = $("#bannerImg>img").css("left").replace(/[^-*0-9]/ig,"");
                if(left>0){
                    $("#bannerImg>img").css({"left":-1+"px"});
                }
            }
            setTimeout(function(){
                left = $("#bannerImg>img").css("left").replace(/[^0-9]/ig,"");
                var i = Math.ceil(left/imgw)-1;
                if(i >= $("#bannertab>div").length)i = $("#bannertab>div").length-1;
                $("#bannerImg>img").eq(i+1).addClass("IMGSelected").siblings().removeClass("IMGSelected");
                $("#bannertab>div").eq(i).addClass("Selected").siblings().removeClass("Selected");
                gapX = x;
            },0);
        }
        return false;
    });
    $(document).mouseup(function(){
        if(mouseDown){
            var left = $("#bannerImg>img").css("left").replace(/[^0-9]/ig,"");
            var i = Math.ceil(left/imgw);
            if(i >= $("#bannertab>div").length)i = $("#bannertab>div").length;
            $("#bannerImg>img").animate({"left":-(i*imgw-n)+"px"},"fast");
            mouseDown = false;
        }
        return false;
    });
    $("#bannertab>div").click(function(){
        if(!mouseDown){
            var i = $(this).index();
            $(this).addClass("Selected").siblings().removeClass("Selected");
            i++;
            $("#bannerImg>img").eq(i).addClass("IMGSelected").siblings().removeClass("IMGSelected");
            $("#bannerImg>img").stop();
            setTimeout(function(){
            $("#bannerImg>img").animate({"left":-((i)*imgw-n)+"px"},"fast");},0);
        }
    });
});