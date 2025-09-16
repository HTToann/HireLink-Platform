import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled, IconMapPin } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { card, desc, skills } from "../../Data/JobDescData";
//@ts-ignore
import DOMPurify from "dompurify";
import { timeAgo } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { useEffect, useState } from "react";
import { postJob, updateStatusJob } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/Notifications";
import { useModals } from "@mantine/modals";

const JobDesc = (props: any) => {
    const dispatch = useDispatch();
    const modals = useModals();
    const [applied, setApplied] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const user = useSelector((state: any) => state.user);
    const data = DOMPurify.sanitize(props.description);
    const handleSaveJob = () => {
        let savedJobs: any = [...(profile.savedJobs || [])]
        if (savedJobs?.includes(props.id)) {
            savedJobs = savedJobs?.filter((id: any) => id !== props.id);
        } else {
            savedJobs = [...savedJobs, props.id];
        }
        let updatedProfile = { ...profile, savedJobs: savedJobs };
        dispatch(changeProfile(updatedProfile));
    }
    useEffect(() => {
        if (props.applicants?.filter((applicant: any) => applicant.applicantId === user.id).length > 0) {
            setApplied(true);
        }
        else
            setApplied(false);
    }, [props])
    const handleClose = () => {
        updateStatusJob(Number(props.id), "CLOSED")
            .then((res: any) => {
                successNotification("Job Closed", "Job has been closed successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 2000); // 2 giây là đẹp
            })
            .catch((error: any) => {
                console.error("Error closing job:", error);
                errorNotification("Error", "Failed to close the job. Please try again later.");
            });

        console.log("Closing job", props.id);
    };

    const handleOpen = () => {
        updateStatusJob(Number(props.id), "ACTIVE")
            .then((res: any) => {
                successNotification("Job Opened", "Job has been opened successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 2000); // 2 giây là đẹp
            })
            .catch((error: any) => {
                console.error("Error closing job:", error);
                errorNotification("Error", "Failed to close the job. Please try again later.");
            });

        console.log("Closing job", props.id);
    };
    const openDeleteConfirm = () => {
        modals.openConfirmModal({
            title: 'Confirm Delete',
            children: 'Are you sure you want to delete this job?',
            labels: { confirm: 'Yes', cancel: 'No' },
            confirmProps: { color: 'red' },
            onConfirm: handleDelete,
        });
    }
    const handleDelete = () => {
        updateStatusJob(Number(props.id), "DELETE")
            .then((res: any) => {
                successNotification("Job Closed", "Job has been deleted successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch((error: any) => {
                console.error("Error deleting job:", error);
                errorNotification("Error", "Failed to delete the job. Please try again later.");
            });
    };
    return <div className="w-2/3">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-3 bg-mine-shaft-300 rounded-xl">
                    <img className="h-14" src={props.companyLogoUrl || '/Icons/defaultCompany.png'} alt="Company Logo" />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-mine-shaft-600 font-semibold text-2xl">{props.jobTitle}</div>
                    <div className="text-lg text-mine-shaft-600">
                        {props.company} &#x2022; {timeAgo(props.postTime)} &#x2022;{" "}
                        {props.applicants ? props.applicants.length : 0} Applicants</div>
                </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
                {/* {
                    (props.edit || !applied) &&
                    <Link to={props.edit ? `/post-job/${props.id}` :
                        `/apply-job/${props.id}`}>
                        <Button color="brightSun.4" size="sm" variant="light" >
                            {props.closed ? "Re-Open" : props.edit ? "Edit" : "Apply"}</Button>
                    </Link>

                } */}
                {
                    (props.edit || !applied) &&
                    (props.closed ? (
                        <>
                            <Button
                                onClick={handleOpen}
                                color="shakeSpeare.9"
                                size="sm"
                                variant="light"
                            >
                                Re-Open
                            </Button>
                            <Button onClick={openDeleteConfirm} color="red.5" size="sm" variant="outline" >Delete</Button>
                        </>
                    ) : (
                        <Link to={props.edit ? `/post-job/${props.id}` : `/apply-job/${props.id}`}>
                            <Button color="shakeSpeare.9" size="sm" variant="light">
                                {props.edit ? "Edit" : "Apply"}
                            </Button>
                        </Link>
                    ))
                }
                {
                    (!props.edit && applied) && <Button color="green.8" size="sm" variant="light" >Applied</Button>

                }
                {
                    props.edit && !props.closed ?
                        <Button onClick={handleClose} color="red.5" size="sm" variant="outline" >Close</Button>
                        : profile.savedJobs?.includes(props.id) ?
                            <IconBookmarkFilled onClick={handleSaveJob} className="text-fountain-blue-900 cursor-pointer" stroke={1.5} />
                            : <IconBookmark onClick={handleSaveJob} className="text-shakespeare-700 cursor-pointer
                    hover:text-shakespeare-400"
                                stroke={1.5} />
                }
            </div>
        </div>
        <Divider my="xl" />
        <div className="flex justify-between">
            {
                card.map((item: any, index: number) =>
                    <div key={index} className="flex flex-col items-center gap-1">
                        <ActionIcon
                            color="shakeSpeare.7"
                            className="!h-12 !w-12"
                            variant="light"
                            radius="xl"
                            aria-label="Settings"
                        >
                            <IconMapPin className="h-4/5 w-4/5" stroke={1.5} />
                        </ActionIcon>

                        <div className="text-sm text-mine-shaft-600 font-semibold">{item.name}</div>
                        <div className="font-semibold  text-mine-shaft-300 font-semibold">{props ? props[item.id] : "NA"}
                            {item.id == "packageOffered" && <>$</>}</div>
                    </div>)
            }
        </div>
        <Divider my="xl" />

        <div>
            <div className="text-xl text-mine-shaft-600 font-semibold mb-5">Required Skills</div>
            <div className="flex flex-wrap gap-2">
                {
                    props?.skillsRequired?.map((skill: any, index: number) =>
                        <ActionIcon key={index}
                            color="shakeSpeare.9"
                            className="!h-fit font-medium !text-sm !w-fit"
                            variant="light"
                            p="xs"
                            radius="xl"
                            aria-label="Settings"
                        >
                            {skill}
                        </ActionIcon>)
                }

            </div>
        </div>
        <Divider my="xl" />
        <div className="[&_h4]:text-xl
         [&_h4]:my-5 
          [&_h4]:font-semibold
          [&_h4]:text-mine-shaft-600
          [&_p]:text-justify
          [&_*]:text-mine-shaft-500
           [&_li]:marker:text-fountain-blue-400
           [&_li]:mb-1
         "
            dangerouslySetInnerHTML={{ __html: data }}>
        </div>
        <Divider my="xl" />
        <div>
            <div className="text-xl text-mine-shaft-600 font-semibold mb-5">About Company</div>
            <div className="flex justify-between mb-3">
                {/* <div className="flex gap-2 items-center"> */}
                {/* <div className="p-3 bg-mine-shaft-800 rounded-xl">
                        <img className="h-8" src={`/Icons/${props.company}.png`} alt="" />
                    </div> */}
                {/* <div className="flex flex-col">
                        <div className="font-medium text-mine-shaft-600 text-lg">{props.company}</div>
                        <div className="text-lg text-mine-shaft-300 font-semibold">10K Employess</div>
                    </div> */}
                {/* </div> */}

                {/* <Link to={`/company/${props.company}`} >
                    <Button color="shakeSpeare.9" variant="light" >Company Page</Button>
                </Link> */}
            </div>
            <div className="text-mine-shaft-500 " text-justify>{props.about}</div>
        </div>
    </div >
}
export default JobDesc;