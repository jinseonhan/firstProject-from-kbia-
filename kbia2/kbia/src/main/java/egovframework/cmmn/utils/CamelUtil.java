package egovframework.cmmn.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class CamelUtil {
	public static String convertString(String underScore) {
	    // '_' 가 나타나지 않으면 이미 camel case 로 가정함.
	    // 단 첫째문자가 대문자이면 camel case 변환 (전체를 소문자로) 처리가
	    // 필요하다고 가정함. --> 아래 로직을 수행하면 바뀜
	    if (underScore.indexOf('_') < 0
	        && Character.isLowerCase(underScore.charAt(0))) {
	        return underScore;
	    }
	    StringBuilder result = new StringBuilder();
	    boolean nextUpper = false;
	    int len = underScore.length();
	
	    for (int i = 0; i < len; i++) {
	        char currentChar = underScore.charAt(i);
	        if (currentChar == '_') {
	            nextUpper = true;
	        } else {
	            if (nextUpper) {
	                result.append(Character.toUpperCase(currentChar));
	                nextUpper = false;
	            } else {
	                result.append(Character.toLowerCase(currentChar));
	            }
	        }
	    }
	    return result.toString();
	}
	
	public static Map<String, Object> convertMap(Map<String, Object> underScore) {
		Map<String, Object> newMap = new HashMap<String, Object>();
		Set<String> key = underScore.keySet(); 
		for (Iterator<String> iterator = key.iterator(); iterator.hasNext();) {
           String keyName = (String) iterator.next();
           Object valueName = underScore.get(keyName);
           keyName = convertString(keyName);
           newMap.put(keyName, valueName);
           
		}
		return newMap;
	}
	
	public static List<Map<String, Object>> convertListMap(List<Map<String, Object>> underScore) {
		List<Map<String, Object>> newListMap = new ArrayList<Map<String, Object>>();
		int listSize = underScore.size();
		for(int i=0; i<listSize; i++) {
			newListMap.add(i, convertMap(underScore.get(i)));
		}
		System.out.println(newListMap);
		return newListMap;
	}
} 
