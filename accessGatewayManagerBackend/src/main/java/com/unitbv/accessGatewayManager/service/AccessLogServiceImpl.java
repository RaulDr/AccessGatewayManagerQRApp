package com.unitbv.accessGatewayManager.service;

import com.unitbv.accessGatewayManager.util.AccessLogUtil;
import com.unitbv.accessGatewayManager.dao.AccessLogRepo;
import com.unitbv.accessGatewayManager.dto.AccessLogDTO;
import com.unitbv.accessGatewayManager.dto.AccessLogFilterData;
import com.unitbv.accessGatewayManager.model.AccessLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AccessLogServiceImpl implements AccessLogService{

    @Autowired
    private AccessLogRepo accessLogRepo;

    @Override
    public List<AccessLogDTO> getAccessLogs() {
        return accessLogRepo.findAll().stream().map(accessLog -> adaptAccessLogToAccessLogDto(accessLog)).collect(Collectors.toList());
    }

    @Override
    public List<AccessLogDTO> getAccessLogsForUser(Long idUser) {
        return accessLogRepo.findByIdUserOrderByOutTimestampAsc(idUser).stream().map(accessLog -> adaptAccessLogToAccessLogDto(accessLog)).collect(Collectors.toList());
    }

    @Override
    public Optional<AccessLogDTO> getLAccessLogForUserForToday(Long idUser) {
        AccessLogUtil accessLogUtil = new AccessLogUtil(accessLogRepo);
        if (accessLogUtil.getAccessLogForToday(idUser).isPresent()) {
            return Optional.of(adaptAccessLogToAccessLogDto(accessLogUtil.getAccessLogForToday(idUser).get()));
        }
        return Optional.empty();
    }

    @Override
    public List<AccessLogDTO> getUserFilteredAccessLogs(Long idUser, AccessLogFilterData accessLogFilterData) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
//        List<AccessLog> accessLogs = accessLogRepo.findUsersLogBetweenTwoTimestaps(idUser, LocalDateTime.parse(accessLogFilterData.getInTimestamp(), formatter),
//                LocalDateTime.parse(accessLogFilterData.getOutTimestamp(), formatter));
//        //TODO: Whyyyy???!!! Ask about writing one line
//        return accessLogs.stream()
//                .map(accessLog -> adaptAccessLogToAccessLogDto(accessLog)).collect(Collectors.toList());

        return accessLogRepo.findUsersLogBetweenTwoTimestaps(idUser, LocalDateTime.parse(accessLogFilterData.getInTimestamp(), formatter),
                LocalDateTime.parse(accessLogFilterData.getOutTimestamp(), formatter))
                .stream().map(accessLog -> adaptAccessLogToAccessLogDto(accessLog)).collect(Collectors.toList());
    }

    private AccessLogDTO adaptAccessLogToAccessLogDto(AccessLog accessLog) {
        return new AccessLogDTO(accessLog.getInTimestamp().format(DateTimeFormatter.ISO_DATE_TIME),
                accessLog.getOutTimestamp().format(DateTimeFormatter.ISO_DATE_TIME));
    }

}
