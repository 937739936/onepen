/*$(function(){
	for(let i=0;i<15;i++){
		$('<div>').addClass('hang').appendTo('.qipan');
		$('<span>').addClass('shu').appendTo('.qipan');
		for(let j=0;j<15;j++){
			$('<li>').addClass('qizi').appendTo('.qipan').attr('id',i+'_'+j);
		}
	}
	$('li').on('click',function(){
		$(this).addClass('hei');
	})
})*/
$(function(){
	let hei={},bai={};
	let kongbai={};
	for(let i=0;i<15;i++){
		$('<div>').addClass('hang').appendTo('.qipan');
		$('<span>').addClass('shu').appendTo('.qipan');
		for(let j=0;j<15;j++){
			kongbai[i+"_"+j]={x:i,y:j};
			$('<li>').addClass('qizi').attr('id',i+"_"+j).data('pos',{x:i,y:j}).appendTo('.qipan');
		}
	}
	console.log(kongbai)
	let flag=true;
	let isai = true;
	$('.qipan .qizi').on('click',function(){
		if($(this).hasClass('hei')||$(this).hasClass('bai')){
			return
		}
		let data=$(this).data('pos');
		if(flag){
			$(this).addClass('hei');
			hei[data.x+"_"+data.y]=true;
			delete  (kongbai[data.x+"_"+data.y])
			console.log(hei)
			if(panduan(data,hei)>=5){
				$('.qipan .qizi').off();
				alert('黑棋赢')
			}
			if (isai){
				let pos = ai();
				$(`#${pos.x}_${pos.y}`).addClass('bai');
				bai[pos.x+"_"+pos.y]=true;
				delete  (kongbai[pos.x+"_"+pos.y])
				if(panduan(pos,bai)>=5){
					$('.qipan .qizi').off();
					alert('白棋赢')
				}
			}else{
				$(this).addClass('bai');
				bai[data.x+"_"+data.y]=true;
				delete  (kongbai[data.x+"_"+data.y])
				if(panduan(data,bai)>=5){
					$('.qipan .qizi').off();
					alert('白棋赢')
			}
				
			}
		}
		flag=!flag;})
	
	function ai(){
		let max = -Infinity,max1 = -Infinity,zb=null,zb1=null;
		for(let i in kongbai){
			let score = panduan(kongbai[i],bai)
			if(score>=max){
				max=score;
				zb = kongbai[i];
			}
		}
		for(let i in kongbai){
			let score = panduan(kongbai[i],hei);
			if(score>=max1){
				max1=score;
				zb1=kongbai[i];
			}
		}
		return (max > max1) ? zb : zb1;
	}
/*	let weizhi,ov=0,nv;
	function quanzhong(i,j){
		let data = $(`#${i}_${j}`).data('pos');
		bai[i+"_"+j]=true;
		nv = panduan(data,bai);
		if(nv>ov){
			ov=nv;
			weizhi=i+"_"+j;
		}
		
	}
*/
	function panduan(pos,obj){
		let rows=1,cols=1,zx=1,yx=1;
		let i=pos.x,j=pos.y+1;
		while(obj[i+"_"+j]){
			rows++;
			j++;
		}
		j=pos.y-1;
		while(obj[i+"_"+j]){
			rows++;
			j--;
		}
		i=pos.x+1,j=pos.y;
		while(obj[i+"_"+j]){
			cols++;
			i++;
		}
		i=pos.x-1;
		while(obj[i+"_"+j]){
			cols++;
			i--;
		}
		i=pos.x+1,j=pos.y+1;
		while(obj[i+"_"+j]){
			zx++;
			i++;
			j++;
		}
		i=pos.x-1,j=pos.y-1;
		while(obj[i+"_"+j]){
			zx++;
			i--;
			j--;
		}
		//右斜上
		i=pos.x-1,j=pos.y+1;
		while(obj[i+"_"+j]){
			yx++;
			i--;
			j++;
		}
		i=pos.x+1,j=pos.y-1;
		while(obj[i+"_"+j]){
			yx++;
			i++;
			j--;
		}
		return Math.max(rows,cols,zx,yx);
	}
})
