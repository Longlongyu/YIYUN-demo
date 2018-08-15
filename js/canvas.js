var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var W = canvas.width;
var H = canvas.height;

var s = new oParticles();

function oParticles(){
    var particles = []
    function createParticle(x,y,r,p_x,p_y,fillStyle,i_fillStyle,count,ctime,delay,duration){
        var particle = {
            s_x:x,
            s_y:y,
            x:x,
            y:y,
            r:r,
            p_x:p_x,
            p_y:p_y,
            fillStyle:fillStyle,
            i_fillStyle:i_fillStyle,
            count:count,
            ctime:ctime,
            delay:delay,
            duration:duration,
            alpha:Math.random()
        }
//      for (var item in particle.fillStyle) {particle.i_fillStyle[item] = particle.fillStyle[item];}
        return particle;
    }
    return {
        particles:particles,
        back:function back(){
            for (var p = 0; p < particles.length; p++){
                particles[p].x = particles[p].s_x;
                particles[p].y = particles[p].s_y;
            }
        },
        setFillStyle:function setFillStyle(fillStyle,i_fillStyle){
            for (var p = 0; p < particles.length; p++){
                particles[p].fillStyle = fillStyle;
                particles[p].i_fillStyle = i_fillStyle;
            }
        },
        createParticles:function createParticles(num,r,r2,fillStyle,i_fillStyle,delay,duration){
            for (var p = 0; p < num; p++) {
                particles.push(createParticle(0,0
                    ,r+((Math.random()-0.5)*r2),0,0,fillStyle
                    ,i_fillStyle,0,0,Math.random()*delay,duration));
            }
        },
        readContext:function readContext(data,gap){
            particles = [];
            var par_x = 0, par_y = 0;
            for (var p = 0; p < data.length; p += (4 * gap)) {
                if (data[p + 3] > 0) {
                    var z = [data[p],data[p+1],data[p+2],Math.random()]; 
                    particles.push(createParticle(W/2,H/1.2
                        ,1,par_x,par_y,z,z,0,0,Math.random()*200,200));
                }
                par_x += gap;
                if (par_x >= canvas.width) {
                    p += (gap * 4 * canvas.width) - (par_x*4);
                    par_x = 0;
                    par_y += gap;
                }
            }
        },
    }
}

function oAction(mouseAction, floatAction, particleDie){
    var mouseAction = mouseAction,
        floatAction = floatAction,
        particleDie = particleDie,
        coordinate = false, speed = 1,
        deg = 0 ,distance = 0;
    return {
        getdeg:function getdeg(){
            return deg;
        },
        getdistance:function getdistance(){
            return distance;
        },
        setdistance:function setdistance(num){
            distance = num;
        },
        getMouseAction:function getMouseAction(){
            return mouseAction;
        },
        getFloatAction:function getFloatAction(){
            return floatAction;
        },
        setMouseAction:function setMouseAction(boolean){
            mouseAction = boolean;
        },
        setFloatAction:function setFloatAction(boolean){
            mouseAction = boolean;
        },
        canParticleDie:function canParticleDie(){
            return particleDie;
        },
        setParticleDie:function setParticleDie(boolean){
            particleDie = boolean;
        },
        getcoordinate:function getcoordinate(){
            return coordinate;
        },
        setcoordinate:function setcoordinate(boolean){
            coordinate = boolean;
        },
        getSpeed:function getSpeed(){
            return speed;
        },
        setSpeed:function setSpeed(speed){
            speed = speed;
        },
        createImgAction:function createImgAction(src){
            var oimage = new Image();
            if(oimage.width > W){
                oimage.width = W;
            }
            oimage.onload = function(){
                ctx.clearRect(0,0,W,H);
                
                ctx.drawImage(oimage,(W/2)-(oimage.width/2),(H/2)-(oimage.height/2));
                var data = ctx.getImageData(0, 0, W, H).data;
                s.readContext(data,4);
                
                ctx.clearRect(0,0,W,H);
            }
            oimage.src = src;
        },
        createTopAction:function createTopAction(d){
            var p = s.particles;
            deg = 180;
            distance = d;
            if (!p||p.length==0){
                s.createParticles(20,1,1,[0,255,255,1],[255,255,255,1],2000,500);
            }
            setTimeout(function(){
                for (var i = 0; i < p.length; i++) {
                    p[i].s_x = Math.random()*W;
                    p[i].s_y = H+5;
                }
            },0);
        }
    }
}

function draw(oAction){
    var len = s.particles.length ,p = null;
    ctx.clearRect(0,0,W,H);
    for(var i = 0; i <len; i++){
        ctx.beginPath();
        p = s.particles[i];
        f = p.fillStyle;
        ctx.fillStyle = 'rgba('+f[0]+', '+f[1]+', '+f[2]+', '+p.alpha+')';
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x,p.y,p.r,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();
        
        ctx.globalCompositeOperation="source-over";
        ctx.beginPath();
        z = p.i_fillStyle;
        ctx.fillStyle = 'rgba('+z[0]+', '+z[1]+', '+z[2]+', '+p.alpha+')';
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x,p.y,p.r/2,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();
    }
    update(oAction);
}

function update(oAction){
    var len = s.particles.length,
        p = null,
        c_x, c_y, c_time = 0, c_duration = 0;
    
    for (var i = 0; i < len ; i++) {
        p = s.particles[i];
        c_duration = p.duration;
        c_time = p.ctime;
        if(oAction.canParticleDie() && c_duration < c_time){
        	p.s_x = Math.random()*W;
            p.x = p.s_x;
            p.y = p.s_y;
            p.ctime = 0;
            continue;
        }
        if(oAction.getMouseAction() && function leaveMouse(r){
            var r = r;
            var angle = getAngle(p.x,p.y,mouseXY.x,mouseXY.y)*(180/Math.PI);
            var d = onDiff(p.x,p.y,mouseXY.x,mouseXY.y);
            if(onCircle(p.x,p.y,mouseXY.x,mouseXY.y,r)){
                p.x = p.x+((d-r)*Math.sin(angle));
                p.y = p.y+((d-r)*Math.cos(angle));
                p.ctime++;
                return true;
            }
            return false;
        }(60)){
            continue;
        }
        if(oAction.getFloatAction() && onCircle(p.x,p.y,p.p_x,p.p_y,10)){
            p.x = p.x+(Math.random()-0.5)*3;
            p.y = p.y+(Math.random()-0.5)*3;
            p.ctime++;
            continue;
        }else if(p.count++ > p.delay){
            
            (function move(boolean){
                if(oAction.getcoordinate()){
                    c_x = easeInOutExpo(c_time, p.x, p.p_x - p.x, c_duration);
                    c_y = easeInOutExpo(c_time, p.y, p.p_y - p.y, c_duration);
                    p.x = c_x;
                    p.y = c_y;
                }
                else{
                    var hudu = (2*Math.PI/360)*oAction.getdeg();
                    var d = oAction.getdistance();
                    c_x = p.s_x + Math.sin(hudu)*d;
                    c_y = p.s_y + Math.cos(hudu)*d;
                    p.x = easeOutExpo(c_time, p.x, c_x - p.x, c_duration);
                    p.y = easeOutExpo(c_time, p.y, c_y - p.y, c_duration);
                    if(oAction.canParticleDie()&&(p.x == c_x)&&(p.y == c_y)){
                        p.x = p.s_x;
                        p.y = p.s_y;
                        p.ctime = 0;
                    }
                }
            }());
            
            p.ctime++;
        }
    }
}

var readpos = 0;
function read(aarray){
    var c = aarray;
    setTimeout(c[readpos],0);
    readpos++;
    if(readpos > c.length-1){
        readpos = 0;
    }
}

function easeOutExpo(t, b, c, d){
    t /= d*10;
    if(t < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    t--;
    return c/2 * (-Math.pow(2, -10 * t) + 2) + b;
}
function easeInOutExpo(t, b, c, d){
    t /= d/2;
    if(t < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    t--;
    return c/2 * (-Math.pow(2, -10 * t) + 2) + b;
}
function getAngle(px,py,mx,my){
    var x = mx-px,
        y = my-py,
        z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2)),
        cos = y/z,
        radina = Math.acos(cos),
        angle = 180/(Math.PI/radina);
    if(mx>px&&my>py){//鼠标在第四象限
        angle = 180 - angle;
    }
    if(mx==px&&my>py){//鼠标在y轴负方向上
        angle = 180;
    }
    if(mx>px&&my==py){//鼠标在x轴正方向上
        angle = 90;
    }
    if(mx<px&&my>py){//鼠标在第三象限
        angle = 180+angle;
    }
    if(mx<px&&my==py){//鼠标在x轴负方向
        angle = 270;
    }
    if(mx<px&&my<py){//鼠标在第二象限
        angle = 360 - angle;
    }

    return angle;
}
function onCircle(x1,y1,x2,y2,r){
    var d = onDiff(x1,y1,x2,y2);
    if(d < r){
        return true;
        }
    return false;
}
function onDiff(x1,y1,x2,y2){
    var xdiff = x2 - x1,
        ydiff = y2 - y1,
        d = Math.pow((xdiff*xdiff + ydiff*ydiff), 0.5);
    return d;
}
function getHypotenuse(d1,d2){
    var hypotenuse = Math.sqrt(d1*d1+ d2*d2);
    return hypotenuse;
}

canvas.onmousemove = function mousePostion(event){
    if(event.pageX || event.pageY){
        mouseXY = {x:event.pageX, y:event.pageY};
        return ;
    }
    mouseXY = {
        x:event.clientX + document.body.scrollLeft - document.body.clientLeft,
        y:event.clientY + document.body.scrollTop -document.body.clientTop
    };
    return ;
}

var a = new oAction(false,false,true);
a.createTopAction(350);
setTimeout(s.back,0);
var timer = setInterval('draw(a)', 7);