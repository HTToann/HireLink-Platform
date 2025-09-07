import { ActionIcon, TagsInput } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/Notifications";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";

const Skills = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const [edit, setEdit] = useState(false);
    const [skills, setSkills] = useState<string[]>([]);
    const handleEdit = () => {
        if (!edit) {
            setEdit(true);
            setSkills(profile.skills);
        }
        else {
            setEdit(false);
        }
    }
    const handleSave = () => {
        setEdit(false);
        let updateProfile = { ...profile, skills: skills };
        console.log(updateProfile);
        dispatch(changeProfile(updateProfile));
        successNotification("Success", "Skills updated successfully")
    }
    return <>
        <div className="p-3">
            <div className="text-2xl text-mine-shaft-600 font-semibold mb-3 flex justify-between">Skills
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
                edit ? <TagsInput value={skills} onChange={setSkills} placeholder="Add skill" splitChars={[',', '', '|']} /> :
                    <div className="flex flex-wrap gap-2">
                        {
                            profile?.skills?.map((skill: any, index: number) =>
                                <div key={index} className="bg-fountain-blue-500 text-sm font-medium bg-opacity-15 
                    rounded-3xl text-fountain-blue-800
                    px-3 py-1">{skill}
                                </div>)
                        }
                    </div>
            }
        </div>
    </>
}
export default Skills