package com.jb.controller.admin;

import com.jb.dto.UserDTO;
import com.jb.entity.User;
import com.jb.exception.JobException;
import com.jb.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public String getAllUsers(Model model) throws JobException {
        model.addAttribute("users", userService.findAll());
        return "users";
    }
    @PostMapping("/save")
    public String save(@ModelAttribute UserDTO user) throws JobException {
        userService.registerUser(user);
        return "redirect:/admin/users";
    }
    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        userService.deleteById(id);
        return "redirect:/admin/users";
    }
}
