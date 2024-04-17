import type { IEventBase } from '../types/event.types';

export class EventTemplate implements IEventBase {
    public props: IEventBase['props'];

    constructor(props: IEventBase['props']) {
        this.props = props;
    }
}