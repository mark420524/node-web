package com.silivall.test;

import java.security.Key;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

/**
 * AES加解密工具类
 * @.Desc AES对称加密算法，调用方法： 
 * 1) 对明文进行加密，并对密文进行Base64编码：AESUtil.encrypt(plainText, keyStr); plainText为需要加密的字符串，keyStr为密钥。 
 * 2) 先对密文进行Base64解码，然后再进行解密：AESUtil.decrypt(secretText, keyStr); secretText为需要解密的字符串，keyStr为密钥。
 */
public class AESUtil {
	/**
	 * AES Key 长度
	 */
	private static final int AES_KEY_LENGTH = 16;
	
	/**
	 * 默认AES Key
	 */
	private static final String DEFAULT_AES_KEY_STR = "KZh_AsY#16_o0pzm";
	
	private static final String CHARSET = "UTF-8";
	
	private static final String ENCRYPT = "AES";
	// ECB 模式下不适用 向量定义
	private static final String ENCRYPT_TYPE = "AES/ECB/PKCS5Padding"; 

	private static final String PASSWORD = "MARK123456###42052467ANDROID";
	
	// 此处向量可自定义，请注意如果超过0x80请加(byte)强制转换
//	private static final byte[] OIV = { 0x01, 0x02, 0x03, 0x04, 0x05, 0x06,
//			0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10 };
	
	/**
	 * 加密，并对密文进行Base64编码，采用默认密钥
	 * @param plainText
	 * 					明文
	 * @return String
	 * 		  			做了Base64编码的密文
	 * @throws Exception
	 */
	public static String encrypt(String plainText) throws Exception{
		return encrypt(plainText, DEFAULT_AES_KEY_STR);
	}
	
	/**
	 * 加密，并对密文进行Base64编码，可指定密钥
	 * @param plainText
	 * 					明文
	 * @param keyStr
	 * 					密钥
	 * @return String
	 * 		  			做了Base64编码的密文
	 * @throws Exception
	 */
	public static String encrypt(String plainText, String keyStr) throws Exception{
		try {
			byte[] keyBytes = keyStr.getBytes(CHARSET);
			byte[] keyBytesTruncated = new byte[AES_KEY_LENGTH];
			for (int i = 0; i < AES_KEY_LENGTH; i++) {
				if (i >= keyBytes.length) {
					// keyBytesTruncated[i] = (byte)0x80;
					keyBytesTruncated[i] = 0x12;
				} else {
					keyBytesTruncated[i] = keyBytes[i];
				}
			}
			Key ckey = new SecretKeySpec(keyBytesTruncated, ENCRYPT);
			Cipher cp = Cipher.getInstance(ENCRYPT_TYPE);
//			IvParameterSpec iv = new IvParameterSpec(OIV);
			cp.init(1, ckey);
			byte[] inputByteArray = plainText.getBytes(CHARSET);

			byte[] cipherBytes = cp.doFinal(inputByteArray);
			// String result=Base64.encodeToString(cipherBytes, Base64.NO_WRAP);
			String result = Base64Util.encoder(cipherBytes);
			result = result.replace("+", "%2b");
			result = result.replace("\r\n", "").replace("\n", "");
			return result;
		} catch (Exception e) {
			throw e;
		}
	}
	
	/**
	 * 对做了Base64编码的密文进行解密，采用默认密钥
	 * @param secretText
	 * 						做了Base64编码的密文
	 * @return String
	 * 						解密后的字符串      
	 * @throws Exception
	 */
	public static String decrypt(String secretText) throws Exception{
		return decrypt(secretText, DEFAULT_AES_KEY_STR);
	}
	
	/**
	 * 对做了Base64编码的密文进行解密
	 * @param secretText
	 * 						做了Base64编码的密文
	 * @param keyStr
	 * 						密钥
	 * @return String
	 * 						解密后的字符串      
	 * @throws Exception
	 */
	public static String decrypt(String secretText, String keyStr) throws Exception{
		secretText = secretText.replace("%2b", "+");
		try {
			byte[] cipherByte = Base64Util.decoder(secretText);
			// byte[] cipherByte =Base64.decode(plainText, Base64.DEFAULT);
			byte[] keyBytes = keyStr.getBytes(CHARSET);
			byte[] keyBytesTruncated = new byte[AES_KEY_LENGTH];
			for (int i = 0; i < AES_KEY_LENGTH; i++) {
				if (i >= keyBytes.length) {
					keyBytesTruncated[i] = 0x12;
				} else {
					keyBytesTruncated[i] = keyBytes[i];
				}
			}
			Key ckey = new SecretKeySpec(keyBytesTruncated, ENCRYPT);
			Cipher cp = Cipher.getInstance(ENCRYPT_TYPE);
			// Cipher cp = Cipher.getInstance("AES/ECB/PKCS5Padding");
			//ecb模式不支持iv
//			IvParameterSpec iv = new IvParameterSpec(OIV);
			cp.init(2, ckey);
			byte[] decryptBytes = cp.doFinal(cipherByte);
			return new String(decryptBytes, CHARSET).replace("", "");
		} catch (Exception e) {
			throw e;
		}		
	}	

	// 测试
	public static void main(String[] args) {
		try {
			String content = "asdfasfa";
			System.out.println(content.length());			
			System.out.println("加密前：" + content);
			// 加密
			String encryptResult = encrypt(content);
			System.out.println("加密后：" + encryptResult);
			String base64_encryptResult = Base64Util.encoder(encryptResult);
			System.out.println("Base64编码后：" + base64_encryptResult);
			// 解密
			String decryptResult = decrypt(encryptResult);//decrypt("MfNVg%2bLiK9QzCien5EirmDRenFRwmuteJH0xlPi04k4aHqVne8sjmxtkwM9uL7I6OGC4gzSxbs13h9kpsWLqxA==");//decrypt(base64_encryptResult);
			System.out.println("解密后：" + decryptResult);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
