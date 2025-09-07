package com.jb.controller.admin;

import com.jb.dto.JobDTO;
import com.jb.enums.AccountType;
import com.jb.exception.JobException;
import com.jb.repository.JobRepository;
import com.jb.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.util.List;

@Controller

@RequestMapping("/admin/stats")
public class StatsController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JobRepository jobRepository;

    @GetMapping
    public String stats(Model model) {
        long employerCount = userRepository.countByAccountType(AccountType.EMPLOYER);
        long applicantCount = userRepository.countByAccountType(AccountType.APPLICANT);

        long totalJobs = jobRepository.count();
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusWeeks(1);
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);

        long jobsThisWeek = jobRepository.countByPostTimeAfter(oneWeekAgo);
        long jobsThisMonth = jobRepository.countByPostTimeAfter(oneMonthAgo);


        model.addAttribute("employerCount", employerCount);
        model.addAttribute("applicantCount", applicantCount);
        model.addAttribute("totalJobs", totalJobs);
        model.addAttribute("jobsThisWeek", jobsThisWeek);
        model.addAttribute("jobsThisMonth", jobsThisMonth);

        return "stats";
    }
}
