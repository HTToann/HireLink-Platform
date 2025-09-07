import { formatDate } from "../../Services/Utilities";

const ExpCard = (props: any) => {
    return <div className="flex flex-col gap-2">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                {/* <div className="p-2 bg-mine-shaft-800 rounded-md">
                    <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
                </div> */}
                <div className="flex flex-col">
                    <div className="text-mine-shaft-600 font-semibold">{props.title}</div>
                    <div className="text-sm text-mine-shaft-600 font-semibold">
                        {props.company} &bull; {props.location}
                    </div>
                </div>
            </div>
            <div className="text-sm text-mine-shaft-600 font-semibold">
                {formatDate(props.startDate)} –  {formatDate(props.endDate)}
            </div>
        </div>
        <div className="text-sm text-mine-shaft-600 text-justify">
            {props.description}
        </div>
    </div>

};

export default ExpCard;