import { EnfinityClient } from "../client/enfinity";

export interface IEvent {
    props: IEventProps;
    exec: (...args: unknown[]) => void;
}

export interface IEventProps {
    name: string;
    once?: boolean;
}

export interface IEventBase {
    props: IEventProps
}

