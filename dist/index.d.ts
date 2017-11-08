declare class SkillsBarChart {
    private _data;
    private _margin;
    private _el;
    private _svg;
    private _inner;
    private _lineHeight;
    private _labelWidth;
    private _animDuration;
    private _guidesGrp;
    private _scale;
    constructor(options?: ISkillsBarChartOptions);
    data(data: ICategoryData[]): SkillsBarChart;
    target(el: any): SkillsBarChart;
    render(): void;
}
interface ICategoryData<T = string> {
    name: string;
    color: string;
    yOffset?: number;
    entries: ISkillEntry<T>[];
}
interface ISkillEntry<T = string> {
    name: string;
    score: number;
    types?: T[];
}
interface ISkillsBarChartOptions {
    data: ICategoryData[];
    target?: any;
    lineHeight?: number;
}
