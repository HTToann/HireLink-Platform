import { Divider } from "@mantine/core";
import Profile from "../Components/Profile/Profile";
import { profile } from "../Data/TalentData";
const ProfilePage = () => {
    return (
        <div className="min-h-[90vh] bg-shakespeare-100 font-['poppins']">
            <Divider mx="md" mb="xl" />
            <Profile {...profile} />
        </div>
    );
};

export default ProfilePage;
