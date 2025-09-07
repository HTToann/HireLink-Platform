
import { Button, Checkbox, Textarea } from "@mantine/core";
import fields from "../../Data/Profile";
import SelectInput from "./SelectInput";
import { useEffect } from "react";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/Notifications";

const ExpInput = (props: any) => {
    const select = fields;
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    useEffect(() => {
        if (!props.add) {
            form.setValues({
                title: props.title,
                company: props.company,
                location: props.location,
                description: props.description,
                startDate: new Date(props.startDate),
                endDate: new Date(props.endDate),
                working: props.working,
            });
        }
    }, []);
    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            title: '',
            company: '',
            location: '',
            description: '',
            startDate: new Date(),
            endDate: new Date(),
            working: false
        },
        validate: {
            title: isNotEmpty("Title is required"),
            company: isNotEmpty("Company is required"),
            location: isNotEmpty("Location is required"),
            description: isNotEmpty("Description is required"),
        }
    })
    const handleSave = () => {
        form.validate();
        if (!form.isValid()) return;

        const values = form.getValues();
        const exp = [...profile.experiences];

        const newExp = {
            ...values,
            startDate: values.startDate ? new Date(values.startDate).toISOString() : null,
            endDate: values.endDate ? new Date(values.endDate).toISOString() : null,
        };

        if (props.add) {
            exp.push(newExp);
        } else {
            exp[props.index] = newExp;
        }

        const updateProfile = { ...profile, experiences: exp };
        dispatch(changeProfile(updateProfile));
        successNotification("Success", "Experiences updated successfully");
        props.setEdit(false);
    };
    return (
        <div className="flex flex-col gap-3">
            <div className="text-lg text-mine-shaft-600 font-semibold">{props.add ? "Add" : "Edit"} Experience</div>
            <div className="flex gap-10 [&>_*]:w-1/2">
                <SelectInput form={form} name="title" {...select[0]} />
                <SelectInput form={form} name="company"{...select[1]} />
            </div>
            <SelectInput form={form} name="location" {...select[2]} />
            <Textarea {...form.getInputProps("description")} withAsterisk label="Summary"
                autosize minRows={3} placeholder="Enter summary..." />
            <div className="flex gap-10 [&>_*]:w-1/2">
                <MonthPickerInput {...form.getInputProps("startDate")} withAsterisk
                    maxDate={form.getValues().endDate || undefined} label="Start Date"
                    placeholder="Pick Date" />
                <MonthPickerInput {...form.getInputProps("endDate")} disabled={form.getValues().working} withAsterisk
                    maxDate={new Date()}
                    minDate={form.getValues().startDate || undefined} label="End Date"
                    placeholder="Pick Date" />
            </div>
            <Checkbox checked={form.getValues().working}
                onChange={(event) => form.setFieldValue("working", event.currentTarget.checked)}
                autoContrast label="Currently working here" />
            <div className="flex gap-5">
                <Button onClick={handleSave} color="green.8" variant="light">Save</Button>
                <Button onClick={() => props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
            </div>
        </div>
    );
};

export default ExpInput;
