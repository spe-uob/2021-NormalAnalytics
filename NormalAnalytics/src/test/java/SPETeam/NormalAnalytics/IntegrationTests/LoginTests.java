package SPETeam.NormalAnalytics.IntegrationTests;

import SPETeam.NormalAnalytics.NormalAnalyticsApplication;
import SPETeam.NormalAnalytics.entity.Requests.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = NormalAnalyticsApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class LoginTests {

    @LocalServerPort
    int port;

    TestRestTemplate restTemplate = new TestRestTemplate();
    HttpHeaders headers = new HttpHeaders();

    @Test
    public void MainUseCaseTest(){
        //TODO: rewrite this to work with security
        /*User user = new User();
        user.setUsername("jross");
        user.setPassword("password123");
        HttpEntity<User> loginData = new HttpEntity<>(user,headers);

        ResponseEntity<Token> loginConfirmation = restTemplate.exchange("http://localhost:"+port+"/login",
                HttpMethod.POST,
                loginData,
                Token.class);

        assert loginConfirmation.getBody().isSucceed();
        String loggedInUser = loginConfirmation.getBody().getUsername();
        assert loggedInUser.equals("jross");*/
    }
}
