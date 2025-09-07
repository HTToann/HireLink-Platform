import { Menu, Avatar, Switch, rem } from '@mantine/core';
import {
    IconMessageCircle,
    IconUserCircle,
    IconFileText,
    IconMoon,
    IconSun,
    IconMoonStars,
    IconLogout2,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { persistor } from '../../Store';
import { removeUser } from '../../Slices/UserSlice';

const ProfileMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);
    const [checked, setChecked] = useState(false);
    const [opened, setOpened] = useState(false);
    const handleLogout = async () => {
        // 1. Reset Redux store
        dispatch({ type: 'LOGOUT' });
        // 2. Purge persist
        await persistor.purge();

        // 3. Xóa localStorage
        localStorage.removeItem("persist:root");
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // 4. Reload
        window.location.href = "/";
    };
    return (
        <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
            <Menu.Target>
                <div className="flex text-mine-shaft-600 font-semibold cursor-pointer items-center gap-2">
                    <div>{user.name}</div>
                    <Avatar
                        src={`${profile.picture}?t=${Date.now()}` || `/defaultAvatar.png`}
                        alt=""
                    />
                </div>
            </Menu.Target>

            <Menu.Dropdown onChange={() => setOpened(true)}>
                <Link to="/profile">
                    <Menu.Item leftSection={<IconUserCircle size={14} />}>
                        Profile
                    </Menu.Item>
                </Link>
                <Link to="/chat">
                    <Menu.Item leftSection={<IconMessageCircle size={14} />}>
                        Messages
                    </Menu.Item>
                </Link>
                <Menu.Item leftSection={<IconFileText size={14} />}>
                    Resume
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconMoon style={{ width: rem(14), height: rem(14) }} />}
                    rightSection={
                        <Switch checked={checked}
                            onChange={(event) => setChecked(event.currentTarget.checked)}
                            size="md" color="dark.4"
                            onLabel={
                                <IconSun
                                    style={{ width: rem(16), height: rem(16) }}
                                    stroke={2.5}
                                    color="yellow"
                                />
                            }
                            offLabel={
                                <IconMoonStars
                                    style={{ width: rem(16), height: rem(16) }}
                                    stroke={2.5}
                                    color="cyan"
                                />
                            }
                        />
                    }
                >
                    Dark Mode
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={handleLogout}
                    color="red"
                    leftSection={<IconLogout2 style={{ width: rem(14), height: rem(14) }} />}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu >
    );
}
export default ProfileMenu;