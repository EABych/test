import * as React from 'react';
import {useMemo} from 'react';
import {MantineReactTable, useMantineReactTable} from 'mantine-react-table';
import {Menu} from '@mantine/core';

const data = [
    {
        name: {
            firstName: 'Zachary',
            lastName: 'Davis',
        },
        address: '261 Battle Ford',
        city: 'Columbus',
        state: 'Ohio',
    },
    {
        name: {
            firstName: 'Robert',
            lastName: 'Smith',
        },
        address: '566 Brakus Inlet',
        city: 'Westerville',
        state: 'West Virginia',
    },
    {
        name: {
            firstName: 'Kevin',
            lastName: 'Yan',
        },
        address: '7777 Kuhic Knoll',
        city: 'South Linda',
        state: 'West Virginia',
    },
    {
        name: {
            firstName: 'John',
            lastName: 'Upton',
        },
        address: '722 Emie Stream',
        city: 'Huntington',
        state: 'Washington',
    },
    {
        name: {
            firstName: 'Nathan',
            lastName: 'Harris',
        },
        address: '1 Kuhic Knoll',
        city: 'Ohiowa',
        state: 'Nebraska',
    },
];

const Table = () => {
    const [columnPinning, setColumnPinning] = React.useState({
        left: ['mrt-row-select'],
        right: ['mrt-row-actions'],
    });

    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name.firstName', //access nested data with dot notation
                header: 'First Name',
            },
            {
                accessorKey: 'name.lastName',
                header: 'Last Name',
            },
            {
                accessorKey: 'address', //normal accessorKey
                header: 'Address',
            },
            {
                accessorKey: 'city',
                header: 'City',
            },
            {
                accessorKey: 'state',
                header: 'State',
            },
        ],
        [],
    );

    const table = useMantineReactTable({
        columns,
        data,
        positionActionsColumn: 'last',
        enableRowSelection: true,
        enableRowActions: true,
        // enablePinning: true,
        state: {
            columnPinning: columnPinning,
        },
        onColumnPinningChange: setColumnPinning,
        renderRowActionMenuItems: () => (
            <>
                <Menu.Item onClick={() => console.info('Deactivate')}>
                    Deactivate
                </Menu.Item>
                <Menu.Item onClick={() => console.info('Delete')}>Delete</Menu.Item>
            </>
        ),
    });

    return <MantineReactTable table={table}/>;
};

export default Table;
