import {IChartOptions} from "../../Interfaces/IChartOptions";
import {Layer} from "./Layer";
import {RangePreview} from "./RangePreview";
import {Dom} from "./Dom";

export class Chart {
    get $themeDark(): boolean {
        return this._$themeDark;
    }

    set $themeDark(value: boolean) {
        this._$themeDark = value;

        this.$bgColor = this._$themeDark ? '#222f3f' : '#ffffff';
        this.$textColor = this._$themeDark ? '#4c6475' : '#95a4ad';
        this.$linesColor = this._$themeDark ? '#263545' : '#dee6eb';
        this.$rangeBgColor = this._$themeDark ? 'rgba(29, 43, 57, 0.8)' : 'rgba(244, 249, 251, 0.80)';
        this.$rangeEdgeBg = this._$themeDark ? 'rgba(58, 86, 109, 0.92)' : 'rgba(218, 235, 244, 0.91)';
        this.$tooltipBg = this._$themeDark ? '#213242' : '#ffffff';
        this.$canvas.style.background = this.$bgColor;
        this.$container.style.background = this.$bgColor;
        let headerValuesColor = this._$themeDark ? '#ffffff' : '#222222';
        if (this.$divValuesOfDate) {
            this.$divValuesOfDate.style.background = this.$tooltipBg;
            this.$divValuesOfDate.style.color = headerValuesColor;
        }
        if (this.$divDateX) {
            this.$divDateX.style.background = this._$themeDark ? '#374a5b' : '#dee6eb';
        }

        if (this.$rangePreview) {
            this.$rangePreview.$chart.$themeDark = value;
            this.$rangePreview.$elRight.style.background = this.$rangeBgColor;
            this.$rangePreview.$elLeft.style.background = this.$rangeBgColor;
            this.$rangePreview.$elLeftEdge.style.background = this.$rangeEdgeBg;
            this.$rangePreview.$elRightEdge.style.background = this.$rangeEdgeBg;
        }

        this.draw();
    }

    public $textColor: string = '#95a4ad';
    public $bgColor: string = '#ffffff';
    public $linesColor: string = '#dee6eb';
    public $rangeBgColor: string = 'rgba(244, 249, 251, 0.80)';
    public $rangeEdgeBg: string = '#3a566d';
    public $tooltipBg: string = '#ffffff';

    public $container: HTMLElement;

    public $canvas: HTMLCanvasElement;
    public $ctx: CanvasRenderingContext2D;
    public $canvasHeight: number;
    public $canvasWidth: number;

    public $canvasViewHeight: number;
    public $canvasViewWidth: number;

    public $options: IChartOptions;
    public $layers: Layer[] = [];

    public $minYValue: number;
    public $maxYValue: number;

    public $marginTop: number = 50;
    public $marginRight: number = 50;
    public $marginBottom: number = 50;
    public $marginLeft: number = 50;

    public $sectionsCountYValues: number = 7;
    public $sectionsYValues: number[] = [];


    public $sectionsCountXDates: number = 25;
    public $allDatesOfVisibleLayers: number[] = [];

    public $deltaYValues: number; //Step for drawing value lines
    public $deltaXDates: number;//Step for drawing date lines

    public $startDatesIndex: number = 0;//compute with drag chart
    public $dragged: boolean = false;
    public $currentSessionMouseOffset: number = 0;
    public $totalMouseOffset: number = 0;

    public $isPreview: boolean = false;
    public $rangePreview: RangePreview;

    public $divValuesOfDate: HTMLElement;
    public $divDateX: HTMLElement;
    public $divCanWrapper: HTMLElement;

    public $debug: boolean = false;
    public $days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    private _$themeDark: boolean = false;
    public legendContainer: HTMLElement;

    public $fontSize: number = 14;
    public $fontStyle: string = 'Arial';

    public constructor(options: IChartOptions) {
        this.$options = options;
        this.$isPreview = this.$options.isPreview;
        this.initializeCanvas();
        this.initializeHeightAndWidth();

        this.initializeLayers();
        this.initializeDates();
        this.initializeMinMaxValues();
        this.initializeYValues();

        if (this.$options.showPreview) {
            this.createPreviewCanvas();
        }

        if (!this.$isPreview) {
            this.createLegend();
            this.createThemeBtn();
        }


        if (this.$startDatesIndex + this.$sectionsCountXDates > this.$allDatesOfVisibleLayers.length) {
            this.$startDatesIndex = this.$allDatesOfVisibleLayers.length - this.$sectionsCountXDates;
        }
        this.draw();
        if (!this.$isPreview) {
            this.initEvents();
        }

    }

    public createThemeBtn(): HTMLElement {
        let label = document.createElement('label');
        label.className = 'zxc-chart-layer-label';
        label.style.background = '#222f3f';
        label.style.color = '#ffffff';
        let span = document.createElement('span');
        span.innerText = 'Dark mode';
        // span.style.background = '#ffffff';
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = this.$themeDark;
        label.appendChild(checkbox);
        label.appendChild(span);
        checkbox.addEventListener('click', () => {
            this.$themeDark = checkbox.checked
        });
        return label;
    }

    public initEvents() {
        window.onresize = () => {
            let width = this.$options.width;

            if (this.$divCanWrapper.offsetWidth < this.$options.width) {
                width = this.$divCanWrapper.offsetWidth;
            }

            this.$canvas.width = width;
            this.initializeHeightAndWidth(width);
            this.updateAllStateForRedraw();
            this.draw();

        };
        this.$canvas.addEventListener("mousedown", (e) => {
            // console.log(e);
            this.$currentSessionMouseOffset = e.offsetX;
            this.$dragged = true;
        }, false);

        document.addEventListener("mouseup", (e) => {
            this.$dragged = false;
        }, false);
        let oldStart: number = 0;

        this.$canvas.addEventListener("mousemove", (e) => {
            if (this.$dragged) {
                let curOffsetX = e.offsetX - this.$currentSessionMouseOffset;
                let $startDatesIndex = Math.floor(Math.abs(this.$totalMouseOffset) / this.$deltaXDates);

                if ((($startDatesIndex + this.$sectionsCountXDates) > this.$allDatesOfVisibleLayers.length) && curOffsetX <= 0) {
                    this.draw();
                    return false;
                }

                if ($startDatesIndex === 0 && curOffsetX > 0) {
                    this.draw();
                    return false;
                }

                this.$totalMouseOffset += curOffsetX;
                if (this.$totalMouseOffset > 0) {
                    this.$totalMouseOffset = 0;
                }

                this.$startDatesIndex = $startDatesIndex;
                if (this.$startDatesIndex > this.$allDatesOfVisibleLayers.length - this.$sectionsCountXDates) {
                    this.$startDatesIndex = this.$allDatesOfVisibleLayers.length - this.$sectionsCountXDates;
                } else {
                    this.draw();
                }
                this.$currentSessionMouseOffset = e.offsetX;
                this.$rangePreview.$middleOffsetLeft = (this.$startDatesIndex * this.$rangePreview.$chart.$deltaXDates + this.$rangePreview.$chart.$marginLeft);
                this.clearValuesHTML();
            } else {

                let parentOffset = this.$canvas.parentElement.offsetLeft;
                let clientX = e.clientX - this.$marginLeft - (this.$deltaXDates / 2);
                let total = this.$totalMouseOffset - (clientX - parentOffset);
                if (clientX > 0 && clientX < (this.$canvasViewWidth + parentOffset)) {
                    let $startDatesIndex = Math.floor(Math.abs(total) / this.$deltaXDates);

                    let x = this.$totalMouseOffset - total;
                    let left = ($startDatesIndex * this.$deltaXDates) + this.$deltaXDates + this.$marginLeft;
                    left = left + this.$totalMouseOffset;
                    this.$divDateX.style.left = (left - (this.$divDateX.offsetWidth / 2)) + 'px';
                    this.$divDateX.style.bottom = (this.$marginBottom + 3) + 'px';
                    this.$divValuesOfDate.style.left = (left - (this.$divValuesOfDate.offsetWidth / 2)) + 'px';
                    this.showValuesForDates($startDatesIndex);
                }
            }
        }, false);
    }

    public clearValuesHTML() {
        this.$divValuesOfDate.innerHTML = '';
    }

    public showValuesForDates(startIndex: number) {
        this.clearValuesHTML();
        let text: string;
        let date = this.$allDatesOfVisibleLayers[startIndex];
        if (!date) {
            return false;
        }
        let dateInst = new Date(date);
        text = this.getFormattedDateString(dateInst);
        text = this.$days[dateInst.getDay()] + ', ' + text;

        let header = Dom.crEl('div');
        header.className = 'date-values-div_header';
        header.innerText = text;
        this.$divValuesOfDate.appendChild(header);

        let content = Dom.crEl('div');
        content.className = 'date-values-div_content';

        for (let i = 0; i < this.$layers.length; i++) {
            let values = this.$layers[i].getValuesForDate(date);
            for (let k = 0; k < values.length; k++) {
                let div = Dom.crEl('div');
                div.style.color = values[k].color;

                let divVal = Dom.crEl('div');
                divVal.innerText = String(values[k].value);

                let divName = Dom.crEl('div');
                divName.innerText = values[k].name;
                div.appendChild(divVal);
                div.appendChild(divName);
                content.appendChild(div);
            }
        }
        this.$divValuesOfDate.appendChild(content);
    }

    public createLegend() {
        this.legendContainer = document.createElement('div');
        this.legendContainer.className = 'zxc-chart-container_legend';
        this.$container.appendChild(this.legendContainer);
        for (let k in this.$layers) {
            let div = document.createElement('div');
            div.className = 'zxc-chart-container_legend_block';
            for (let j in this.$layers[k].subLayers) {
                div.appendChild(this.$layers[k].subLayers[j].getLegendButton())
            }
            this.legendContainer.appendChild(div);
        }
        let div = document.createElement('div');
        div.className = 'zxc-chart-container_legend_block';
        div.appendChild(this.createThemeBtn());
        this.legendContainer.appendChild(div);
    }

    private initializeCanvas() {
        let parent: Element;
        if (typeof this.$options.parent === 'object') {
            parent = this.$options.parent;
        } else {
            parent = document.querySelector(this.$options.parent);

        }
        if (!parent) {
            throw "Can not get parent element";
        }
        this.$canvas = document.createElement('canvas');
        this.$canvas.width = this.$options.width;
        this.$canvas.height = this.$options.height;
        // this.$canvas.style.background = '#ffffff';
        this.$ctx = this.$canvas.getContext('2d');

        if (this.$isPreview) {
            this.$container = document.createElement('div');
            this.$container.className = 'zxc-chart-container';
            this.$container.appendChild(this.$canvas);
        } else {
            this.$divCanWrapper = document.createElement('div');
            this.$divCanWrapper.appendChild(this.$canvas);
            this.$divCanWrapper.className = 'canvas-wrapper';

            this.$container = document.createElement('div');
            this.$container.className = 'zxc-chart-container';
            this.$container.appendChild(this.$divCanWrapper);

            this.$divDateX = document.createElement('div');
            this.$divDateX.className = 'date-div';
            this.$divCanWrapper.appendChild(this.$divDateX);

            this.$divValuesOfDate = document.createElement('div');
            this.$divValuesOfDate.className = 'date-values-div';
            this.$divCanWrapper.appendChild(this.$divValuesOfDate)
        }
        parent.appendChild(this.$container);
    }

    public initializeHeightAndWidth(width?: number, height?: number) {
        this.$canvasHeight = height || this.$options.height;
        this.$canvasWidth = width || this.$options.width;

        this.$canvasViewHeight = this.$canvasHeight - this.$marginTop - this.$marginBottom;
        this.$canvasViewWidth = this.$canvasWidth - this.$marginLeft - this.$marginRight;
    }

    public initializeDeltas() {
        this.$deltaYValues = this.$canvasViewHeight / this.$sectionsCountYValues;
        this.$deltaXDates = this.$canvasViewWidth / this.$sectionsCountXDates;
    }

    public initializeLayers() {
        for (let i = 0; i < this.$options.data.length; i++) {
            this.$layers.push(new Layer(i, this.$options.data[i], this));
        }
    }

    public initializeMinMaxValues() {
        let values: number[] = [];
        let si = this.$startDatesIndex > 1 ? this.$startDatesIndex - 1 : this.$startDatesIndex;
        for (let i = 0; i < this.$layers.length; i++) {
            for (let k = si; k < si + this.$sectionsCountXDates + 1; k++) {
                let date = this.$allDatesOfVisibleLayers[k];
                let layer = this.$layers[i];
                let resSubLayers = layer.getValues(date);
                values = values.concat(resSubLayers);
            }
        }
        this.$minYValue = Math.min.apply(null, values);
        this.$maxYValue = Math.max.apply(null, values);
    }

    private initializeDates() {
        this.$allDatesOfVisibleLayers = [];
        for (let k in this.$layers) {
            let arrDates = this.$layers[k].getDatesForVisibleLayers();
            this.$allDatesOfVisibleLayers = this.$allDatesOfVisibleLayers.concat(arrDates);
        }
        this.cleanDates();
        this.sortDates();
    }

    private cleanDates() {
        this.$allDatesOfVisibleLayers = this.$allDatesOfVisibleLayers.filter(function (value, index, that) {
            return that.indexOf(value) === index;
        })
    }

    private sortDates() {
        this.$allDatesOfVisibleLayers.sort((a, b) => a - b)
    }

    private initializeYValues() {
        this.$sectionsYValues = [];
        for (let i = 0; i < this.$sectionsCountYValues; i++) {
            let valuePerGrid = this.$maxYValue / this.$sectionsCountYValues;
            this.$sectionsYValues.push(Math.floor(valuePerGrid * i));
        }
        this.$sectionsYValues.sort((a, b) => b - a);
    }

    public drawXDateLines() {
        let x: number;
        let y: number;

        if (this.$debug) {
            this.$ctx.lineWidth = 1;
            this.$ctx.strokeStyle = 'red';
            this.$ctx.setLineDash([3, 7]);
            this.$ctx.beginPath();
        }

        let count = this.$sectionsCountXDates + this.$startDatesIndex;
        let dateTextPixelStep = 15;
        let dateTextStep = Math.floor(this.$sectionsCountXDates / dateTextPixelStep);
        if (dateTextStep <= 1) {
            dateTextStep = 2;
        }
        for (let i = this.$startDatesIndex; i < count; i++) {
            if (i % dateTextStep === 1) {
                if (i === 0) {
                    x = this.$deltaXDates + this.$marginLeft;
                } else {
                    x = this.$deltaXDates * (i + 1) + this.$marginLeft;
                }
                y = this.$canvasHeight - this.$marginBottom;
                if (this.$debug) {
                    this.$ctx.moveTo(x, this.$marginTop);
                    this.$ctx.lineTo(x, y);
                    this.$ctx.stroke();
                }
                if (this.$allDatesOfVisibleLayers[i]) {
                    this.drawXDates(new Date(this.$allDatesOfVisibleLayers[i]), x - (this.$fontSize + 5), y + 20);
                }
            }
        }
    }

    public drawXDateBottomLine() {
        this.$ctx.lineWidth = 3;
        this.$ctx.strokeStyle = this.$linesColor;
        this.$ctx.beginPath();
        let x = this.$marginLeft;
        let y = this.$canvasHeight - this.$marginBottom;
        this.$ctx.moveTo(x, y);
        x = this.$canvasWidth - this.$marginRight;
        this.$ctx.lineTo(x, y);
        this.$ctx.stroke();
    }

    public getFormattedDateString(date: Date): string {
        let months: { [key: number]: string } = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'Aug',
            8: 'Sept',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        };
        return months[date.getMonth()] + ' ' + date.getDate()
    }

    public drawXDates(date: Date, x: number, y: number) {
        this.$ctx.fillStyle = this.$textColor;
        this.$ctx.font = this.$fontSize + "px " + this.$fontStyle;
        this.$ctx.fillText(this.getFormattedDateString(date), x, y)
    }

    public drawYValuesLines() {
        // this.drawLeftVerticalLine();


        let x: number;
        let y: number;


        this.$ctx.lineWidth = 2;
        this.$ctx.strokeStyle = this.$linesColor;
        this.$ctx.beginPath();

        x = this.$marginLeft;
        y = this.$marginTop;
        this.drawYLine(x, y, this.$maxYValue);

        for (let i = 0; i < this.$sectionsCountYValues; i++) {
            x = this.$marginLeft;
            if (i === 0) {
                y = this.$marginTop + this.$deltaYValues;
            } else {
                y = this.$marginTop + this.$deltaYValues * i + this.$deltaYValues;
            }
            this.drawYLine(x, y, this.$sectionsYValues[i]);
        }
    }

    public drawYLine(x: number, y: number, date: number) {
        this.$ctx.moveTo(x, y);
        x = this.$canvasViewWidth + this.$marginLeft;
        this.$ctx.lineTo(x, y);
        this.$ctx.stroke();
        this.drawYValues(date, x, y);
    }

    public drawLeftVerticalLine() {
        this.$ctx.lineWidth = 3;
        this.$ctx.strokeStyle = this.$linesColor;
        this.$ctx.beginPath();
        let x = this.$marginLeft;
        let y = this.$marginTop;
        this.$ctx.moveTo(x, y);
        y = y + this.$canvasViewHeight;
        this.$ctx.lineTo(x, y);
        this.$ctx.stroke();
    }

    public drawYValues(value: number, x: number, y: number) {
        this.$ctx.fillStyle = this.$textColor;
        this.$ctx.font = this.$fontSize + "px " + this.$fontStyle;
        this.$ctx.fillText(String(value), x - x + 55, y - 5)
    }

    public draw() {
        this.initializeDeltas();
        this.initializeMinMaxValues();
        this.initializeYValues();
        this.$ctx.clearRect(0, 0, this.$canvasWidth, this.$canvasHeight);
        if (!this.$isPreview) {
            // this.drawXDateBottomLine();
            this.drawYValuesLines();
        }


        let offset = this.$startDatesIndex * this.$deltaXDates;
        let quickMouseMoveFix = 50;
        if (Math.abs(this.$totalMouseOffset) + quickMouseMoveFix < (offset) - this.$deltaXDates) {
            this.$totalMouseOffset = -offset;
        }

        this.$ctx.save();
        this.$ctx.translate(this.$totalMouseOffset, 0);

        if (!this.$isPreview) {
            this.drawXDateLines();
        }

        this.drawLayers();
        this.$ctx.restore();

        this.$ctx.clearRect(0, 0, this.$marginLeft, this.$canvasHeight);
        this.$ctx.clearRect(this.$canvasWidth - this.$marginRight, 0, this.$marginRight, this.$canvasHeight);
    }

    public drawLayers() {
        this.$ctx.beginPath();
        for (let i = 0; i < this.$layers.length; i++) {
            let oldDate: number = null;
            for (let d = (this.$startDatesIndex - 1); d < this.$startDatesIndex + this.$sectionsCountXDates + 1; d++) {
                let date = this.$allDatesOfVisibleLayers[d];
                this.$layers[i].draw(date, oldDate, d);
                oldDate = date;
            }
        }
    }

    public drawRange(startIndex: number, sectionCount: number) {
        this.$startDatesIndex = startIndex;
        this.$sectionsCountXDates = sectionCount;
        // this.initializeMinMaxValues();
        this.initializeDeltas();
        this.$totalMouseOffset = -this.$startDatesIndex * this.$deltaXDates;
        this.draw();
    }

    public createPreviewCanvas() {
        let options = {...this.$options};
        options.width = this.$canvas.width;
        if (this.$rangePreview) {
            this.$rangePreview.reInit(options);
        } else {
            this.$rangePreview = new RangePreview(options, this);
            let html = this.$rangePreview.getHTML();
            this.$container.appendChild(html);
            this.$rangePreview.initializeDivParams();
        }
        this.$rangePreview.$chart.$themeDark = this.$themeDark;
    }

    public updateAllStateForRedraw() {
        this.initializeDates();
        this.initializeMinMaxValues();
        this.initializeYValues();
        if (this.$startDatesIndex + this.$sectionsCountXDates > this.$allDatesOfVisibleLayers.length) {
            this.$startDatesIndex = 0;
            this.$sectionsCountXDates = 30;
            this.$totalMouseOffset = 0;
        }
        this.createPreviewCanvas();
    }

    public destroy() {
        this.$canvas.remove();
    }
}