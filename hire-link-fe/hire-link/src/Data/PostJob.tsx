const fields = [
  {
    label: "Job Title",
    placeholder: "Enter Job Title",
    options: [
      "Designer",
      "Developer",
      "Product Manager",
      "Marketing Specialist",
      "Data Analyst",
      "Sales Executive",
      "Content Writer",
      "Customer Support",

      // HR-related roles
      "HR Generalist",
      "HR Manager",
      "Talent Acquisition Specialist",
      "Recruiter",
      "HR Business Partner",
      "Compensation & Benefits Specialist",
      "Training & Development Specialist",
      "HR Administrator",
      "Employee Relations Specialist",
      "Organizational Development Specialist",
      "HR Analyst",
      "HR Assistant",
      "Workforce Planning Specialist",
      "Labor Relations Officer",
      "Payroll Specialist",
      "HR Compliance Officer",
      "Diversity & Inclusion Officer",
      "Head of HR",
      "Chief Human Resources Officer",
      "HR Intern"
    ]
  },
  {
    label: "Company",
    placeholder: "Enter Company Name",
    options: [
      "NaN", // Cho phép không chọn
      "FPT Software",
      "VNG",
      "Viettel",
      "Tiki",
      "Shopee",
      "Grab",
      "MoMo",
      "Haravan",
      "Zalo",
      "NashTech"
    ]
  },
  {
    label: "Experience",
    placeholder: "Enter Experience Level",
    options: [
      "Intern",
      "Fresher",
      "Junior",
      "Middle",
      "Senior",
      "Lead",
      "Manager"
    ]
  },
  {
    label: "Job Type",
    placeholder: "Enter Job Type",
    options: [
      "Full Time",
      "Part Time",
      "Internship",
      "Freelance",
      "Contract"
    ]
  },
  {
    label: "Location",
    placeholder: "Enter Job Location",
    options: [
      "Hà Nội",
      "TP. Hồ Chí Minh",
      "Đà Nẵng",
      "Cần Thơ",
      "Hải Phòng",
      "Bình Dương",
      "Đồng Nai",
      "Huế",
      "Vũng Tàu",
      "Quảng Ninh",
      "Nha Trang",
      "Buôn Ma Thuột"
    ]
  },
  {
    label: "Salary",
    placeholder: "Enter Salary",
    options: [
      "10 LPA",
      "15 LPA",
      "20 LPA",
      "25 LPA",
      "30 LPA",
      "35 LPA",
      "40 LPA",
      "45 LPA"
    ]
  }
];
const content =
  '<h4>About The Job</h4><p>Write description here...</p><h4>Responsibilities</h4><ul><li>Add responsibilities here...</li></ul><h4>Qualifications and Skill Sets</h4><ul><li>Add required qualification and skill set here...</li></ul>';
export { fields, content };