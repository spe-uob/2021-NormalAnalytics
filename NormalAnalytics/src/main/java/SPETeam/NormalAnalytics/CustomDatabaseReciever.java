package SPETeam.NormalAnalytics;

import SPETeam.NormalAnalytics.Database.Repositories.*;
import SPETeam.NormalAnalytics.Database.Tables.*;
import SPETeam.NormalAnalytics.entity.Responses.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.util.*;

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
    @Autowired
    TutorGroupRepository groupRepository;

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
        List<TutorGroupTable> groups = groupRepository.findTutorGroupTableByTutorUsername(tutorUsername);
        List<StudentTable> tutees = new ArrayList<>();
        for(TutorGroupTable t : groups){
            tutees.addAll(studentRepository.findStudentByTutorGroup(t));
        }
        List<Student> jsonTutees = new ArrayList<>();
        for(StudentTable t : tutees){
            jsonTutees.add(t.asData());
        }
        return jsonTutees;
    }

    @Override
    public AssessmentScoreList ScoresFromUnit(String studentUsername, String unitCode) {
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
                AssessmentScore[] scoreArray = (AssessmentScore[]) scoresToReturn.toArray(new AssessmentScore[scoresToReturn.size()]);
                return new AssessmentScoreList(scoreArray);
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
        AttendancePoint[] attendancePoints = getAttendance(studentUsername,unitCode);
        return attendancePoints[attendancePoints.length - 1].getTotalAttendance();
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

    @Override
    public Student StudentFromUsername(String studentUsername){
        Optional<StudentTable> student = studentRepository.findStudentTableByUsername(studentUsername);
        if(student.isEmpty()){
            return null;
        }else{
            return student.get().asData();
        }
    }

    @Override
    public StudentData AllStudentData(String studentUsername){
        StudentData data = new StudentData();
        Student student = StudentFromUsername(studentUsername);
        data.setFirstName(student.getFirstName());
        data.setSurname(student.getSurname());
        List<UnitData> unitData = new ArrayList<>();
        for(Unit u : UnitsFromStudent(studentUsername)){
            UnitData unit = new UnitData();
            unit.setName(u.getName());
            unit.setCode(u.getCode());
            unit.setAttendances(getAttendance(studentUsername,u.getCode()));
            unit.setScores(ScoresFromUnit(studentUsername,u.getCode()).getAssessments());
            unit.setOverallAttendance(unit.getAttendances()[unit.getAttendances().length-1].getTotalAttendance());
            unitData.add(unit);
        }
        data.setUnitData((UnitData[]) unitData.toArray(new UnitData[unitData.size()]));
        return data;
    }

    private AttendancePoint[] getAttendance(String username,String unitCode){
        StudentTable student = studentRepository.findStudentTableByUsername(username).get();
        UnitTable unit = unitRepository.findUnitTableByCode(unitCode).get();
        List<AttendanceTable> attendance =
                attendanceRepository.findAttendanceTablesByStudentAndUnit(student,unit);

        attendance.sort(new Comparator<AttendanceTable>() {
            @Override
            public int compare(AttendanceTable o1, AttendanceTable o2) {
                if(o1.getId().getDate().before(o2.getId().getDate())) return -1;
                else if(o1.getId().getDate().after(o2.getId().getDate())) return 1;
                else return 0;
            }
        });

        List<AttendancePoint> attendancePoints = new ArrayList<>();
        int meetingsAttended = 0;
        for(AttendanceTable a : attendance){
            AttendancePoint newPoint = a.asData();
            if(newPoint.isPresent()) meetingsAttended += 1;
            newPoint.setTotalAttendance(100 * (float)meetingsAttended / (float)(attendancePoints.size() + 1));
            attendancePoints.add(newPoint);
        }
        return ((AttendancePoint[]) attendancePoints.toArray(new AttendancePoint[attendancePoints.size()]));
    }

    public UnitAndGrades[] UnitAndGradesFromStudent(String studentUsername){
        List<Unit> units = UnitsFromStudent(studentUsername);
        List<UnitAndGrades> unitAndGradesList = new ArrayList<>();
        for(Unit u: units){
            UnitAndGrades unitAndGrades = new UnitAndGrades();
            unitAndGrades.setUnit(u);
            unitAndGrades.setScoreList(ScoresFromUnit(studentUsername,u.getCode()));
            unitAndGradesList.add(unitAndGrades);
        }
        return ((UnitAndGrades[]) unitAndGradesList.toArray(new UnitAndGrades[unitAndGradesList.size()]));
    }


}
