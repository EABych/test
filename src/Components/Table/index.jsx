import * as React from 'react';
import {useMemo, useEffect} from 'react';
import {MantineReactTable, useMantineReactTable} from 'mantine-react-table';
import {Menu} from '@mantine/core';

const Table = () => {
    const [columnPinning, setColumnPinning] = React.useState({
        left: ['mrt-row-select'],
        right: ['mrt-row-actions'],
    });

    const [data, setData] = React.useState([]);

    const getSlates = async () => {
        fetch('https://api.dev.slatepages.com/v2.0/accounts/uGyKPHUFeUiTK8WsJX83jg/views/ADQdjL0uSj6Bn4AjPK_Gyg/slates', {
            method: 'GET',
            credentials: "same-origin"
        })
            .then((response) => response.json())
            .then((json) => {
                setData(json.data.data.map(({slateUUID, columns}) => {
                    return {
                        uuid: slateUUID,
                        slate_title: columns[0].value,
                        boolean: columns[1].value.toString(),
                    }
                }))
            }).catch(() => {
        });
    }

    useEffect(() => {
        getSlates()
    }, []);


    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'uuid', //access nested data with dot notation
                header: 'Uuid',
            },
            {
                accessorKey: 'slate_title',
                header: 'Slate Title',
            },
            {
                accessorKey: 'boolean', //normal accessorKey
                header: 'Boolean',
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
                <Menu.Item onClick={() => {
                }}>
                    {'Do nothing'}
                </Menu.Item>
            </>
        ),
        getRowId: (originalRow) => originalRow.uuid,
        mantineTableBodyRowProps: ({row}) => ({
            onClick: () => {window.parent.postMessage({type: 'openSlate', message: row.id}, 'http://local.dev.slatepages.com:3001');},
            sx: {
                cursor: 'pointer', //you might want to change the cursor too when adding an onClick
            },
        }),
    });

    return <MantineReactTable table={table}/>;
};

export default Table;
