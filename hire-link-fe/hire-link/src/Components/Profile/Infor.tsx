import { useState } from "react";
import fields from "../../Data/Profile";
import { ActionIcon, NumberInput } from "@mantine/core";
import { IconBriefcase, IconCheck, IconMapPin, IconPencil, IconX } from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/Notifications";

const Infor = () => {
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            jobTitle: '',
            company: '',
            location: '',
            totalExp: 1,
        }
    })
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const select = fields;
    const profile = useSelector((state: any) => state.profile);
    const [edit, setEdit] = useState(false);
    const handleEdit = () => {
        if (!edit) {
            setEdit(true);
            form.setValues({
                jobTitle: profile.jobTitle,
                company: profile.company,
                location: profile.location,
                totalExp: profile.totalExp
            });
        }
        else {
            setEdit(false);
        }
    }
    const handleSave = () => {
        setEdit(false);
        let updateProfile = { ...profile, ...form.getValues() };
        console.log(updateProfile);
        dispatch(changeProfile(updateProfile));
        successNotification("Success", "Update profile successfully")
    }

    return <>
        <div className="px-3 mt-16">
            <div className="text-3xl text-mine-shaft-600 font-semibold flex justify-between">{user.name}
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
                edit ?
                    <>
                        <div className="flex gap-10 [&>*]:w-1/2">
                            <SelectInput form={form} name="jobTitle" {...select[0]} />
                            <SelectInput form={form} name="company" {...select[1]} />
                        </div>

                        <div className="flex gap-10">
                            <div className={user?.accountType === 'EMPLOYER' ? 'w-full' : 'w-1/2'}>
                                <SelectInput form={form} name="location" {...select[2]} />
                            </div>

                            {user?.accountType !== 'EMPLOYER' && (
                                <div className="w-1/2">
                                    <NumberInput
                                        withAsterisk
                                        label="Experiences"
                                        className="text-mine-shaft-500"
                                        hideControls
                                        clampBehavior="strict"
                                        min={1}
                                        max={50}
                                        {...form.getInputProps('totalExp')}
                                    />
                                </div>
                            )}
                        </div>
                    </> : <>
                        <div className="text-xl flex gap-1 items-center text-mine-shaft-600 font-semibold">
                            <IconBriefcase className="h-5 w-5 text-mine-shaft-600 font-semibold" stroke={1.5} /> {profile.jobTitle}
                            {profile.company?.trim() && `• ${profile.company}`}
                        </div>
                        <div className="flex gap-1 text-lg text-mine-shaft-600 font-semibold items-center">
                            <IconMapPin className="h-5 w-5 text-mine-shaft-600 font-semibold" stroke={1.5} /> {profile.location}
                        </div>
                        {user?.accountType !== 'EMPLOYER' && (
                            <div className="flex gap-1 text-lg text-mine-shaft-600 font-semibold items-center">
                                <IconBriefcase className="h-5 w-5 text-mine-shaft-600 font-semibold" stroke={1.5} />
                                Experience: {profile?.totalExp} years
                            </div>
                        )}
                    </>
            }
        </div>
    </>
}
export default Infor;