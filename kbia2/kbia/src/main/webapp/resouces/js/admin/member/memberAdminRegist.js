var oEditors = [];

$(document).ready(function(){	
	//fileDivId, 파일위치, 넣을 파일 갯수
	fileViewSetting('file1','upFile', 1);
	
	
	
	// 스마트 에디터
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "contentArea",  //textarea ID
	    sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
	    fCreator: "createSEditor2",
	});	
	//취소버튼 
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href = "/admin/memberAdminList.do";		
		}else{
			return false;
		}
	});
	//등록 버튼
	$("#registBtn").click(function(){
			regist();			
	});
});

// 스마트 에디터 contentArea로 값 이동
function editArea(){
	oEditors.getById["contentArea"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
	//oEditors.getById["content"].exec("PASTE_HTML", ["asdfasdf"]);  //에디터박스에 값 불러오기
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
	if(comRepreNum1 == '' || comRepreNum1 == null){
		alert("대표전화번호를 입력해주세요");
		$("#comRepreNum1").focus();
		return false; 
	}
	if(comRepreNum2 == '' || comRepreNum2 == null){
		alert("대표전화번호를 입력해주세요");
		$("#comRepreNum2").focus();
		return false;
	}
	

	if(isNaN(estYear)){ 
		alert("[설립년도]에 숫자만 입력해주세요");
		$("#estYear").focus();
		return false;
	}
	if(isNaN(comRepreNum1)){ 
		alert("[대표전화번호]에 숫자만 입력해주세요");
		$("#comRepreNum1").focus();
		return false;
	}
	if(isNaN(comRepreNum2)){ 
		alert("[대표전화번호]에 숫자만 입력해주세요");
		$("#comRepreNum2").focus();
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
// 저장하기
function regist(){
	editArea();
	if(validChk()!=false){
		var registData = new FormData();
		var userId = $("#sessionUserId").val();
		var division =$("#division option:selected").val(); // 회원구분(임원/특별회원/준회원....)*
		var comNm =$("#comNm").val(); // 회사명*
		var comRepreNm =$("#comRepreNm").val(); // 대표자명*
		var sectors =$("#sectors").val(); // 업종*
	
		var estYear	=$("#estYear").val(); // 설립년도 *
		var comEmplCnt =$("#comEmplCnt").val(); // 종업원 수
		
	
		//fileDivId, 파일위치, FormData명
		var upFile =fileParamSetting('file1','upFile', registData, 'update', true, true);
		if(upFile != true )   return false;	
	
		
		var comRepreNum1 = $("#comRepreNum1").val();
		var comRepreNum2 = $("#comRepreNum2").val();
		var comRepreNum = comRepreNum1+comRepreNum2; // 대표전화번호*
		
		var fax1 = $("#fax1").val();
		var fax2 = $("#fax2").val();
		var faxNum = fax1+fax2; // 팩스번호
	
		var homePage =  $("#homePage").val();	// 홈페이지
		var content = $("#contentArea").val();	// 에디터 영역
		var languageType =$("input[name=chk01]:checked").val(); // 언어
		var useYn = $("input[name=chk02]:checked").val(); // 사용여부
	
		
		registData.append("division",division);
		registData.append("comNm",comNm);
		registData.append("comRepreNm",comRepreNm);
		registData.append("sectors",sectors);
		registData.append("seqId","MEMBER_SEQ");
		
		registData.append("createId",userId);
		registData.append("refType","MEMBER");
		registData.append("boardType","MEMBER");
		
		registData.append("estYear",estYear);
		registData.append("comEmplCnt",comEmplCnt);
		registData.append("comRepreNum",comRepreNum);
		registData.append("faxNum",faxNum);
		registData.append("homePage", homePage);
		registData.append("content", content);
		registData.append("languageType", languageType);
		registData.append("useYn", useYn);
		registData.append("upFile",upFile);
		
		$.ajax({
			type : 'POST'
			, url : '/memberAdminRegist.do'
			, enctype : 'multipart/form-data'
			, processData: false 
			, contentType: false 
			, dataType : 'json'
			, data : registData
			, async:false
			, success : function(data){
				
				if(data==1){
					alert("저장되었습니다!");
					location.href = "/admin/memberAdminList.do";				
				}else{
					alert("등록에 실패하였습니다!");
					return false;
				}
			}
		
		});
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

