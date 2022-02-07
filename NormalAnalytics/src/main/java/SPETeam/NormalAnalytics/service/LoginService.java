package SPETeam.NormalAnalytics.service;

import SPETeam.NormalAnalytics.Database.Tables.TutorTable;
import SPETeam.NormalAnalytics.entity.Responses.ResponseResult;
import SPETeam.NormalAnalytics.entity.Responses.Token;

public interface LoginService {
    ResponseResult login(TutorTable tutor);

}
