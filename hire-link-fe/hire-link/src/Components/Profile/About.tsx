import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/Notifications";

const About = () => {
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const [about, setAbout] = useState("");
    const handleEdit = () => {
        if (!edit) {
            setEdit(true);
            setAbout(profile.about);
        }
        else {
            setEdit(false);
        }
    }
    const handleSave = () => {
        setEdit(false);
        let updateProfile = { ...profile, about: about };
        console.log(updateProfile);
        dispatch(changeProfile(updateProfile));
        successNotification("Success", "About updated successfully")
    }
    return <>
        <div className="p-3">
            <div className="text-2xl text-mine-shaft-600 font-semibold  mb-3 flex justify-between">About
                <div>
                    {edit && (
                        <ActionIcon
                            onClick={handleSave}
                            variant="subtle"
                            color="shakeSpeare.7"
                            size="lg"
                        >
                            <IconCheck className="w-4/5 h-4/5" stroke={1.5} />
                        </ActionIcon>
                    )}
                    <ActionIcon
                        onClick={handleEdit}
                        variant="subtle"
                        color={edit ? "red.8" : "shakeSpeare.7"}
                        size="lg"
                    >
                        {edit ? (
                            <IconX className="w-4/5 h-4/5" stroke={1.5} />
                        ) : (
                            <IconPencil className="w-4/5 h-4/5" stroke={1.5} />
                        )}
                    </ActionIcon>
                </div>
            </div>
            {
                edit ? <Textarea value={about} autosize minRows={3} placeholder="Enter about yourself..."
                    onChange={(event) => setAbout(event.currentTarget.value)} /> :
                    <div className="text-sm text-mine-shaft-600 font-semibold text-justify">{profile?.about}</div>
            }
        </div>
    </>
}
export default About;