import {ISubLyers} from "../../Interfaces/ISubLyers";
import {ISubLyersOptions} from "../../Interfaces/ISubLyersOptions";
import {Chart} from "./Chart";
import {Layer} from "./Layer";

export class SubLayer implements ISubLyers {
    get min(): number {
        return this._min;
    }

    get max(): number {
        return this._max;
    }

    color: string;
    dates: { [p: string]: number };
    type: string;
    name: string;
    visible: boolean = true;
    chart: Chart;
    readonly _min: number;
    readonly _max: number;
    private parentLayer: Layer;


    constructor(options: ISubLyersOptions, chart: Chart, min: number, max: number, parentLayer: Layer) {
        this.color = options.color;
        this.dates = options.dates;
        this.type = options.type;
        this.name = options.name;
        if (options.visible !== undefined) {
            this.visible = options.visible;
        }
        this.chart = chart;
        this._min = min;
        this._max = max;
        this.parentLayer = parentLayer;
    }

    public draw(date: number, oldDate: number, dateIndex: number) {
        if (this.dates[date]) {
            this.chart.$ctx.beginPath();
            let coords = this.getCoordsForDate(date, dateIndex);
            // if(!this.chart.$isPreview){
            //     this.chart.$ctx.arc(coords.x, coords.y, 5, 0, 2 * Math.PI, false);
            //     coords = null;
            //     this.chart.$ctx.fillStyle = this.color;
            //     this.chart.$ctx.fill();
            //     this.chart.$ctx.closePath();
            // }else{
            this.chart.$ctx.moveTo(coords.x, coords.y);
            // }
            if (oldDate) {
                if (this.dates[oldDate]) {
                    let dI = dateIndex - 1;
                    let coords = this.getCoordsForDate(oldDate, dI);
                    this.chart.$ctx.lineWidth = 1;
                    this.chart.$ctx.strokeStyle = this.color;
                    this.chart.$ctx.lineTo(coords.x, coords.y);
                    coords = null;
                    this.chart.$ctx.stroke();
                }
            }
            this.chart.$ctx.closePath();
        }
    }

    public getCoordsForDate(date: number, dateIndex: number): { x: number, y: number } {
        let value = this.dates[date];

        let percent = value / this.chart.$maxYValue * 100;
        let height = this.chart.$canvasViewHeight;
        let y = height / 100 * percent;
        y = Math.round(height - y + this.chart.$marginTop);

        let x = dateIndex * this.chart.$deltaXDates + this.chart.$marginLeft + this.chart.$deltaXDates;
        x = Math.round(x);
        return {x: x, y: y}
    }

    /*public getLegendButton(): Element {
        let label = document.createElement('label');
        label.className = 'zxc-chart-container_label_container zxc-chart-container_label_container_label_element';
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = this.visible;
        label.innerText = this.name;
        label.appendChild(checkbox);
        let span = document.createElement('span');
        span.className = 'zxc-chart-container_label_container_checkmark zxc-chart-container_label_container_checkmark_span';
        span.style.background = this.color;
        label.appendChild(span);
        span.addEventListener('click', () => {
            this.visible = !this.visible;
            this.parentLayer.options.visibility[this.name] = this.visible;
            this.chart.updateAllStateForRedraw();
            this.chart.draw();
        });
        return label;
    }*/

    public getLegendButton(): Element {
        let label = document.createElement('label');
        label.className = 'zxc-chart-layer-label';
        label.style.background = this.color;
        let span = document.createElement('span');
        span.innerText = this.name;
        span.style.background = this.color;
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = this.visible;
        label.appendChild(checkbox);
        label.appendChild(span);
        checkbox.addEventListener('click', () => {
            this.visible = !this.visible;
            this.parentLayer.options.visibility[this.name] = this.visible;
            this.chart.updateAllStateForRedraw();
            this.chart.draw();
        });
        return label;
    }
}