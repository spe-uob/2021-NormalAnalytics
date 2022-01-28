package SPETeam.NormalAnalytics.utils;

import io.jsonwebtoken.*;

import javax.swing.*;
import java.util.Date;
import java.util.UUID;

public class JwtUtil {

    private static long time = 1000*60*60*24;
    private static String signature = "admin123123123123123123123123123123132312436545652352352352345234235235";

    //create token
    public static String createToken(){
        JwtBuilder jwtBuilder = Jwts.builder();
        String jwtToken = jwtBuilder
                //header
                .setHeaderParam("typ","JWT")
                .setHeaderParam("alg","HS256")
                //payload
                .claim("username","admin")
                .claim("role","admin")
                .setSubject("admin-test")
                .setExpiration(new Date(System.currentTimeMillis()+time))
                .setId(UUID.randomUUID().toString())
                //signature
                .signWith(SignatureAlgorithm.HS256, signature)
                .compact();
        return jwtToken;
    }

    //verify token
//    public static boolean verifyToken(String token){
//        if(token == null){
//            return false;
//        }
//        try{
//            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(signature).parseClaimsJws(token);
//        }catch (Exception e){
//            return false;
//        }
//        return true;
//    }
}
