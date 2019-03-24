import {IChartOptions} from "../../Interfaces/IChartOptions";
import {Chart} from "./Chart";
import {Dom} from "./Dom";

export class RangePreview {
    get $middleWidth(): number {
        return this._$middleWidth;
    }

    set $middleWidth(value: number) {
        this._$middleWidth = value;
        this.$elMiddle.style.width = this._$middleWidth + 'px';
    }

    get $middleOffsetLeft(): number {
        return this._$middleOffsetLeft;
    }

    set $middleOffsetLeft(value: number) {
        this._$middleOffsetLeft = value;
        this.$elMiddle.style.left = this._$middleOffsetLeft + 'px';

        this.$elLeft.style.left = this.$chart.$marginLeft + 'px';
        this.$elLeft.style.width = this._$middleOffsetLeft - this.$chart.$marginLeft + 'px';

        this.$elRight.style.right = this.$chart.$marginRight + 'px';

        let width = this.$elWrapper.offsetWidth
            - this.$chart.$marginRight
            - this._$middleOffsetLeft
            - this.$elMiddle.offsetWidth;
        this.$elRight.style.width = width + 'px';
    }

    public $chart: Chart;
    public $parentChart: Chart;

    public $elPreview: HTMLElement;
    public $elWrapper: HTMLElement;
    public $elMiddle: HTMLElement;
    public $elLeft: HTMLElement;
    public $elRight: HTMLElement;
    public $elLeftEdge: HTMLElement;
    public $elRightEdge: HTMLElement;

    private _$middleOffsetLeft: number;
    private _$middleWidth: number;

    public $options: IChartOptions;

    public $draggedMain: boolean = false;
    public $draggedLeftEdge: boolean = false;
    public $draggedRightEdge: boolean = false;
    public $dragPositionStart: number = 0;
    public $minWidth: number = 30;

    constructor(options: IChartOptions, parentChart: Chart) {
        this.$parentChart = parentChart;
        this.$options = options;
        this.$options.showPreview = false;
        this.$options.isPreview = true;
        this.$options.height = 150;
        this.createHTML();
        this.$options.parent = this.$elPreview;
        this.$chart = new Chart(this.$options);
        this.$chart.$startDatesIndex = 0;
        this.$chart.$sectionsCountXDates = parentChart.$allDatesOfVisibleLayers.length;
        this.$chart.$sectionsCountYValues = 2;
        this.$chart.$totalMouseOffset = 0;
        this.$chart.draw();
    }

    public createHTML() {
        this.$elPreview = Dom.crEl('div');
        this.$elPreview.style.height = this.$options.height + 'px';
        this.$elPreview.className = 'zxc-chart-container_preview';
        this.$elPreview.style.width = this.$options.width + 'px';

        this.$elWrapper = Dom.crEl('div');
        this.$elWrapper.className = 'wrapper';

        this.$elLeft = Dom.crEl('div');
        this.$elLeft.className = 'box';

        this.$elMiddle = Dom.crEl('div');
        this.$elMiddle.className = 'box middle';

        this.$elRight = Dom.crEl('div');
        this.$elRight.className = 'box right-box';

        this.$elLeftEdge = Dom.crEl('div');
        this.$elLeftEdge.className = 'edges edges-left';

        this.$elRightEdge = Dom.crEl('div');
        this.$elRightEdge.className = 'edges edges-right';

        this.$elWrapper.appendChild(this.$elLeft);
        this.$elWrapper.appendChild(this.$elMiddle);
        this.$elWrapper.appendChild(this.$elRight);

        this.$elMiddle.appendChild(this.$elLeftEdge);
        this.$elMiddle.appendChild(this.$elRightEdge);

        this.$elPreview.appendChild(this.$elWrapper);
    }

    public getHTML(): HTMLElement {
        return this.$elPreview;
    }

    public initializeDivParams() {
        this.$middleWidth = this.$parentChart.$sectionsCountXDates * this.$chart.$deltaXDates;
        this.$middleOffsetLeft = (this.$parentChart.$startDatesIndex * this.$chart.$deltaXDates) + this.$chart.$marginLeft;
        this.initializeEvents();//rm before init ev
    }

    public initializeEvents() {
        this.$elMiddle.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            this.$draggedMain = true;
            this.$dragPositionStart = e.clientX;
        });
        this.$elLeftEdge.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            this.$draggedLeftEdge = true;
            this.$dragPositionStart = e.clientX;
        });
        this.$elRightEdge.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            this.$draggedRightEdge = true;
            this.$dragPositionStart = e.clientX;
        });
        const moveHandlers = (e: MouseEvent) => {
            if (this.$draggedMain) {
                let pos1 = e.clientX - this.$dragPositionStart;
                let pos3 = this.$elMiddle.offsetLeft + pos1;
                if (pos3 + this.$elMiddle.offsetWidth > this.$elWrapper.offsetWidth - this.$chart.$marginRight) {
                    this.$middleOffsetLeft = this.$elWrapper.offsetWidth - this.$elMiddle.offsetWidth - this.$chart.$marginRight;
                    return false;
                }
                if (pos3 < this.$chart.$marginLeft) {
                    this.$middleOffsetLeft = this.$chart.$marginLeft;
                    return false;
                }
                this.$middleOffsetLeft = pos3;
                this.$dragPositionStart = e.clientX
            }
            if (this.$draggedLeftEdge) {
                let pos1 = e.clientX - this.$dragPositionStart;
                let width = (this.$elMiddle.offsetWidth - pos1);
                let pos3 = this.$elMiddle.offsetLeft + pos1;
                if (width < this.$minWidth) {
                    this.$middleWidth = this.$minWidth;
                    return false;
                }
                if (pos3 < this.$chart.$marginLeft) {
                    this.$middleOffsetLeft = this.$chart.$marginLeft;
                    return false;
                }
                this.$middleWidth = width;
                this.$middleOffsetLeft = pos3;
                this.$dragPositionStart = e.clientX;
            }
            if (this.$draggedRightEdge) {
                let pos1 = e.clientX - this.$dragPositionStart;
                let pos3 = this.$elMiddle.offsetWidth + pos1;
                if (pos3 + this.$elMiddle.offsetLeft + this.$chart.$marginRight > this.$elWrapper.offsetWidth) {
                    this.$middleWidth = this.$elWrapper.offsetWidth - this.$elMiddle.offsetLeft - this.$chart.$marginRight;
                    return false;
                }
                if (pos3 < this.$minWidth) {
                    this.$middleWidth = this.$minWidth;
                    return false;
                }
                this.$middleWidth = pos3;
                this.$elRight.style.width = (this.$elWrapper.offsetWidth - parseInt(this.$elMiddle.style.left)) - (this.$elMiddle.offsetWidth + this.$chart.$marginRight) + 'px';
                this.$dragPositionStart = e.clientX;
            }

            if (this.$draggedMain || this.$draggedLeftEdge || this.$draggedRightEdge) {
                this.drawRange();
            }
        };
        this.$elWrapper.addEventListener('mousemove', moveHandlers);
        document.addEventListener('mouseup', () => {
            this.$draggedMain = false;
            this.$draggedLeftEdge = false;
            this.$draggedRightEdge = false;
            this.$dragPositionStart = 0;
        });

    }

    public drawRange() {
        if (this.$middleOffsetLeft) {
            let startIndex = Math.floor((this.$middleOffsetLeft - this.$chart.$marginLeft) / this.$chart.$deltaXDates);
            let sectionCount = Math.floor(this.$elMiddle.offsetWidth / this.$chart.$deltaXDates);

            this.$parentChart.drawRange(startIndex, sectionCount);
        }
    }

    public reInit(options: IChartOptions, parentChart?: Chart) {
        this.$chart.destroy();
        this.$chart = null;
        this.$elPreview.style.width = options.width + 'px';
        this.$parentChart = parentChart || this.$parentChart;
        this.$options = options;
        this.$options.showPreview = false;
        this.$options.isPreview = true;
        this.$options.height = 150;
        this.$options.parent = this.$elPreview;
        this.$chart = new Chart(this.$options);
        this.$chart.$startDatesIndex = 0;
        this.$chart.$sectionsCountXDates = this.$parentChart.$allDatesOfVisibleLayers.length;
        this.$chart.$sectionsCountYValues = 2;
        this.$chart.$totalMouseOffset = 0;
        this.$chart.draw();
        this.initializeDivParams();

    }
}