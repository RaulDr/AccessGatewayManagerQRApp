package com.unitbv.accessGatewayManager.controller;

import com.unitbv.accessGatewayManager.dao.UserRepo;
import com.unitbv.accessGatewayManager.model.Gate;
import com.unitbv.accessGatewayManager.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * MainController
 */

@RestController
@RequestMapping("/api")
@Transactional()
public class MainController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping(path = "/hello")
    public String hello() {
        User user = new User();
        user.setUsername("ttttt");
        user.setEnabled(true);
        user.setPassword("blabla");

        userRepo.save(user);

        Gate gate = new Gate();
        gate.setId(new Long(1));
        gate.setName("gate");

        user.setGates(new ArrayList<>(Arrays.asList(gate)));

        userRepo.save(user);

        return "hello";
    }
}