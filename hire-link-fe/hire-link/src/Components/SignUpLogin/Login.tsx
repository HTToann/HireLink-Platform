import { Button, LoadingOverlay, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../../Validation/FormValidation";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { errorNotification, successNotification } from "../../Services/Notifications";
import { setToken } from "../../Slices/JwtSlice";
import { loginUser } from "../../Services/AuthService";
import { jwtDecode } from "jwt-decode";


const Login = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const form = {
        email: "",
        password: "",
    }
    const [data, setData] = useState<{ [key: string]: string }>(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>(form);
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();
    const handleChange = (event: any) => {
        setFormError({ ...formError, [event.target.name]: "" });
        setData({ ...data, [event.target.name]: event.target.value });
    }
    const handleSubmit = () => {
        let valid = true, newFormError: { [key: string]: string } = {};
        for (let key in data) {
            newFormError[key] = loginValidation(key, data[key]);
            if (newFormError[key])
                valid = false;
        }
        console.log("Submitting data:", data); // kiểm tra trước khi gửi
        setFormError(newFormError);
        if (valid === true) {
            setLoading(true);
            loginUser(data)
                .then((res) => {
                    successNotification("Login Successful", "Redirecting to home page...");
                    dispatch(setToken(res.token));
                    const decoded = jwtDecode(res.token);
                    console.log("Decoded JWT:", decoded);

                    setTimeout(() => {

                        setLoading(false);
                        navigate("/");
                    }, 1000)
                })
                .catch((err) => {
                    console.log("Register failed:", err.response?.data.errorMessage || err.message);
                    setLoading(false);
                    console.log("err", err);
                    errorNotification("Login Failed", "User not found")

                });
        }
    }
    return <>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'shakeSpeare.6', type: 'bars' }} />
        <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
            <div className="text-2xl text-shakespeare-800 font-semibold">Create Account</div>

            <TextInput value={data.email} name="email"
                error={formError.email}
                onChange={handleChange}
                withAsterisk
                className="text-shakespeare-800"
                leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                label="Email"
                placeholder="Your email"
            />
            <PasswordInput value={data.password} onChange={handleChange}
                error={formError.password}
                name="password"
                withAsterisk
                className="text-shakespeare-800"
                leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                label="Password"
                placeholder="Password"
            />

            <Button loading={loading} onClick={handleSubmit}
                autoContrast variant="filled">Sign in</Button>
            <div className="mx-auto text-mine-shaft-500 font-semibold">
                Don't have an account?{" "}
                <span className="text-shakespeare-700 hover:underline cursor-pointer"
                    onClick={() => { navigate("/sign-up"); setFormError(form); setData(form) }}>
                    Sign Up
                </span>
            </div>
            <div onClick={open} className="text-fountain-blue-500
            hover:underline cursor-pointer 
            text-center">Forget Password</div>
        </div>
        <ResetPassword opened={opened} close={close} />

    </>
}
export default Login;