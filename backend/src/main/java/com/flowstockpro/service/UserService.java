package com.flowstockpro.service;

import com.flowstockpro.dto.UserRequest;
import com.flowstockpro.dto.UserResponse;
import com.flowstockpro.entity.User;

import java.util.List;

public interface UserService {

    User login(String email, String password);

    UserResponse register(UserRequest request);

    List<UserResponse> getAllUsers();

}