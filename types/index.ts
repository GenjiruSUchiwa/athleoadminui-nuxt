import {FunctionalComponent, HTMLAttributes, VNodeProps} from "vue";

export interface NavigationItem {
    name: string
    href?: string
    icon: FunctionalComponent<HTMLAttributes & VNodeProps>
    current: boolean
    group: string
    children?: NavigationSubItem[]
}

export interface NavigationSubItem {
    name: string
    href: string
    count: string
    current: boolean
}

export interface UserNavigation {
    name: string,
    href: string
}


export type Navigation = NavigationItem[]