package SPETeam.NormalAnalytics;

import SPETeam.NormalAnalytics.Database.TutorRepository;
import SPETeam.NormalAnalytics.Database.Tutors;
import org.hibernate.boot.model.relational.Database;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class CustomDatabaseReciever implements IDatabaseReceiver {

    @Autowired
    TutorRepository repo;

    public String VerifyLogin(String name,String password){
        Optional<Tutors> users = repo.findByUsername(name);
        if(users.isEmpty()) return "User not found";
        if(users.get().getPassword().equals(password)){
            return "Login successful";
        }else{
            return "Incorrect password";
        }
    }
}
