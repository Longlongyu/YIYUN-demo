$(document).ready(function() {
    var mouseDown = false;
    var gapX;
    var boxw = $(".wbox").innerWidth()
    var w = boxw * ($(".wbox").length - 1);
    var d = 0;
    $("#worksbox").mousedown(function(e) {
        if(e.button == 0) {
            gapX = e.clientX;
            mouseDown = true;
        }
        return false;
    });
    $(document).mousemove(function(e) {
        if(mouseDown) {
            var x = e.clientX;
            var left;
            if(gapX > x) {
                $(".wbox").css({
                    "left": "-=40px"
                });
                left = $(".wbox").css("left").replace(/[^-?0-9*.?0-9*]/ig, "");
                d -= 40;
                if(left < -w) {
                    $(".wbox").css({
                        "left": -w + "px"
                    });
                }
            } else if(gapX < x) {
                $(".wbox").css({
                    "left": "+=40px"
                });
                d += 40;
                left = $(".wbox").css("left").replace(/[^-?0-9*.?0-9*]/ig, "");
                if(left > 0) {
                    $(".wbox").css({
                        "left": 0 + "px"
                    });
                }
            }
            setTimeout(function() {
                left = $(".wbox").css("left").replace(/[^-?0-9*.?0-9*]/ig, "");
                var i = Math.round(left / boxw);
                if(i >= $(".wbox").length) i = $(".wbox").length - 1;
                i = Math.abs(i);
                $("#workbtn>div").eq(i).addClass("oselect").siblings().removeClass("oselect");
                gapX = x;
            }, 0);
        }
        return false;
    });
    $(document).mouseup(function() {
        if(mouseDown) {
            var left = $(".wbox").css("left").replace(/[^-?0-9*.?0-9*]/ig, "");
            var i = Math.round(left / boxw);
            if(i >= $(".wbox").length) i = $(".wbox").length - 1;
            i = Math.abs(i);
            console.log(i);
            $("#workbtn>div").eq(i).addClass("oselect").siblings().removeClass("oselect");
            $(".wbox").animate({
                "left": -(i * boxw) + "px"
            }, "fast");
            mouseDown = false;
        }
        return false;
    });
    $("#workbtn>div").click(function() {
        if(!mouseDown) {
            var i = $(this).index();
            $(this).addClass("oselect").siblings().removeClass("oselect");
            $(".wbox").stop();
            setTimeout(function() {
                $(".wbox").animate({
                    "left": -(i * boxw) + "px"
                }, "fast");
            }, 0);
        }
    });

    //星星点击小游戏
    const starnum = 20;
    const speedNum = 4;
    const minspeed = 1;
    const ramdomnum = 25;
    const minsize = 20;
    const resettop = 500;

    class StarGame {
        constructor(selector,num){
            let ohtml;
            for(let i = 0; i < num; i++) {
                ohtml+=`<div class="fa fa-star-o fa-spin star"></div>`;
            }
            $(selector).html(ohtml);
            this.num = num;
            this.parent = $(selector);
            this.Stars = $(`${selector}>div`);
            this.speed = [];
            for(let j = 0; j < this.num; j++) {
                this.reset(this.Stars.eq(j),ramdomnum,j);
            }
            let _this = this;
            this.Stars.click(function(){
                _this.mark+=1;
                _this.died($(this),$(this).index(`${selector}>div`));
            });
        }
        init(){
            this.move();
        }
        move(){
            for(let o = 0; o < this.num; o++) {
                let top = this.Stars.eq(o).css('top').replace(/[^-?0-9*.?0-9*]/ig, "");
                if(top<0){
                    this.died(this.Stars.eq(o),o);
                }else{
                    this.Stars.eq(o).css({'top':`-=${this.speed[o]}px`});
                }
            }
        }
        died(element,i){
            let _this = this;
            element.animate({opacity: 1},'fast');
            element.animate({opacity: 0},'fast',function(){
                _this.reset(element,ramdomnum,i);
            });
        }
        reset(element,ramdom,index){
            let ramdompx = Math.round((Math.random()*ramdom)+minsize);
            let ramdomleft = Math.round(Math.random()*this.parent.width());
            this.speed[index] = speedNum * Math.random();
            if(this.speed[index] < minspeed)this.speed[index] = minspeed - (Math.random()/2);
            element.css({'font-size':`${ramdompx}px`,'top':`${resettop}px`,'left':`${ramdomleft}px`,'opacity': 0.8});
        }
    }
    const oStars = new StarGame('#myGame',starnum);
    let timer = setInterval(function(){oStars.init()},15);
    
});