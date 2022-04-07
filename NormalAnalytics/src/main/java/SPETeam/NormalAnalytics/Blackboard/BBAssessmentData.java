package SPETeam.NormalAnalytics.Blackboard;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class BBAssessmentData {
    @Getter String unitCode;
    @Getter String studentUsername;
    @Getter String assessmentName;
    @Getter float assessmentScore;
}
