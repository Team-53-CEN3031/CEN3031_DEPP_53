package com.fourm.backend.controller;

import com.fourm.backend.auth.AuthController;
import com.fourm.backend.model.QuizKey;
import com.fourm.backend.model.QuizPrototype;
import com.fourm.backend.model.QuizScore;
import com.fourm.backend.model.UserPerson;
import com.fourm.backend.service.PostService;
import com.fourm.backend.service.QuizService;
import com.fourm.backend.service.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin
public class QuizController {
    private AuthController authController;
    private QuizService quizService;
    private UserService userService;

    @Autowired
    public QuizController(AuthController authController) {
        this.authController = authController;
    }

    @Autowired
    public void setQuizService(QuizService quizService) {
        this.quizService = quizService;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody QuizPrototype quizPrototype) {
        String userToken = quizPrototype.getUserToken();
        if(userToken == null) {
            return new ResponseEntity<>("User token is null", HttpStatus.BAD_REQUEST);
        }
        if(authController.validateJwtToken(userToken).getStatusCode() != HttpStatus.OK){
            return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
        }
        Long[] tokenData = authController.getJwtTokenData(userToken);
        UserPerson userPerson = null;
        List<UserPerson> userPersonList = userService.getAllUsers();
        for(UserPerson u : userPersonList) {
            if(u.getId() == tokenData[0].intValue()) {
                userPerson = u;
                break;
            }
        }
        QuizScore q = new QuizScore();
        QuizKey qk = new QuizKey();
        qk.setUser(userPerson);
        qk.setQuizDate(new java.sql.Timestamp(System.currentTimeMillis()));
        q.setQuizKey(qk);
        q.setElectricityScore(quizPrototype.getElectricityScore());
        q.setGasScore(quizPrototype.getGasScore());
        q.setOilScore(quizPrototype.getOilScore());
        q.setMilesDriven(quizPrototype.getMilesDriven());
        q.setShortFlights(quizPrototype.getShortFlights());
        q.setLongFlights(quizPrototype.getLongFlights());
        q.setRecyclePaper(quizPrototype.isRecyclePaper());
        q.setRecycleMetal(quizPrototype.isRecycleMetal());
        q.calculateFinalScore();

        quizService.saveQuiz(q);

        QuizKey p = q.getQuizKey();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public List<QuizScore> getAll() {
        List<QuizScore> quizScores = quizService.getAllQuizzes();
        for(QuizScore q : quizScores) {
            q.getQuizKey().getUser().setPassword("");
        }
        return quizService.getAllQuizzes();
    }

    @GetMapping("/get/{date}")
    public List<QuizScore> getLeaderboardDate(@PathVariable("date") String date) {
        //date is in format YYYY-MM-DD
        List<QuizScore> quizScores = quizService.getAllQuizzes();
        //convert date to timestamp
        java.sql.Timestamp timestamp;
        try {
            timestamp = java.sql.Timestamp.valueOf(date + " 00:00:00");
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
        //empty list to store results
        List<QuizScore> results = new java.util.ArrayList<>();
        //iterate over all quizzes and add to selected if date matches
        for(QuizScore q : quizScores) {
            //if the date of the quiz (time not included) matches the date given
            if(q.getQuizKey().getQuizDate().toLocalDateTime().toLocalDate().equals(timestamp.toLocalDateTime().toLocalDate())) {
                q.getQuizKey().getUser().setPassword("");
                results.add(q);
            }
        }
        //sort results by totalScore
        results.sort((q1, q2) -> (int) (1000*(q2.getTotalScore() - q1.getTotalScore())));
        //reverse results so that lowest score is first
        java.util.Collections.reverse(results);
        return results;
    }

}
