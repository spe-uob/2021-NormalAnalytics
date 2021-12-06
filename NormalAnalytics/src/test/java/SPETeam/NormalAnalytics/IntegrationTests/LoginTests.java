package SPETeam.NormalAnalytics.IntegrationTests;

import org.springframework.boot.test.context.SpringBootTest;

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
