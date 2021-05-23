$(document).ready(function() {

	$("#area1").click(function(){
		$("#area2").removeClass('curr'); //curr 제거
		$("#area1").addClass('curr'); 
		$("#chartArea1").css("display",'');
		$("#chartArea2").css("display",'none');
		$("#container").css("min-height", '678px');
	});
	$("#area2").click(function(){
		$("#area1").removeClass('curr'); //curr 제거
		$("#area2").addClass('curr'); 
		$("#chartArea1").css("display",'none');
		$("#chartArea2").css("display",'');
		$("#container").css("min-height", '678px');
	});
});
