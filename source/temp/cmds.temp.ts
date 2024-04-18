import { ICommandBase } from "../types/cmd.types";

export class CommandTemplate implements ICommandBase {
    public props: ICommandBase['props'];

    constructor(props: ICommandBase['props']) {
        this.props = props;
    }
}