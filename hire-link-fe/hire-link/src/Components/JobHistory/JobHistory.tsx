import { Tabs } from "@mantine/core";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import { useSelector } from "react-redux";

const JobHistory = () => {
    const profile = useSelector((state: any) => state.profile);
    const user = useSelector((state: any) => state.user);
    const [activeTab, setActiveTab] = useState<any>('APPLIED');
    const [jobList, setJobList] = useState<any>([]);
    const [showList, setShowList] = useState<any>([]);
    useEffect(() => {
        getAllJobs().then((res) => {
            setJobList(res);
            setShowList(res.filter((job: any) => {
                let found = false;
                job.applicants?.forEach((applicant: any) => {
                    if (applicant.applicantId === user.id && applicant.applicationStatus === "APPLIED") {
                        found = true;
                    }
                });
                return found;
            }))
        }).catch((err) => {
            console.error("Error fetching jobs:", err);
        })
    }, [])
    const handleTabChange = (value: string | null) => {
        setActiveTab(value);
        if (value === "SAVED") {
            const savedJobs = profile?.savedJobs || [];
            setShowList(jobList.filter((job: any) => savedJobs.includes(job.id)));
        } else {
            setShowList(jobList.filter((job: any) => {
                let found = false;
                job.applicants?.forEach((applicant: any) => {
                    if (applicant.applicantId === user.id && applicant.applicationStatus === value) {
                        found = true;
                    }
                });
                return found;
            }))
        };
    }
    //     const handleTabChange = (value: string | null) => {
    //     setActiveTab(value);
    //     if (value === "SAVED") {
    //         setShowList(jobList.filter((job: any) => profile.savedJobs?.includes(job.id)));
    //     }
    //     else {
    //         setShowList(
    //             jobList.filter((job: any) =>
    //                 job.applicants?.filter((applicant: any) =>
    //                     applicant.applicantId == profile.id &&
    //                     applicant.applicationStatus == value
    //                 ).length > 0
    //             )
    //         );
    //     }
    // };
    return <div>
        <div className="text-2xl text-mine-shaft-600 font-semibold mb-5">Job History</div>
        <div>
            <Tabs value={activeTab} onChange={handleTabChange} variant="outline" radius="lg" defaultValue="applied">
                <Tabs.List className="[&_button]:text-lg text-mine-shaft-600 font-semibold mb-5 [&_button[data-active='true']]:bg-fountain-blue-400 ">
                    <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
                    <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
                    <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
                    <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value={activeTab} className="[&>div]:w-full">
                    <div className="flex mt-10 flex-wrap gap-5">
                        {
                            showList.map((job: any, index: any) =>
                                <Card key={index} {...job} {...{ [activeTab.toLowerCase()]: true }} />)
                        }
                    </div>
                </Tabs.Panel>

            </Tabs>
        </div>
    </div >
}

export default JobHistory;