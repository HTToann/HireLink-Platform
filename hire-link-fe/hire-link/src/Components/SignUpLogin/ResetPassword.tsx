import { Button, Modal, PasswordInput, PinInput, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { changePassword, sendOtp, verifyOtp } from "../../Services/UserService";
import { signUpValidation } from "../../Validation/FormValidation";
import { useInterval } from "@mantine/hooks";
import { errorNotification, successNotification } from "../../Services/Notifications";
const ResetPassword = (props: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passErr, setPassErr] = useState("");
    const [otpSent, setOptSent] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [verified, setVerified] = useState(false);
    const [resendLoader, setResendLoader] = useState(false);
    const [seconds, setSeconds] = useState(60);
    const interval = useInterval(() => {
        if (seconds === 0) {
            setResendLoader(false);
            setSeconds(60);
            interval.stop();
        } else {
            setSeconds((s) => s - 1);
        }
    }, 1000);
    const handleSendOtp = async () => {
        setOtpSending(true);
        sendOtp(email).then((res) => {
            console.log(res);
            successNotification("OTP Sent Successfully", "Please check your email!!");
            setOptSent(true);
            setOtpSending(false);
            setResendLoader(true);
            interval.start();
        }).catch((err) => {
            console.log(err);
            setOtpSending(false);
            errorNotification("OTP Sending Failed", err.response.data.errorMessage);

        })
    };
    const handleVerifyOtp = (otp: string) => {
        verifyOtp(email, otp).then((res) => {
            console.log(res);
            successNotification("OTP Verified", "Enter new password to reset.");
            setVerified(true);
        }).catch((err) => {
            console.log(err);
            errorNotification("OTP Verification Failed", err.response.data.errorMessage);
        })
    }
    const resendOtp = () => {
        if (resendLoader)
            return;
        handleSendOtp();
    }
    const changeEmail = () => {
        setOptSent(false);
        setResendLoader(false);
        setSeconds(60);
        setVerified(false);
        interval.stop();
    }
    const handleResetPassword = () => {
        const err = signUpValidation("password", password);
        setPassErr(err);

        if (err) {
            return;
        }
        changePassword(email, password).then((res) => {
            console.log(res);
            successNotification("Change Password Successfully", "Login with new password");
            props.close();
        }).catch((err) => {
            console.log(err);
            errorNotification("Reset Password Failed", err.response.data.errorMessage);

        })
    }
    return (
        <Modal
            opened={props.opened}
            onClose={props.close}
            title="Reset Password"
        >
            <div className="flex flex-col gap-6">
                <TextInput
                    value={email}
                    name="email"
                    size="md"
                    onChange={(e) => setEmail(e.target.value)}
                    leftSection={<IconAt size={16} />}
                    label="Email"
                    withAsterisk
                    placeholder="Your email"
                    rightSection={
                        <Button
                            loading={otpSending && !otpSent}
                            disabled={email === "" || otpSent}
                            className="mr-1"
                            size="xs"
                            variant="filled"
                            onClick={handleSendOtp}
                            autoContrast
                        >
                            Send OTP
                        </Button>
                    }
                    rightSectionWidth="xl"
                />
                {
                    otpSent && <PinInput onComplete={handleVerifyOtp} gap="lg" size="md" className="mx-auto" length={6} type="number" />
                }
                {
                    otpSent && !verified && <div className="flex gap-2">
                        <Button loading={otpSending} color="brightSun.4" onClick={resendOtp}
                            autoContrast variant="light">{resendLoader ? seconds : "Resend"}</Button>
                        <Button onClick={changeEmail} autoContrast variant="filled">Change Email</Button>
                    </div>
                }
                {
                    verified && <PasswordInput value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPassErr(signUpValidation("password", e.target.value))
                        }}
                        error={passErr}
                        name="password"
                        withAsterisk
                        leftSection={<IconLock size={16} />}
                        label="Password"
                        placeholder="Password"
                    />
                }
                {
                    verified && <Button onClick={handleResetPassword}
                        disabled={!!passErr || !password}
                        autoContrast variant="filled">Change Password</Button>
                }
            </div>
        </Modal>
    );
};

export default ResetPassword;