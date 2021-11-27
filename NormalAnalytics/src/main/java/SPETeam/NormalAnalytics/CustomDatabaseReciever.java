package SPETeam.NormalAnalytics;

import SPETeam.NormalAnalytics.Database.TutorRepository;
import SPETeam.NormalAnalytics.Database.Tutors;
import SPETeam.NormalAnalytics.entity.AssessmentScore;
import SPETeam.NormalAnalytics.entity.Student;
import SPETeam.NormalAnalytics.entity.Unit;
import SPETeam.NormalAnalytics.entity.User;
import org.hibernate.boot.model.relational.Database;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Primary
@Component("CustomDatabaseReceiver")
public class CustomDatabaseReciever implements IDatabaseReceiver {

    @Autowired
    TutorRepository repo;

    @Override
    public boolean VerifyLogin(String name,String password){
        Optional<Tutors> users = repo.findByUsername(name);
        if(users.isEmpty()) return false;
        if(users.get().getPassword().equals(password)){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public List<Student> StudentsFromTutor(String tutorUsername) {
        return null;
    }

    @Override
    public List<AssessmentScore> ScoresFromUnit(String studentUsername, String unitCode) {
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
}
