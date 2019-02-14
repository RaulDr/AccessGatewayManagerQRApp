package com.unitbv.accessGatewayManager.service;

import com.unitbv.accessGatewayManager.dao.UserRepo;
import com.unitbv.accessGatewayManager.dto.UserDTO;
import com.unitbv.accessGatewayManager.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    UserRepo userRepo;

    @Override
    public void createUserAccount(UserDTO userDTO) {
        userRepo.save(convertUserDTOToUser(userDTO));
    }

    private User convertUserDTOToUser(UserDTO userDTO){
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
        user.setEnabled(true);
        user.setAdmin(userDTO.isAdmin());
        return user;
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
