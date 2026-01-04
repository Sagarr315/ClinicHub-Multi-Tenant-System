package com.clinicapp.backend.services;

import com.clinicapp.backend.dto.ForgotPasswordRequestDTO;
import com.clinicapp.backend.dto.VerifyOtpRequestDTO;
import com.clinicapp.backend.dto.ResetPasswordRequestDTO;
import com.clinicapp.backend.entity.PasswordResetToken;
import com.clinicapp.backend.entity.Doctor;
import com.clinicapp.backend.entity.Receptionist;
import com.clinicapp.backend.repositories.PasswordResetTokenRepositories;
import com.clinicapp.backend.repositories.DoctorRepository;
import com.clinicapp.backend.repositories.ReceptionistRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@Transactional
public class ForgotPasswordService {

    @Autowired
    private PasswordResetTokenRepositories tokenRepo;

    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private ReceptionistRepository receptionistRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 1. SEND OTP
    public String forgotPassword(ForgotPasswordRequestDTO dto) {
        String email = dto.getEmail();

        String otp = String.valueOf(100000 + new Random().nextInt(900000));

        // delete old OTP first
        tokenRepo.deleteByEmail(email);

        PasswordResetToken token = new PasswordResetToken();
        token.setEmail(email);
        token.setOtp(otp);
        token.setExpiryTime(LocalDateTime.now().plusMinutes(10));

        tokenRepo.save(token);
        emailService.sendOtpEmail(email, otp);

        return "OTP sent";
    }

    // 2. VERIFY OTP
    public String verifyOtp(VerifyOtpRequestDTO dto) {
        String email = dto.getEmail().trim().toLowerCase();
        String otp = dto.getOtp().trim();

        Optional<PasswordResetToken> tokenOpt = tokenRepo.findByEmailAndOtp(email, otp);

        if (tokenOpt.isEmpty()) {
            return "Invalid OTP";
        }

        PasswordResetToken token = tokenOpt.get();

        if (token.getExpiryTime().isBefore(LocalDateTime.now())) {
            tokenRepo.delete(token);
            return "OTP expired";
        }

        tokenRepo.delete(token);
        return "OTP verified";
    }

    // 3. RESET PASSWORD for Doctor/SuperAdmin / Receptionist
    public String resetPassword(ResetPasswordRequestDTO dto) {
        String email = dto.getEmail().trim().toLowerCase();
        String newPassword = dto.getNewPassword();

        // Encode the new password
        String encodedPassword = passwordEncoder.encode(newPassword);

        // Check in doctors table (includes superadmin)
        Doctor doctor = doctorRepo.findByEmail(email).orElse(null);
        if (doctor != null) {
            doctor.setPassword(encodedPassword);
            doctorRepo.save(doctor);
            return "Password Updated successfully";
        }

        // Check in receptionists table
        Receptionist rec = receptionistRepo.findByEmail(email).orElse(null);
        if (rec != null) {
            rec.setPassword(encodedPassword);
            receptionistRepo.save(rec);
            return "Password Updated successfully";
        }

        return "Email not found";
    }
}