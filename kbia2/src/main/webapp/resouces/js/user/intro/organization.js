$(document).ready(function() {
	getOrgan();
	
	$(".orgaChart").on("click", "li", function(){
		var targetId = $(this).attr("id");		
		
		$(".orgaList").find(".listTable").each(function(){
			$(this).hide();
		})
		
		$("#" + targetId + "List").show();
	})
	
	//언어변경
	$("#langType").change(function(){
		getOrgan();
		organShow();
	})
});

/*조직도 및 연락처*/
function organShow(){
	var orgaChart = $(".orgaChart"),
		btnOrga = orgaChart.find("> ul > li dl"),
		orgaList = $(".orgaList > .listTable");
	btnOrga.click(function(){
		var codeDtl = $(this).parent("li").attr("id");
		
		orgaList.hide();
		orgaList.parent().find("#" + codeDtl + "List").show();
		//orgaList.eq(i).show();
	});
}

// 조직도 조회
function getOrgan(){
	var langType = $("#langType").val();
	
	$.ajax({
		url : "/getOrganList.do"
		, type : "post"
		, dataType : "json"
		, data : { lang : langType }
		, success : function(data){
			fillData(data);
		}
		, error : function( a, b, c ){
			console.log(a + " : " + b + " : " + c);
		}
	})
}

// 데이터 뿌리기
function fillData(data){
	var orgaChart = $(".orgaChart");
	var orgaList = $(".orgaList");
	
	orgaChart.html("");
	orgaList.html("");
	
	orgaChart.append("<strong>" + data.clist[0].organName + "<br>" + data.clist[0].codeNm + "</strong>");
	orgaChart.append("<strong>" + data.glist[0].organName + "<br>" + data.glist[0].codeNm + "</strong>");
	
	var ul = $("<ul></ul>");
	var groupList = data.groupList;
	
	for( var i = 0; i < groupList.length; i++ ){
		if( groupList[i].codeDtl == "VCHAIRMAN" || groupList[i].codeDtl == "GENERAL" ){
			continue;
		}
		var li = $("<li id='" + groupList[i].codeDtl + "'></li>");
		var dl = $("<dl></dl>)");
		dl.append("<dt>" + groupList[i].codeNm + "</dt>");
		dl.append("<dd>" + groupList[i].ext1 + "</dd>");
		
		li.append(dl);
		ul.append(li);
		
		var listTable = $("<div id='" + groupList[i].codeDtl + "List' class='listTable'></div>");
		var table = $("<table>"
						+ "<thead>"
						+ "<tr>" 
						+ "<th scope='col'>번호</th>"
						+ "<th scope='col'>직책</th>"
						+ "<th scope='col'>이름</th>"
						+ "<th scope='col'>업무</th>"
						+ "<th scope='col'>전화번호</th>"
						+ "<th scope='col'>이메일</th>");
		var tbody = $("<tbody></tbody>");
		
		var organ = groupList[i].organ;
		for( var j = 0; j < organ.length; j++ ){
 			var tr = $("<tr></tr>");
			tr.append("<td>" + organ[j].codeNm + "</td>");
			tr.append("<td>" + organ[j].organPositionName + "</td>");
			tr.append("<td>" + organ[j].organName + "</td>");
			tr.append("<td>" + organ[j].organTask + "</td>");
			tr.append("<td><a href='tel:" + organ[j].organPhoneNum + "'>" + organ[j].organPhoneNum + "</a></td>");
			tr.append("<td><a href='mailto:" + organ[j].organEmail + "' class='btnMail'>" + organ[j].organEmail + "</a></td>");
			
			tbody.append(tr);
			table.append(tbody);
			listTable.append(table);
		}
		orgaList.append(listTable);
	}
	orgaChart.append(ul);
	
	$(".listTable").hide();
}