package com.skyland.weixin.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * @author cty
 *
 */
@WebServlet("/WeixinCore")
public class WeixinMiniProgramServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private static final String AppId = "wx57b6c3f6da1c9a24";
	private static final String AppSecret = "4038b724832658201e06e759e8e09afa";
	
    public WeixinMiniProgramServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		
		String action = request.getParameter("action");
		
		if("getToken".equals(action)) {
			String appid= AppId;
			String appsecret = AppSecret;
			String js_code = request.getParameter("js_code");
			String grant_type = "authorization_code";
			String url = "https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+appsecret+"&js_code="+js_code+"&grant_type="+grant_type+"";
			
			URL urlObj = new URL(url);
			URLConnection conn = urlObj.openConnection();
			InputStream is = conn.getInputStream();
			byte[] b = new byte[1024];
			int len;
			StringBuilder sb = new StringBuilder();
			while ((len = is.read(b)) != -1) {
				sb.append(new String(b, 0, len));
			}
			
			String result = sb.toString();
			response.getWriter().append(result);
			System.out.println("==============getToken:" + result);
			
		} else if ("getUnionId".equals(action)) {
			String appid = AppId;
			String encryptedData = request.getParameter("encryptedData");
			String iv = request.getParameter("iv");
			String session_key = request.getParameter("session_key");
			System.out.println("=================appid:"+appid+",,,encryptedData:"+encryptedData+",,,iv:"+iv+",,,session_key:"+session_key);
			System.out.println("=================¿ªÊ¼½âÃÜencryptedData");
			String res = WeixinMiniCore.decrypt(appid, encryptedData, session_key, iv);
			System.out.println("=================result:"+res);
			response.getWriter().append(res);
		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
