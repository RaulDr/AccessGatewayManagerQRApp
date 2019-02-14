package com.unitbv.accessGatewayManager.dao;

import com.unitbv.accessGatewayManager.model.AccessLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface AccessLogRepo extends JpaRepository<AccessLog, Long> {

    List<AccessLog> findByIdUser(Long id);

    List<AccessLog> findByIdUserOrderByOutTimestampAsc(Long id);

    @Query(nativeQuery = true, value = "SELECT * FROM access_log WHERE access_log.id_user = :idUser AND access_log.in_timestamp > :inTimestamp " +
            "AND access_log.out_timestamp < :outTimestamp")
    List<AccessLog> findUsersLogBetweenTwoTimestaps(@Param("idUser") Long idUser, @Param("inTimestamp") LocalDateTime inTimestamp, @Param("outTimestamp") LocalDateTime outTimestamp);
}
