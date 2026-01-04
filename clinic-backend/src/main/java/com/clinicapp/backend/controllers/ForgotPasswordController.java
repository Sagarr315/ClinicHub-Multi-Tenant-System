package com.clinicapp.backend.controllers;

import com.clinicapp.backend.dto.ForgotPasswordRequestDTO;
import com.clinicapp.backend.dto.VerifyOtpRequestDTO;
import com.clinicapp.backend.dto.ResetPasswordRequestDTO;
import com.clinicapp.backend.services.ForgotPasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class ForgotPasswordController {

    @Autowired
    private ForgotPasswordService service;

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody ForgotPasswordRequestDTO dto) {
        return service.forgotPassword(dto);
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody VerifyOtpRequestDTO dto) {
        return service.verifyOtp(dto);
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody ResetPasswordRequestDTO dto) {
        return service.resetPassword(dto);
    }
}
