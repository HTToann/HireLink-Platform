import { Divider, Input, RangeSlider } from "@mantine/core";
import React, { useState } from "react";
import MultiInput from "../FindJobs/MultiInput";
import { searchFields } from "../../Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState<[number, number]>([0, 40]);
    const [name, setName] = useState('');
    const handleChange = (name: any, event: any) => {
        if (name == "exp")
            dispatch(updateFilter({ exp: event }));
        else {
            dispatch(updateFilter({ name: event.target.value }));
            setName(event.target.value);
        }
    }
    return <div className="flex px-5 py-8 items-center !text-mine-shaft-100 flex">
        <div className="flex items-center">
            <div className="text-shakespeare-700
              bg-fountain-blue-300 rounded-full p-1 mr-2"><IconUserCircle size={20} />
            </div>
            <Input defaultValue={name}
                onChange={(e) => handleChange('name', e)}
                className="[&_input]:!placeholder text-mine-shaft-600" variant="unstyled" placeholder="Talent Name" />
        </div>
        {
            searchFields.map((item, index) =>
                <>
                    <React.Fragment key={index}>
                        <div className="w-1/5">
                            <MultiInput {...item} />
                        </div>
                        <Divider mr="xs"
                            size="xs"
                            orientation="vertical" />
                    </React.Fragment>
                </>)
        }
        <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
            <div className="flex text-sm justify-between text-sm text-mine-shaft-600 font-semibold">
                <div>Experience (Year)</div>
                <div>{value[0]} - {value[1]}</div>
            </div>
            <RangeSlider
                onChangeEnd={(e) => handleChange("exp", e)}
                color="shakeSpeare.7" size="xs" value={value}
                min={1} max={40}
                minRange={1}
                labelTransitionProps={{
                    transition: 'skew-down',
                    duration: 150,
                    timingFunction: 'linear'
                }}

                onChange={setValue} />
        </div>
    </div >
}
export default SearchBar;