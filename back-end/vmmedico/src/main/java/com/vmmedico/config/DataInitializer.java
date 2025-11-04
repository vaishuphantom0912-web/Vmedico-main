package com.vmmedico.config;

import com.vmmedico.authentication.entity.*;
import com.vmmedico.authentication.enums.Role;
import com.vmmedico.authentication.service.*;
import com.vmmedico.common.Gender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements ApplicationRunner {

    @Autowired
    private UserService userService;
    
    @Autowired
    private LabService labService;
    
    @Autowired
    private PatientService patientService;
    
    @Autowired
    private DoctorService doctorService;
    
    @Autowired
    private HospitalAdminService hospitalAdminService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        initializeDemoData();
    }

    private void initializeDemoData() {
        // Create demo lab user
        if (!userService.usernameExists("lab")) {
            User labUser = User.builder()
                    .username("lab")
                    .email("lab@gmail.com")
                    .phoneNumber("1234567890")
                    .password(passwordEncoder.encode("12345678"))
                    .role(Role.LAB)
                    .build();
            
            User savedLabUser = userService.saveUser(labUser);
            
            Lab lab = Lab.builder()
                    .user(savedLabUser)
                    .labName("Demo Lab")
                    .registrationNumber("REG123456")
                    .licenseNumber("LIC123456")
                    .address("123 Demo Street, Demo City")
                    .phoneNumber("1234567890")
                    .build();
            
            labService.saveLab(lab);
            System.out.println("✅ Demo lab user created - Username: lab, Password: 12345678");
        }

        // Create demo patient user
        if (!userService.usernameExists("patient")) {
            User patientUser = User.builder()
                    .username("patient")
                    .email("patient@gmail.com")
                    .phoneNumber("1234567891")
                    .password(passwordEncoder.encode("12345678"))
                    .role(Role.PATIENT)
                    .build();
            
            User savedPatientUser = userService.saveUser(patientUser);
            
            Patient patient = Patient.builder()
                    .user(savedPatientUser)
                    .name("Demo Patient")
                    .gender(Gender.MALE)
                    .dob("1990-01-01")
                    .address("456 Demo Avenue, Demo City")
                    .bloodGroup("O+")
                    .phoneNumber("1234567891")
                    .emergencyContact("9876543210")
                    .build();
            
            patientService.savePatient(patient);
            System.out.println("✅ Demo patient user created - Username: patient, Password: 12345678");
        }

        // Create demo doctor user
        if (!userService.usernameExists("doctor")) {
            User doctorUser = User.builder()
                    .username("doctor")
                    .email("doctor@gmail.com")
                    .phoneNumber("1234567892")
                    .password(passwordEncoder.encode("12345678"))
                    .role(Role.DOCTOR)
                    .build();
            
            User savedDoctorUser = userService.saveUser(doctorUser);
            
            Doctor doctor = Doctor.builder()
                    .user(savedDoctorUser)
                    .name("Dr. Demo")
                    .gender(Gender.MALE)
                    .dob("1980-01-01")
                    .specialization("General Medicine")
                    .qualification("MBBS")
                    .licenseNumber("DOC123456")
                    .hospitalName("Demo Hospital")
                    .phoneNumber("1234567892")
                    .consultationFee(500.0)
                    .experience(10)
                    .build();
            
            doctorService.saveDoctor(doctor);
            System.out.println("✅ Demo doctor user created - Username: doctor, Password: 12345678");
        }

        // Create demo hospital admin user
        if (!userService.usernameExists("admin")) {
            User adminUser = User.builder()
                    .username("admin")
                    .email("admin@gmail.com")
                    .phoneNumber("1234567893")
                    .password(passwordEncoder.encode("12345678"))
                    .role(Role.HOSPITAL_ADMIN)
                    .build();
            
            User savedAdminUser = userService.saveUser(adminUser);
            
            HospitalAdmin hospitalAdmin = HospitalAdmin.builder()
                    .user(savedAdminUser)
                    .hospitalName("Demo Hospital")
                    .registrationNumber("HOSP123456")
                    .licenseNumber("HLIC123456")
                    .address("789 Demo Boulevard, Demo City")
                    .phoneNumber("1234567893")
                    .verified(true)
                    .build();
            
            hospitalAdminService.saveHospitalAdmin(hospitalAdmin);
            System.out.println("✅ Demo hospital admin user created - Username: admin, Password: 12345678");
        }
    }
}