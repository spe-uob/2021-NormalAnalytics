package SPETeam.NormalAnalytics.entity.Responses;

import SPETeam.NormalAnalytics.entity.Requests.User;
import lombok.Data;

@Data
public class Token {
    private boolean succeed;
    private String username;
    private String token;

    public static Token fromUser(User user) {
        Token token = new Token();
        token.setUsername(user.getUsername());
        token.setToken(user.getToken());
        token.setSucceed(true);
        return token;
    }
    public static Token failed() {
        Token token = new Token();
        token.setSucceed(false);
        return token;
    }
}
