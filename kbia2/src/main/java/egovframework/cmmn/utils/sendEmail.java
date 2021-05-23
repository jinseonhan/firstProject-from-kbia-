package egovframework.cmmn.utils;

import java.util.Properties;
import java.util.Random;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
public class sendEmail {
	public static String sendEmail(String email) {
		String user = "kbiamanager@gmail.com"; //발신자의 이메일 아이디를 입력 
		String password = "wjswltksdjq1!"; //발신자 이메일의 패스워드를 입력 wjswltksdjq1!
		StringBuffer temp = new StringBuffer();
		 // SMTP 서버 정보를 설정한다.
	    Properties prop = new Properties();
	    prop.put("mail.smtp.host", "smtp.gmail.com"); 
	    prop.put("mail.smtp.port", 465); 
	    prop.put("mail.smtp.auth", "true"); 
	    prop.put("mail.smtp.ssl.enable", "true"); 
	    prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");
	    
	    Session session = Session.getDefaultInstance(prop, new javax.mail.Authenticator() {
	        protected PasswordAuthentication getPasswordAuthentication() {
	            return new PasswordAuthentication(user, password);
	        }
	    });
	
	    try {
	        MimeMessage message = new MimeMessage(session);
	        message.setFrom(new InternetAddress(user));
	
	        System.out.println("수신자 이메일>>> " +  email);
	        //수신자메일주소
	        message.addRecipient(Message.RecipientType.TO, new InternetAddress(email)); 
	
	        
	        Random rnd = new Random();
	        for (int i = 0; i < 9; i++) {
	            int rIndex = rnd.nextInt(3);
	            switch (rIndex) {
	            case 0:
	                // a-z
	                temp.append((char) ((int) (rnd.nextInt(26)) + 97));
	                break;
	            case 1:
	                // 0-9
	                temp.append((rnd.nextInt(10)));
	                break;
		        case 2:
		            // !-)
		        	temp.append((char) ((int) (rnd.nextInt(10)) + 41));
	                break;
		        }
	        }


	        // Subject
	        message.setSubject("한국전지산업협회 임시비밀번호 입니다."); //메일 제목을 입력
	
	        // Text
	        message.setText("임시비밀번호는 [" + temp + "]입니다.");    //메일 내용을 입력
	
	        // send the message
	        Transport.send(message); ////전송
	        System.out.println("message sent successfully...");
	    } catch (AddressException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    } catch (MessagingException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    }
	    return temp.toString();
	}
}