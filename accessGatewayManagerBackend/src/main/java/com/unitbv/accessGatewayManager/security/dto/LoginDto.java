package com.unitbv.accessGatewayManager.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



/**
 * Instantiates a new login dto.
 *
 * @param username, the username
 * @param password, the password
 */
@AllArgsConstructor

/**
 * Instantiates a new login dto.
 */
@NoArgsConstructor
/**
 * 
 * The LoginDto Class
 *
 */
@Getter
@Setter
public class LoginDto {
  
  /** The username. */
  private String username;
  
  /** The password. */
  private String password;
}
