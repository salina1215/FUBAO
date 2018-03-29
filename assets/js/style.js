// JavaScript Document

$(function(){
	
  //================================= 
  //			按鈕事件設定
  //=================================
  $("#logo").click(function(){
	 $("html, body").stop().animate({scrollTop:0}, 800);
	 return false; 
  })
  
  $("#navigation li").click(function(){
	var sLink=$(this).find("a").attr("href");
	$("html, body").stop().animate({scrollTop:$(sLink).offset().top}, 800);
	return false; 
  })
  
  $('.book a').hover(function(){
	  $(this).find('.info').stop().slideDown();
  },function(){
	  $(this).find('.info').stop().slideUp();
  })
  
  $('.step').hover(function(){
	 $(this).find('.stepCont').stop().fadeTo(200,1)
  },function(){
	 $(this).find('.stepCont').stop().fadeTo(200,0)
  })
  
})

//----------------------------------------------------

$(window).load(function(){
	
	$('.fotorama').fotorama({
	  width: '100%',
	  ratio: 1600/685,
	  nav: 'false',
	  transition:'dissolve',
	  transitionduration: 1000,
	  autoplay: 2000,
	  stopautoplayontouch: 'false',
	  arrows:false,
	  click:false,
	  stopautoplayontouch:false
	});

	if(!isIE(9)){
	$('.workList').wookmark({
		offset: 12
	});
	}
	
	
	setCase();
	navEffect()
	pageMove()
	
	$("#loading").css({display:"none"});//隱藏loading
})

var isIE = function(ver){
	var b = document.createElement('b')
	b.innerHTML = '<!--[if lt IE ' + ver + ']><i></i><![endif]-->'
	return b.getElementsByTagName('i').length === 1
}


//捲軸事件觸發-----------------------------------------

$(window).scroll(function(){
	if($(window).scrollTop()>=$('.fotorama').height()){
		$("header").css('position',"fixed")
		$("#main").css('marginTop',$("header").height())
	}else{
		$("header").css('position',"relative")	
		$("#main").css('marginTop',0)
	}
	navEffect()
})

//----------------------------------------------------

//作品集選單設定
function setCase(){	
	var nAllCase=$(".case").length;
	var sWord;
	
	for(i=1; i<=nAllCase; i++){
		if(i<10){
			sWord="0"+i;
		}else{
			sWord=i;
		}
		$(".num").eq(i-1).html(sWord);
	}
	
	if(!isIE(9)){
		$(".case .pBox").each(function(){
			imgH=$(this).find('img').height();
			$(this).height(imgH)
		})
	}else{
		$(".case .pBox").each(function(){
			imgH=$(this).find('img').height();
			$(this).height(140).find('img').css({marginTop:(140-imgH)/2})
		})	
	}
	$(".case a").hover(function(){		
		imgNew=$(this).find('img').data('img'),
		imgOld=$(this).find('img').attr('src')
		$(this).parent().addClass("on");
		$(this).find('img').attr('src',imgNew)
	},function(){
		$(this).parent().removeClass("on");		
		$(this).find('img').attr('src',imgOld)
	})
}

//導覽列效果設定
function navEffect(){  
  var TOP0=$(window).height()*0.4,
  	  TOP1=Math.floor($('#about').position().top)-TOP0,
      TOP2=Math.floor($('#work').position().top)-TOP0,
  	  TOP3=Math.floor($('#media').position().top)-TOP0,
	  TOP4=Math.floor($('#process').position().top)-TOP0,
  	  TOP5=Math.floor($('#contact').position().top)-TOP0,
	  TOP6=Math.floor($('#consult').position().top)-TOP0

  var TOP=[TOP1,TOP2,TOP3,TOP4,TOP5,TOP6]
  
  if($(window).scrollTop()==0){
	  $("#navigation li").removeClass('at')
  }else{	
	for(j=0;j<6;j++){
		if(j<5){
		  if($(window).scrollTop()>=TOP[j]&&$(window).scrollTop()<TOP[j+1]){			
			  $("#navigation li").removeClass('at').eq(j).addClass('at')
		  }
		}else{
		  if($(window).scrollTop()>=TOP[5]){			
			  $("#navigation li").removeClass('at').eq(5).addClass('at')
		  }
		}
  	} 
  }
}

function pageMove(){
	var onPage = location.hash
	if(onPage==""){
	}else{
	$("html, body").stop().animate({scrollTop:$(onPage).offset().top},800);
	}
}