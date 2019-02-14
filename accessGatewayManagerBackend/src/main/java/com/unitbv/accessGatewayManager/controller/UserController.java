package com.unitbv.accessGatewayManager.controller;

import com.unitbv.accessGatewayManager.dto.UserDTO;
import com.unitbv.accessGatewayManager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping(path = "/admin/createAccount")
    public void createUserAccount(@RequestBody UserDTO userDTO){
        userService.createUserAccount(userDTO);
    }
}
