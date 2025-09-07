import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import CertiCard from "./CertiCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CertiInput from "./CertiInput"

const Certificate = () => {
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const [addCerti, setAddCerti] = useState(false);
    const handleEdit = () => {
        setEdit(!edit);

    }
    return <>
        <div className="p-3">
            <div className="text-2xl text-mine-shaft-600 font-semibold mb-5 flex justify-between">Certifications
                <div className="flex gap-2">
                    <ActionIcon onClick={() => setAddCerti(true)} size="lg" color="shakeSpeare.7"
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
                    profile?.certifications?.map((cert: any, index: number) =>
                        <CertiCard edit={edit} key={index} {...cert} index={index} />)
                }
                {
                    addCerti && <CertiInput add setEdit={setAddCerti} />
                }
            </div>
        </div>
    </>
}
export default Certificate;