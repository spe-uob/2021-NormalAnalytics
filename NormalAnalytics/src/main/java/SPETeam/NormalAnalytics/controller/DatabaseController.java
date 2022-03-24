package SPETeam.NormalAnalytics.controller;

import SPETeam.NormalAnalytics.IDatabaseReceiver;
import SPETeam.NormalAnalytics.entity.Requests.UnitCodeAndStudent;
import SPETeam.NormalAnalytics.entity.Requests.TutorStudentRequest;
import SPETeam.NormalAnalytics.entity.Requests.UnitAverageRequest;
import SPETeam.NormalAnalytics.entity.Requests.UnitRequest;
import SPETeam.NormalAnalytics.entity.Responses.*;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("database")
public class DatabaseController {
    @Autowired
    IDatabaseReceiver receiver;

    @GetMapping("/getUnitAverage/{unitCode}/{assessmentName}")
    public JSONValue unitMedian(@PathVariable String unitCode,@PathVariable String assessmentName){
        return new JSONValue(receiver.UnitMedianForAssessment(unitCode,assessmentName));
    }

    @GetMapping("/getAttendance/{unitCode}/{studentUsername}")
    public JSONValue unitAttendance(@PathVariable String unitCode,@PathVariable String studentUsername){
        return new JSONValue(receiver.AttendanceFromUnit(studentUsername,unitCode));
    }

    @GetMapping("/getStudents/{tutorUsername}")
    public StudentList getStudents(@PathVariable String tutorUsername){
        List<Student> studentList = receiver.StudentsFromTutor(tutorUsername);
        Student[] studentArray = (Student[]) studentList.toArray(new Student[studentList.size()]);
        return new StudentList(studentArray);
    }

    @GetMapping("/getGradesAndUnits/{studentUsername}")
    public StudentUnitsAndGrades getStudentData(@PathVariable String studentUsername){
        StudentUnitsAndGrades unitsAndGrades = new StudentUnitsAndGrades();
        unitsAndGrades.setStudent(receiver.StudentFromUsername(studentUsername));
        unitsAndGrades.setUnitAndGrades(receiver.UnitAndGradesFromStudent(studentUsername));
        return unitsAndGrades;
    }

    @GetMapping("/getAssessments/{unitCode}/{studentUsername}")
    public AssessmentScoreList getAssessments(@PathVariable String unitCode,@PathVariable String studentUsername){
        return receiver.ScoresFromUnit(studentUsername,unitCode);
    }
    
    @GetMapping("/getUnits/{studentUsername}")
    public UnitList getUnits(@PathVariable String studentUsername){
        List<Unit> unitList = receiver.UnitsFromStudent(studentUsername);
        for(int i = 0;i < unitList.size();i++){
            Unit u = unitList.get(i);
            u.setAttendance(receiver.AttendanceFromUnit(studentUsername,u.getCode()));
        }
        Unit[] unitArray = (Unit[]) unitList.toArray(new Unit[unitList.size()]);
        return new UnitList(unitArray);
    }

    @GetMapping("/getAllStudentData/{studentUsername}")
    public StudentData getAllStudentData(@PathVariable String studentUsername){
        return receiver.AllStudentData(studentUsername);
    }

    @GetMapping("/getAssessmentData/{unitCode}/{studentUsername}")
    public AssessmentData getAssessmentData(@PathVariable String unitCode,@PathVariable String studentUsername){
        AssessmentScoreList data = receiver.ScoresFromUnit(studentUsername,unitCode);
        List<String> assessmentNames = new ArrayList<>();
        List<String> assessmentScores = new ArrayList<>();
        for(AssessmentScore a: data.getAssessments()){
            assessmentNames.add(a.getName());
            assessmentScores.add(Float.toString(a.getScore()));
        }
        AssessmentData toReturn = new AssessmentData();
        String[] nameArray = (String[]) assessmentNames.toArray(new String[assessmentNames.size()]);
        String[] scoreArray = (String[]) assessmentScores.toArray(new String[assessmentScores.size()]);
        toReturn.setNames(nameArray);
        toReturn.setScores(scoreArray);
        return toReturn;
    }

}