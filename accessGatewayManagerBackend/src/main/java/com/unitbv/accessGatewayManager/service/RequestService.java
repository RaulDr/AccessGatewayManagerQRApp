package com.unitbv.accessGatewayManager.service;

import com.unitbv.accessGatewayManager.dto.AccessGatewayResponse;

public interface RequestService {
    AccessGatewayResponse requestAccess(String gateName, Long idUser);
}
