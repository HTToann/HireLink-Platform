package com.jb.entity.OTP;

public class HtmlOTP {
    public static String getMessageBody(String otp,String name) {
        return  "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "  <meta charset=\"UTF-8\">\n" +
                "  <title>Your OTP Code</title>\n" +
                "  <style>\n" +
                "    body {\n" +
                "      font-family: Arial, sans-serif;\n" +
                "      background-color: #f4f4f4;\n" +
                "      padding: 20px;\n" +
                "      color: #333;\n" +
                "    }\n" +
                "    .container {\n" +
                "      max-width: 600px;\n" +
                "      margin: auto;\n" +
                "      background-color: #fff;\n" +
                "      border-radius: 8px;\n" +
                "      padding: 30px;\n" +
                "      box-shadow: 0 0 10px rgba(0,0,0,0.1);\n" +
                "    }\n" +
                "    .otp {\n" +
                "      font-size: 28px;\n" +
                "      font-weight: bold;\n" +
                "      color: #1a73e8;\n" +
                "      margin: 20px 0;\n" +
                "    }\n" +
                "    .footer {\n" +
                "      margin-top: 30px;\n" +
                "      font-size: 12px;\n" +
                "      color: #888;\n" +
                "    }\n" +
                "  </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "  <div class=\"container\">\n" +
                "    <h2>Hello " + name + " !</h2>\n" +
                "    <p>Thank you for using our service. Use the following OTP code to complete your verification process:</p>\n" +
                "    \n" +
                "    <div class=\"otp\">"+otp+"</div>\n" +
                "    \n" +
                "    <p>This OTP will expire in 10 minutes. If you did not request this, please ignore this email.</p>\n" +
                "    \n" +
                "    <p>Regards,<br>The Support Team</p>\n" +
                "    \n" +
                "    <div class=\"footer\">\n" +
                "      <p>This is an automated email, please do not reply.</p>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "</body>\n" +
                "</html>";
    }
}
