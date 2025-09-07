import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import JobDesc from "../Components/JobDesc/JobDesc";
import RecommendedJobs from "../Components/JobDesc/RecommendedJobs";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const JobPage = () => {
    const { id } = useParams();
    const [job, setJob] = useState<any>(null);
    const navigate = useNavigate();
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
            {/* <Link className="my-4 inline-block" to="/find-jobs">
                <Button
                    leftSection={<IconArrowLeft size={20} />}
                    color="shakeSpeare.9" variant="light" fullWidth>Back</Button>
            </Link> */}
            <Button
                my="xs" // nhỏ hơn "md"
                onClick={() => {
                    if (window.history.length > 1) navigate(-1);
                    else navigate("/find-jobs");
                }}
                size="xs" // nhỏ nhất trong các size hỗ trợ
                leftSection={<IconArrowLeft size={16} />} // icon cũng nhỏ hơn
                color="shakeSpeare.9"
                variant="light"
                fullWidth={false}
                className="px-3 py-1 text-sm w-fit" // override kích thước gọn lại
            >
                Back
            </Button>
            <div className="flex gap-5 justify-around">
                <JobDesc {...job} />
                <RecommendedJobs />
            </div>
        </div>
    )
}
export default JobPage;