import { Button, Divider, Text } from "@mantine/core";

import { IconBookmark, IconBookmarkFilled, IconCalendarMonth, IconClockHour3 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { formatInterviewTime, timeAgo } from "../../Services/Utilities";
import { changeProfile } from "../../Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Ho_Chi_Minh");
const Card = (props: any) => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
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

    return <div className="bg-shakespeare-400 p-4 w-72 
    flex flex-col gap-3 rounded-xl
    hover:shadow-[0_0_5px_1px_yellow]
    !shadow-fountain-blue-600
    ">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-shakespeare-600 rounded-md">
                    <img className="h-7" src={props.companyLogoUrl || '/Icons/defaultCompany.png'} alt="Company Logo" />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-mine-shaft-700 font-semibold">{props.jobTitle}</div>
                    <div className="text-xs text-mine-shaft-500 font-semibold">{props.company} &#x2022; {props.applicants ? props.applicants.length : 0} Applicants</div>
                </div>
            </div>
            {
                profile.savedJobs?.includes(props.id) ?
                    <IconBookmarkFilled onClick={handleSaveJob} className="text-fountain-blue-900 cursor-pointer" stroke={1.5} />
                    : <IconBookmark onClick={handleSaveJob} className="text-shakespeare-700 cursor-pointer
                hover:text-shakespeare-900 "
                        stroke={1.5} />
            }

        </div>
        <div className="
        flex gap-2
         [&>div]:py-1
         [&>div]:px-2
     [&>div]:bg-fountain-blue-900
         [&>div]:text-shakespeare-500
         [&>div]:rounded-lg
         text-xs ">
            <div>{props.experience}</div>
            <div>{props.jobType}</div>
            <div>{props.location}</div>
        </div>
        <Text className="!text-xs 
            text-justify 
            text-mine-shaft-800 font-semibold "
            lineClamp={2} >
            {props.about}
        </Text>
        <Divider size="xs" color="mineShaft.7" />
        <div className="flex justify-between">
            <div className="font-semibold text-mine-shaft-600">
                &#x24;{props.packageOffered}
            </div>
            <div className="flex gap-1 text-xs text-mine-shaft-600 items-center">
                <IconClockHour3 className="h-5 w-5" stroke={1.5} />
                {props.applied || props.interviewing ? "Applied" : props.offered ? "Interviewed" : "Posted"} {timeAgo(props.postTime)}
            </div>
        </div>
        {
            (props.offered || props.interviewing) && <Divider size="xs" color="mineShaft.7" />
        }
        {
            // props.offered &&
            // // <div className="flex gap-2">
            // //     <Button color="shakeSpeare.9" variant="outline" fullWidth>Accept</Button>
            // //     <Button color="shakeSpeare.7" variant="light" fullWidth>Reject</Button>
            // // </div>
        }

        {props.interviewing && props.applicants?.[0]?.interviewTime && (
            <div className="flex gap-1 text-sm items-center">
                <IconCalendarMonth className="w-5 h-5" stroke={1.5} />
                {formatInterviewTime(props.applicants[0].interviewTime)}
            </div>
        )}
        <Link to={`/jobs/${props.id}`} className="mt-2">
            <Button fullWidth variant="light" color="shakeSpeare.9"> View Details</Button>
        </Link>
    </div >
}
export default Card;