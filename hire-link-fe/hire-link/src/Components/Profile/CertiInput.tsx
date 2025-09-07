import { Button, TextInput } from "@mantine/core";
import SelectInput from "./SelectInput";
import fields from "../../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/Notifications";

const CertInput = (props: any) => {
    const select = fields;
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    useEffect(() => {
        if (!props.add) {
            form.setValues({
                name: props.name,
                issuer: props.issuer,
                issueDate: new Date(props.issueDate),
                certificateId: props.certificateId,
            });
        }
    }, []);
    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            name: '',
            issuer: '',
            issueDate: new Date(),
            certificateId: '',
        },
        validate: {
            name: isNotEmpty("Name is required"),
            issuer: isNotEmpty("Issuer is required"),
            certificateId: isNotEmpty("CertificateId is required"),
        }
    })
    const handleSave = () => {
        form.validate();
        if (!form.isValid()) return;

        const values = form.getValues();
        const certi = [...profile.certifications];
        const newExp = {
            ...values,
            issueDate: values.issueDate ? new Date(values.issueDate).toISOString() : null,
        };

        if (props.add) {
            certi.push(newExp);
        } else {
            certi[props.index] = newExp;
        }

        const updateProfile = { ...profile, certifications: certi };
        dispatch(changeProfile(updateProfile));
        successNotification("Success", "Certificate updated successfully");
        props.setEdit(false);
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="text-lg text-mine-shaft-600 font-semibold">{props.add ? "Add" : "Edit"} Certificate</div>
            <div className="flex gap-10 [&>_*]:w-1/2">
                <TextInput {...form.getInputProps("name")} className="text-mine-shaft-500" label="Title" withAsterisk placeholder="Enter title" />
                <SelectInput form={form} name="issuer" {...select[1]} />
            </div>
            <div className="flex gap-10 [&>_*]:w-1/2">
                <MonthPickerInput {...form.getInputProps("issueDate")}
                    withAsterisk
                    className="text-mine-shaft-500"
                    maxDate={new Date()}
                    label="Issue Date"
                    placeholder="Pick Date" />
                <TextInput {...form.getInputProps("certificateId")} className="text-mine-shaft-500" label="Certificate ID" withAsterisk placeholder="Enter ID" />
            </div>
            <div className="flex gap-5">
                <Button onClick={handleSave} color="green.8" variant="light" >
                    Save
                </Button>
                <Button onClick={() => props.setEdit(false)} color="red.8" variant="light" >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default CertInput;
