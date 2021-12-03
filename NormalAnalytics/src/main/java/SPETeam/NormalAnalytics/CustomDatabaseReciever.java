package SPETeam.NormalAnalytics;

import SPETeam.NormalAnalytics.Database.Repositories.StudentRepository;
import SPETeam.NormalAnalytics.Database.Repositories.UnitRepository;
import SPETeam.NormalAnalytics.Database.Tables.StudentTable;
import SPETeam.NormalAnalytics.Database.Repositories.TutorRepository;
import SPETeam.NormalAnalytics.Database.Tables.TutorTable;
import SPETeam.NormalAnalytics.Database.Tables.UnitTable;
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
        return null;
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
        return 0;
    }

    @Override
    public float UnitMedianForAssessment(String unitCode, String assessmentName) {
        return 0;
    }
}
