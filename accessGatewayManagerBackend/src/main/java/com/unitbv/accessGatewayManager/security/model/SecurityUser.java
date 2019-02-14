package com.unitbv.accessGatewayManager.security.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter


@Setter

/**
 * Instantiates a new security user.
 *
 * @param id, the id
 * @param username, the username
 * @param password, the password
 * @param enabled, the enabled
 */
@AllArgsConstructor

/**
 * Instantiates a new security user.
 */
@NoArgsConstructor
@Entity

@ToString
@Table(name = "users")
/**
 * 
 * The SecurityUser Class
 *
 */
public class SecurityUser {
  
  /** The SecurityUser's id. */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  /** The SecurityUser's username. */
  @Column(name = "username")
  private String username;

  /** The SecurityUser's password. */
  @Column(name = "password")
  private String password;

  /** The SecurityUser's enabled status. */
  @Column(name = "enabled")
  private Boolean enabled;
}
