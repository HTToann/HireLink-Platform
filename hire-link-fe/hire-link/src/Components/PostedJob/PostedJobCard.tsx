import { Link, useParams } from "react-router-dom";
import { timeAgo } from "../../Services/Utilities";

const PostedJobCard = (props: any) => {
    const { id } = useParams();
    return (
        <Link
            to={`/posted-job/${props.id}`}
            className={`rounded-xl p-2 w-52 border-l-2 hover:bg-opacity-80 cursor-pointer 
                border-l-fountain-blue-700 ${props.id == id ? "bg-shakespeare-400 text-black" :
                    "bg-fountain-blue-900 text-mine-shaft-300"}`}
        >
            <div className="text-sm text-mine-shaft-100 font-semibold">{props.jobTitle}</div>
            <div className="text-xs text-mine-shaft-200 font-medium">{props.location}</div>
            <div className="text-xs text-mine-shaft-300">
                {props.jobStatus == "DRAFT" ? "Drafted " :
                    props.jobStatus == "CLOSED" ? "Closed " : "Posted "}
                {timeAgo(props.postTime)}</div>
        </Link>
    );
};

export default PostedJobCard;
