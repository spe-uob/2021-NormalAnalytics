package SPETeam.NormalAnalytics.Database.Tables;

import SPETeam.NormalAnalytics.Database.IGivesEntity;
import SPETeam.NormalAnalytics.entity.Responses.Unit;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity @Table(name="Unit")
public class UnitTable implements IGivesEntity<Unit> {
    @Id
    @GeneratedValue @Column(name = "id")
    @Getter @Setter
    int id;

    @Column(name="code")
    @Getter @Setter
    String code;

    @Column(name="name")
    @Getter @Setter
    String name;

    @ManyToMany(mappedBy = "units")
            @Getter
    List<StudentTable> members;

    @Override
    public Unit asData(){
        Unit unit = new Unit();
        unit.setName(name);
        unit.setCode(code);
        return unit;
    }
}
