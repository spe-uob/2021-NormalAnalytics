package SPETeam.NormalAnalytics;

import SPETeam.NormalAnalytics.entity.Responses.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface IDatabaseReceiver {
    boolean VerifyLogin(String name,String password);
    List<Student> StudentsFromTutor(String tutorUsername);
    AssessmentScoreList ScoresFromUnit(String studentUsername, String unitCode);
    List<Unit> UnitsFromStudent(String studentUsername);
    float AttendanceFromUnit(String studentUsername,String unitCode);
    float UnitMedianForAssessment(String unitCode,String assessmentName);
    Student StudentFromUsername(String studentName);
    UnitAndGrades[] UnitAndGradesFromStudent(String studentUsername);
    StudentData AllStudentData(String studentUsername);
    List<GroupAndStudents> StudentsFromTutorByGroup(String tutorUsername);
}
