package com.unitbv.accessGatewayManager.util;

import com.unitbv.accessGatewayManager.dao.AccessLogRepo;
import com.unitbv.accessGatewayManager.model.AccessLog;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public class AccessLogUtil{
    public static LocalDateTime startOfTheDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
    public static LocalDateTime endOfTheDay = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

    private AccessLogRepo accessLogRepo;

    public AccessLogUtil(AccessLogRepo accessLogRepo) {
        this.accessLogRepo = accessLogRepo;
    }

    public Optional<AccessLog> getAccessLogForToday(Long idUser) {

        List<AccessLog> accessLogList = accessLogRepo.findUsersLogBetweenTwoTimestaps(idUser, startOfTheDay, endOfTheDay);
        if (accessLogList.size() > 1) {
            throw new IllegalArgumentException(String.format("Too many accessLogs for today in db for user: %s.", idUser));
        }
        if (accessLogList.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(accessLogList.get(0));
    }
}
