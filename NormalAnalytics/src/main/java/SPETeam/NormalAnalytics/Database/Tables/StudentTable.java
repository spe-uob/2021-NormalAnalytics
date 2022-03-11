package SPETeam.NormalAnalytics.Database.Tables;

import SPETeam.NormalAnalytics.Database.IGivesEntity;
import SPETeam.NormalAnalytics.entity.Responses.Student;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity @Table(name="Student")
public class StudentTable implements IGivesEntity<Student> {
    @Id
    @GeneratedValue
    @Column(name="Id") @Getter @Setter
    int id;

    @Column(name="username") @Getter @Setter
    String username;

    @Column(name="firstname") @Getter @Setter
    String firstName;

    @Column(name="surname") @Getter @Setter
    String surname;

    @ManyToOne @JoinColumn(name="tutor_group") @Getter @Setter
    TutorGroupTable tutorGroup;

    @ManyToMany @JoinTable(name="unit_enrollment",
            joinColumns = @JoinColumn(name="student"),
            inverseJoinColumns = @JoinColumn(name = "unit")
    )
    Set<UnitTable> units;

    @Override
    public Student asData(){
        Student student = new Student();
        student.setFirstName(firstName);
        student.setSurname(surname);
        student.setUsername(username);
        return student;
    }
}
