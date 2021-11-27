package SPETeam.NormalAnalytics.IntegrationTests;

import SPETeam.NormalAnalytics.controller.LoginController;
import SPETeam.NormalAnalytics.entity.Token;
import SPETeam.NormalAnalytics.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest
public class LoginTests {


    /*private MockMvc mvc = MockMvcBuilders.webAppContextSetup(context).build();
    @Test
    public void UnknownUserFails() throws Exception {

        User unknownUser = new User();
        unknownUser.setUsername("fakeUser");
        unknownUser.setUsername("123123");
        MvcResult result = mvc.perform(post("/login").contentType(MediaType.APPLICATION_JSON).content(unknownUser.toString())).andReturn();
        assert result.getResponse().equals(Token.failed());
    }*/
}
