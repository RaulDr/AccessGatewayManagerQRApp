package com.unitbv.accessGatewayManager.security.repo;


import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.unitbv.accessGatewayManager.security.model.SecurityUser;

public interface SecurityUserRepository extends JpaRepository<SecurityUser, Long> {

  Optional<SecurityUser> findByUsername(String username);

}
