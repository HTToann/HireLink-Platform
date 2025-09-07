import { Button, Checkbox, Group, LoadingOverlay, PasswordInput, Radio, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/UserService";
import { signUpValidation } from "../../Validation/FormValidation";
import { errorNotification, successNotification } from "../../Services/Notifications";

const form = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "APPLICANT",
}
const SignUp = () => {
    const [data, setData] = useState<{ [key: string]: string }>(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>(form);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (event: any) => {
        if (typeof event === "string") {
            setData({ ...data, accountType: event });
            return;
        }
        let name = event.target.name;
        let value = event.target.value;

        setData({ ...data, [name]: value });
        setFormError({
            ...formError,
            [name]: signUpValidation(name, value),
        });
        if (name === "password" && data.confirmPassword !== "") {
            let passwordError = signUpValidation(name, value);
            let confirmError = value !== data.confirmPassword ? "Passwords do not match." : "";

            setFormError({
                ...formError,
                password: passwordError,
                confirmPassword: confirmError,
            });
        } else if (name === "confirmPassword") {
            const confirmError = value !== data.password ? "Passwords do not match." : "";
            setFormError({
                ...formError,
                confirmPassword: confirmError,
            });
        } else {
            setFormError({
                ...formError,
                [name]: signUpValidation(name, value),
            });
        }
    };
    const handleSubmit = () => {
        let valid = true, newFormError: { [key: string]: string } = {};
        for (let key in data) {
            if (key === "accountType")
                continue;
            if (key !== "confirmPassword")
                newFormError[key] = signUpValidation(key, data[key]);
            else if (data[key] !== data["password"])
                newFormError[key] = "Passwords do not match."
            if (newFormError[key])
                valid = false;
        }
        setFormError(newFormError)
        if (valid === true) {
            setLoading(true);
            console.log("Submitting data:", data); // kiểm tra trước khi gửi
            registerUser(data)
                .then((res) => {
                    console.log("User registered:", res);
                    setData(form);
                    successNotification("Registered Successfully", "Redirecting to login page...");
                    setTimeout(() => {
                        setLoading(false);
                        navigate("/login");
                    }, 4000)
                })
                .catch((err) => {
                    setLoading(false);
                    console.error("Register failed:", err.response?.data || err.message);
                    errorNotification("Registered Failed", err.response.data.errorMessage)
                });
        }

    }
    return (
        <>
            <LoadingOverlay className="translate-x-1/2"
                visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'shakeSpeare.6', type: 'bars' }} />
            <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
                <div className="text-2xl text-shakespeare-800 font-semibold">Create Account</div>

                <TextInput value={data.name} name="name" onChange={handleChange}
                    error={formError.name}
                    className="text-shakespeare-800"
                    withAsterisk label="Full Name"
                    placeholder="Your name" />
                <TextInput value={data.email} name="email" onChange={handleChange}
                    error={formError.email}
                    className="text-shakespeare-800"
                    withAsterisk
                    leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                    label="Email"
                    placeholder="Your email"
                />
                <PasswordInput value={data.password}
                    error={formError.password}
                    className="text-shakespeare-800"
                    onChange={handleChange} name="password"
                    withAsterisk
                    leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                    label="Password"
                    placeholder="Password"
                />
                <PasswordInput value={data.confirmPassword}
                    error={formError.confirmPassword}
                    className="text-shakespeare-800"
                    onChange={handleChange} name="confirmPassword"
                    withAsterisk
                    leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                    label="Confirm Password"
                    placeholder="Confirm password"
                />
                <Radio.Group
                    value={data.accountType}
                    className="text-shakespeare-800"
                    onChange={handleChange}
                    label="You are?"
                    withAsterisk
                    required
                >
                    <Group mt="xs">
                        <Radio className="py-4 px-6 border-fountain-blue-400
                    rounded-lg has-[:checked]:border-fountain-blue-400
                    has-[:checked]:bg-fountain-blue-400/5
                    hover:bg-fountain-blue-500
                    "
                            autoContrast value="APPLICANT" label="Applicant" />
                        <Radio className="py-4 px-6 border-fountain-blue-400
                    rounded-lg has-[:checked]:border-fountain-blue-400
                    has-[:checked]:bg-fountain-blue-400/5
                    hover:bg-fountain-blue-500
                    "
                            autoContrast value="EMPLOYER" label="Employer" />
                    </Group>
                </Radio.Group>
                {/* <Checkbox
                    autoContrast
                    label={
                        <>
                            I accept{" "}
                            <Anchor>terms & conditions</Anchor>
                        </>
                    }
                /> */}
                <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Sign up</Button>

                <div className="mx-auto text-mine-shaft-500 font-semibold">
                    Have an account?{" "}
                    <span className="text-shakespeare-700 hover:underline cursor-pointer"
                        onClick={() => { navigate("/login"); setFormError(form); setData(form) }}>
                        Login
                    </span>
                </div>
            </div>
        </>
    );
}
export default SignUp;