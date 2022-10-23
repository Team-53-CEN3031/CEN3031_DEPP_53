package com.fourm.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
@CrossOrigin
public class PingController {
    @GetMapping("/ping")
    public ResponseEntity<String> ping () {
        //ping is used to check if the backend is running
        //literally no other use
        return ResponseEntity.ok("OK");
    }
}
