import { useState } from 'react';
import { Button, Combobox, useCombobox, Text, Box } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateSort } from '../../Slices/SortSlice';

const opt = ['Relevance', 'Most Recent', 'Salary: Low to High', 'Salary: High to Low'];
const talentOpt = ['Relevance', 'Experience: Low to High', 'Experience: High to Low'];
const Sort = (props: any) => {
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const options = props.sort == "job" ? opt.map((item) => (
        <Combobox.Option className="!text-xs" value={item} key={item}>
            {item}
        </Combobox.Option>
    )) : talentOpt.map((item) => (
        <Combobox.Option className="!text-xs" value={item} key={item}>
            {item}
        </Combobox.Option>
    ));
    return (


        <Combobox
            store={combobox}
            width={170}

            position="bottom-start"

            onOptionSubmit={(val) => {
                setSelectedItem(val);
                dispatch(updateSort(val));
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <div onClick={() => combobox.toggleDropdown()}
                    className='cursor-pointer 
                    border border-shakespeare-600
                    flex gap-2 px-2 py-1 text-xl rounded-xl
                    items-center 
                    text-mine-shaft-700 font-semibold
                 '>
                    {selectedItem}
                    <IconAdjustments
                        className=" h-5 w-5 text-shakespeare-600" />
                </div>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
export default Sort;