export interface IChartVector {
    columns: any[],
    types: {
        [key:string]: string
        // "y0": string,
        // "y1": string,
        // "x": string
    },
    names: {
        [key:string]: string
        // "y0": string,
        // "y1": string
    },
    colors: {
        [key:string]: string
        // "y0": string,
        // "y1": string
    },
    visibility?:{
        [key:string]: boolean
    }
}