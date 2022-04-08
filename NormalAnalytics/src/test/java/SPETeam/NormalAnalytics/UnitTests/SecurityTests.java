package SPETeam.NormalAnalytics.UnitTests;

import io.jsonwebtoken.Claims;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static SPETeam.NormalAnalytics.utils.JwtUtil.createJWT;
import static SPETeam.NormalAnalytics.utils.JwtUtil.parseJWT;

@SpringBootTest
public class SecurityTests {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @SneakyThrows
    @Test
    public void TestJwt(){
        String jwt1 = createJWT("token1");
        Claims claims = parseJWT(jwt1);
        String subject = claims.getSubject();

        String jwt2 = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmNWJhYzllYmUzYjY0MjI3OTU4NDBlMWVmZjM2ZjkwMiIsInN1YiI6InRva2VuMiIsImlzcyI6InNnIiwiaWF0IjoxNjQ5NDIyMTgyLCJleHAiOjE2NDk0MjU3ODJ9.W40rW1nX3FF6egV226H077q5dXnLfOcDhbgHY37hH_s";
        Claims claims2 = parseJWT(jwt2);
        String subject2 = claims2.getSubject();

        assert subject.equals("token1");
        assert subject2.equals("token2");
    }

    @Test
    public void TestBCryptPasswordEncoder(){
        String encode = passwordEncoder.encode("password");
        String encode2 = passwordEncoder.encode("password");

        assert passwordEncoder.matches("password","$2a$10$5.mUgUwPXr8C13cKoYFn2ec/qxxmQsJqVuYzJkt5vQIzTn95NIGle");
        assert passwordEncoder.matches("password", encode);
        assert passwordEncoder.matches("password", encode2);
    }
}
