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
        Unit[] unitArray = (Unit[]) unitList.toArray(new Unit[unitList.size()]);
        return new UnitList(unitArray);
    }

}