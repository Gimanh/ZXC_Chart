import {IChartVector} from "./IChartVector";

export interface IChartOptions {
    parent: string|Element,
    width: number,
    height: number,
    data: IChartVector[],
    showPreview: boolean,
    isPreview?: boolean
}