import { IconBriefcase, IconMapPin, IconRecharging, IconSearch } from "@tabler/icons-react";

const dropdownData = [
  {
    title: "Job Title",
    icon: IconSearch,
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
    title: "Location",
    icon: IconMapPin,
    options: [
      'Quận 1',
      'Quận 2 (TP Thủ Đức)',
      'Quận 3',
      'Quận 4',
      'Quận 5',
      'Quận 6',
      'Quận 7',
      'Quận 8',
      'Quận 9 (TP Thủ Đức)',
      'Quận 10',
      'Quận 11',
      'Quận 12',
      'Quận Bình Thạnh',
      'Quận Gò Vấp',
      'Quận Phú Nhuận',
      'Quận Tân Bình',
      'Quận Tân Phú',
      'Quận Bình Tân',
      'TP Thủ Đức',
      'Huyện Bình Chánh',
      'Huyện Củ Chi',
      'Huyện Hóc Môn',
      'Huyện Nhà Bè',
      'Huyện Cần Giờ'
    ]
  },
  {
    title: "Experience",
    icon: IconBriefcase,
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
    title: "Job Type",
    icon: IconRecharging,
    options: [
      "Full Time",
      "Part Time",
      "Internship",
      "Freelance",
      "Contract"
    ]
  }
];

const jobList = [
  {
    jobTitle: "Product Designer",
    company: "Meta",
    applicants: 25,
    experience: "Entry Level",
    jobType: "Full-Time",
    location: "New York",
    package: "32 USD",
    postedDaysAgo: 12,
    description: "Meta is seeking a Product Designer to join our team. You'll be working on designing user-centric interfaces for our blockchain wallet platform. This is an excellent opportunity for entry-level designers to grow their skills in a dynamic environment."
  },
  {
    jobTitle: "Sr. UX Designer",
    company: "Netflix",
    applicants: 14,
    experience: "Expert",
    jobType: "Part-Time",
    location: "San Francisco",
    package: "40 USD",
    postedDaysAgo: 5,
    description: "Netflix is looking for a Sr. UX Designer to enhance our user experience on streaming platforms. Ideal candidates will have extensive experience in user research and interaction design, helping us to deliver engaging content to our global audience."
  },
  {
    jobTitle: "Product Designer",
    company: "Microsoft",
    applicants: 58,
    experience: "Intermediate",
    jobType: "Full-Time",
    location: "Remote",
    package: "35 USD",
    postedDaysAgo: 4,
    description: "Join Microsoft as a Product Designer and contribute to our new Lightspeed LA studio. We're looking for designers who can create intuitive and compelling gaming experiences. This is a remote position, offering flexibility and the opportunity to work with a leading technology company."
  },
  {
    jobTitle: "Product Designer",
    company: "Adobe",
    applicants: 23,
    experience: "Expert",
    jobType: "Part-Time",
    location: "Toronto",
    package: "33 USD",
    postedDaysAgo: 22,
    description: "Adobe is seeking a part-time Product Designer to help us enhance our user experience. You will work closely with our team to design features that make our platform more engaging and user-friendly. This role is perfect for experienced designers looking for flexible work hours."
  },
  {
    jobTitle: "Backend Developer",
    company: "Google",
    applicants: 21,
    experience: "Entry Level",
    jobType: "Full-Time",
    location: "Bangalore",
    package: "38 USD",
    postedDaysAgo: 8,
    description: "Google is hiring a Backend Developer to join our team in Bangalore. You'll be responsible for developing scalable backend systems that power our services. This role requires strong problem-solving skills and experience with modern backend technologies."
  },
  {
    jobTitle: "SMM Manager",
    company: "Spotify",
    applicants: 73,
    experience: "Intermediate",
    jobType: "Full-Time",
    location: "Delhi",
    package: "34 USD",
    postedDaysAgo: 8,
    description: "Spotify is looking for an SMM Manager to lead our social media marketing efforts in Delhi. You will create and manage campaigns to promote our music streaming service, engage with our audience, and drive growth. This role is ideal for creative marketers with a passion for music."
  },
  {
    jobTitle: "Frontend Developer",
    company: "Amazon",
    applicants: 50,
    experience: "Intermediate",
    jobType: "Full-Time",
    location: "Seattle",
    package: "36 USD",
    postedDaysAgo: 10,
    description: "Amazon is looking for a Frontend Developer to build and maintain our customer-facing applications. You will work with a dynamic team to create seamless and responsive web applications."
  },
  {
    jobTitle: "iOS Developer",
    company: "Apple",
    applicants: 30,
    experience: "Expert",
    jobType: "Full-Time",
    location: "Cupertino",
    package: "42 USD",
    postedDaysAgo: 7,
    description: "Apple is seeking an iOS Developer to join our team in Cupertino. You will work on developing cutting-edge applications for iOS devices, ensuring high performance and an exceptional user experience."
  }
];

export { dropdownData, jobList };