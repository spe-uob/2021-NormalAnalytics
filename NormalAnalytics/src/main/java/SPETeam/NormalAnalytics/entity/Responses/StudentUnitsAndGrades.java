package SPETeam.NormalAnalytics.entity.Responses;

import lombok.Data;

@Data
public class StudentUnitsAndGrades {
    private Student student;
    private UnitAndGrades[] unitAndGrades;
}
