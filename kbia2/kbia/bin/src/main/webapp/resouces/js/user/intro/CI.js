$(document).ready(function() {
	
	$("#area1").click(function(){
		$("#area2").removeClass('curr'); //curr 제거
		$("#area1").addClass('curr'); 
		$("#ciArea2").css("display",'none');
		$("#ciArea1").css("display",'');		
	});
	$("#area2").click(function(){
		$("#area1").removeClass('curr'); 
		$("#area2").addClass('curr'); 
		$("#ciArea1").css("display",'none');
		$("#ciArea2").css("display",'');
		$("#container").css("min-height", '678px');
	});
});
