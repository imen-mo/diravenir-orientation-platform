package com.diravenir.Entities;

public enum EnglishCertificate {
    IELTS("IELTS"),
    TOEFL("TOEFL"),
    DUOLINGO("Duolingo"),
    OTHER("Other"),
    NONE("None");
    
    private final String displayName;
    
    EnglishCertificate(String displayName) {
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
