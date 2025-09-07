import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import ExpInput from "./ExpInput";

const Experience = () => {
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);
    const [addExp, setAddExp] = useState(false);
    const handleEdit = () => {
        setEdit(!edit);

    }

    return <>
        <div className="p-3">
            <div className="text-2xl text-mine-shaft-600 font-semibold mb-5 flex justify-between">Experience
                <div className="flex gap-2">
                    <ActionIcon onClick={() => setAddExp(true)} size="lg" color="shakeSpeare.7"
                        variant="subtle" aria-label="Settings">
                        <IconPlus className="h-4/5 w-4/5" />
                    </ActionIcon>
                    <ActionIcon onClick={handleEdit} size="lg" color={edit ? "red.8" : "shakeSpeare.7"}
                        variant="subtle" aria-label="Settings">
                        {edit ? (
                            <IconX className="w-4/5 h-4/5" stroke={1.5} />
                        ) : (
                            <IconPencil className="w-4/5 h-4/5" stroke={1.5} />
                        )}
                    </ActionIcon>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                {
                    profile?.experiences?.map((exp: any, index: number) =>
                        <ExpCard key={index} {...exp} edit={edit} index={index} />)
                }
                {addExp && <ExpInput add setEdit={setAddExp} />}
            </div>
        </div>
    </>
}
export default Experience;