package com.diravenir.Entities;

public enum GuarantorRelationship {
    SELF("Self"),
    PARENT("Parent"),
    GUARDIAN("Guardian"),
    FRIEND("Friend"),
    COMPANY("Company"),
    GOVERNMENT("Government");
    
    private final String displayName;
    
    GuarantorRelationship(String displayName) {
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
