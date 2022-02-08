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
    public ResponseResult login(TutorTable tutor) {
        //AuthenticationManager 的认证方法authenticate进行认证

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(tutor.getUsername(),(tutor.getPassword()));
        Authentication authenticate = authenticationManager.authenticate(authenticationToken);

        //If the authentication does not pass, the corresponding prompt is given
        if(Objects.isNull(authenticate)){
            throw new RuntimeException("Login failure");
        }
        //If the authentication is passed, a jwt is generated using the userid,
        // and the jwt is stored in the ResponseResult and returned
        User User = (User) authenticate.getPrincipal();
//        String userid = loginUser.getId().toString();
        int numId = User.getId();
        String userid = String.valueOf(numId);
        String jwt = JwtUtil.createJWT(userid);

        return new ResponseResult(200,"Login successful",null);

    }
}

