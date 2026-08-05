package com.flowstockpro.service;

import com.flowstockpro.dto.user.UserRequest;
import com.flowstockpro.dto.user.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    UserResponse getUserById(Long id);

    List<UserResponse> getAllUsers();

    void deleteUser(Long id);
}