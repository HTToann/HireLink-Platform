import { Icon24Hours, IconAnchor, IconArrowLeft } from "@tabler/icons-react";
import SignUp from "../Components/SignUpLogin/SignUp";
import Login from "../Components/SignUpLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

const SignUpPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return <div className="min-h-[90vh] 
    bg-shakespeare-100 font-['poppins'] overflow-hidden">
        <Button color="shakeSpeare.9" my="md" className="!absolute left-5 z-10"
            onClick={() => navigate("/")} leftSection={<IconArrowLeft
                size={20} />} variant="light">Home</Button>
        <div className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 flex
        [&>*]:flex-shrink-0 ${location.pathname == '/sign-up' ? '-translate-x-1/2' : 'translate-x-0'}`}
        >
            <Login />
            <div className={`${location.pathname == "/sign-up" ? "rounded-r-[200px]" : "rounded-l-[200px]"}
            transition-all ease-in-out duration-1000 
            w-1/2 h-full bg-shakespeare-400 flex items-center gap-5 justify-center flex-col`}>
                <div className="flex gap-1 items-center text-fountain-blue-800">
                    <Icon24Hours className="h-16 w-16" stroke={2.5} />

                    <div className="text-6xl font-semibold">HireLink</div>
                </div>
                <div className="text-2xl text-mine-shaft-200 font-semibold">
                    Find the made for you
                </div>
            </div>
            <SignUp />
        </div>
    </div >
}

export default SignUpPage;