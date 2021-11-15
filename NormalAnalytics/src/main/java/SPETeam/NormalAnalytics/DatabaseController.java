package SPETeam.NormalAnalytics;

import org.springframework.stereotype.Controller;

@Controller
public class DatabaseController {
    private IDatabaseReceiver receiver = new TestingDatabaseReceiver();
}
