import { Button } from "@mantine/core";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { formatDate } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/Notifications";
import { useModals } from "@mantine/modals";

const ExpCard = (props: any) => {
    const dispatch = useDispatch();
    const modals = useModals();

    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const handleDelete = () => {
        console.log("Truoc khi delete");
        console.log(profile);
        console.log("Đang xóa phần tử: ", profile.experiences[props.index]);
        let exp = [...profile.experiences];
        exp.splice(props.index, 1);
        let updateProfile = { ...profile, experiences: exp };
        dispatch(changeProfile(updateProfile));
        successNotification("Success", `Experiences deleted successfully`)
    }
    const openDeleteConfirm = () => {
        modals.openConfirmModal({
            title: 'Confirm Delete',
            children: 'Are you sure you want to delete this experience?',
            labels: { confirm: 'Yes', cancel: 'No' },
            confirmProps: { color: 'red' },
            onConfirm: handleDelete,
        });
    }
    // useEffect(() => {
    //     console.log("Sau khi Redux cập nhật profile:");
    //     console.log(profile);
    // }, [profile]);
    return !edit ?
        <div className="flex flex-col gap-2">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    {/* <div className="p-2 bg-mine-shaft-800 rounded-md">
                        <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
                    </div> */}
                    <div className="flex flex-col">
                        <div className="text-mine-shaft-600 font-semibold">{props.title}</div>
                        <div className="text-sm text-mine-shaft-600 font-semibold">
                            {props.company} &bull; {props.location}
                        </div>
                    </div>
                </div>
                <div className="text-sm text-mine-shaft-600 font-semibold">
                    {formatDate(props.startDate)} –  {props.working ? "Present" : formatDate(props.endDate)}
                </div>
            </div>
            <div className="text-sm text-mine-shaft-600 text-justify">
                {props.description}
            </div>
            {props.edit && <div className="flex gap-5">
                <Button onClick={() => setEdit(true)} color="green.8" variant="light">Edit</Button>
                <Button onClick={openDeleteConfirm} color="red.8" variant="light">Delete</Button>
            </div>
            }
        </div> : <ExpInput {...props} setEdit={setEdit} />

};

export default ExpCard;