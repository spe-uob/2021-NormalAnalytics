package SPETeam.NormalAnalytics;

import SPETeam.NormalAnalytics.Database.Repositories.*;
import SPETeam.NormalAnalytics.Database.Tables.*;
import SPETeam.NormalAnalytics.entity.AssessmentScore;
import SPETeam.NormalAnalytics.entity.Unit;
import SPETeam.NormalAnalytics.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Primary
@Component("CustomDatabaseReceiver")
public class CustomDatabaseReciever implements IDatabaseReceiver {

    @Autowired
    TutorRepository tutorRepository;
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    UnitRepository unitRepository;
    @Autowired
    AssessmentRepository assessmentRepository;
    @Autowired
    AttendanceRepository attendanceRepository;
    @Autowired
    GradesRepository gradesRepository;

    @Override
    public boolean VerifyLogin(String name,String password){
        Optional<TutorTable> users = tutorRepository.findByUsername(name);
        if(users.isEmpty()) return false;
        if(users.get().getPassword().equals(password)){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public List<Student> StudentsFromTutor(String tutorUsername) {
        List<StudentTable> tutees = studentRepository.findStudentByTutorUsername(tutorUsername);
        System.out.println(tutees);
        List<Student> jsonTutees = new ArrayList<>();
        for(StudentTable t : tutees){
            jsonTutees.add(t.asData());
        }
        return jsonTutees;
    }

    @Override
    public List<AssessmentScore> ScoresFromUnit(String studentUsername, String unitCode) {
        Optional<UnitTable> unit = unitRepository.findUnitTableByCode(unitCode);
        if(unit.isEmpty()){
            return null;
        }else{
            List<AssessmentTable> unitAssessments = assessmentRepository.findAssessmentTablesByUnit(unit.get());
            Optional<StudentTable> student = studentRepository.findStudentTableByUsername(studentUsername);
            if(student.isEmpty()){
                return null;
            }else{
                List<GradeTable> allStudentGrades = gradesRepository.findGradeTablesByStudent(student.get());
                List<AssessmentScore> scoresToReturn = new ArrayList<>();
                for(GradeTable g : allStudentGrades){
                    for(AssessmentTable a : unitAssessments){
                        if(g.getAssessment().getId() == a.getId()){
                            scoresToReturn.add(new AssessmentScore(a.getName(),g.getGrade()));
                        }
                    }
                }
                return scoresToReturn;
            }
        }
    }

    @Override
    public List<Unit> UnitsFromStudent(String studentUsername) {
        Optional<StudentTable> student = studentRepository.findStudentTableByUsername(studentUsername);
        if(studentUsername.isEmpty()){
            return null;
        }else {
            Set<UnitTable> units = unitRepository.findUnitTablesByMembersContaining(student.get());
            List<Unit> unitJsons = new ArrayList<>();
            for(UnitTable u: units){
                unitJsons.add(u.asData());
            }
            return unitJsons;
        }
    }

    @Override
    public float AttendanceFromUnit(String studentUsername, String unitCode) {
        StudentTable student = studentRepository.findStudentTableByUsername(studentUsername).get();
        UnitTable unit = unitRepository.findUnitTableByCode(unitCode).get();
        return attendanceRepository.findById(new AttendanceId(unit.getId(),student.getId())).get().getAttendance();
    }

    @Override
    public float UnitMedianForAssessment(String unitCode, String assessmentName){
        Optional<UnitTable> unit = unitRepository.findUnitTableByCode(unitCode);
        if(unit.isEmpty()){
            return -1;
        }else {
            Optional<AssessmentTable> assessment = assessmentRepository.findAssessmentTableByNameAndUnit(assessmentName, unit.get());
            List<GradeTable> grades = gradesRepository.findGradeTablesByAssessmentOrderByGrade(assessment.get());
            if(grades.size() == 0){
                return -1;
            }else if(grades.size() == 1){
                return grades.get(0).getGrade();
            }else {
                if (grades.size() % 2 == 0) {
                    return (grades.get(grades.size() / 2).getGrade() + grades.get(grades.size() / 2 - 1).getGrade()) / 2;
                }else{
                    return grades.get(grades.size()/2).getGrade();
                }
            }
        }
    }
}
