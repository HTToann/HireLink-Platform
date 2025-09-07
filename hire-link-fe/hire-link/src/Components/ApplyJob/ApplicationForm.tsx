// import { Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core";
// import { IconPaperclip } from "@tabler/icons-react";
// import { useState } from "react";
// import { isNotEmpty, useForm } from "@mantine/form";
// import { getBase64 } from "../../Services/Utilities";
// import { useNavigate, useParams } from "react-router-dom";
// import { applyJob } from "../../Services/JobService";
// import { errorNotification, successNotification } from "../../Services/Notifications";
// import { useSelector } from "react-redux";

// const ApplicationForm = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [preview, setPreview] = useState(false);
//     const [submit, setSubmit] = useState(false);
//     const user = useSelector((state: any) => state.user);
//     const handlePreview = () => {
//         form.validate();
//         if (!form.isValid())
//             return;
//         setPreview(!preview);
//         window.scrollTo({ top: 0, behavior: 'smooth' })

//     }
//     const handleSubmit = async () => {
//         setSubmit(true);
//         let resume: any = await getBase64(form.getValues().resume);
//         let applicant = { ...form.getValues(), applicantId: user.id, resume: resume.split(',')[1] };
//         applyJob(Number(id), applicant).then(res => {
//             setSubmit(false);
//             successNotification("Success", "Application submitted successfully!");
//             navigate("/job-history");
//         }).catch((err) => {
//             setSubmit(false);
//             errorNotification("Error", err.response.data.errorMessage || "Something went wrong, please try again later!");
//         }
//         )
//     }
//     const form = useForm({
//         mode: 'controlled',
//         validateInputOnChange: true,
//         initialValues: {
//             name: "",
//             email: "",
//             phone: "",
//             website: "",
//             resume: null,
//             coverLetter: "",
//         },
//         validate: {
//             name: isNotEmpty("Full Name is required"),
//             email: isNotEmpty("Invalid email"),
//             phone: isNotEmpty("Phone Number is required"),
//             website: isNotEmpty("Website is required"),
//             resume: isNotEmpty("Resume is required"),
//         },
//     });
//     return <>
//         <LoadingOverlay className="!fixed"
//             visible={submit}
//             zIndex={1000}
//             overlayProps={{ radius: 'sm', blur: 2 }}
//             loaderProps={{ color: 'shakeSpeare.6', type: 'bars' }}
//         />
//         <div className="text-xl text-mine-shaft-600 font-semibold">Submit Your Apllication</div>
//         <div className="flex flex-col gap-5 text-mine-shaft-900 font-semibold">
//             <div className="text-mine-shaft-600 font-semibold flex gap-10 [&>*]:w-1/2">
//                 <TextInput {...form.getInputProps("name")}
//                     className="text-mine-shaft-900 font-semibold"
//                     readOnly={preview}
//                     variant={preview ? "unstyled" : "default"}
//                     label="Full Name" withAsterisk placeholder="Enter name" />
//                 <TextInput {...form.getInputProps("email")}
//                     className="text-mine-shaft-900 font-semibold"
//                     readOnly={preview}
//                     variant={preview ? "unstyled" : "default"}
//                     label="Email" withAsterisk placeholder="Enter email" />
//             </div>
//             <div className="text-mine-shaft-600 font-semibold  flex gap-10 [&>*]:w-1/2">
//                 <NumberInput {...form.getInputProps("phone")}
//                     className="text-mine-shaft-900 font-semibold"
//                     readOnly={preview}
//                     variant={preview ? "unstyled" : "default"}
//                     label="Phone Number" hideControls
//                     min={0} max={9999999999} clampBehavior="strict"
//                     withAsterisk placeholder="Enter phone number" />
//                 <TextInput {...form.getInputProps("website")}
//                     className="text-mine-shaft-900 font-semibold"
//                     readOnly={preview}
//                     variant={preview ? "unstyled" : "default"}
//                     label="Personal Website" withAsterisk placeholder="Enter url" />
//             </div>
//             <FileInput {...form.getInputProps("resume")}
//                 accept="application/pdf"
//                 className="text-mine-shaft-900 font-semibold"
//                 readOnly={preview}
//                 variant={preview ? "unstyled" : "default"}
//                 withAsterisk leftSection={<IconPaperclip stroke={1.5} />}
//                 label="Attach your CV" placeholder=" Your CV"
//                 leftSectionPointerEvents="none" />
//             <Textarea {...form.getInputProps("coverLetter")}
//                 className="text-mine-shaft-900 font-semibold"
//                 readOnly={preview}
//                 variant={preview ? "unstyled" : "default"}
//                 withAsterisk placeholder="Type something about yourself..."
//                 label="Cover letter" autosize minRows={4} />
//             {!preview && <Button onClick={handlePreview}
//                 color="shakeSpeare.9"
//                 variant="light" >Preview</Button>}
//             {
//                 preview && <div className="flex gap-10 [&>*]:w-1/2">
//                     <Button fullWidth onClick={handlePreview}
//                         color="shakeSpeare.9"
//                         variant="outline" >Edit</Button>
//                     <Button fullWidth onClick={handleSubmit}
//                         color="shakeSpeare.7"
//                         variant="light" >Submit</Button>
//                 </div>
//             }
//         </div>
//     </>
// }
// export default ApplicationForm;
import {
    Button,
    FileInput,
    LoadingOverlay,
    NumberInput,
    Textarea,
    TextInput,
} from "@mantine/core";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { getBase64 } from "../../Services/Utilities";
import { useNavigate, useParams } from "react-router-dom";
import { applyJob } from "../../Services/JobService";
import {
    errorNotification,
    successNotification,
} from "../../Services/Notifications";
import { useSelector } from "react-redux";

interface ApplicationFormValues {
    name: string;
    email: string;
    phone: number | undefined;
    website: string;
    resume: File | null;
    coverLetter: string;
}

const ApplicationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);

    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);

    const form = useForm<ApplicationFormValues>({
        mode: "controlled",
        validateInputOnChange: true,
        initialValues: {
            name: "",
            email: "",
            phone: undefined,
            website: "",
            resume: null,
            coverLetter: "",
        },
        validate: {
            name: isNotEmpty("Full Name is required"),
            email: isNotEmpty("Email is required"),
            phone: (value) => (value ? null : "Phone Number is required"),
            website: isNotEmpty("Website is required"),
            resume: (value) => (value ? null : "Resume is required"),
            coverLetter: isNotEmpty("Cover letter is required"),
        },
    });

    const inputClassNames = preview
        ? {
            input: "text-mine-shaft-900 font-semibold",
            label: "text-mine-shaft-600 font-semibold",
        }
        : undefined;

    const handlePreview = () => {
        form.validate();
        if (!form.isValid()) return;
        setPreview(!preview);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async () => {
        setSubmit(true);
        try {
            const file = form.getValues().resume;
            const base64 = (await getBase64(file!)) as string;
            const applicant = {
                ...form.getValues(),
                applicantId: user.id,
                resume: base64.split(",")[1],
            };
            await applyJob(Number(id), applicant);
            successNotification("Success", "Application submitted successfully!");
            navigate("/job-history");
        } catch (err: any) {
            errorNotification(
                "Error",
                err?.response?.data?.errorMessage || "Something went wrong!"
            );
        } finally {
            setSubmit(false);
        }
    };

    return (
        <>
            <LoadingOverlay
                className="!fixed"
                visible={submit}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
                loaderProps={{ color: "shakeSpeare.6", type: "bars" }}
            />

            <div className="text-xl text-mine-shaft-600 font-semibold">
                Submit Your Application
            </div>

            <div className="flex flex-col gap-5 text-mine-shaft-900 font-semibold">
                {/* Name & Email */}
                <div className="flex gap-10 [&>*]:w-1/2">
                    {!preview ? (
                        <TextInput
                            {...form.getInputProps("name")}
                            label="Full Name"
                            withAsterisk
                            placeholder="Enter name"
                        />
                    ) : (
                        <div>
                            <label className="text-sm text-mine-shaft-600 font-semibold">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="text-mine-shaft-900 font-semibold">
                                {form.values.name || "-"}
                            </div>
                        </div>
                    )}
                    {!preview ? (
                        <TextInput
                            {...form.getInputProps("email")}
                            label="Email"
                            withAsterisk
                            placeholder="Enter email"
                        />
                    ) : (
                        <div>
                            <label className="text-sm text-mine-shaft-600 font-semibold">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <div className="text-mine-shaft-900 font-semibold">
                                {form.values.email || "-"}
                            </div>
                        </div>
                    )}
                </div>

                {/* Phone & Website */}
                <div className="flex gap-10 [&>*]:w-1/2">
                    {!preview ? (
                        <NumberInput
                            {...form.getInputProps("phone")}
                            label="Phone Number"
                            withAsterisk
                            hideControls
                            placeholder="Enter phone number"
                            min={100000000}
                            max={9999999999}
                        />
                    ) : (
                        <div>
                            <label className="text-sm text-mine-shaft-600 font-semibold">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <div className="text-mine-shaft-900 font-semibold">
                                {form.values.phone || "-"}
                            </div>
                        </div>
                    )}
                    {!preview ? (
                        <TextInput
                            {...form.getInputProps("website")}
                            label="Personal Website"
                            withAsterisk
                            placeholder="Enter URL"
                        />
                    ) : (
                        <div>
                            <label className="text-sm text-mine-shaft-600 font-semibold">
                                Personal Website <span className="text-red-500">*</span>
                            </label>
                            <div className="text-mine-shaft-900 font-semibold">
                                {form.values.website || "-"}
                            </div>
                        </div>
                    )}
                </div>

                {/* Resume */}
                {!preview ? (
                    <FileInput
                        {...form.getInputProps("resume")}
                        accept="application/pdf"
                        withAsterisk
                        leftSection={<IconPaperclip stroke={1.5} />}
                        label="Attach your CV"
                        placeholder="Your CV"
                        leftSectionPointerEvents="none"
                    />
                ) : (
                    <div>
                        <label className="text-sm text-mine-shaft-600 font-semibold">
                            Attach your CV <span className="text-red-500">*</span>
                        </label>
                        <div className="text-mine-shaft-900 font-semibold">
                            {form.values.resume?.name || "No file uploaded"}
                        </div>
                    </div>
                )}

                {/* Cover Letter */}
                {!preview ? (
                    <Textarea
                        {...form.getInputProps("coverLetter")}
                        label="Cover letter"
                        withAsterisk
                        autosize
                        minRows={4}
                        placeholder="Type something about yourself..."
                    />
                ) : (
                    <div>
                        <label className="text-sm text-mine-shaft-600 font-semibold">
                            Cover letter <span className="text-red-500">*</span>
                        </label>
                        <div className="text-mine-shaft-900 font-semibold whitespace-pre-line">
                            {form.values.coverLetter || "-"}
                        </div>
                    </div>
                )}

                {/* Actions */}
                {!preview ? (
                    <Button
                        onClick={handlePreview}
                        color="shakeSpeare.9"
                        variant="light"
                    >
                        Preview
                    </Button>
                ) : (
                    <div className="flex gap-10 [&>*]:w-1/2">
                        <Button
                            fullWidth
                            onClick={handlePreview}
                            color="shakeSpeare.9"
                            variant="outline"
                        >
                            Edit
                        </Button>
                        <Button
                            fullWidth
                            onClick={handleSubmit}
                            color="shakeSpeare.7"
                            variant="light"
                        >
                            Submit
                        </Button>
                    </div>
                )}
            </div>

        </>
    );
};

export default ApplicationForm;