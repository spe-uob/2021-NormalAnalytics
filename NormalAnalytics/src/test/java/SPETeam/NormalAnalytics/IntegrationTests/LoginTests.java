package SPETeam.NormalAnalytics.IntegrationTests;

import SPETeam.NormalAnalytics.Database.Tables.TutorTable;
import SPETeam.NormalAnalytics.NormalAnalyticsApplication;
import SPETeam.NormalAnalytics.entity.Requests.User;
import SPETeam.NormalAnalytics.entity.Responses.ResponseResult;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import lombok.SneakyThrows;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = NormalAnalyticsApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Transactional
public class LoginTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setUp(){
        mockMvc= MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @SneakyThrows
    @Test
    @WithMockUser(username = "jross", password = "password123")
    public void sayHello(){
        MvcResult authResult = null;
        authResult = mockMvc.perform(get("/hello")
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        String response = authResult.getResponse().getContentAsString();
        assert response.equals("Hello world");

    }

    @Test
    public void loginUser() throws Exception{
        String username = "jross";
        String password = "password123";
        MvcResult authResult = null;
        authResult = mockMvc.perform(MockMvcRequestBuilders.post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(String.format("{\n" +
                            "    \"username\": \"%s\",\n" +
                            "    \"password\": \"%s\"\n" +
                            "}", username, password)))
        .andDo(print()).andReturn();
        String response = authResult.getResponse().getContentAsString();
        String[] body = response.split(",");
        String[] code = body[0].split(":");
        String loginCode = code[1];
        assert loginCode.equals("200");
    }

    @Test
    public void loginFailed() throws Exception{
        String username = "jross";
        String password = "wrongPassword";
        MvcResult authResult = null;
        authResult = mockMvc.perform(MockMvcRequestBuilders.post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(String.format("{\n" +
                        "    \"username\": \"%s\",\n" +
                        "    \"password\": \"%s\"\n" +
                        "}", username, password)))
                .andDo(print()).andReturn();
        String response = authResult.getResponse().getContentAsString();
        String[] body = response.split(",");
        String[] code = body[0].split(":");
        String loginCode = code[1];
        assert loginCode.equals("401");
    }
}
