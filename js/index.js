$(function(){
	function makepoker(){
		var colors=['h','s','d','c'];
		var biao={};
		var poker=[];
		while(poker.length!=52){
		var index=Math.floor(Math.random()*4);
		var n=Math.ceil(Math.random()*13);
		var c=colors[index];
		var v=({
			color:c,
			number:n
		})
		if(!biao[c+n]){
			poker.push(v)
			biao[c+n]=true;
		}
	}
	return poker;
}
function setpoker(poker){
	var dict={
		1:'A',
		2:2,
		3:3,
		4:4,
		5:5,
		6:6,
		7:7,
		8:8,
		9:9,
		10:'T',
		11:'J',
		12:'Q',
		13:'K'
		}
	var index=0;
		for (var i = 0,poke;i <7; i++) {
		for (var j= 0; j< i+1;j++) {
			poke=poker[index];
			index+=1;
		$('<div>')
			.attr('data-number',poke.number)
			.attr('data-color',poke.color)
			.attr('id',i+'_'+j)
			.addClass('pai')
			.appendTo('.screen')
			.css('background-image','url(./image/'+dict[poke.number]+poke.color+'.png)')
			.delay(index*30)
			.animate({
				top:i*40,
				left:j*130+(6-i)*65+50,
				opacity:1
			})
		};
		};
		var index1=0;
		for (; index<poker.length; index++) {
			poke=poker[index];
			index1+=1;
		$('<div>')
			.attr('data-number',poke.number)
			.attr('data-color',poke.color)
			.addClass('pai left')
			.appendTo('.screen')
			.css('background-image','url(./image/'+dict[poke.number]+poke.color+'.png)')
			.delay(index1*30)
			.animate({
					top:430,
					left:190,
					opacity:1
			})
		};
 	 }
	// setpoker(makepoker())


	var moveright=$('.moveright')
	var zIndex=1;
	moveright.on('click',(function(){
		return function(){
			$('.left')
				.css('zIndex',zIndex++)
				.last()
				.animate({
						left:690
				})
				.queue(function(){
					$(this)
					.removeClass('left')
					.addClass('right')
					.dequeue()
				})
		}
	})())
		

	var number=0;
	var moveleft=$('.moveleft')
	moveleft.on('click',(function(){
		return function(){
			if($('.left').length){
				return;
			}
				number+=1;
			if(number>3){
				return;
			}
				$('.right').each(function(i){
					$(this)
					.delay(i*50)
					.css('zIndex',0)
					.animate({
						left:190
				})
					.queue(function(){
					$(this)
						.removeClass('right')
						.addClass('left')
						.dequeue()
					})
				})
	}
	})())
		
	function getNumber(el){
		return parseInt($(el).attr('data-number'))
	}
	function getCorlor(el){
		return $(el).attr('data-color')
	}

	function isCanClick(el){
		var  x=parseInt($(el).attr('id').split('_')[0]);
		var  y=parseInt($(el).attr('id').split('_')[1]);
		if($('#'+(x+1)+'_'+y).length||$('#'+(x+1)+'_'+(y+1)).length){
			return false;
		}else{
			return true;
		}
	}
	
	var prev=null;
	$('.screen').on('click','.pai',function(){
		//如果被压住直接返回
		if($(this).attr('id')&&!isCanClick(this)){
			return;
		}
		// if($('.moveright').on('click')){
		// 	$('.pai')
		// }
		// 如果是13直接消除函数返回
		var number=getNumber(this);
		if(number==13){
			$(this)
				.animate({
					top:0,
					right:0
				})
				.queue(function(){
					$(this)
					.detach()
					.dequeue()
				})
				return;
		}else{
			// 第二张上次存储的和现在点的这个拿出来判断
			if(prev){
				if(getNumber(prev)+getNumber(this)==13){
					prev.add($(this)).animate({
						top:0,
						right:0
					}).queue(function(){
						$(this)
						.detach()
						.dequeue()
					})
				}else{
					if(getNumber(prev)==getNumber(this)&&getCorlor(prev)==getCorlor(this)){
						$(this).animate({top:'+=20'})
								.css('border','none')
					}else{
						$(this).animate({top:'-=20'})
					    	.animate({top:'+=20'})
						prev.delay(400)
							.animate({top:'+=20'})
							.css('border','none')
					}						
				} 
				prev=null;
			}else{
				// 第一张把这张存储
				prev=$(this)
				prev.animate({top:'-=20'})
					.css('border','1px solid red')
			}
		}
	})
	$('body').on('mousedown',false)
	// $('body').on('click','.screen',function(){
	// 		$(this)
	// 		.css('border','none')
	// 		// .animate({top:'+=20'})
	// })
		
	$('body').on('click','.restart',(function(){
		return function(){
			$('.pai')
				.animate({
					top:0,
					right:700
				})
				.queue(function(){
					$(this)
					.remove()
					.dequeue()
				})
			 setpoker(makepoker())
		}
		})())

	$('body').on('click','.over',(function(){
		return function(){
			$('.pai')
				.animate({
					top:0,
					right:700
				})
				.queue(function(){
					$('.pai')
					.remove()
					.dequeue()
				})
		}
		})())

	$('body').on('click','.start',function(){
			if($('.pai').length==0){
			 setpoker(makepoker())
			}else{
				return;
			}
	   	$('.start')
	   		.css('display','none')
		$('.game')
			.css('display','none')
		$('.mask')
			.css('display','none')
	  	 $('.restart,.rest,.over,.moveright,.moveleft')
	   		.css({display:'none'})
	  		.delay(1000)
	  		.fadeToggle(1000)
	}) 
	$('.game').on('click',function () {
		// $('.mask').toggleClass('appear');
		$('.mask').fadeIn();
	})
	$('.close').on('click',function () {
		$('.mask').css('display','none')
	})
})