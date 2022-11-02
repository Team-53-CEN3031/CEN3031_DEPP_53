package com.fourm.backend.controller;

import com.fourm.backend.auth.AuthController;
import com.fourm.backend.model.QuizKey;
import com.fourm.backend.model.QuizPrototype;
import com.fourm.backend.model.QuizScore;
import com.fourm.backend.service.PostService;
import com.fourm.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin
public class QuizController {
    private AuthController authController;
    private QuizService quizService;

    @Autowired
    public QuizController(AuthController authController) {
        this.authController = authController;
    }

    @Autowired
    public void setQuizService(QuizService quizService) {
        this.quizService = quizService;
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
        QuizScore q = new QuizScore();
        QuizKey qk = new QuizKey();
        Long[] tokenData = authController.getJwtTokenData(userToken);
        qk.setUser_id(tokenData[0].intValue());
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
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
