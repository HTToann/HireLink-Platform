import { Burger, Button, Drawer, Indicator } from "@mantine/core";
import { Icon24Hours, IconAnchor, IconBell, IconSettings, IconX } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import NotiMenu from "./NotiMenu";
import { useEffect } from "react";
import { setUser } from "../../Slices/UserSlice";
import { jwtDecode } from "jwt-decode";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import { setupResponseInterceptor } from "../Interceptor/AxiosInterceptor";
import { useDisclosure } from "@mantine/hooks";
import { isTokenExpired } from "../../Services/Utilities";
import { persistor } from '../../Store';
import { errorNotification } from "../../Services/Notifications";
const links = [
    { name: "Find Jobs", url: "/find-jobs" },
    { name: "Find Talent", url: "/find-talent" },
    { name: "Post Job", url: "/post-job/0" },
    { name: "Posted Job", url: "/posted-job/0" },
    { name: "Job History", url: "/job-history" },
];
const Header = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const token = useSelector((state: any) => state.token);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && token !== "null" && token.split(".").length === 3) {
            try {
                const decoded = jwtDecode(token);
                dispatch(setUser({ ...decoded, email: decoded.sub }));
                setupResponseInterceptor(navigate);
            } catch (err) {
                console.error("Token decode error:", err);
                localStorage.removeItem("token");
            }
        } else {
            localStorage.removeItem("token"); // Token rác
        }
    }, [navigate, dispatch]);
    useEffect(() => {
        if (user?.profileId) {
            getProfile(user.profileId)
                .then((res) => dispatch(setProfile(res)))
                .catch((err) => console.error("Lỗi lấy profile:", err));
        }
    }, [user]);

    return (
        <div className="w-full bg-shakespeare-100 px-6 text-white h-28 flex justify-between items-center font-['poppins']">
            <div className="flex gap-1 items-center text-fountain-blue-800">
                <Icon24Hours className="h-8 w-8" stroke={2.5} />
                <Link to="/" className="text-3xl font-semibold">HireLink</Link>
            </div>

            {NavLinks()}

            <div className="flex gap-3 items-center">
                {user ? (
                    <>
                        <ProfileMenu />
                        <NotiMenu />
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-shakespeare-300 hover:text-fountain-blue-900">
                            <Button color="fountainBlue.4" variant="subtle">Login</Button>
                        </Link>
                        <Link to="/sign-up" className="text-shakespeare-700 hover:text-fountain-blue-900">
                            <Button color="fountainBlue.7" variant="light">Sign Up</Button>
                        </Link>
                    </>
                )}

                {/* <Burger className="bs:hidden"
                    opened={opened} onClick={open} aria-label="Toggle navigation" />
                <Drawer size="xs"
                    overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                    position="right"
                    opened={opened}
                    onClose={close}
                    closeButtonProps={{ icon: <IconX size={30} /> }}
                >
                    <div className="flex flex-col gap-6 items-center">
                        {
                            links.map((link, index) => (
                                <div
                                    key={index}
                                    className="h-full flex items-center"
                                >
                                    <Link className="hover:text-bright-sun-400 text-xl" key={index} to={link.url}>
                                        {link.name}
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </Drawer> */}
            </div>
        </div>
    );
};

export default Header;