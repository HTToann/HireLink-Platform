import { Button, Divider } from "@mantine/core"
import { IconBriefcase, IconMapPin } from "@tabler/icons-react"
import ExpCard from "./ExpCard"
import CertiCard from "./Certifications"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getProfile } from "../../Services/ProfileService"

const Profile = (props: any) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [profile, setProfile] = useState<any>({});
    useEffect(() => {
        window.scrollTo(0, 0);
        getProfile(Number(id)).then((res) => {
            setProfile(res);
        }).catch((err) => {
            console.error("Error fetching profile:", err);
        })
    }, [id])
    return <div className="w-2/3">
        <div className="relative">
            <img className="rounded-t-2xl w-full max-h-40 object-cover" src="/Profile/background.jpg" alt="" />
            <img className="w-48 h-48
            -bottom-1/3 absolute left-3 
            border-mine-shaft-600 border-8 rounded-full
            " src={profile.picture || `/defaultAvatar.png`} alt="it's me" />
        </div>
        <div className="px-3 mt-16">
            <div className="text-3xl text-mine-shaft-600 font-semibold flex justify-between">{profile?.name}
                <Button color="shakeSpeare.9" variant="light"
                    onClick={() => navigate(`/chat/${profile?.id}`)}
                >
                    Message
                </Button>
            </div>
            <div className="text-xl flex gap-1 items-center text-mine-shaft-600 font-semibold">
                <IconBriefcase className="h-5 w-5" stroke={1.5} /> {profile?.jobTitle}
                {profile.company?.trim() && `• ${profile.company}`}
            </div>
            <div className="text-xl flex gap-1 items-center text-mine-shaft-600 font-semibold">
                <IconMapPin className="h-5 w-5" stroke={1.5} /> {profile?.location}
            </div>
            <div className="text-xl flex gap-1 items-center text-mine-shaft-600 font-semibold">
                <IconBriefcase className="h-5 w-5" stroke={1.5} /> Experience: {props?.totalExp ? props.totalExp : "1"} years
            </div>
        </div>
        <Divider mx="xs" my="xl" />
        <div className="p-3">
            <div className="text-2xl text-mine-shaft-600 font-semibold  mb-3 flex justify-between">About</div>
            <div className="text-sm text-mine-shaft-600 font-semibold text-justify">{profile?.about}</div>
        </div>
        <Divider mx="xs" my="xl" />
        <div className="p-3">
            <div className="text-2xl text-mine-shaft-600 font-semibold mb-3 flex justify-between">Skills</div>
            <div className="flex flex-wrap gap-2">
                {
                    profile?.skills?.map((skill: any, index: any) => <div key={index} className="bg-fountain-blue-500 text-sm font-medium bg-opacity-15 
                    rounded-3xl text-fountain-blue-800
                px-3 py-1">{skill}
                    </div>)
                }
            </div>
        </div>
        <Divider mx="xs" my="xl" />
        <div className="p-3">
            <div className="text-2xl text-mine-shaft-600 font-semibold mb-5 flex justify-between">Experience</div>
            <div className="flex flex-col gap-8">
                {
                    profile?.experiences?.map((exp: any, index: any) => <ExpCard key={index} {...exp} />)
                }
            </div>
        </div>
        <Divider mx="xs" my="xl" />
        <div className="p-3">
            <div className="text-2xl text-mine-shaft-600 font-semibold mb-5 flex justify-between">Certifications</div>
            <div className="flex flex-col gap-8">
                {
                    profile?.certifications?.map((certi: any, index: any) => <CertiCard key={index} {...certi} />)
                }
            </div>
        </div>
    </div >
}
export default Profile