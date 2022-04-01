package SPETeam.NormalAnalytics.service.impl;

import SPETeam.NormalAnalytics.Database.Tables.TutorTable;
import SPETeam.NormalAnalytics.entity.Requests.User;
import SPETeam.NormalAnalytics.entity.Responses.ResponseResult;
import SPETeam.NormalAnalytics.service.LoginService;
import SPETeam.NormalAnalytics.utils.JwtUtil;
import SPETeam.NormalAnalytics.utils.RedisCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Component
public class LoginServiceImpl implements LoginService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RedisCache redisCache;

    @Override
    public ResponseResult<Map<String, String>> login(TutorTable tutor) {
        //AuthenticationManager 的认证方法authenticate进行认证

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(tutor.getUsername(),(tutor.getPassword()));

        Authentication authenticate = null;
        try {
            authenticate = authenticationManager.authenticate(authenticationToken);
        } catch (Exception ignore) {
            return new ResponseResult<>(401,"Login failed", new HashMap<>());
        }
        //If the authentication does not pass, the corresponding prompt is given
        if(Objects.isNull(authenticate)){
            return new ResponseResult<>(401,"Login failed", new HashMap<>());
        }
        //If the authentication is passed, a jwt is generated using the userid,
        // and the jwt is stored in the ResponseResult and returned
        User User = (User) authenticate.getPrincipal();
        int numId = User.getTutor().getId();
        String userid = String.valueOf(numId);
        String jwt = JwtUtil.createJWT(userid);
        Map<String,String> map = new HashMap<>();
        map.put("token",jwt);
        //Store the complete user information in redis, userid as key
        redisCache.setCacheObject("login:"+userid,User);
        return new ResponseResult<>(200,"Login successful",map);
    }

    @Override
    public ResponseResult logout() {
        //get the user id in SecurityContextHolder
        UsernamePasswordAuthenticationToken authentication =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        int id = user.getTutor().getId();
        //delete the value in redis
        redisCache.deleteObject("login:"+id);
        return new ResponseResult(200,"Successful cancellation");
    }
}

