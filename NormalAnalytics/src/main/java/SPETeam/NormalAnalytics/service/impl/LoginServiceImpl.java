package SPETeam.NormalAnalytics.service.impl;

import SPETeam.NormalAnalytics.Blackboard.BBReceiver;
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

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * This class implement LoginService
 */
@Component
public class LoginServiceImpl implements LoginService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RedisCache redisCache;

    @Autowired
    private BBReceiver bbReceiver;

    @Override
    public ResponseResult<Map<String, String>> login(TutorTable tutor) {
        //authentication method

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

        //Searches for new Blackboard data locally
        final String path = "."+ File.separator+"blackboard";
        bbReceiver.UpdateDatabase(tutor.getUsername(),path);

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

