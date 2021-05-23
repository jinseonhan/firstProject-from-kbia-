package egovframework.admin.notice.ctr;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.admin.notice.svc.EventService;
import egovframework.admin.notice.svc.impl.EventServiceImpl;
import egovframework.cmmn.seq.svc.SeqService;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.cmmn.utils.CryptoUtil;
import egovframework.rte.fdl.property.EgovPropertyService;

@Controller
public class NoticeEventController {

	private static final Logger LOGGER = LoggerFactory.getLogger(EventServiceImpl.class);

	/** SeqService */
	@Resource(name = "seqService")
	private SeqService seqService;


	/* Server Properties */
	@Resource(name = "propertyService")
	private EgovPropertyService propertiesService;

	/** EgovTestService */
	@Resource(name = "EventService")
	private EventService eventService;

	/* 암호화 모듈 */
	private CryptoUtil cryptoUtil = new CryptoUtil();

	/**
	 * 유저계정조회화면.
	 * 
	 * @return 유저계정조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/EventList.do")
	public String openContent(Map<String, Object> param) throws Exception {

		return "/view/admin/notice/noticeEventList";
	}
	
	@RequestMapping(value = "/admin/EventRegist.do")
	public String openContent2(Map<String, Object> param) throws Exception {

	return "/view/admin/notice/noticeEventRegist";
	}
	
	@RequestMapping(value = "/admin/openEventSelet.do")
	public String open(@RequestParam Map<String, Object> params, ModelMap model) throws Exception {

		model.addAttribute("params", params);
		return "/view/admin/notice/noticeEventContent";
	}


	@RequestMapping(value = "/admin/EventList.do", method = RequestMethod.POST)
	public void selectEventList(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> eventList = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			eventList = eventService.selectEventList(params);
			eventList = CamelUtil.convertListMap(eventList);
			json = mapper.writeValueAsString(eventList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("eventList >>>" + eventList);

		out.print(json);
		out.flush();
		out.close();
	}

	@RequestMapping(value = "/admin/EventRegist.do", method = RequestMethod.POST)
	public void EventRegist(HttpServletResponse res, HttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		String seqId = null;
		int seq = 0;
		int result = 0;

		/* Seq 추출 */
		seq = seqService.selectSeq(params);

		params.put("refIdx", seq);
		params.put("boardNo", seq);


		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			/* 글 등록 */
			result = eventService.EventRegist(params);

			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		out.print(json);
		out.flush();
		out.close();
	}


	@RequestMapping(value = "/admin/selectEvent.do", method = RequestMethod.POST)
	public void selectEvent(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> eventSelect = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			eventSelect = eventService.selectEvent(params);
			eventSelect = CamelUtil.convertListMap(eventSelect);
			json = mapper.writeValueAsString(eventSelect);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("eventSelect >>>" + eventSelect);

		out.print(json);
		out.flush();
		out.close();
	}

	@RequestMapping(value = "/admin/Eventupdate.do", method = RequestMethod.POST)
	public void eventUpdate(HttpServletResponse res, HttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int result = 0;

		try {

			result = eventService.eventUpdate(params);

			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			/* 글 등록 */

			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		out.print(json);
		out.flush();
		out.close();
	}

	@RequestMapping(value = "/admin/EventDelete.do", method = RequestMethod.POST)
	public void deleteEvent(HttpServletResponse res, HttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {
		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int result = 0;

		try {

			result = eventService.deleteEvent(params);

			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			/* 글 등록 */

			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		out.print(json);
		out.flush();
		out.close();
	}
	
	

}
