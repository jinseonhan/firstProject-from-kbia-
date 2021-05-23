$(document).ready(function() {
	
	$("#area1").click(function(){
		$("#area2").removeClass('curr'); //curr 제거
		$("#area1").addClass('curr'); 
		$("#memberGuideArea2").css("display",'none');
		$("#memberGuideArea1").css("display",'');		
	});
	$("#area2").click(function(){
		$("#area1").removeClass('curr'); 
		$("#area2").addClass('curr'); 
		$("#memberGuideArea1").css("display",'none');
		$("#memberGuideArea2").css("display",'');
	});
});
