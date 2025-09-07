import { Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../../Data/JobsData";
import MultiInput from "./MultiInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState<[number, number]>([0, 5000]);
    const handleChange = (event: any) => {
        dispatch(updateFilter({ salary: event }));

    }
    return <div className="flex px-5 py-8 items-center !text-mine-shaft-100 flex">
        {
            dropdownData.map((item, index) =>
                <>
                    <div key={index} className="w-1/5">
                        <MultiInput {...item} />
                    </div>
                    <Divider mr="xs"
                        size="xs"
                        orientation="vertical" />
                </>)
        }
        <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
            <div className="flex text-sm justify-between text-sm text-mine-shaft-600 font-semibold">
                <div>Salary</div>
                <div>&#x24;{value[0]} USD - &#x24;{value[1]} USD</div>
            </div>
            <RangeSlider color="shakeSpeare.7" size="xs"
                onChangeEnd={handleChange}
                min={1} max={5000}
                minRange={50}
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