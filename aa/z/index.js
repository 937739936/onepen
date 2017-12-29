function game() {
    this.zimu=[
        {name:'A',src:'A.png'},
        {name:'B',src:'B.png'},
        {name:'C',src:'C.png'},
        {name:'D',src:'D.png'},
        {name:'E',src:'E.png'},
        {name:'F',src:'F.png'},
        {name:'G',src:'G.png'},
        {name:'H',src:'H.png'},
        {name:'I',src:'I.png'},
        {name:'J',src:'J.png'},
        {name:'K',src:'K.png'},
        {name:'L',src:'L.png'},
        {name:'M',src:'M.png'},
        {name:'N',src:'N.png'},
        {name:'O',src:'O.png'},
        {name:'P',src:'P.png'},
        {name:'Q',src:'Q.png'},
        {name:'R',src:'R.png'},
        {name:'S',src:'S.png'},
        {name:'T',src:'T.png'},
        {name:'U',src:'U.png'},
        {name:'V',src:'V.png'},
        {name:'W',src:'W.png'},
        {name:'X',src:'X.png'},
        {name:'Y',src:'Y.png'},
        {name:'Z',src:'Z.png'}
    ],
    this.current=[],
    this.le=3,
    this.box=document.querySelector('.box'),
    this.width=this.box.offsetWidth-50,
    this.height=this.box.offsetHeight-70,
    this.t=''
    this.fenshu=document.querySelector('.fenshu')
    this.live=document.querySelector('.live')
    this.guan=document.querySelector('.guan')
    // console.log(this.fenshu,this.live)
}
    game.prototype={
        play:function () {
            this.getall()
            this.drow()
            this.move()
            this.key()
    },//键盘事件
        key:function () {
            var that=this;
            document.onkeydown=function (e) {
                var n=e.keyCode
                // console.log(typeof n)
                // console.log(n)
                if(n==32){
                    kaiguanfun()
                }
                var on=String.fromCharCode(n)
                // console.log(on)
                that.current.forEach(function (val,ind) {
                    if (val.name==on){
                        var imgs=document.querySelectorAll('img')
                        // console.log(imgs[ind])
                        that.box.removeChild(imgs[ind])
                        that.current.splice(ind,1)
                        that.getone()
                        that.fenshu.innerText++
                        if (that.fenshu.innerText>=that.guan.innerText*20){
                            setTimeout(function () {

                                alert('进入下一关')
                                that.xia()
                            },10)
                        }
                    }
                })
            }
        },
        xia:function () {
            this.guan.innerText++;
            this.le++
            this.getone()
        },
    //初始图
    getall:function () {
        var self=this
        // console.log(this.le)
        while (this.current.length<this.le){
            var ran=Math.floor(Math.random()*this.zimu.length)
            var obj=self.zimu[ran]
            // console.log(obj)
            if(!self.check(obj)){
                self.current.push(obj)
            }
        }
        // console.log(this.current)
    },
    //判断生成图片
    check:function (obj) {
        var self=this
        return self.current.some(function(value){
            return value==obj
        })
    },
    //生成单个
    getone:function (){
        do{
            var ran=Math.floor(Math.random()*this.zimu.length)
            var obj=this.zimu[ran]
        }while (this.check(obj))
        this.current.push(obj)
        var img=document.createElement('img')
        img.src=`A_Z/${obj.src}`
        this.box.appendChild(img)
        // if()
        var left=Math.random()*this.width
        img.style.left=left+'px';
        var top=Math.random()*70
        img.style.top=top+'px';
        clearInterval(this.t)
        this.move()
    },
    // 生成图
    drow:function () {
        for(var i=0;i<this.current.length;i++){
            var img=document.createElement('img')
            img.src=`A_Z/${this.current[i].src}`
            this.box.appendChild(img)
            var left=Math.random()*this.width
            img.style.left=left+'px';
            var top=Math.random()*70
            img.style.top=top+'px';
        }
    },
    //运动
    move:function () {
        var slef=this;
        this.t=setInterval(function () {
            var imgs=document.querySelectorAll('img')
            // console.dir(imgs)
            for (var i=0;i<imgs.length;i++){
                var newtop=imgs[i].offsetTop
                //判断超出消除点
                if(newtop>=slef.height){
                    slef.box.removeChild(imgs[i])
                    slef.current.splice(i,1)
                    slef.live.innerText--
                    //判断生命值
                    if(slef.live.innerText<=0){
                        key=function () {
                        }
                        clearInterval(slef.t)
                        slef.move=function(){}
                        slef.getone=function () {}
                        setTimeout(function () {
                            alert('Game Over')
                        },100)
                        // console.log(slef.current)
                        return;
                    }else {
                        slef.getone()
                    }
                }else {
                    imgs[i].style.top=newtop+1+'px'
                }
            }
        },10)
    },

}
