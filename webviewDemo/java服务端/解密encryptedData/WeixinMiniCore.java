package com.skyland.weixin.service;

import org.apache.commons.codec.binary.Base64;
import net.sf.json.JSONObject;
/**
 * ΢��С�������
 * @author cty
 *
 */
public class WeixinMiniCore {
	private static final String WATERMARK = "watermark";
	private static final String APPID = "appid";
	/**
	 * ��������
	 * @return
	 * @throws Exception
	 */
	public static String decrypt(String appId, String encryptedData, String sessionKey, String iv){
		String result = "";
		try {
			AES aes = new AES();  
		    byte[] resultByte = aes.decrypt(Base64.decodeBase64(encryptedData), Base64.decodeBase64(sessionKey), Base64.decodeBase64(iv));  
		    if(null != resultByte && resultByte.length > 0){  
		        result = new String(WeixinPKCS7Encoder.decode(resultByte));  
		    	JSONObject jsonObject = JSONObject.fromObject(result);
		    	String decryptAppid = jsonObject.getJSONObject(WATERMARK).getString(APPID);
		    	if(!appId.equals(decryptAppid)){
		    		result = "";
		    	}
	        }  
		} catch (Exception e) {
			result = "";
			e.printStackTrace();
		}
	    return result;
	}
	
	
	public static void main(String[] args) throws Exception{
	   String appId = "";
	   String encryptedData = "";
	   String sessionKey = "";
	   String iv = "";
       System.out.println(decrypt(appId, encryptedData, sessionKey, iv));
    }
}
