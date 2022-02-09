package SPETeam.NormalAnalytics.security;

import SPETeam.NormalAnalytics.entity.Requests.User;
import SPETeam.NormalAnalytics.utils.JwtUtil;
import SPETeam.NormalAnalytics.utils.RedisCache;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private RedisCache redisCache;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = request.getHeader("token");
        if (!StringUtils.hasText(token)) {
            //Release
            filterChain.doFilter(request, response);
            return;
        }
        String userid;
        try {
            Claims claims = JwtUtil.parseJWT(token);
            userid = claims.getSubject();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("token illegal");
        }
        String redisKey = "login: " + userid;
        User user = redisCache.getCacheObject(redisKey);
        if (Objects.isNull(user)) {
            throw new RuntimeException("User not logged in");
        }
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(user,null,null);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        //Release
        filterChain.doFilter(request,response);

    }
}
