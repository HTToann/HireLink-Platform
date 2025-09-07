import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApplyJobComp from "../Components/ApplyJob/ApplyJobComp";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const ApplyJobPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [job, setJob] = useState<any>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        getJob(Number(id)).then((res) => {
            setJob(res);
        }).catch((err) => {
            console.log(err);
        })
    }, [id])
    return (
        <div className="min-h-[90vh] bg-shakespeare-100 font-['poppins'] p-4">
            <div className="my-4 inline-block">
                <Button my="md"
                    onClick={() => navigate(-1)}
                    leftSection={<IconArrowLeft size={20} />}
                    color="shakeSpeare.9" variant="light" fullWidth>Back</Button>
            </div>
            <ApplyJobComp {...job} />
        </div>
    )
}
export default ApplyJobPage;