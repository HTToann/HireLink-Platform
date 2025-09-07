import { Button, Divider, FileInput, LoadingOverlay, Notification, NumberInput, rem, Textarea, TextInput } from "@mantine/core";
import { IconCheck, IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationForm from "./ApplicationForm";
import { timeAgo } from "../../Services/Utilities";

const ApplyJobComp = (props: any) => {
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [sec, setSec] = useState(5);
    const navigate = useNavigate();
    const handlePreview = () => {
        setPreview(!preview);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const handleSubmit = () => {
        setSubmit(true);
        let x = 5;
        setInterval(() => {
            x--;
            setSec(x)
            if (x == 0) navigate('/find-jobs');
        }, 1000)
    }
    return <>
        <div className="w-2/3 mx-auto">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-3 bg-mine-shaft-300 rounded-xl">
                        <img className="h-14" src={props.companyLogoUrl || '/Icons/defaultCompany.png'} alt="Company Logo" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-mine-shaft-600 font-semibold text-2xl">{props.jobTitle}</div>
                        <div className="text-lg text-mine-shaft-600">{props.company} &#x2022; {timeAgo(props.postTime)}
                            &#x2022; {props.applicants ? props.applicants.length : 0} Applicants</div>
                    </div>
                </div>
            </div>
            <Divider my="xl" />
            <ApplicationForm />
        </div>
        {/* <Notification className={`!border-bright-sun-400 -translate-y-20
         !fixed top-0 left-[35%] z-[1001]
        ${submit ? "translate-y-0" : "-translate-y-20"} 
        transition duration-300 ease-in-out  
        `}
            icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
            color="teal"
            title="Application Submitted!"
            mt="md"
            withBorder
            withCloseButton={false}
        >
            Redirecting to Find Jobs in {sec} seconds...
        </Notification > */}
    </>
}
export default ApplyJobComp;