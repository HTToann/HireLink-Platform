import { Avatar, Divider, FileInput, Overlay } from "@mantine/core"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProfile, updateAvatar } from "../../Services/ProfileService"
import Infor from "./Infor"
import { changeProfile, setProfile } from "../../Slices/ProfileSlice"
import About from "./About"
import Skills from "./Skills"
import Experience from "./Experience"
import Certificate from "./Certification"
import { useHover } from "@mantine/hooks"
import { IconEdit } from "@tabler/icons-react"
import { successNotification } from "../../Services/Notifications"

const Profile = (props: any) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);
    useEffect(() => {
        console.log(profile);
        getProfile(user.id).then((data: any) => {
            dispatch(setProfile(data));
        }).catch((err: any) => {
            console.log(err);
        })
    }, [])
    const { hovered, ref } = useHover();

    const handleUpload = async (file: File | null) => {
        console.log("handleUpload called with:", file); // ✅ log đầu tiên

        if (!file) return; // bỏ qua nếu không có file

        try {
            const res = await updateAvatar(user.id, file);
            const avatarUrl = res.data;
            console.log("Upload successful:", res.data);  // ✅ log khi xong
            successNotification("Success", "Avatar updated successfully");
            dispatch(changeProfile({ ...profile, picture: avatarUrl }));

        } catch (err) {
            console.error("Upload avatar failed:", err);
        }
    };
    const onAvatarChange = (file: File | null) => {
        void handleUpload(file);
    };


    return <div className="w-4/5 mx-auto">
        <div>
            <div className="relative">
                <img className="rounded-t-2xl w-full max-h-40 object-cover" src="/Profile/background.jpg" alt="" />
                <div ref={ref}
                    className="absolute flex items-center justify-center -bottom-1/3 left-3" >
                    <Avatar
                        className="!w-48 !h-48 border-mine-shaft-600 border-8 rounded-full"
                        src={`${profile.picture}?t=${Date.now()}` || `/defaultAvatar.png`}
                        alt=""
                    />
                    {
                        hovered && <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.75} />
                    }
                    {
                        hovered && <IconEdit className="absolute z-[300] !w-16 !h-16" />
                    }
                    {
                        hovered && <FileInput
                            onChange={onAvatarChange}
                            className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full !w-full"
                            variant="transparent"
                            accept="image/png,image/jpeg"
                        />
                    }

                </div>
            </div>
        </div>
        <Infor />
        <Divider mx="xs" my="xl" />
        <About />

        {user?.accountType !== 'EMPLOYER' && (
            <>
                <Divider mx="xs" my="xl" />
                <Skills />
                <Divider mx="xs" my="xl" />
                <Experience />
                <Divider mx="xs" my="xl" />
                <Certificate />
            </>
        )}
    </div >
}
export default Profile


// import { Avatar, Divider, FileInput, Overlay } from "@mantine/core"
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { getProfile } from "../../Services/ProfileService"
// import Infor from "./Infor"
// import { changeProfile, setProfile } from "../../Slices/ProfileSlice"
// import About from "./About"
// import Skills from "./Skills"
// import Experience from "./Experience"
// import Certificate from "./Certification"
// import { useHover } from "@mantine/hooks"
// import { IconEdit } from "@tabler/icons-react"
// import { successNotification } from "../../Services/Notifications"

// const Profile = (props: any) => {
//     const dispatch = useDispatch();
//     const user = useSelector((state: any) => state.user);
//     const profile = useSelector((state: any) => state.profile);
//     useEffect(() => {
//         console.log(profile);
//         getProfile(user.id).then((data: any) => {
//             dispatch(setProfile(data));
//         }).catch((err: any) => {
//             console.log(err);
//         })
//     }, [])
//     const { hovered, ref } = useHover();
//     const handleFileChange = async (image: any) => {
//         let picture: any = await getBase64(image);
//         let updatedProfile = { ...profile, picture: picture.split(',')[1] };
//         dispatch(changeProfile(updatedProfile));
//         successNotification("Success", "Avatar updated successfully");
//     }
//     const getBase64 = (file: any) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = () => resolve(reader.result);
//             reader.onerror = error => reject(error);
//         })
//     }
//     return <div className="w-4/5 mx-auto">
//         <div>
//             <div className="relative">
//                 <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
//                 <div ref={ref}
//                     className="absolute flex items-center justify-center -bottom-1/3 left-3" >
//                     <Avatar className="!w-48 !h-48 border-mine-shaft-950 border-8 rounded-full"
//                         src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : "/Avatar.png"} alt="" />
//                     {
//                         hovered && <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.75} />
//                     }
//                     {
//                         hovered && <IconEdit className="absolute z-[300] !w-16 !h-16" />
//                     }
//                     {
//                         hovered && <FileInput onChange={handleFileChange}
//                             className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full !w-full" variant="transparent"
//                             accept="image/png,image/jpeb" />

//                     }

//                 </div>
//             </div>
//         </div>
//         <Infor />
//         <Divider mx="xs" my="xl" />
//         <About />
//         <Divider mx="xs" my="xl" />
//         <Skills />
//         <Divider mx="xs" my="xl" />
//         <Experience />
//         <Divider mx="xs" my="xl" />
//         <Certificate />
//     </div >
// }
// export default Profile