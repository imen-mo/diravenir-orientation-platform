package com.dira.diravenir1.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoginAttemptService {

    private final int MAX_ATTEMPT = 5;
    private ConcurrentHashMap<String, Integer> attemptsCache = new ConcurrentHashMap<>();

    public void loginFailed(String ip) {
        int attempts = attemptsCache.getOrDefault(ip, 0);
        attemptsCache.put(ip, attempts + 1);
    }

    public void loginSucceeded(String ip) {
        attemptsCache.remove(ip);
    }

    public boolean isBlocked(String ip) {
        return attemptsCache.getOrDefault(ip, 0) >= MAX_ATTEMPT;
    }
}
