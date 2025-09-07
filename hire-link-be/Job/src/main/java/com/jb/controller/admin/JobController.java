package com.jb.controller.admin;

import com.jb.dto.JobDTO;
import com.jb.entity.Job;
import com.jb.exception.JobException;
import com.jb.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin/jobs")
public class JobController {
    private final JobService jobService;

    @GetMapping
    public String getAllJobs(Model model) throws JobException {
        List<JobDTO> jobs = jobService.getAllJobs();
        model.addAttribute("jobs", jobs);
        return "job";
    }
    @GetMapping("/delete/{id}")
    public String deleteJob(@PathVariable("id") Long id, RedirectAttributes redirectAttributes) {
        try {
            jobService.deleteJob(id);
            redirectAttributes.addFlashAttribute("successMessage", "Xóa công việc thành công.");
        } catch (JobException e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Xảy ra lỗi: " + e.getMessage());
        }
        return "redirect:/admin/jobs";
    }
}
