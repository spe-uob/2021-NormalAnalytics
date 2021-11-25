package SPETeam.NormalAnalytics;

import SPETeam.NormalAnalytics.Database.TutorRepository;
import SPETeam.NormalAnalytics.Database.Tutors;
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

    public boolean VerifyLogin(String name,String password){
        Optional<Tutors> users = repo.findByUsername(name);
        if(users.isEmpty()) return false;
        if(users.get().getPassword().equals(password)){
            return true;
        }else{
            return false;
        }
    }
}
