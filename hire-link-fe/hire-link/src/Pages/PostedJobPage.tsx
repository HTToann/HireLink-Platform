import { Divider } from '@mantine/core';
import PostedJob from '../Components/PostedJob/PostedJob';
import PostedJobDesc from '../Components/PostedJob/PostedJobDesc';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getJobPostedBy } from '../Services/JobService';

const PostedJobPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector((state: any) => state.user);
    const [jobList, setJobList] = useState<any[]>([]);
    const [job, setJob] = useState<any>({});
    useEffect(() => {
        window.scrollTo(0, 0);
        getJobPostedBy(user.id).then((res) => {
            setJobList(res);
            if (res && res.length > 0 && Number(id) == 0)
                navigate(`/posted-job/${res[0].id}`);
            setJob(res.find((item: any) => item.id == id));
        }).catch((err) => {
            console.error("Error fetching jobs:", err);
        })
    }, [id])
    return (
        <div className="min-h-[90vh] bg-shakespeare-100 font-['poppins'] p-4">
            <Divider size="xs" my="md" />
            <div className="flex gap-5">
                <PostedJob job={job} jobList={jobList} />
                <PostedJobDesc {...job} />
            </div>
        </div>
    );
};

export default PostedJobPage;
