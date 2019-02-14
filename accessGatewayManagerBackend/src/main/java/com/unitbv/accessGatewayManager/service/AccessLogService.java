package com.unitbv.accessGatewayManager.service;

import com.unitbv.accessGatewayManager.dto.AccessLogDTO;
import com.unitbv.accessGatewayManager.dto.AccessLogFilterData;

import java.util.List;
import java.util.Optional;

public interface AccessLogService {
    List<AccessLogDTO> getAccessLogs();

    List<AccessLogDTO> getAccessLogsForUser(Long idUser);

    Optional<AccessLogDTO> getLAccessLogForUserForToday(Long idUser);

    List<AccessLogDTO> getUserFilteredAccessLogs(Long idUser, AccessLogFilterData accessLogFilterData);
}
