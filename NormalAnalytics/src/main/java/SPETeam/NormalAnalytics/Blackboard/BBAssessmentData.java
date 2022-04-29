package SPETeam.NormalAnalytics.Blackboard;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * A data class for storing assessment data extracted from Blackboard HTML pages
 */
@AllArgsConstructor
public class BBAssessmentData {
    @Getter String unitCode;
    @Getter String studentUsername;
    @Getter String assessmentName;
    @Getter float assessmentScore;
}
