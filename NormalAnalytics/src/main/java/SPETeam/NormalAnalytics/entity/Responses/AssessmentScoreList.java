package SPETeam.NormalAnalytics.entity.Responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AssessmentScoreList {
    AssessmentScore[] assessments;
}
