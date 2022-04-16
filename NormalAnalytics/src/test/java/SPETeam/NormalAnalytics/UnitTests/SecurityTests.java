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
        String jwt = createJWT("token");
        Claims claims = parseJWT(jwt);
        String subject = claims.getSubject();
        assert subject.equals("token");
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
