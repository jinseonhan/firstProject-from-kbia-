$(document).ready(function() {
	
	$("#area1").click(function(){
		$("#area2").removeClass('curr'); //curr 제거
		$("#area1").addClass('curr'); 
		$("#historyArea2").css("display",'none');
		$("#historyArea1").css("display",'');		
	});
	$("#area2").click(function(){
		$("#area1").removeClass('curr'); 
		$("#area2").addClass('curr'); 
		$("#historyArea1").css("display",'none');
		$("#historyArea2").css("display",'');
	});
});
