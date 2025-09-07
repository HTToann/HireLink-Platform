import { Button, FileInput, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJob, postJob } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/Notifications";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PostJob = () => {
    const { id } = useParams();
    const [editorData, setEditorData] = useState(content);
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const select = fields;
    useEffect(() => {
        window.scrollTo(0, 0);
        if (id !== "0") {
            getJob(Number(id)).then((res) => {
                form.setValues(res);
                setEditorData(res.description);
            }).catch((err) => {
                console.log(err);
            })
        }
        else {
            form.reset();
            setEditorData(content);
        }
    }, [id]);
    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            jobTitle: '',
            company: '',
            experience: '',
            jobType: '',
            location: '',
            packageOffered: '',
            skillsRequired: [],
            about: '',
            description: content,
            companyLogo: null as File | null,
        },
        validate: {
            jobTitle: isNotEmpty("Title is required"),
            company: isNotEmpty("Company is required"),
            experience: isNotEmpty("Experience is required"),
            jobType: isNotEmpty("JobType is required"),
            location: isNotEmpty("Location is required"),
            packageOffered: isNotEmpty("Salary is required"),
            skillsRequired: isNotEmpty("Skills are required"),
            about: isNotEmpty("About is required"),
            description: isNotEmpty("Description is required"),
            companyLogo: (value: File | null) => value ? null : "Company logo is required"
        }
    });
    // const handlePost = () => {
    //     form.validate();
    //     if (!form.isValid)
    //         return;
    //     postJob({ ...form.getValues(), id: id, postedBy: user.id, jobStatus: "ACTIVE" }).then((res) => {
    //         console.log(res);
    //         successNotification("Success", "Job Posted successfully");
    //         setTimeout(() => {
    //             setLoading(false);
    //             navigate(`/posted-job/${res.id}`);
    //         }, 1000)

    //     }).catch((err) => {
    //         setLoading(false);
    //         errorNotification("Error", err.response.data.errorMessage);
    //         console.log(err);
    //     })
    // }
    const handlePost = async () => {
        form.validate();
        if (!form.isValid) return;

        setLoading(true);

        const values = form.getValues();

        const formData = new FormData();

        // Tạo object job (không bao gồm file)
        const job = {
            ...values,
            id: id !== "0" ? Number(id) : null,
            postedBy: user.id,
            jobStatus: "ACTIVE",
            companyLogo: undefined, // loại bỏ File khỏi object job trước khi stringify
        };

        // Thêm phần JSON job vào formData
        formData.append(
            "job",
            new Blob([JSON.stringify(job)], {
                type: "application/json",
            })
        );

        // Thêm file logo nếu có
        if (values.companyLogo) {
            formData.append("companyLogo", values.companyLogo);
        }

        try {
            const res = await postJob(formData); // hàm này cần dùng axios hoặc fetch như hướng dẫn dưới
            successNotification("Success", "Job Posted successfully");
            setTimeout(() => {
                setLoading(false);
                navigate(`/posted-job/${res.data.id}`);
            }, 1000);
        } catch (err: any) {
            setLoading(false);
            errorNotification("Error", err.response?.data?.errorMessage || "Unknown error");
            console.error(err);
        }
    };
    const handleDraft = async () => {
        form.validate();
        if (!form.isValid) return;

        setLoading(true);

        const values = form.getValues();

        const formData = new FormData();

        const job = {
            ...values,
            id: id !== "0" ? Number(id) : null,
            postedBy: user.id,
            jobStatus: "DRAFT",
            postTime: new Date().toISOString(),
            companyLogo: undefined, // loại bỏ file khỏi JSON
        };

        formData.append(
            "job",
            new Blob([JSON.stringify(job)], {
                type: "application/json",
            })
        );

        if (values.companyLogo) {
            formData.append("companyLogo", values.companyLogo);
        }

        try {
            const res = await postJob(formData);
            successNotification("Success", "Job Drafted Successfully");
            setTimeout(() => {
                setLoading(false);
                navigate(`/posted-job/${res.data.id}`);
            }, 1000);
        } catch (err: any) {
            setLoading(false);
            errorNotification("Error", err.response?.data?.errorMessage || "Unknown error");
            console.error(err);
        }
    };
    // const handleDraft = () => {
    //     postJob({ ...form.getValues(), id: id, postedBy: user.id, jobStatus: "DRAFT" }).then((res) => {
    //         console.log(res);
    //         successNotification("Success", "Job Drafted Successfully");
    //         setTimeout(() => {
    //             setLoading(false);
    //             navigate(`/posted-job/${res.id}`);
    //         }, 1000)

    //     }).catch((err) => {
    //         setLoading(false);
    //         errorNotification("Error", err.response.data.errorMessage);
    //         console.log(err);
    //     })
    // }
    return <div className="w-4/5 mx-auto">
        <div className="text-2xl text-shakespeare-800 font-semibold"> Post a Job</div>
        <div className="flex flex-col gap-5">
            <div className=" flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="jobTitle" {...select[0]} />
                <SelectInput form={form} name="company" {...select[1]} />
            </div>
            <FileInput
                label="Company Logo"
                placeholder="Upload company logo"
                accept="image/png,image/jpeg,image/jpg"
                withAsterisk
                value={form.values.companyLogo}
                onChange={(file) => form.setFieldValue('companyLogo', file)}
                className="text-shakespeare-800"
            />

            {form.values.companyLogo && (
                <img
                    src={URL.createObjectURL(form.values.companyLogo)}
                    alt="Company Logo"
                    className="w-32 h-32 object-contain mt-2"
                />
            )}
            <div className=" flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="experience" {...select[2]} />
                <SelectInput form={form} name="jobType" {...select[3]} />
            </div>
            <div className=" flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="location"{...select[4]} />
                <NumberInput
                    {...form.getInputProps('packageOffered')}
                    withAsterisk
                    className="text-shakespeare-800"
                    min={1}
                    label="Salary"
                    placeholder="Enter salary"
                    clampBehavior="strict"
                    hideControls
                    rightSection={<span style={{ marginRight: 8 }}>$</span>}
                />
            </div>
            <TagsInput {...form.getInputProps('skillsRequired')}
                className="text-shakespeare-800"
                withAsterisk label="Skills" placeholder="Enter skill" clearable
                acceptValueOnBlur
                splitChars={[',', '', '|']} />
            <Textarea {...form.getInputProps("about")} withAsterisk label="About"
                className="text-shakespeare-800"
                autosize minRows={3} placeholder="Enter about job" />
            <div className="
            [&_button[data-active='true']]:!text-shakespeare-700
            [&_button[data-active='true']]:!bg-shakespeare-300/20">
                <div className="text-sm text-shakespeare-800  font-medium">Job Description <span className="text-red-500">*</span></div>
                <TextEditor form={form} data={editorData} />
            </div>
            <div className="flex gap-4">
                <Button onClick={handlePost} color="shakeSpeare.9" variant="light" >Publish Job</Button>
                <Button onClick={handleDraft} color="shakeSpeare.7" variant="outline" >Save as Draft</Button>
            </div>
        </div>
    </div >
}
export default PostJob;