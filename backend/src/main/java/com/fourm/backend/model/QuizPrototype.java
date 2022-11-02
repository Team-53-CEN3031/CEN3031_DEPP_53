package com.fourm.backend.model;

public class QuizPrototype {

    private String userToken;

    public QuizPrototype() {

    }

    private double electricityScore;

    private double gasScore;

    private double oilScore;

    private double milesDriven;

    private double shortFlights;

    private double longFlights;

    private boolean recyclePaper;

    private boolean recycleMetal;

    public String getUserToken() {
        return userToken;
    }

    public void setUserToken(String userToken) {
        this.userToken = userToken;
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
        this.shortFlights = shortFlightScore;
    }

    public double getLongFlights() {
        return longFlights;
    }

    public void setLongFlights(double longFlightScore) {
        this.longFlights = longFlightScore;
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
}
