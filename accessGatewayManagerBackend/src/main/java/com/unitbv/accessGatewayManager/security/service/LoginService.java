package com.unitbv.accessGatewayManager.security.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.unitbv.accessGatewayManager.security.model.JwtUser;

public interface LoginService extends UserDetailsService {

  JwtUser loadUserByUsername(String username) throws UsernameNotFoundException;
}
