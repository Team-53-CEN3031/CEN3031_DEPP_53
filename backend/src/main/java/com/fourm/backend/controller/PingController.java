package com.fourm.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PingController {
    @GetMapping("/api")
    public ResponseEntity<String> ping () {
        //ping is used to check if the backend is running
        //literally no other use
        return ResponseEntity.ok("OK");
    }
}
