import { Tabs } from '@mantine/core';
import PostedJobCard from './PostedJobCard';
import { useEffect, useState } from 'react';

const PostedJob = (props: any) => {
    const [activeTab, setActiveTab] = useState<string | null>('ACTIVE');
    useEffect(() => {
        setActiveTab(props.job?.jobStatus || 'ACTIVE');
    }, [props.job])
    return <div className="w-1/5 mt-5 ">
        <div className="text-2xl text-mine-shaft-600 font-semibold mb-5">Jobs</div>
        <div>
            <Tabs autoContrast variant="pills" value={activeTab} onChange={setActiveTab}>
                <Tabs.List className="[&_button[aria-selected='false']]:bg-fountain-blue-700
                 font-medium">
                    <Tabs.Tab value="ACTIVE">Active
                        [{props.jobList?.filter((job: any) =>
                            job?.jobStatus == "ACTIVE").length || 0}]
                    </Tabs.Tab>
                    <Tabs.Tab value="DRAFT">Drafts
                        [  {props.jobList?.filter((job: any) =>
                            job?.jobStatus == "DRAFT").length || 0}]
                    </Tabs.Tab>
                    <Tabs.Tab value="CLOSED">Closed
                        [  {props.jobList?.filter((job: any) =>
                            job?.jobStatus == "CLOSED").length || 0}]
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs>
            <div className="flex flex-col flex-wrap mt-5 gap-5">
                {
                    props.jobList?.filter((x: any) =>
                        x?.jobStatus == activeTab).map((item: any, index: any) =>
                            <PostedJobCard key={index} {...item} />)
                }
            </div>

        </div>
    </div>
}

export default PostedJob;
