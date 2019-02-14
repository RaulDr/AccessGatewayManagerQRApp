package com.unitbv.accessGatewayManager.controller;

import com.unitbv.accessGatewayManager.dto.AccessGatewayRequest;
import com.unitbv.accessGatewayManager.dto.AccessGatewayResponse;
import com.unitbv.accessGatewayManager.dto.AccessLogDTO;
import com.unitbv.accessGatewayManager.dto.AccessLogFilterData;
import com.unitbv.accessGatewayManager.service.AccessLogService;
import com.unitbv.accessGatewayManager.service.AccessLogServiceImpl;
import com.unitbv.accessGatewayManager.service.RequestService;
import com.unitbv.accessGatewayManager.service.RequestServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AccessRequestController {

    @Autowired
    private RequestService requestService;
    @Autowired
    private AccessLogService accessLogService;

    @PostMapping(path = "/gateway/access" ,consumes = "application/json", produces = "application/json")
    public AccessGatewayResponse accessRequest(@RequestBody AccessGatewayRequest accessGatewayRequest){

        System.out.println(accessGatewayRequest.getGateName() +"  "+ accessGatewayRequest.getIdUser());
        return requestService.requestAccess(accessGatewayRequest.getGateName(), accessGatewayRequest.getIdUser());
    }

    @GetMapping(path = "gateway/access/log/{idUser}")
    public List<AccessLogDTO> getAccessLogsForUser(@PathVariable("idUser") Long idUser){

        return accessLogService.getAccessLogsForUser(idUser);
    }

    @GetMapping(path = "gateway/access/log/{idUser}/today")
    public Optional<AccessLogDTO> getAccessLogsForUserForToday(@PathVariable("idUser") Long idUser){

        return accessLogService.getLAccessLogForUserForToday(idUser);
    }

    @PostMapping(path = "gateway/access/log/{idUser}/filter", consumes = "application/json", produces = "application/json")
    public List<AccessLogDTO> getAccessLogsForUserForToday(@PathVariable("idUser") Long idUser, @RequestBody AccessLogFilterData accessLogFilterData){

        return accessLogService.getUserFilteredAccessLogs(idUser, accessLogFilterData);
    }
}
