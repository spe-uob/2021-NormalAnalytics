package SPETeam.NormalAnalytics.entity.Responses;

import lombok.Data;

@Data
public class StudentData {
    private String firstName;
    private String surname;
    private UnitData[] unitData;
}
