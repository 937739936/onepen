var ctrl=angular.module('ctrl',[]);
var todolist=[
    {id:1,title:'新列表1',
        list:[
        {title:'fasdfasd', done:false,},
        {title:'热爱生活', done:true,},
        {title:'abfdfsd', done:false,},
        {title:'fasdfasd', done:true,},
        ],color:'#CD76E2'},
    {id:2,title:'新列表2',
        list:[
            {title:'你好OA', done:true,},
            {title:'fasdfasd', done:false,},
            {title:'请问的的撒', done:true,},
            {title:'fasdfasd', done:false,},
            {title:'fasdfasd', done:true,},
        ],color:'#1BACF8'},
    {id:3,title:'新列表3',
        list:[
            {title:'fasdfasd', done:true,},
            {title:'fasdfasd', done:false,},
            {title:'fasdfasd', done:true,},
            {title:'fasdfasd', done:false,},
            {title:'你好东方闪电', done:true,},
        ],color:'#FF2969'},
];
var colorArr=['#C970E2','#6DDC31','#40ACF9','#F3CC00','#A0855E','#F62368','#F89600'];

ctrl.factory('localS',function () {
    return{
        getData:function () {
            var data=localStorage.getItem('eventList');
            if(data==null){
                return [{id:1,title:'新列表1',color:colorArr[0],list:[]}];
            }
            return JSON.parse(data);
        },
        saveData:function (todo) {
            var str=JSON.stringify(todo);
            localStorage.setItem('eventList',str);
        }
    }
})
ctrl.controller('ctrl',function ($scope,$filter,localS){
    $scope.todo=localS.getData();
    $scope.index=0;
    $scope.colorArr=colorArr;
    $scope.setShow=false;
    $scope.comFlag=false;
    $scope.add=function (){
        $scope.index=$scope.todo.length;
        $scope.todo.push({
            id:$scope.index+1,
            title:'新列表'+($scope.todo.length+1),
            color:colorArr[$scope.index%7],
            list:[

            ]
        });
    };
    $scope.selec=function(i){
        $scope.index=i;
        $scope.setShow=false;
        $scope.comFlag=false;
        $scope.i=-1;
        $scope.d=-1;
    }
    // 选项的显示和隐藏
    $scope.showState=function () {
        var o=$scope.todo[$scope.index];
        $scope.cTitle=o.title;
        $scope.cColor=o.color;
        $scope.setShow=!$scope.setShow;
    }
    //颜色切换
    $scope.changeColor=function (v) {
        var o=$scope.todo[$scope.index];
        $scope.cColor=v;
    }
    // 完成
    $scope.complate=function () {
        $scope.setShow=false;
        var o=$scope.todo[$scope.index];
        o.title=$scope.cTitle;
        o.color=$scope.cColor;
    }
    // 取消
    $scope.cancel=function () {
        $scope.setShow=false;
    }
    // 删除
    $scope.delete=function () {
        $scope.setShow=false;
        $scope.todo.splice($scope.index,1);
        $scope.index=0;
    }
    // 列表显示隐藏
    $scope.comState=function () {
        $scope.comFlag=!$scope.comFlag;
    }
    //控制背景 
    $scope.i=-1;
    $scope.changeBg=function(index){
        $scope.i=index;
    }
    //已完成和为完成的切换
    $scope.comToggle=function(v,flag){
        v.done=flag;
        $scope.cNum();
    }
    //获取已完成的数量
    $scope.cNum=function () {
        $scope.comNum=$filter('filter')($scope.todo[$scope.index].list,true).length;
    }
    $scope.$watch(function(){return $scope.todo[$scope.index]},function () {
        $scope.cNum();
        localS.saveData($scope.todo);
    },true)
    // 清除已完成事件
    $scope.clearAll=function () {
        $scope.todo[$scope.index].list=$filter('filter')($scope.todo[$scope.index].list,false);
        $scope.cNum();
    }
    // 删除当前事件
    $scope.d=-1;
    $scope.delEvent=function (index) {
        $scope.d=index;
        if($scope.d==index){
            $scope.todo[$scope.index].list.splice(index,1);
        }
    }
    //新建事项
    $scope.addEvent=function () {
        $scope.todo[$scope.index].list.push({title:'', done:false});
    }


})