import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";

import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../../Services/ProfileService";
import { changeAppStatus } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/Notifications";
import { error } from "console";
import { formatInterviewTime, openBase64PDF } from "../../Services/Utilities";

const TalentCard = (props: any) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const [date, setDate] = useState<Date | null>(null);
    const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
    const [time, setTime] = useState<any>(null);
    const [profile, setProfile] = useState<any>({});
    const handleOffer = (status: string) => {
        let interview: any = { id, applicantId: profile?.id, applicationStatus: status }
        if (status === "INTERVIEWING" && (!date || !time)) {
            errorNotification("Error", "Please select date and time for the interview");
            return;
        }
        if (status == "INTERVIEWING") {
            const [hours, minutes] = time.split(":").map(Number);
            date?.setHours(hours, minutes);
            interview = { ...interview, interviewTime: date };
        }
        changeAppStatus(interview).then((res) => {
            if (status == "INTERVIEWING")
                successNotification("Interview Scheduled", "Interview scheduled successfully");
            else if (status == "OFFERED")
                successNotification("Offered", "Offer had been sent successfully");
            else
                successNotification("Rejected", "Application has been rejected successfully");
            window.location.reload();
        }).catch((err) => {
            errorNotification("Error", "Error scheduling interview");
            console.error("Error scheduling interview:", err.response.data.errorMessage);
        });
    }
    useEffect(() => {
        if (props.applicantId)
            getProfile(props.applicantId).then((res) => {
                setProfile(res);
            }).catch((err) => {
                console.error("Error fetching profile:", err);
            });
        else
            setProfile(props);
        console.log("RES", props);


    }, [props])
    const ref = useRef<HTMLInputElement>(null);
    return <div className="bg-shakespeare-400 p-4 w-96 
    flex flex-col gap-3 rounded-xl
    hover:shadow-[0_0_5px_1px_yellow]
    !shadow-fountain-blue-600
    ">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-2 rounded-full">
                    <Avatar src={profile?.picture || `/defaultAvatar.png`} alt="it's me" />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-mine-shaft-700 font-semibold text-lg">{props.name}</div>
                    <div className="text-sm text-mine-shaft-500 font-semibold"> {profile?.jobTitle}
                        {profile.company?.trim() && `• ${profile.company}`}
                    </div>
                </div>
            </div>
            <IconHeart className="text-shakespeare-700 cursor-pointer " stroke={1.5} />
        </div>
        <div className="flex gap-2">
            {
                profile?.skills?.map((skill: any, index: any) => index < 5 && (
                    <div key={index}
                        className="p-2 py-1 bg-fountain-blue-900 text-shakespeare-500 rounded-lg text-xs" >{skill}
                    </div>
                ))}
        </div>
        <Text className="!text-xs 
            text-justify 
             text-mine-shaft-800 font-semibold "
            lineClamp={3} >
            {profile?.about}
        </Text>
        <Divider size="xs" color="mineShaft.7" />
        {
            props.invited ? <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
                <IconCalendarMonth stroke={1.5} />Interview: {formatInterviewTime(props.interviewTime)}
            </div> : <div className="flex justify-between">
                <div className="font-semibold text-mine-shaft-600">
                    EXP : {props.totalExp ? props.totalExp : 1} Years
                </div>
                <div className="flex gap-1 text-xs font-semibold text-mine-shaft-600 items-center">
                    <IconMapPin className="h-5 w-5" stroke={1.5} /> {profile.location}
                </div>
            </div>
        }
        <Divider size="xs" color="mineShaft.7" />
        <div className="flex [&>*]:w-1/2  [&>*]:p-1">
            {
                !props.invited && <>
                    <Link to={`/talent-profile/${profile?.id}`}>
                        <Button color="shakeSpeare.7" variant="outline" fullWidth>Profile</Button>
                    </Link>
                    <div className="text-mine-shaft-900 font-semibold" >
                        {
                            props.posted ? <Button onClick={open} rightSection={<IconCalendarMonth className="w-5 h-5 " />}
                                color="shakeSpeare.9" variant="light" fullWidth>Schedule</Button> :
                                <Button
                                    onClick={() => navigate(`/chat/${profile?.id}`)}
                                >
                                    Message
                                </Button>
                        }
                    </div>
                </>
            }
            {
                props.invited &&
                <>
                    <div>
                        <Button onClick={() => handleOffer("OFFERED")}
                            color="shakeSpeare.7" variant="outline" fullWidth>Accept</Button>

                    </div>
                    <div>
                        <Button onClick={() => handleOffer("REJECTED")}
                            color="shakeSpeare.9" variant="light" fullWidth>Reject</Button>
                    </div>
                </>
            }
        </div>
        {
            (props.invited || props.posted) &&
            <Button onClick={openApp} autoContrast color="shakeSpeare.7" variant="filled" fullWidth>View Application</Button>
        }
        <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
            <div className=" flex flex-col gap-4">
                <DateInput
                    value={date}
                    minDate={new Date()}
                    onChange={(val) => setDate(val ? new Date(val) : null)}
                    label="Date"
                    placeholder="Enter date"
                />
                <TimeInput label="Time" value={time}
                    onChange={(event) => setTime(event.currentTarget.value)}
                    ref={ref} onClick={() => ref.current?.showPicker()} />
                <Button onClick={() => handleOffer("INTERVIEWING")}

                    color="shakeSpeare.7" variant="light" fullWidth>Schedule</Button>
            </div>
        </Modal>
        <Modal opened={app} onClose={closeApp} title="Application" centered>
            <div className=" flex flex-col gap-4">
                <div>
                    Email: &emsp;
                    <a
                        className="text-bright-sun-400 hover:underline cursor-pointer text-center"
                        href={`mailto:${props.email}`}
                    >
                        {props.email}
                    </a>
                </div>

                <div>
                    Website: &emsp;
                    <a
                        className="text-bright-sun-400 hover:underline cursor-pointer text-center"
                        target="_blank"

                        href={props.website}
                    >
                        {props.website}
                    </a>
                </div>

                <div>
                    Resume: &emsp;
                    <span
                        onClick={() => openBase64PDF(props.resume)}
                        className="text-bright-sun-400 hover:underline cursor-pointer text-center"
                    >
                        {props.name}
                    </span>
                </div>
                <div>
                    Cover Letter : &emsp; <div>{props.coverLetter}</div>
                </div>
            </div>
        </Modal >
    </div >
}

export default TalentCard;