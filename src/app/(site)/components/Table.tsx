"use client";

import {Spacer, Spinner, Table as NextTable, TableBody, TableColumn, TableHeader, TableProps} from "@nextui-org/react";
import clsx from "clsx";
import {RowElement} from "@react-types/table";
import {JSX} from "react";

export type Column = {
    key: string,
    value: string,
}

interface Props<T> extends Omit<TableProps, "children"> {
    columns: Column[],
    children: RowElement<T> | RowElement<T>[] | ((item: T) => RowElement<T>),
    items: T[],
    sortableColumns?: string[],
    emptyContent?: string,
    isLoading?: boolean,
    loadingContent?: JSX.Element
}

export default function Table<T>({
                                     columns,
                                     items,
                                     sortableColumns,
                                     emptyContent,
                                     children,
                                     loadingContent,
                                     isLoading,
                                     ...tableProps
                                 }: Props<T>) {
    return (
        <NextTable
            {...tableProps}
            color={tableProps.color ?? "primary"}
            classNames={{
                ...tableProps.classNames,
                wrapper: clsx("!bg-primary/20 rounded-2xl border border-primary/50", tableProps.classNames?.wrapper),
                th: clsx("bg-secondary backdrop-blur-md text-white uppercase", tableProps.classNames?.th)
            }}
        >
            <TableHeader columns={columns}>
                {(column: Column) =>
                    <TableColumn
                        key={column.key}
                        allowsSorting={sortableColumns?.includes(column.key)}>
                        {column.value}
                    </TableColumn>}
            </TableHeader>
            <TableBody
                items={items}
                emptyContent={!isLoading ? emptyContent : <></> }
                isLoading={isLoading}
                loadingContent={loadingContent ?? <Spinner size="lg"/>}
            >
                {children}
            </TableBody>
        </NextTable>
    );
};