export as namespace skillsBarChartLib;
export = SkillsBarChart;
declare class SkillsBarChart {
    private _data;
    private _margin;
    private _el;
    private _svg;
    private _inner;
    private _lineHeight;
    private _minCategoryHeight;
    private _animDuration;
    private _guidesGrp;
    private _scale;
    private _guideData;
    constructor(options?: SkillsBarChart.ISkillsBarChartOptions);
    data(data: SkillsBarChart.ICategoryData[]): SkillsBarChart;
    target(el: any): SkillsBarChart;
    render(): void;
}
declare namespace SkillsBarChart {
    export interface ICategoryData<T = string> {
        name: string;
        color: string;
        yOffset?: number;
        height?: number;
        entries: ISkillEntry<T>[];
    }
    export interface ISkillEntry<T = string> {
        name: string;
        score: number;
        types?: T[];
    }
    export interface ISkillsBarChartOptions {
        data?: ICategoryData[];
        target?: any;
        lineHeight?: number;
    }
    export interface IGuideData {
        label: string;
        value: number;
        anchor: 'start' | 'middle' | 'end';
    }
}

