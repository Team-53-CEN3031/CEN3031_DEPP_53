package com.fourm.backend.model;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class QuizScore {
    @EmbeddedId
    private QuizKey quizKey;

    @Column(name = "total_score")
    private double totalScore;

    @Column(name = "electricity_score")
    private double electricityScore;

    @Column(name = "gas_score")
    private double gasScore;

    @Column(name = "oil_score")
    private double oilScore;

    @Column(name = "miles_driven")
    private double milesDriven;

    @Column(name = "short_flight")
    private int shortFlights;

    @Column(name = "long_flight")
    private int longFlights;

    @Column(name = "recycle_paper")
    private boolean recyclePaper;

    @Column(name = "recycle_metal")
    private boolean recycleMetal;

    public QuizKey getQuizKey() {
        return quizKey;
    }

    public void setQuizKey(QuizKey quizKey) {
        this.quizKey = quizKey;
    }

    public double getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(double totalScore) {
        this.totalScore = totalScore;
    }

    public double getElectricityScore() {
        return electricityScore;
    }

    public void setElectricityScore(double electricityScore) {
        this.electricityScore = electricityScore;
    }

    public double getGasScore() {
        return gasScore;
    }

    public void setGasScore(double gasScore) {
        this.gasScore = gasScore;
    }

    public double getOilScore() {
        return oilScore;
    }

    public void setOilScore(double oilScore) {
        this.oilScore = oilScore;
    }

    public double getMilesDriven() {
        return milesDriven;
    }

    public void setMilesDriven(double milesDriven) {
        this.milesDriven = milesDriven;
    }

    public double getShortFlights() {
        return shortFlights;
    }

    public void setShortFlights(double shortFlightScore) {
        this.shortFlights = (int) shortFlightScore;
    }

    public double getLongFlights() {
        return longFlights;
    }

    public void setLongFlights(double longFlightScore) {
        this.longFlights = (int) longFlightScore;
    }

    public boolean isRecyclePaper() {
        return recyclePaper;
    }

    public void setRecyclePaper(boolean recyclePaper) {
        this.recyclePaper = recyclePaper;
    }

    public boolean isRecycleMetal() {
        return recycleMetal;
    }

    public void setRecycleMetal(boolean recycleMetal) {
        this.recycleMetal = recycleMetal;
    }

    public void calculateFinalScore() {
        double score = 0;
        score += electricityScore*105;
        score += gasScore*105;
        score += oilScore*113;
        score += milesDriven * 0.79;
        score += shortFlights * 1100;
        score += longFlights * 4400;
        if (!recyclePaper) {
            score += 184;
        }
        if (!recycleMetal) {
            score += 166;
        }
        totalScore = score;
    }
}

