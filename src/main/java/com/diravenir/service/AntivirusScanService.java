package com.diravenir.service;


import java.io.*;
import org.springframework.stereotype.Service;

@Service
public class AntivirusScanService {

    public boolean isFileClean(File file) {
        try {
            ProcessBuilder pb = new ProcessBuilder("clamscan", file.getAbsolutePath());
            Process process = pb.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.contains("FOUND")) {
                    return false;
                }
            }
            return true;
        } catch (IOException e) {
            return false;
        }
    }
}

