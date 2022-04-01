package SPETeam.NormalAnalytics.IntegrationTests;

import SPETeam.NormalAnalytics.Blackboard.BBReceiver;
import SPETeam.NormalAnalytics.Database.Repositories.AssessmentRepository;
import SPETeam.NormalAnalytics.Database.Repositories.GradesRepository;
import SPETeam.NormalAnalytics.Database.Repositories.UnitRepository;
import SPETeam.NormalAnalytics.Database.Tables.AssessmentTable;
import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.ResourceLoader;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.List;

@SpringBootTest
public class ParserTests {
    @Autowired
    BBReceiver bbReceiver;

    @Autowired
    AssessmentRepository assessmentRepo;
    @Autowired
    UnitRepository unitRepo;

    String sep = File.separator;
    String rootPath = "."+sep+"test-blackboard";
    String tutor = "jross";
    String student = "iq20064";
    String unitFile = "COMS20008.html";

    @Test
    void AllParserTests() throws IOException{
        TestFileSystemCreatedIfNotPresent();
        File rootFolder = new File(rootPath);
        TestDatabaseUpdated();
        try {
            FileUtils.deleteDirectory(rootFolder);
        }catch (IOException e){
            System.out.println("Testing error: "+e.getMessage());
        }
        assert !(new File(rootPath).exists());
    }

    void TestFileSystemCreatedIfNotPresent(){
        String path = rootPath+sep+tutor;
        File tutorFolder = new File(path);
        assert !tutorFolder.exists();
        bbReceiver.UpdateDatabase(tutor,rootPath);
        assert tutorFolder.exists();
    }

    //TODO: test for correct score
    void TestDatabaseUpdated() throws IOException{

        String path = rootPath+sep+tutor+sep+student;
        new File(path).mkdirs();
        File testfile = new File(path+sep+unitFile);
        testfile.createNewFile();
        File resourceFile = new ClassPathResource(unitFile).getFile();
        FileUtils.copyFile(resourceFile,testfile);

        bbReceiver.UpdateDatabase(tutor,rootPath);
        List<AssessmentTable> assessments = assessmentRepo.findAssessmentTablesByUnit(unitRepo.findUnitTableByCode("COMS20008").get());
        boolean updated = false;
        for(AssessmentTable a : assessments){
            if(a.getName().equals("While Program Syntax and Semantics Quiz")) {
                updated = true;
                break;
            }
        }
        assert updated;
    }


}
