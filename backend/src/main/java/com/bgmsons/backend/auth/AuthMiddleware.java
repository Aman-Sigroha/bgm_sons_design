package com.bgmsons.backend.auth;

import com.bgmsons.backend.model.Admin;
import com.bgmsons.backend.repository.AdminRepository;
import com.bgmsons.backend.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Component
public class AuthMiddleware extends OncePerRequestFilter {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        if (!JwtUtil.isTokenValid(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        String username = JwtUtil.extractUsername(token);
        Optional<Admin> admin = adminRepository.findByUsername(username);
        if(admin.isEmpty()){
            filterChain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken userPassAuthToken = new UsernamePasswordAuthenticationToken(
            User.builder()
            .username(username)
            .password(admin.get().getPassword())
            .authorities(Collections.emptyList())
            .build()
            , null
            , Collections.emptyList()
        );
        SecurityContextHolder.getContext().setAuthentication(userPassAuthToken);

        filterChain.doFilter(request, response);

    }
} 
