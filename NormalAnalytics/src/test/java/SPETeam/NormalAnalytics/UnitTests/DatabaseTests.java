package SPETeam.NormalAnalytics.UnitTests;

import SPETeam.NormalAnalytics.IDatabaseReceiver;
import SPETeam.NormalAnalytics.entity.Responses.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT, properties = {"spring.h2.console.enabled=true","jdbc.url=jdbc:h2:mem:myDb"})
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

    @Test
    void OnlyScoresFromUnit(){
        AssessmentScoreList SPEAssessments = receiver.ScoresFromUnit("iq20064","COMS20006");
        assert !containsAssessmentWithScore("Bank",30,SPEAssessments);
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
    void TestOnlyStudentsUnits(){
        List<Unit> willUnits = receiver.UnitsFromStudent("iq20064");
        for(Unit u : willUnits){
            if(u.getCode().equals("COMS30042")) assert false;
        }
        assert true;
    }

    @Test
    void TestRetrieveAttendance(){
        final float expected = 66.66f;
        final float precision = 0.01f;
        float attendance = receiver.AttendanceFromUnit("oj20075","COMS20006");
        assert Math.abs(expected - attendance) < precision;
    }

    @Test
    void TestRetrieveStudentsByGroup(){
        List<GroupAndStudents> groups = receiver.StudentsFromTutorByGroup("jross");
        boolean containsCSGroup = false;
        boolean containsOtherGroup = false;
        for(GroupAndStudents g : groups){
            if(g.getGroupName().equals("CS group")){
                containsCSGroup = true;
                assert usernamesFromTutorGroup(g).
                        containsAll(Arrays.asList(new String[] {"iq20064","oj20075","ne20327","kk19041"}));
            }else if(g.getGroupName().equals("Other group")){
                containsOtherGroup = true;
                assert usernamesFromTutorGroup(g).contains("ab12345");
            }else assert false;
        }
        assert containsCSGroup;
        assert containsOtherGroup;
    }

    private List<String> usernamesFromTutorGroup(GroupAndStudents group){
        List<String> toReturn = new ArrayList<>();
        for(Student s : group.getStudents()){
            toReturn.add(s.getUsername());
        }
        return toReturn;
    }

    @Test
    void TestRetrievesStudentAllDataObject(){
        StudentData data = receiver.AllStudentData("iq20064");
        assert data.getSurname().equals("Tripp");
        assert data.getUnitData().length == 2;
        for(UnitData u : data.getUnitData()){
            assert u.getScores().length == 3;
            assert u.getAttendances().length == 3;
        }
    }

    @Test
    void TestCalculatesUnitAverageCorrectly(){
        UnitData CSAData = new UnitData();
        boolean unitFound = false;
        for(UnitData u:receiver.AllStudentData("iq20064").getUnitData()){
            if(u.getCode().equals("COMS20008")){
                unitFound = true;
                CSAData = u;
                break;
            }
        }
        assert unitFound;
        assert Math.abs(CSAData.getUnitAverage() - 81f) < 0.1f;
        assert Math.abs(CSAData.getCohortAverage() - 75.75f) < 0.01f;
    }

    @Test
    void TestMedianForAssessment(){
        assert receiver.UnitMedianForAssessment("COMS20006","MVP") == 75;
    }
}
