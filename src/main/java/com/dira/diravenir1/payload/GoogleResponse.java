package com.dira.diravenir1.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class GoogleResponse {
    
    @JsonProperty("success")
    private boolean success;
    
    @JsonProperty("score")
    private Double score;
    
    @JsonProperty("action")
    private String action;
    
    @JsonProperty("challenge_ts")
    private String challengeTs;
    
    @JsonProperty("hostname")
    private String hostname;
    
    @JsonProperty("error-codes")
    private String[] errorCodes;
    
    // Méthodes utilitaires pour reCAPTCHA v3
    public boolean isHighRisk() {
        return score != null && score < 0.5;
    }
    
    public boolean isMediumRisk() {
        return score != null && score >= 0.5 && score < 0.7;
    }
    
    public boolean isLowRisk() {
        return score != null && score >= 0.7;
    }
    
    public String getRiskLevel() {
        if (score == null) return "UNKNOWN";
        if (score < 0.5) return "HIGH";
        if (score < 0.7) return "MEDIUM";
        return "LOW";
    }
}
