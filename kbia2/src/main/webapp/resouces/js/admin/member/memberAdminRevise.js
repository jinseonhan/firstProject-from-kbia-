var oEditors = [];
var getExpoNo = ""; 
$(document).ready(function(){
	// 회원정보 불러오기
	loadData();
	
	// 뒤로가기 버튼
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href = "/admin/memberAdminList.do";		
		}else{
			return false;
		}
	});
	
	// 수정 버튼
	$("#registBtn").click(function(){
		if( !confirm("게시글을 수정하시겠습니까?") ){ 
			return; 
		}
		
		oEditors.getById["contentArea"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
		var isExpo = $("#isExpo").prop("checked");
		if(isExpo){
			chkExpoNo();
		} else {
			memberFileUpdate();
		}
	});
	
	// 사용여부 체크
	$("#isExpo").click(function(){
		var flag = $("#isExpo").prop("checked");
		if( flag ){
			$("#isExpo").val("Y");
			$("#expoNo").prop("disabled", false);
		} else {
			$("#isExpo").val("N");
			$("#expoNo").prop("disabled", true);
		}
	})
});

// 에디터 영역
function editArea(data){
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "contentArea",  //textarea ID
	    sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
		fOnAppLoad: function(){
			if(data !=null){
				oEditors.getById["contentArea"].exec("PASTE_HTML", [data]);  //에디터박스에 값 불러오기
			}else{
				oEditors.getById["contentArea"].exec("PASTE_HTML", [""]); // content 값이  null일 때 'undefinded 안뜨게만들기'
			}
		},
	    fCreator: "createSEditor2"
	});
}

// 파일 불러오기
function loadData(){
	var boardNo =$("#boardNo").val();
	var boardType ="MEMBER";
	$.ajax({
		type :"POST",
		url : "/admin/loadAdminMember.do",
		data : {"boardNo":boardNo,
				"refType":boardType,
				"boardType":boardType},
		async: false,
		dataType : 'json',
		success : function(data){
			editArea(data.content);
			fileViewSetting('file1','upFile', 1, boardType, boardNo);
			view();
			
			function view(){
				var divisionIn;
				switch(data.division){
					case 'M1' : divisionIn='임원';break;
					case 'M2' : divisionIn='일반회원';break;
					case 'M3' : divisionIn='준회원';break;
					case 'M4' : divisionIn='특별회원';break;
				}
				
				$("#comRepreNm").val(data.comRepreNm);
				$("#comNm").val(data.comNm);
				$("#sectors").val(data.sectors);
				$("#ognFileNm").text(data.ognFileNm);
				$("#estYear").val(data.estYear);
				$("#comEmplCnt").val(data.comEmplCnt);
				$("#homePage").val(data.homepage);
				
				// 회원구분
				$("#divisionSpan").html(divisionIn);
				$("#division").val(data.division).attr("selected","selected");
				
				// 파일 존재여부 확인
				if(data.ognFileNm==null){
					$(".fileDelete").hide();
				}
				// 사용여부
				
				if(data.useYn=='Y'){
					$("#chk0201").attr("checked",true);
				} else {
					$("#chk0202").attr("checked", true);
				}
				
				// 메인노출
				if(data.outDiv=='Y'){
					$("#isExpo").attr("checked",true);
					$("#isExpo").val("Y");
					$("#expoNo").attr("disabled", false);
				}
				$("#expoNo").val(data.outSeq);
				getExpoNo = data.outSeq;
				
				// 언어
				var languageType=data.languageType;
				if(languageType=='KOR'){
					$("#chk0101").attr("checked",true);
				}else{
					$("#chk0102").attr("checked",true);
				}
				
				// 전화번호 자르기
				var comRepreNum = data.comRepreNum;
				if(comRepreNum.substr(0,2)=="02"){
					var comRepreNum1 =comRepreNum.substr(0,2);
					var comRepreNum2 =comRepreNum.substr(2,comRepreNum.length+2);
				}else{
					var comRepreNum1 =comRepreNum.substr(0,3);
					var comRepreNum2 =comRepreNum.substr(3,comRepreNum.length+2);
				}
				$('#comRepreNum1').val(comRepreNum1);
				$('#comRepreNum2').val(comRepreNum2);
				
				// 팩스 번호 자르기
				var fax = data.fax;
				if(fax.substr(0,2)=="02"){
					var fax1 =fax.substr(0,2);
					var fax2 =fax.substr(2,fax.length+2);
				}else{
					var fax1 =fax.substr(0,3);
					var fax2 =fax.substr(3,fax.length+2);
				}
				$('#fax1').val(fax1);
				$('#fax2').val(fax2);
				
				
				// updateDate 날짜 사이에 . 찍기
				var updateDate = data.updateDate;
				
				var updateDateOutput =updateDate.substr(0,4)+".";
				updateDateOutput+=updateDate.substr(4,2)+".";
				updateDateOutput+=updateDate.substr(6,2);
				$("#regist").html("<B>"+data.createId+" / "+updateDateOutput+"</B>");
			}
		},
		error:function(request,status,error){
			alert("code : "+request.status+"\n"
					+"message : "+request.responseText+"\n"
					+"error : "+ error);
		}
	});
}
// 유효성 체크
function validChk(){
	var division =$("#division option:selected").val(); // 회원구분(임원/특별회원/준회원....)*
	var comNm =$("#comNm").val(); // 회사명*
	var comRepreNm =$("#comRepreNm").val(); // 대표자명*
	var sectors =$("#sectors").val(); // 업종*
	var division =$("#division option:selected").val(); // 회원구분(임원/특별회원/준회원....)*
	var estYear	=$("#estYear").val(); // 설립년도 *	
	var comRepreNum1 = $("#comRepreNum1").val();
	var comRepreNum2 = $("#comRepreNum2").val();
	var comEmplCnt =$("#comEmplCnt").val(); // 종업원 수
	var homePage =  $("#homePage").val();	// 홈페이지
	
	if(division == '' || division == null){
		alert("회원구분을 입력해주세요");
		$("#division").focus();
		return false;
	}
	
	if(comNm == '' || comNm == null){
		alert("회사명을 입력해주세요");
		$("#comNm").focus();
		return false;
	}
	
	if(comRepreNm == '' || comRepreNm == null){
		alert("대표자명을 입력해주세요");
		$("#comRepreNm").focus();
		return false;
	}
	
	if(sectors == '' || sectors == null){
		alert("업종을 입력해주세요");
		$("#sectors").focus();
		return false;
	}
	
	if(estYear == '' || estYear == null){
		alert("설립년도를 입력해주세요");
		$("#estYear").focus();
		return false;
	}	
	
	

	if(isNaN(estYear)){ 
		alert("[설립년도]에 숫자만 입력해주세요");
		$("#estYear").focus();
		return false;
	}

	
	if(!maxLengthCheck("comNm", '회사명', 100)){
		return false;
	}
	if(!maxLengthCheck("comRepreNm", '대표명', 30)){
		return false;
	}
	if(!maxLengthCheck("sectors", '업종', 50)){
		return false;
	}
	if(!maxLengthCheck("comEmplCnt", '종업원 수', 70)){
		return false;
	}
	if(!maxLengthCheck("homePage", '홈페이지', 100)){
		return false;
	}

}
// 파일 수정 메소드
function revise(){
	var registData = new FormData();
	var fileupdateflag =$("#fileupdateflag").val();
	var boardNo= $("#boardNo").val();
	var division =$("#division option:selected").text(); // 회원구분(임원/특별회원/준회원....)*
	var comNm =$("#comNm").val(); // 회사명*
	var comRepreNm =$("#comRepreNm").val(); // 대표자명*
	var sectors =$("#sectors").val(); // 업종*
	var division =$("#division option:selected").val(); // 회원구분(임원/특별회원/준회원....)*
/*	var upFile = $("#upfile")[0].files[0];
	if(upFile!=null){
		fileCheck(upFile);
	}*/
	
	//var flag = $("#flag").val(); // 삭제를 누르지 않았다면 DEFAULT값은  'Y'
	
	//var fileChange = $("#multiFileNo").children("input[type=text]").val();
	
	var estYear	=$("#estYear").val(); // 설립년도 *
	var comEmplCnt =$("#comEmplCnt").val(); // 종업원 수
	
	var comRepreNum1 = $("#comRepreNum1").val();
	var comRepreNum2 = $("#comRepreNum2").val();
	var comRepreNum = comRepreNum1+comRepreNum2; // 대표전화번호*
	
	var fax1 = $("#fax1").val();
	var fax2 = $("#fax2").val();
	var faxNum = fax1+fax2; // 팩스번호

	var homePage =  $("#homePage").val();	// 홈페이지
	var content = $("#contentArea").val();	// 에디터 영역
	var isExpo = $("#isExpo").val(); // 메인노출 여부
	var expoNo = $("#expoNo").val(); // 메인노출 순번
	var languageType =$("input[name=chk01]:checked").val(); // 언어
	var useYn = $("input[name=chk02]:checked").val(); // 사용여부
	var delYn= $('#delYn').val();
	var userId= $('#sessionUserId').val();

	registData.append("userId",userId);
	registData.append("boardNo",boardNo);
	registData.append("division",division);
	registData.append("comNm",comNm);
	registData.append("comRepreNm",comRepreNm);
	registData.append("sectors",sectors);
	registData.append("refType","MEMBER");
	registData.append("boardType","MEMBER");
	registData.append("seqId", "BOARD_SEQ");
	registData.append("delYn", delYn);
	registData.append("boardType","MEMBER");
	//registData.append("upFile",upFile);
	//registData.append("ognFileNm",ognFileNm);
	
	registData.append("estYear",estYear);
	registData.append("comEmplCnt",comEmplCnt);
	registData.append("comRepreNum",comRepreNum);
	registData.append("faxNum",faxNum);
	registData.append("homePage", homePage);
	registData.append("content", content);
	registData.append("isExpo", isExpo);
	registData.append("expoNo", expoNo);
	registData.append("languageType", languageType);
	registData.append("useYn", useYn);
	
	// 파일 삭제, 수정용 변수 담기
	//registData.append("fileDelete", fileDelete);
	registData.append("refIdx", boardNo);
	
	
	$.ajax({
		type : 'POST'
		, url : '/memberAdminReviseUpdate.do'
		, enctype : 'multipart/form-data'
		, processData: false  
		, contentType: false 
		, type : 'POST'
		, dataType : 'json' //xml,json,local 3형식
		, data : registData
		, async:false
		, success : function(data){
			if(data==1){
				alert("저장되었습니다");
				location.href = "/admin/memberAdminList.do";				
			}else{
				alert("등록에 실패하였습니다!");
				return false;
			}

		}
		
	});
}

// 파일 삭제 관련 메소드
/*function tempDel(){
	$("#fileDelete").hide();
	$('#delYn').val('Y'); // 파일 삭제를 눌렀을 경우 파일테이블의 행을 N으로 변경 
	//$("#flag").val("Y"); // 
	ognFileNm ="";
}	*/
function userDelete(){
	 if (confirm("정말 삭제하시겠습니까??") == true){    //확인
		var boardNo =$("#boardNo").val();

		$.ajax({
			type : 'POST'			
			, url : '/memberAdminUserDelete.do'
			, async:false
			, data : {"boardNo":boardNo
					 ,"refIdx":boardNo					
					 ,"refType":"MEMBER"}
			, success : function(data){
				alert("회원 탈퇴되었습니다!");
				location.href = "/admin/memberAdminList.do";
			}
		});
     
 	}else{   //취소
    	return false;
 	}
}
// 파일 저장 유효성 체크
function fileCheck(obj){
	var pathpoint=obj.name.lastIndexOf('.');
	var filepoint =obj.name.substring(pathpoint+1,obj.length);
	var filetype=filepoint.toLowerCase();
	if(filetype=='jpg'||filetype=='gif'||filetype=='png'||filetype=='jpeg'||filetype=='bmp'){
		return true;
	}else{
		alert('이미지 파일만 선택할 수 있습니다.');
		var parentObj =obj.parentNode;
		var node=parentObj.replaceChild(obj.cloneNode(true),obj);
		return false;	
	}
	
	if(filetype=='bmp'){
		var upload=confirm('BMP 파일은 웹상에서 사용하기엔 적절한 이미지 포맷이 아닙니다.\n 그래도 계속 업로드하시겠습니까?');
		if(!upload)
		return false;
	}
}

function memberFileUpdate(){
	if(validChk()!=false){
	
		var registData = new FormData();
		var boardNo = $("#boardNo").val();
		var boardType = "MEMBER";
		//fileDivId, 파일위치, FormData명, 세팅되는 파라메터 수, insert/updqte 상태, 파일필수값 체크
		var insertChk1 =fileParamSetting('file1','upFile', registData, 'update', true, true);
		if(insertChk1 != true )   return false;
		
		var filePathArr = [];
		filePathArr[0]='upFile';
	
		registData.append("filePath", filePathArr);
		
		registData.append("boardNo", boardNo);
		registData.append("boardType", boardType);
		registData.append("refIdx", boardNo);
		registData.append("refType", boardType);
		
		$.ajax({
			type : 'POST'
			, url : '/admin/memberFileUpdate.do'
			, enctype: 'multipart/form-data'
			, processData: false 
			, contentType: false 
			, async:false
			, type: 'POST'
			, dataType: 'json'
			, data : registData
			, success : function(data) {
					revise();
			}
			, error: function (request, status, error) {
				var msg = "ERROR : " + request.status + "<br>"
				msg += + "내용 : " + request.responseText + "<br>" + error;
			}
		});
	}
}

// 노출 순서 중복 체크
function chkExpoNo(){
	var expoNo = $("#expoNo").val();
	
	$.ajax({
		url : "/admin/chkExpoNo.do"
		, type : "post"
		, dataType : "json"
		, data : {
			expoNo : expoNo		
		}
		, success : function(data){
			
			if( data || expoNo == getExpoNo ){
				memberFileUpdate();
			} else {
				alert("중복된 노출 순서입니다.");
				$("#expoNo").focus();
				return;
			}
		}
	})
}
