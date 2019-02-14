package com.unitbv.accessGatewayManager.service;

import com.unitbv.accessGatewayManager.util.AccessLogUtil;
import com.unitbv.accessGatewayManager.dao.AccessLogRepo;
import com.unitbv.accessGatewayManager.dao.UserRepo;
import com.unitbv.accessGatewayManager.dto.AccessGatewayResponse;
import com.unitbv.accessGatewayManager.model.AccessLog;
import com.unitbv.accessGatewayManager.model.Gate;
import com.unitbv.accessGatewayManager.model.User;
import com.unitbv.accessGatewayManager.service.EmailSender.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class RequestServiceImpl implements RequestService{

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AccessLogRepo accessLogRepo;

    @Autowired
    EmailService emailService;

    @Override
    public AccessGatewayResponse requestAccess(String gateName, Long idUser) {
        User user = userRepo.findById(idUser).orElseThrow(() -> new IllegalArgumentException(String.format("User with id %s doesn't exist!", idUser)));
        AccessGatewayResponse accessGatewayResponse;
        if( getGateFromUserByName(user, gateName).isPresent()){
           accessGatewayResponse = setAccessGatewayResponseForTrue(gateName);
           if(gateName.equals("main entrance")) {
               updateAccessLogForUser(idUser);
               //        emailService.sendSimpleMessage("dragoiuraul2009@gmail.com", "Subject", "Test email");
           }
        } else{
            accessGatewayResponse = setAccessGatewayResponseForFalse(gateName);
        }

        return accessGatewayResponse;
    }

    private Optional<Gate> getGateFromUserByName(User user, String gateName){
        return user.getGates().stream().filter( gate -> gate.getName().equals(gateName)).findFirst();
    }

    private void updateAccessLogForUser(Long idUser){
        Optional<AccessLog> accessLogOptional =  new AccessLogUtil(accessLogRepo).getAccessLogForToday(idUser);
        if(accessLogOptional.isPresent()){
            updateAccessLog(accessLogOptional.get());
        } else {
            createAccessLogForToday(idUser);
        }
    }
    private void createAccessLogForToday(Long idUser){
        LocalDateTime localDateTimeNow = LocalDateTime.now();
        AccessLog accessLog = new AccessLog();
        accessLog.setIdUser(idUser);
        accessLog.setInTimestamp(localDateTimeNow);
        accessLog.setOutTimestamp(localDateTimeNow);
        accessLogRepo.save(accessLog);
    }

    private void updateAccessLog(AccessLog accessLog){
        accessLog.setOutTimestamp(LocalDateTime.now());
        accessLogRepo.save(accessLog);
    }

    private AccessGatewayResponse setAccessGatewayResponseForTrue(String gateName){
        return new AccessGatewayResponse(String.format("Access through gate %s is allowed!", gateName), true);
    }

    private AccessGatewayResponse setAccessGatewayResponseForFalse(String gateName){
        return new AccessGatewayResponse(String.format("Access through gate %s is denied!", gateName), false);
    }
}
