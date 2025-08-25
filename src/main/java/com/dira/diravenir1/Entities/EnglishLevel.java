package com.dira.diravenir1.Entities;

public enum EnglishLevel {
    POOR("Poor"),
    FAIR("Fair"),
    GOOD("Good"),
    VERY_GOOD("Very Good"),
    EXCELLENT("Excellent");
    
    private final String displayName;
    
    EnglishLevel(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
    
    @Override
    public String toString() {
        return displayName;
    }
}
