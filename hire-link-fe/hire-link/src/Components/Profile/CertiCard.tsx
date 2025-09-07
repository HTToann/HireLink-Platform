import { Button } from "@mantine/core";
import { formatDate } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { useModals } from "@mantine/modals";
import { useState } from "react";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/Notifications";
import CertiInput from "./CertiInput"
const CertiCard = (props: any) => {
    const dispatch = useDispatch();
    const modals = useModals();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const handleDelete = () => {
        console.log("Truoc khi delete");
        console.log(profile);
        console.log("Đang xóa phần tử: ", profile.certifications[props.index]);
        let certi = [...profile.certifications];
        certi.splice(props.index, 1);
        let updateProfile = { ...profile, certifications: certi };
        dispatch(changeProfile(updateProfile));
        successNotification("Success", `Certificate deleted successfully`)
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
    return !edit ? (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                {/* Bên trái: Icon + Tên chứng chỉ + Issuer */}
                <div className="flex items-center gap-3">
                    {/* <div className="p-2 bg-mine-shaft-800 rounded-md">
                        <img className="h-7 w-7" src="/Icons/defaultCer.png" alt="" />
                    </div> */}
                    <div className="flex flex-col">
                        <div className="text-mine-shaft-600 font-semibold">{props.name}</div>
                        <div className="text-sm text-mine-shaft-600">{props.issuer}</div>
                    </div>
                </div>

                {/* Bên phải: Ngày + Mã + Nút */}
                <div className="flex items-center gap-6">
                    <div className="flex flex-col text-right">
                        <div className="text-sm text-mine-shaft-600 font-semibold">Issued : {formatDate(props.issueDate)}</div>
                        <div className="text-sm text-mine-shaft-600 font-semibold">ID : {props.certificateId}</div>
                    </div>

                    {props.edit && (
                        <div className="flex gap-2">
                            <Button onClick={() => setEdit(true)} color="green.8" variant="light">Edit</Button>
                            <Button onClick={openDeleteConfirm} color="red.8" variant="light">Delete</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <CertiInput {...props} setEdit={setEdit} />
    );
}
export default CertiCard;