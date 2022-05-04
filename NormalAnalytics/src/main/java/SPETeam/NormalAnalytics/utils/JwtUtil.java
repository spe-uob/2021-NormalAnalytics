package SPETeam.NormalAnalytics.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

/**
 * JWT utility class
 */
public class JwtUtil {

    //period of validity
    public static final Long JWT_TTL = 60 * 60 *1000L;// 60 * 60 *1000  one hour
    //set the plaintext of the key
    public static final String JWT_KEY = "sangeng";

    public static String getUUID(){
        String token = UUID.randomUUID().toString().replaceAll("-", "");
        return token;
    }

    /**
     * create JWT
     * @param subject the data to be stored in the token（json format）
     * @return String JWT
     */
    public static String createJWT(String subject) {
        JwtBuilder builder = getJwtBuilder(subject, null, getUUID());// set expiration time
        return builder.compact();
    }

    /**
     * create JWT
     * @param subject the data to be stored in the token（json format）
     * @param ttlMillis timeout for token
     * @return String JWT
     */
    public static String createJWT(String subject, Long ttlMillis) {
        JwtBuilder builder = getJwtBuilder(subject, ttlMillis, getUUID());// set expiration time
        return builder.compact();
    }

    private static JwtBuilder getJwtBuilder(String subject, Long ttlMillis, String uuid) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        SecretKey secretKey = generalKey();
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        if(ttlMillis==null){
            ttlMillis=JwtUtil.JWT_TTL;
        }
        long expMillis = nowMillis + ttlMillis;
        Date expDate = new Date(expMillis);
        return Jwts.builder()
                .setId(uuid)              // the only ID
                .setSubject(subject)   //  can be JSON
                .setIssuer("sg")     // issuer
                .setIssuedAt(now)      // issue time
                .signWith(signatureAlgorithm, secretKey) //signed using HS256 symmetric encryption algorithm
                .setExpiration(expDate);
    }

    /**
     * create token
     * @param id userId
     * @param subject the data to be stored in the token（json format）
     * @param ttlMillis timeout for token
     * @return string JWT
     */
    public static String createJWT(String id, String subject, Long ttlMillis) {
        JwtBuilder builder = getJwtBuilder(subject, ttlMillis, id);// set expiration time
        return builder.compact();
    }

    /*public static void main(String[] args) throws Exception {
//        String jwt = createJWT("123123");
//        System.out.println(jwt);
        String token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyN2Y1ZjczMGFlMTA0YWQxOGM4NGQwNDNlMDdkM2NiZCIsInN1YiI6IjIiLCJpc3MiOiJzZyIsImlhdCI6MTY0NDMwNDQ2NiwiZXhwIjoxNjQ0MzA4MDY2fQ.GH_2UM2sp-h8KdchBdPHyWphMBgbfhG7PwBWybDHWmM";
        Claims claims = parseJWT(token);
        System.out.println(claims);
        String userId = claims.getSubject();
        System.out.println(userId);
    }*/

    /**
     * generate the encrypted secret key
     * @return secret key
     */
    public static SecretKey generalKey() {
        byte[] encodedKey = Base64.getDecoder().decode(JwtUtil.JWT_KEY);
        SecretKey key = new SecretKeySpec(encodedKey, 0, encodedKey.length, "AES");
        return key;
    }

    /**
     * parse JWT
     *
     * @param jwt
     * @return
     * @throws Exception
     */
    public static Claims parseJWT(String jwt) throws Exception {
        SecretKey secretKey = generalKey();
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(jwt)
                .getBody();
    }


}