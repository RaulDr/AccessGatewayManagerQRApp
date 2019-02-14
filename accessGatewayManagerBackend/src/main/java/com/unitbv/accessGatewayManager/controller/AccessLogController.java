package com.unitbv.accessGatewayManager.controller;

import com.unitbv.accessGatewayManager.dto.AccessLogDTO;
import com.unitbv.accessGatewayManager.service.AccessLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class AccessLogController{

    @Autowired
    private AccessLogService accessLogService;

    @GetMapping(path = "/admin/accessLogs")
    public List<AccessLogDTO> getAccessLogs(){
        return accessLogService.getAccessLogs();
    }
}
