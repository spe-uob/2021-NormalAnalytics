package SPETeam.NormalAnalytics.service;

import SPETeam.NormalAnalytics.Database.Tables.TutorTable;
import SPETeam.NormalAnalytics.entity.Responses.ResponseResult;


public interface LoginService {
    ResponseResult login(TutorTable tutor);

    ResponseResult logout();
}
