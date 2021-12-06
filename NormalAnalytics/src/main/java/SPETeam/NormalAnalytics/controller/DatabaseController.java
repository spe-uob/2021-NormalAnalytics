package SPETeam.NormalAnalytics.controller;

import SPETeam.NormalAnalytics.IDatabaseReceiver;
import SPETeam.NormalAnalytics.entity.Requests.UnitCodeAndStudent;
import SPETeam.NormalAnalytics.entity.Requests.TutorStudentRequest;
import SPETeam.NormalAnalytics.entity.Requests.UnitAverageRequest;
import SPETeam.NormalAnalytics.entity.Requests.UnitRequest;
import SPETeam.NormalAnalytics.entity.Responses.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("database")
public class DatabaseController {
    @Autowired
    IDatabaseReceiver receiver;

    @GetMapping("/getUnitAverage")
    public JSONValue unitMedian(@RequestBody UnitAverageRequest request){
        return new JSONValue(receiver.UnitMedianForAssessment(request.getUnitCode(),request.getAssessmentName()));
    }

    @GetMapping("/getAttendance")
    public JSONValue unitAttendance(@RequestBody UnitCodeAndStudent request){
        return new JSONValue(receiver.AttendanceFromUnit(request.getStudentUsername(),request.getUnitCode()));
    }

    @GetMapping("/getStudents")
    public StudentList getStudents(@RequestBody TutorStudentRequest request){
        List<Student> studentList = receiver.StudentsFromTutor(request.getTutorUsername());
        Student[] studentArray = (Student[]) studentList.toArray(new Student[studentList.size()]);
        return new StudentList(studentArray);
    }

    @GetMapping("/getAssessments")
    public AssessmentScoreList getAssessments(@RequestBody UnitCodeAndStudent request){
        List<AssessmentScore> scoreList = receiver.ScoresFromUnit(request.getStudentUsername(),request.getUnitCode());
        AssessmentScore[] scoreArray = (AssessmentScore[]) scoreList.toArray(new AssessmentScore[scoreList.size()]);
        return new AssessmentScoreList(scoreArray);
    }

    @GetMapping("/getUnits")
    public UnitList getUnits(@RequestBody UnitRequest request){
        List<Unit> unitList = receiver.UnitsFromStudent(request.getStudentUsername());
        Unit[] unitArray = (Unit[]) unitList.toArray(new Unit[unitList.size()]);
        return new UnitList(unitArray);
    }

}
