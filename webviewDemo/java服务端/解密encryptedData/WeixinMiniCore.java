package com.skyland.weixin.service;

import org.apache.commons.codec.binary.Base64;
import net.sf.json.JSONObject;
/**
 * 微信小程序解密
 * @author cty
 *
 */
public class WeixinMiniCore {
	private static final String WATERMARK = "watermark";
	private static final String APPID = "appid";
	/**
	 * 解密数据
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
	   String appId = "wx26e919df68fdcb04";
	   String encryptedData = "A6PgngFwn3qHqWc4XvUYtmSlEGa1wJEclX+jTbaNuoPtoutbasRMAaJwgVvb8DfZelbZbrshwRZqFjtDF2nmhcB3Jj5leHfC09U90sSOutXZeGkqJPbCqjED1QQjj4Kd4or8vEOjN7qmDOUW8PgnKgAESGROm7kFK3po36UjHgoQwtmgBQAThxJ2ZI2xZx7jiYPE1gvCe6hWBXV/2zrSGTxpo2h/UnnifaKoI+iOIeJojYwsT/vd3/Cy82meYmtRT3Pg7iUBzPp+W2S+/2qHNqZKyqzSx5dRyjzv9lrw6ud+eVlZ9uOZ69jT500MVG+mOxKaaurGA9qQrU2rRJJA6qFmesF4SInuHSloxizxusEg1bgY6y0ZFUEv9mIiOmMtI2FYxoTKrtuOVJPH3/G8xkFvbRqJ+EprIMyWpY0rK2fbMY9qQf37hzZLlniY8v3M+uvRx3agdzed9IM1gA4EvTwN3Ya8T8aTldAwEOR/jriTQ+qvDU2cb9kvvMmJhzhHgm9tplpe0pHSMwkbEpZ7/g==";
	   String sessionKey = "I62WisKhpbb21ADBj3we/w==";
	   String iv = "3dIIkjd7zbqT+IgZOXPd/g==";
       System.out.println(decrypt(appId, encryptedData, sessionKey, iv));
    }
}
