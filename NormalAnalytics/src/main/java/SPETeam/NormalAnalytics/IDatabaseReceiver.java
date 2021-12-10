package SPETeam.NormalAnalytics;

import SPETeam.NormalAnalytics.entity.Responses.AssessmentScore;
import SPETeam.NormalAnalytics.entity.Responses.Student;
import SPETeam.NormalAnalytics.entity.Responses.Unit;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface IDatabaseReceiver {
    boolean VerifyLogin(String name,String password);
    List<Student> StudentsFromTutor(String tutorUsername);
    List<AssessmentScore> ScoresFromUnit(String studentUsername, String unitCode);
    List<Unit> UnitsFromStudent(String studentUsername);
    float AttendanceFromUnit(String studentUsername,String unitCode);
    float UnitMedianForAssessment(String unitCode,String assessmentName);
}
