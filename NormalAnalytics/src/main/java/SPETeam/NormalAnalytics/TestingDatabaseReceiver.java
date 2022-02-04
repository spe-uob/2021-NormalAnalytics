package SPETeam.NormalAnalytics;

import SPETeam.NormalAnalytics.entity.Responses.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component("TestingDatabaseReceiver")
public class TestingDatabaseReceiver implements IDatabaseReceiver {
    @Override
    public boolean VerifyLogin(String name,String password)
    {
        final String username = "admin";
        final String pass = "123123";
        if(name.equals(username) && password.equals(pass)) return true;
        else return false;
    }

    @Override
    public List<Student> StudentsFromTutor(String tutorUsername) {
        return null;
    }

    @Override
    public AssessmentScoreList ScoresFromUnit(String studentUsername, String unitCode) {
        return null;
    }

    @Override
    public List<Unit> UnitsFromStudent(String studentUsername) {
        return null;
    }

    @Override
    public float AttendanceFromUnit(String studentUsername, String unitCode) {
        return 0;
    }

    @Override
    public float UnitMedianForAssessment(String unitCode, String assessmentName) {
        return 0;
    }

    @Override
    public Student StudentFromUsername(String studentName) {
        return null;
    }

    @Override
    public UnitAndGrades[] UnitAndGradesFromStudent(String studentUsername) {
        return new UnitAndGrades[0];
    }
}
