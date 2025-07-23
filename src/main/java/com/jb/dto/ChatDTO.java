package com.jb.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatDTO {
    private Long id;
    private String name;
    private String email;
    private Long profileId;
    private String avatarUrl;
}