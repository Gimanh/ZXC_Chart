import {IChartVector} from "../../Interfaces/IChartVector";
import {Chart} from "./Chart";
import {SubLayer} from "./SubLayer";
import {ISubLyersOptions} from "../../Interfaces/ISubLyersOptions";

export class Layer {
    get max(): number {
        let max = [];
        for (let i = 0; i < this.subLayers.length; i++) {
            if (this.subLayers[i].visible) {
                max.push(this.subLayers[i].max);
            }
        }
        this._max = Math.max.apply(null, max);
        max = null;
        return this._max;
    }

    get min(): number {
        let min = [];
        for (let i = 0; i < this.subLayers.length; i++) {
            if (this.subLayers[i].visible) {
                min.push(this.subLayers[i].min);
            }
        }
        this._min = Math.min.apply(null, min);
        min = null;
        return this._min;
    }

    public id: number | string;
    private _min: number;
    private _max: number;
    private chart: Chart;
    public options: IChartVector;
    public subLayers: SubLayer[] = [];
    public dateCollumnIndexInColumns: number;


    constructor(id: number | string, options: IChartVector, chart: Chart) {
        this.chart = chart;
        this.id = id;
        this.options = options;
        if (!this.options.visibility) {
            this.options.visibility = {};
        }

        let dates = this.getDates();

        // let minimums = [], maximums = [];

        for (let i = 0; i < this.options.columns.length; i++) {
            let tmpName = this.options.columns[i][0];
            if (tmpName !== 'x') {
                if (!this.options.colors[tmpName]) {
                    throw 'options.colors ' + tmpName + ' not found';
                }
                if (!this.options.names[tmpName]) {
                    throw 'options.names ' + tmpName + ' not found';
                }
                if (!this.options.types[tmpName]) {
                    throw 'options.types ' + tmpName + ' not found';
                }
                let yValues = [...this.options.columns[i]];
                yValues.splice(0, 1);

                let min = Math.min.apply(null, yValues);
                let max = Math.max.apply(null, yValues);

                let subDates: { [key: string]: number } = {};

                for (let j = 0; j < dates.length; j++) {
                    subDates[dates[j]] = yValues[j];
                }
                let visible = true;
                if (this.options.visibility[this.options.names[tmpName]] !== undefined) {
                    visible = this.options.visibility[this.options.names[tmpName]];
                }
                let subLayerOpitions: ISubLyersOptions = {
                    color: this.options.colors[tmpName],
                    name: this.options.names[tmpName],
                    type: this.options.types[tmpName],
                    dates: subDates,
                    visible: visible
                };

                let subLayer = new SubLayer(subLayerOpitions, this.chart, min, max, this);
                this.subLayers.push(subLayer);
            }
        }

        // this._min = Math.min.apply(null, minimums);
        // this._max = Math.max.apply(null, maximums);
    }

    public getDates(): number[] {
        for (let i = 0; i < this.options.columns.length; i++) {
            if (this.options.columns[i][0] === 'x') {
                this.dateCollumnIndexInColumns = i;
                let arr = [...this.options.columns[i]];
                arr.splice(0, 1);
                return arr;
            }
        }
        return [];
    }


    public getDatesForVisibleLayers(): number[] {
        let returnDates = false;
        for (let k = 0; k < this.subLayers.length; k++) {
            if (this.subLayers[k].visible) {
                returnDates = true;
                break;
            }
        }
        if (returnDates) {
            for (let i = 0; i < this.options.columns.length; i++) {
                if (this.options.columns[i][0] === 'x') {
                    this.dateCollumnIndexInColumns = i;
                    let arr = [...this.options.columns[i]];
                    arr.splice(0, 1);
                    return arr;
                }
            }
        }
        return [];
    }

    public draw(date: number, oldDate: number, dateIndex: number) {
        for (let i = 0; i < this.subLayers.length; i++) {
            if (this.subLayers[i].visible === true) {
                this.subLayers[i].draw(date, oldDate, dateIndex);
            }
        }
    }

    public getValuesForDate(date: number): { name: string, value: number, color: string } [] {
        let result = [];
        for (let i = 0; i < this.subLayers.length; i++) {
            if (this.subLayers[i].visible && this.subLayers[i].dates[date]) {
                result.push({
                    name: this.subLayers[i].name,
                    value: this.subLayers[i].dates[date],
                    color: this.subLayers[i].color
                })
            }
        }
        return result;
    }

    public getValues(date: number): number[] {
        let result = [];
        for (let i = 0; i < this.subLayers.length; i++) {
            if (this.subLayers[i].visible && this.subLayers[i].dates[date]) {
                result.push(this.subLayers[i].dates[date])
            }
        }
        return result;
    }
}