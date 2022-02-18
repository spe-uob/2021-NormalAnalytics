package SPETeam.NormalAnalytics.UnitTests;

import SPETeam.NormalAnalytics.IDatabaseReceiver;
import SPETeam.NormalAnalytics.entity.Responses.AssessmentScore;
import SPETeam.NormalAnalytics.entity.Responses.AssessmentScoreList;
import SPETeam.NormalAnalytics.entity.Responses.Unit;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import SPETeam.NormalAnalytics.entity.Responses.Student;

import java.util.List;

@SpringBootTest
public class DatabaseTests {
    @Autowired
    IDatabaseReceiver receiver;

    @Test
    void TestLoginFailOnUnknownUser(){
        assert receiver.VerifyLogin("fakeuser","123123") == false;
    }

    @Test
    void TestLoginFailOnWrongPassword(){
        assert receiver.VerifyLogin("jross","wrongpassword") == false;
    }

    @Test
    void TestSuccessfulLogin(){
        assert receiver.VerifyLogin("jross","password123") == true;
    }

    @Test
    void TestRetrieveStudents() {
        List<Student> students = receiver.StudentsFromTutor("jross");
        assert containsStudent(students,"William");
        assert containsStudent(students,"Siana");
        assert containsStudent(students,"Sam");
        assert containsStudent(students,"Luo");
    }

    boolean containsStudent(List<Student> list,String firstname){
        for(Student s : list){
            if(s.getFirstName().equals(firstname)) return true;
        }
        return false;
    }

    @Test
    void TestRetrievesScores(){
        AssessmentScoreList SPEAssessments = receiver.ScoresFromUnit("iq20064","COMS20006");
        assert containsAssessmentWithScore("MVP",50,SPEAssessments);
        assert containsAssessmentWithScore("Beta",70,SPEAssessments);
        assert containsAssessmentWithScore("Release",100,SPEAssessments);
    }

    boolean containsAssessmentWithScore(String assessment,float score,AssessmentScoreList list){
        for(AssessmentScore a : list.getAssessments()){
            if(a.getName().equals(assessment) && a.getScore() == score) return true;
        }
        return false;
    }

    @Test
    void TestRetrieveUnits(){
        List<Unit> willUnits = receiver.UnitsFromStudent("iq20064");
        boolean correctUnits = false;
        for(Unit u : willUnits){
            if(u.getCode().equals("COMS20006") || u.getCode().equals("COMS20008")) correctUnits = true;
            else correctUnits = false;
        }
        assert correctUnits;
    }

    @Test
    void TestRetrieveAttendance(){
        assert receiver.AttendanceFromUnit("iq20064","COMS20006") == 84;
    }

    @Test
    void TestMedianForAssessment(){
        assert receiver.UnitMedianForAssessment("COMS20006","MVP") == 75;
    }
}
