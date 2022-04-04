package SPETeam.NormalAnalytics.entity.Responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AssessmentScore {
    private String name;
    private float score;
    private float weight;
}
