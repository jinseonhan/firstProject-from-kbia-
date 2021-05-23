$(document).ready(function() {
	
	$("#area1").click(function(){
		$("#area2").removeClass('curr'); //curr 제거
		$("#area3").removeClass('curr'); //curr 제거
		$("#area4").removeClass('curr'); //curr 제거
		$("#area1").addClass('curr'); 
		$("#mainTaskArea2").css("display",'none');
		$("#mainTaskArea3").css("display",'none');
		$("#mainTaskArea4").css("display",'none');
		$("#mainTaskArea1").css("display",'');		
	});
	$("#area2").click(function(){
		alert("서비스 준비 중입니다.");
	});
	$("#area3").click(function(){
		alert("서비스 준비 중입니다.");
	});
	$("#area4").click(function(){
		$("#area1").removeClass('curr'); //curr 제거
		$("#area2").removeClass('curr'); //curr 제거
		$("#area3").removeClass('curr'); //curr 제거
		$("#area4").addClass('curr'); 
		$("#mainTaskArea1_img").css("display",'none');
		$("#mainTaskArea1").css("display",'none');
		$("#mainTaskArea2").css("display",'none');
		$("#mainTaskArea3").css("display",'none');
		$("#mainTaskArea4").css("display",'');			
	});
});
