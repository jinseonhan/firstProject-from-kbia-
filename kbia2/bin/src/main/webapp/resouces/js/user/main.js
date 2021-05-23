$(document).ready(function() {
	/*selectNoticeList();*/
	/*logMarge();*/
/*	selectPopupList();*/
});
function getCookie(name,boardNo) { 
	var cookie = document.cookie; 
	console.log(cookie);
	if (document.cookie != "") { 
		var cookie_array = cookie.split("; "); 
		for ( var index in cookie_array) { 
			var cookie_name = cookie_array[index].split("="); 
			if (cookie_name[0] == "popupYN"+boardNo) { 
				return cookie_name[1]; 
			}
		} 
	}
 	return "N";
 } 

//팝업조회
function selectPopupList() {
	$.ajax({
		type : 'POST'
		, url : '/pupList.do'
		, async: false
		, data : {
			"boardType" : "POPUP",
			"useYn" : 'Y'
				
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			for(var i=0; i<data.length; i++){
				var form = $('<form></form>');
			    form.attr('action', '/mainPopup.do');
			    form.attr('method', 'post');
				form.attr('target', 'popup'+i);
				form.appendTo('body');
			    var boardNoF = $("<input type='hidden' value="+data[i].boardNo+" name='boardNo'>");
			    var boardTypeF = $("<input type='hidden' value="+data[i].boardType+" name='boardType'>");
				//var contentF = $("<input type='hidden' value="+data[i].content+" name='content'>"); 너무 파라메터가 긺
				var divisionF = $("<input type='hidden' value="+data[i].division+" name='division'>");
				var filePathF = $("<input type='hidden' value="+data[i].filePath+" name='filePath'>");
				var idxF = $("<input type='hidden' value="+data[i].idx+" name='idx'>");
				var linkF = $("<input type='hidden' value="+data[i].link+" name='link'>");
				var locationF = $("<input type='hidden' value="+data[i].location+" name='location'>");
				var ognFileNmF = $("<input type='hidden' value="+data[i].ognFileNm+" name='ognFileNm'>");
				var stFileNmF = $("<input type='hidden' value="+data[i].stFileNm+" name='stFileNm'>");
				//var titleF = $("<input type='hidden' value="+data[i].title+" name='title'>"); 띄워쓰기 파라메터 불가능
				var newPathF = $("<input type='hidden' value="+data[i].newPath+" name='newPath'>");
			    form.append(boardNoF);
			    form.append(boardTypeF);
  				//form.append(contentF);
			    form.append(divisionF);
			    form.append(filePathF);
				form.append(idxF);
				form.append(linkF);
				form.append(locationF);
				form.append(ognFileNmF);
				form.append(stFileNmF);
				//form.append(titleF);
				form.append(newPathF);
 				var pop = window.open; 
				var option;
				if(data[i].width == null){
					option = "width = 700, height = 500, top = 100, left = 700, location = 'no', toolbar='no'"
				}else{
					var width = data[i].width+20;
					var height = data[i].height+70;
					option = "width="+width+", height="+height+", top = 100, left = 700, location = 'no', toolbar='no'"
				}
				var cookieCheck = getCookie("popupYN", data[i].boardNo); 
				if (cookieCheck == "N"){ 
					pop("", "popup"+i, option); 
			    	form.target = "popup"+i; 
				    form.submit();
				}	
				$('form').remove();
			}
			
		}
	});
	
}
//공지사항 조회
function selectNoticeList() {
	
	var kinds = $("select[name=select01]").val();
	var searchTxt = $("#searchTitle").val();

	$.ajax({
		type : 'POST'
		, url : '/user/noticeList.do'
		, async: false
		, data : {
			"boardType" : "NOTICE"

		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			
			$("#notice1_href").attr("href", "/openViewContent.do?boardNo="+data[0].boardNo+"&boardType="+data[0].boardType);
			$("#notice2_href").attr("href", "/openViewContent.do?boardNo="+data[1].boardNo+"&boardType="+data[1].boardType);
			$("#notice3_href").attr("href", "/openViewContent.do?boardNo="+data[2].boardNo+"&boardType="+data[2].boardType);
			$("#notice4_href").attr("href", "/openViewContent.do?boardNo="+data[3].boardNo+"&boardType="+data[3].boardType);
			
			$("#notice1_div").html(data[0].division);
			$("#notice2_div").html(data[1].division);
			$("#notice3_div").html(data[2].division);
			$("#notice4_div").html(data[3].division);

			$("#notice1_title").html(data[0].title);
			$("#notice2_title").html(data[1].title);
			$("#notice3_title").html(data[2].title);
			$("#notice4_title").html(data[3].title);

			$("#notice1_dt").html(data[0].createDate);
			$("#notice2_dt").html(data[1].createDate);
			$("#notice3_dt").html(data[2].createDate);
			$("#notice4_dt").html(data[3].createDate);


		}
	});
}

function logMarge(){
	var date = new Date(); 
	var year = date.getFullYear(); 
	var month = new String(date.getMonth()+1); 
	var day = new String(date.getDate()); 
	
	// 한자리수일 경우 0을 채워준다. 
	if(month.length == 1){ 
	  month = "0" + month; 
	} 
	if(day.length == 1){ 
	  day = "0" + day; 
	} 
	
	$.ajax({
		type : 'POST'
		, url : '/user/logMarge.do'
		, async: false
		, data : {
			
			"logYear": year
			,"logMonth": month
			,"logDay": day
			,"ymd": year + month + day
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			
		}
	});

}

