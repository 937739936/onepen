$(function () {
    $('#fullpage').fullpage({
        sectionsColor: ['#18181D', '#F658CA', '#212E3E', '#56F638', '#2CF6DC'],
        anchors:["page1","page2","page3","page4","page5"],
        navigation:true,
        keyboardScrolling:true,
        css3:false,
        easing:'easeInQuart',
        navigationTooltips:["首页","自我介绍","技能介绍","作品展示","联系方式"],
        fixedElements:'#menu,.home,.caidan',
        menu: '#menu',
//            loopHorizontal:false,
//            afterLoad:function (a,index) {
//                if(index==2){
//                    alert("进入")
//                }
//            }
//            onLeave:function (index) {
//                if(index==2){
//                    alert("离开");
//                }
//            }
    })
    $(".next").click(function () {
        $.fn.fullpage.moveSectionDown();
    })
    var cont=1;
    $('.caidan').click(function () {
        cont++;
        if(cont%2==0){
            $(this).transition({rotate:'-90deg'});
        }else{
            $(this).transition({rotate:'0deg'});
        }
        $('#menu').slideToggle(600,'easeOutBounce');
    })
    $('.xycaidan').click(function () {
        cont++;
        if(cont%2==0){
            $(this).transition({rotate:'-90deg'});
        }else{
            $(this).transition({rotate:'0deg'});
        }
        $('.xynav').slideToggle(800,'easeOutBounce');
    })

    //自我介绍
    var mewidth=$('.melis').width();
    $('.meright').click(function () {
        $('.first-me').transition({
            x:-mewidth,
            opacity:0
        },400,'ease-in-out')
        $('.last-me').transition({
            x:-mewidth,
            opacity:1
        },400,'ease-in-out')
    }).mousedown(function(e){
        e.preventDefault();
        e.returnValue=false;
    })
    $('.meleft').click(function () {
        $('.first-me').transition({
            x:0,
            opacity:1
        },400,'ease-in-out')
        $('.last-me').transition({
            x:0,
            opacity:0
        },400,'ease-in-out')
    }).mousedown(function(e){
        e.preventDefault();
        e.returnValue=false;
    })
    //作品展示轮播
    var nowbtn=$(".btn:first");
    var btns=$(".btn");
    var nowimg=$(".p3-con:first");
    var imgs=$(".p3-con");
    var movewidth=$('.p3-con').width();
    var proflag=true;
    var m=0;
    var next=0;
    btns.click(function(){
        var index=$(this).index();
        if(index>next){
            if(!proflag){
                return;
            }
            proflag=false;
            imgs.eq(next).animate({left:movewidth},400);
            imgs.eq(index).css("left",-movewidth+"px").animate({left:0},400,function(){
                proflag=true;
            });
        }else if(index<next){
            if(!proflag){
                return;
            }
            proflag=false;
            imgs.eq(next).animate({left:-movewidth},400);
            imgs.eq(index).css("left",movewidth+"px").animate({left:0},400,function(){
                proflag=true;
            });
        }
        btns.eq(next).removeClass("active");
        btns.eq(index).addClass("active");
        m=next=index;
    })
//网站内容展示
//前端技能介绍
    /*$(".skill-list").hover(function () {
        $(this).transition({
            y:'-7px',
            boxShadow:'0px 0px 20px #17E7D9',
            zIndex:5,
        })
    },function () {
        $(this).transition({
            y:'0',
            boxShadow:'0 0 0 #999',
            zIndex:0
        })
    })*/
    //技能
    var skwidth=$('.skill-box .item').width()+40;
    $('.sknext').click(function () {
        $(this).addClass('active');
        $('.skprev').removeClass('active');
        $('.skill-box .item1').transition({
            x:-skwidth,
            opacity:0
        },400,'ease-in-out')
        $('.skill-box .item2').transition({
            x:-skwidth,
            opacity:1
        },400,'ease-in-out')
    })
    $('.skprev').click(function () {
        $(this).addClass('active');
        $('.sknext').removeClass('active');
        $('.skill-box .item1').transition({
            x:-0,
            opacity:1
        },400,'ease-in-out')
        $('.skill-box .item2').transition({
            x:0,
            opacity:0
        },400,'ease-in-out')
    })
    //skill text

    //首页动态切换



})