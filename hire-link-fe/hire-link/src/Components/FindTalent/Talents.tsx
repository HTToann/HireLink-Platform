import { useEffect, useState } from "react";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalendCard";
import { getAllProfiles } from "../../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";

const Talents = () => {
    const dispatch = useDispatch();
    const [talents, setTalents] = useState<any>([]);
    const filter = useSelector((state: any) => state.filter);
    const sort = useSelector((state: any) => state.sort);
    const [filterTalents, setFilteredTalents] = useState<any>([]);
    useEffect(() => {
        dispatch(resetFilter());
        getAllProfiles().then((data) => {
            setTalents(data);
        }).catch((error) => {
            console.error("Error fetching talents:", error);
        })
    }, []);
    useEffect(() => {
        if (sort == "Experience: Low to High") {
            setTalents([...talents].sort((a: any, b: any) => a.totalExp - b.totalExp));
        }
        else if (sort == "Experience: High to Low") {
            setTalents([...talents].sort((a: any, b: any) => b.totalExp - a.totalExp));
        }
    }, [sort]);
    useEffect(() => {
        let filterTalent = talents;
        console.log(filter);
        if (filter.name)
            filterTalent = filterTalent.filter((talent: any) =>
                talent.name.toLowerCase().includes(filter.name.toLowerCase()));

        if (filter["Job Title"] && filter["Job Title"].length > 0) {
            filterTalent = filterTalent.filter((talent: any) =>
                talent.jobTitle &&
                filter["Job Title"].some((title: any) =>
                    title && talent.jobTitle.toLowerCase().includes(title.toLowerCase())
                )
            );
        }

        if (filter.Location && filter.Location.length > 0) {
            filterTalent = filterTalent.filter((talent: any) =>
                talent.location &&
                filter.Location.some((location: any) =>
                    location && talent.location.toLowerCase().includes(location.toLowerCase())
                )
            );
        }

        if (filter.Skills && filter.Skills.length > 0) {
            filterTalent = filterTalent.filter((talent: any) =>
                Array.isArray(talent.skills) &&
                filter.Skills.some((skill: any) =>
                    skill &&
                    talent.skills.some((talentSkill: any) =>
                        talentSkill && talentSkill.toLowerCase().includes(skill.toLowerCase())
                    )
                )
            );
        }

        if (filter.exp && filter.exp.length > 0) {
            filterTalent = filterTalent.filter((talent: any) =>
                typeof talent.totalExp === 'number' &&
                filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1]
            );
        }
        setFilteredTalents(filterTalent);
    }, [filter, talents]);
    return <div className="p-5">
        <div className="flex justify-between ">
            <div className="text-2xl text-mine-shaft-600 font-semibold">Talents</div>
            <Sort />
        </div>
        <div className="mt-10 flex flex-wrap gap-5 justify-between">
            {
                filterTalents?.length ? filterTalents.map((talent: any, index: any) =>
                    <TalentCard key={index} {...talent} />) :
                    <div className="text-xl font-semibold">No Talents Found</div>
            }
        </div>
    </div >
}
export default Talents;