window.onload = autoScreenDisplay(1349);

$(document).ready(function(){
    $(window).resize(function(){
        autoScreenDisplay(1349); 
    });
    $(window).scroll(function(){
        scrollDisplay($("#oheader").height(),function(){
            if($("#navigation").hasClass("one")){
                $("#navigation").removeClass("one");
                $("#navigation").addClass("two");
            }
            $(".Stick").css("display","block");
        },function(){
            if($("#navigation").hasClass("two")){
                $("#navigation").removeClass("two");
                $("#navigation").addClass("one");
            }
            $(".Stick").css("display","none");
        })
    });
//  $("a").click(function(e){
//      e.preventDefault();
//      var url = $(this).attr('href');
//      console.log(url);
//      if(url != ''){
//          $('body').load(url);
//          if(url != window.location){
//              window.history.pushState({path: url},'',url);
//          }
//      }
//  });
//  $(window).on('popstate',function(e){
//      e.preventDefault();
//      var newPageArray = location.pathname.split('/');
//      var url = newPageArray[newPageArray.length-1];
//      $('body').load(url);
//  });
    $(".Stick").click(function(){
        $('body,html').animate({'scrollTop':0},300);
        if($("#navigation").hasClass("two")){
            $("#navigation").removeClass("two");
            $("#navigation").addClass("one");
        }
        $(".Stick").css("display","none");
    });
    $("#signin").click(function(){
        $(".SignPanel .Panel").removeClass("rotateY");
        $(".SignPanel").css("display","flex");
        setTimeout(function(){
            $(".SignPanel .Panel").addClass("rotateY");},0);
    });
    $("#login").click(function(){
        $(".LoginPanel .Panel").removeClass("rotateY");
        $(".LoginPanel").css("display","flex");
        $(".LoginPanel").css("display");
        setTimeout(function(){
            $(".LoginPanel .Panel").addClass("rotateY");},0);
    });
    $(".SignPanel .close>svg").click(function(){
        $(".SignPanel").css("display","none");
    });
    $(".LoginPanel .close>svg").click(function(){
        $(".LoginPanel").css("display","none");
    });
    $(".gotoLogin").click(function(){
        $(".LoginPanel .Panel").removeClass("rotateY");
        $(".LoginPanel").css("display","flex");
        $(".SignPanel").css("display","none");
        setTimeout(function(){
            $(".LoginPanel .Panel").addClass("rotateY");},0);
    });
    $(".gotoSign").click(function(){
        $(".SignPanel .Panel").removeClass("rotateY");
        $(".SignPanel").css("display","flex");
        $(".LoginPanel").css("display","none");
        setTimeout(function(){
            $(".SignPanel .Panel").addClass("rotateY");},0);
    });
    $(".text").focus(function(){
        $(this).parent().css("box-shadow","0 0 10px rgba(0,0,0,0.8)");
    });
    $(".text").focusout(function(){
        $(this).parent().css("box-shadow","none");
    });
    $(".loginbtn").click(function(){
        $(location).attr('href','personal.html');
        $(location).prop('href','personal.html');
    });
});