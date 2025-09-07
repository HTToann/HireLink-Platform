import {
    Checkbox,
    CheckIcon,
    Combobox,
    Group,
    Input,
    Pill,
    PillsInput,
    useCombobox,
} from '@mantine/core';
import { IconSelector } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../Slices/FilterSlice';

const MultiInput = (props: any) => {
    const dispatch = useDispatch();
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const [search, setSearch] = useState('');
    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState<string[]>([]);

    useEffect(() => {
        setData(props.options || []);
    }, [props.options]);

    const exactOptionMatch = data.some((item) => item === search);

    const handleValueSelect = (val: string) => {
        setSearch('');

        if (val === '$create') {
            setData((current) => [...current, search]);
            setValue((current) => [...current, search]);
            dispatch(updateFilter({ [props.title]: [...value, search] }));
        } else {
            const updated = value.includes(val)
                ? value.filter((v) => v !== val)
                : [...value, val];
            setValue(updated);
            dispatch(updateFilter({ [props.title]: updated }));
        }
    };

    const handleValueRemove = (val: string) => {
        const updated = value.filter((v) => v !== val);
        setValue(updated);
        dispatch(updateFilter({ [props.title]: updated }));
    };

    const filteredOptions = data.filter((item) =>
        item.toLowerCase().includes(search.trim().toLowerCase())
    );

    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item} active={value.includes(item)}>
            <Group gap="sm">
                <Checkbox
                    size="xs"
                    color="shakeSpeare.7"
                    className="border border-shakespeare-700"
                    checked={value.includes(item)}
                    onChange={() => { }}
                    aria-hidden
                    tabIndex={-1}
                    style={{ pointerEvents: 'none' }}
                />
                <span className="text-sm text-mine-shaft-600 font-semibold">{item}</span>
            </Group>
        </Combobox.Option>
    ));

    const pills = value.slice(0, 1).map((item) => (
        <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
            {item}
        </Pill>
    ));

    return (
        <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
            <Combobox.DropdownTarget>
                <PillsInput
                    variant="unstyled"
                    rightSection={<IconSelector />}
                    onClick={() => combobox.toggleDropdown()}
                    leftSection={
                        <div className="text-shakespeare-700 p-1 bg-fountain-blue-300 rounded-full mr-2">
                            <props.icon />
                        </div>
                    }
                >
                    <Pill.Group>
                        {value.length > 0 ? (
                            <>
                                {pills}
                                {value.length > 1 && <Pill>+{value.length - 1} more</Pill>}
                            </>
                        ) : (
                            <Input.Placeholder className="!text-sm text-mine-shaft-600 font-semibold">
                                {props.title}
                            </Input.Placeholder>
                        )}
                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown>
                <Combobox.Search
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    placeholder="Search..."
                />
                <Combobox.Options>
                    <div
                        style={{
                            maxHeight: '240px',
                            overflowY: 'auto',
                            paddingRight: '4px',
                        }}
                    >
                        {options}

                        {!exactOptionMatch && search.trim().length > 0 && (
                            <Combobox.Option
                                value="$create"
                                className="text-sm text-mine-shaft-600 font-semibold"
                            >
                                + Create {search}
                            </Combobox.Option>
                        )}

                        {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
                            <Combobox.Empty className="text-sm text-mine-shaft-600 font-semibold">
                                Nothing found
                            </Combobox.Empty>
                        )}
                    </div>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

export default MultiInput;
