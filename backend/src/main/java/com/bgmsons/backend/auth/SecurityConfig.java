package com.bgmsons.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.bgmsons.backend.model.Admin;
import com.bgmsons.backend.repository.AdminRepository;

/**
 * SecurityConfig
 */

@EnableWebSecurity
@Configuration
public class SecurityConfig {

  @Autowired
  private AdminRepository adminRepository;

  @Autowired
  private AuthMiddleware authMiddleware;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{

    return httpSecurity
      .csrf(AbstractHttpConfigurer::disable)
      .authorizeHttpRequests(
          auth -> {
            auth.requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
            .requestMatchers("/api/mail/**","/api/admin/**").permitAll()
            .anyRequest().authenticated();
          }
      )
      .sessionManagement(sessionManagementCustomizer -> sessionManagementCustomizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .authenticationProvider(daoAuthProvider())
      .addFilterBefore(authMiddleware, UsernamePasswordAuthenticationFilter.class)
      .build();
    
  }

  @Bean
  public DaoAuthenticationProvider daoAuthProvider(){
    DaoAuthenticationProvider daoAuthProvider = new DaoAuthenticationProvider();
    daoAuthProvider.setPasswordEncoder(getPasswordEncoder());
    daoAuthProvider.setUserDetailsService(new UserDetailsService() {
		  @Override
		  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByUsername(username);
        if(admin == null){
          throw new UsernameNotFoundException("Admin User Not Found for username: " + username);
        }
        return User.builder()
          .username(admin.getUsername())
          .password(admin.getPassword())
          .build();
      }
    });
    return daoAuthProvider;
  }

  @Bean
  public BCryptPasswordEncoder getPasswordEncoder(){
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager getAuthenticationManager(AuthenticationConfiguration authConfig) throws Exception{
    return authConfig.getAuthenticationManager();
  }
  
}
