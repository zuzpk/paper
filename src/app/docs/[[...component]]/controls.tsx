"use client"
import { Control } from '@/types';
import { Box, dynamicObject, Input, Option, Select, Switch, Table, useDebounce, Variant } from '@zuzjs/ui';
import React, { useMemo } from 'react';

const Controls : React.FC<{
    args: dynamicObject,
    argTypes: Control<any>[],
    onArgChange: (k: string, v: any) => void
}> = ({ args, argTypes, onArgChange }) => {

    const debounce = useDebounce((ev, row) => onArgChange(row.name, ev.target.value), 1000)

    const rows = useMemo(() => {

        return Object.keys(argTypes)
            .map((k : any) => {
                const c = argTypes[k]
                return {
                    name: k,
                    ...c,
                    default: args[k],
                }
            }) as ({ name: string } & Control<any>)[]

        // return _
    }, [args, argTypes])

    return <Box as={`h:fit-content flex cols`}>

        <Table
            as={`--preview-controls`} 
            hoverable={false}
            schema={[
                { id: `name`, value: `Name`, minW: 140, maxW: `fit-content` },
                { id: `desc`, value: `Description` },
                { id: `default`, value: `Default`, maxW: 130 },
                { 
                    id: `control`, 
                    value: `Control`,
                    maxW: 150,
                    render: row => {
                        if ( row.control ){
                            switch(row.control!){
                                case "boolean":
                                    return <Switch 
                                        onSwitch={(nv) => onArgChange( row.name, nv )}
                                        checked={args[row.name] || false}
                                    />
                                case "input":
                                    return <Input 
                                        variant={Variant.Small}
                                        onChange={(ev) => debounce(ev, row)}
                                        placeholder={row.name} defaultValue={row.default as string} />
                                case "select":
                                    return <Select 
                                        selected={row.default || row.options[0]}
                                        onChange={(op) => onArgChange(row.name, (op as Option).value)}
                                        options={row.options?.reduce((p : Option[], r : string) => {
                                            p.push({ label: r, value: r })
                                            return p
                                        }, [])}
                                    />
                            }
                        }
                        return null;
                    }
                },
            ]}
            rows={rows}
        />

    </Box>

}

export default Controls;