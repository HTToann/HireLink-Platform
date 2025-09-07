import { Combobox, InputBase, ScrollArea, useCombobox } from '@mantine/core';
import { useEffect, useState } from 'react';



const SelectInput = (props: any) => {
    useEffect(() => {
        const val = props.form.getInputProps(props.name).value;
        setData(props.options || []);
        setValue(val);
        setSearch(val);
    }, [props.options]);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const exactOptionMatch = data.some((item) => item === search);
    const filteredOptions = exactOptionMatch
        ? data
        : data.filter((item) => item.toLowerCase().includes(search?.toLowerCase().trim()));

    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                if (val === '$create') {
                    setData((current) => [...current, search]);
                    setValue(search);
                    props.form.setFieldValue(props.name, search);
                } else {
                    setValue(val);
                    setSearch(val);
                    props.form.setFieldValue(props.name, val);

                }

                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase {...props.form.getInputProps(props.name)}
                    withAsterisk
                    className="text-mine-shaft-500"
                    label={props.label}
                    value={search}
                    leftSection={<props.leftSection stroke={1.5} />}
                    rightSection={<Combobox.Chevron />}
                    onChange={(event) => {
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value);
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(value || '');
                    }}
                    placeholder={props.placeholder}
                    rightSectionPointerEvents="none"
                />
            </Combobox.Target>

            {(filteredOptions.length > 0 || (!exactOptionMatch && search?.trim()?.length > 0)) && (
                <Combobox.Dropdown>
                    <Combobox.Options>
                        <ScrollArea.Autosize mah={200} type="scroll">
                            {options}
                            {!exactOptionMatch && search?.trim()?.length > 0 && (
                                <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
                            )}
                        </ScrollArea.Autosize>
                    </Combobox.Options>
                </Combobox.Dropdown>
            )}
        </Combobox>
    );
}
export default SelectInput;