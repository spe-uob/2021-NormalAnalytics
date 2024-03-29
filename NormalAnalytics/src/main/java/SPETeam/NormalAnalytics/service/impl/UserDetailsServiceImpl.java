package SPETeam.NormalAnalytics.service.impl;

import SPETeam.NormalAnalytics.Database.Repositories.TutorRepository;
import SPETeam.NormalAnalytics.Database.Tables.TutorTable;
import SPETeam.NormalAnalytics.entity.Requests.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Objects;
import java.util.Optional;

/**
 * This class implements UserDetailsService
 * Query user information from the database based on username
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Resource
    TutorRepository tutorRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //Query user information from the database based on username
        Optional<TutorTable> tutorTable = tutorRepository.findByUsername(username);
        //If the data is not queried, an alert is given by throwing an exception
        if (tutorTable.isEmpty()){
            throw new UsernameNotFoundException("Username does not exist");
        }

        //TODO Query permission information by user Add to LoginUser
        
        //Wrapped into a UserDetails object to return
        return new User(tutorTable.get());
    }
}