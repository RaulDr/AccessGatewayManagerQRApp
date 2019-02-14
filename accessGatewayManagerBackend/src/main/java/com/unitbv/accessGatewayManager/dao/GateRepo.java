package com.unitbv.accessGatewayManager.dao;

import com.unitbv.accessGatewayManager.model.Gate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GateRepo extends JpaRepository<Gate,Long> {
    Optional<Gate> findByName(String name);
}
