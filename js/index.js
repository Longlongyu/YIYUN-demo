$(document).ready(function(){
	
    var oOriente = $("#orientation"),
        oHtml = '', vHtml = '', hnum = 10, wnum = 10,
        h = Math.floor(oOriente.height()/hnum), w = Math.floor(oOriente.width()/wnum);
    var v = [];
    for(var i = 0;i < hnum; i++){
        for(var j = 0;j < wnum; j++){
            var c = {
              top:-7.5+(i/2),
              left:-7.5+(j/2)
            };
            v.push(c);
        }
    }
    for(var i = 0;i < (hnum*wnum); i++){
        vHtml = "<div style=\"height:"+h+"px;width:"+w+"px;\"></div>";
        oHtml += vHtml;
    }
    oOriente[0].innerHTML = oHtml;
    
    $("#orientation>div").hover(function(){
        var n = $(this).index();
        $("#banner>img").css("top",v[n].top+"%");
        $("#banner>img").css("left",v[n].left+"%");
    });
});

$(document).ready(function(){
    var pos = 0, oHtml = '', vHtml = '',  oBox = $("#IndividualPanelBox");
    function fillIndividualPanelBox(){
        var bendi = true;
        //获取json数据
//      $.getJSON("ajax/Indivdual.json",function(data){
//          $.each(data, function (infoIndex, info){
//              if(pos<=infoIndex && pos+8>infoIndex){
//                  vHtml = "<div class=\"IndividualPanel\"><img src=\"img/IndivdualPanel/"+info['name'] +"/"+info['production']+".png\"/><div class=\"TitleClassify\"><p class=\"title ohover\">"+info['production']+"</p><p class=\"classify\">"+info['classify']+"</p></div><hr/><div class=\"Individual\"><div class=\"avatar\"><img src=\"img/IndivdualPanel/"+info['name'] +"/"+info['name'] +".jpg\"/><div class=\"ShowPanel\"><div class=\"radiu-square\"><img src=\"img/IndivdualPanel/"+info['name'] +"/"+info['name'] +".jpg\"/>\<p class=\"title ohover\">"+info['name'] +"</p><p class=\"grayFont\">"+info['jobs'] +"</p><div class=\"ShowBtn guanzhu\">关注</div><div class=\"ShowBtn sixin\">私信</div></div><div class=\"triangle\"></div></div></div><p class=\"name ohover\">"+info['name'] +"</p><p class=\"grayFont time\">"+info['time'] +"</p></div></div>";
//                  oHtml += vHtml;
//              }
//          });
//          bendi = false;
//          pos+=8;
//          oBox[0].innerHTML += oHtml;
//      });
        setTimeout(function(){
            if(bendi){
                var data = oIndivdualData;
                for(var i = 0;i< data.length;i++){
                    if(pos<=i && pos+16>i){
                        var info = data[i];
                        vHtml = "<div class=\"IndividualPanel\"><img src=\"img/IndivdualPanel/"+info['name'] +"/"+info['production']+".png\"/><div class=\"TitleClassify\"><p class=\"title ohover\">"+info['production']+"</p><p class=\"classify\">"+info['classify']+"</p></div><hr/><div class=\"Individual\"><div class=\"avatar\"><img src=\"img/IndivdualPanel/"+info['name'] +"/"+info['name'] +".jpg\"/><div class=\"ShowPanel\"><div class=\"radiu-square\"><img src=\"img/IndivdualPanel/"+info['name'] +"/"+info['name'] +".jpg\"/>\<p class=\"title ohover\">"+info['name'] +"</p><p class=\"grayFont\">"+info['jobs'] +"</p><div class=\"ShowBtn guanzhu\">关注</div><div class=\"ShowBtn sixin\">私信</div></div><div class=\"triangle\"></div></div></div><p class=\"name ohover\">"+info['name'] +"</p><p class=\"grayFont time\">"+info['time'] +"</p></div></div>";
                        oHtml += vHtml;
                    }
                }
//              pos+=8;
                oBox[0].innerHTML += oHtml;
            }
        },0);
        return oHtml;
    }
    fillIndividualPanelBox();
    $(".loadMoreBtn").click(function(){
        oHtml = '';
        if(fillIndividualPanelBox() == ''){
            $(".loadMoreBtn")[0].innerHTML = "不能显示更多了";
        }
    });
});

$(document).ready(function(){
    automatic("#banner>img",".tab>div",3,8000,function(banner,tab,index){
		$(banner).css("opacity",0);
		$(banner+":eq("+index+")").css("opacity",1);
	});
    $(".outBtn>input").focus(function(){
        $(".outBtn").css("box-shadow","0 0 30px rgba(255,255,255,1)");
    });
    $(".outBtn>input").focusout(function(){
        $(".outBtn").css("box-shadow","none");
    });
    setTimeout(function(){$(".avatar").hover(function(){
        var ob = $(this);
        ob.find(".ShowPanel").css("display","block");
        setTimeout(function(){
            ob.find(".ShowPanel").css("opacity",1);},0);
    },function(){
        var ob = $(this);
        ob.find(".ShowPanel").css("opacity",0);
        setTimeout(function(){
            ob.find(".ShowPanel").css("display","none");},0);
    });},0);
});