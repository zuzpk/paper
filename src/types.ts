import { ReactNode } from "react";

export type User = {
    loading: boolean,
    ID: string | null,
    oid?: number,
    utp?: UserType,
    name?: string,
    email?: string,
    cc?: string,
    status?: UserStatus
}

export enum UserType {
    Guest = 0,
    User = 1,
    Admin = 2
}

export enum UserStatus {
    InActive = 0,
    Active = 1,
    Banned = -1,
}

export enum DB {
    You = "you",
    Tree = "tree",
    Drive = "drive"
}

export type Control<T> = {
    control?: "select" | "input" | "boolean"; 
    options?: T,
    default?: T extends (infer U)[] ? U : keyof T; 
}

export type ExtractProps<T> = {
    [K in keyof T]: Control<T[K] | T[K][]>;
};
  
export type Paper<T, N> = {
    title: string,
    component: T,
    props?: PaperVariant<N>,
    propsType?: ExtractProps<N>
}

export type PaperVariant<T> = {
    children?: ReactNode,
    // default?: T extends (infer U)[] ? U : keyof T; 
} & {
    [K in keyof T]: T[K]
}