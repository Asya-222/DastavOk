import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../statistic.service';
import { Observable, forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerResponse, AmountStatistics, OrdersCountStatistics } from '../../../../models/models';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
    public ordersChartData: any;
    public ru: any;
    private _subscription: Subscription = new Subscription();
    public loading: boolean = false;
    public amountChartData: any;
    public rangeDates: Array<string>;
    private _amountStatistics: Array<AmountStatistics> = [];
    private _ordersCountStatistics: Array<OrdersCountStatistics> = [];
    constructor(private _statisticService: StatisticService, private _datePipe: DatePipe) {
        this.ordersChartData = {
            labels: [],
            datasets: [
                {
                    label: "Все заказы",
                    data: [],

                }
            ]
        }
        this.amountChartData = {
            labels: [],
            datasets: [
                {
                    label: 'Итого',
                    data: [],

                }
            ]
        }
    }
    ngOnInit() {
        this._getStatistics(new Date(), 7)

        this.ru = {
            firstDayOfWeek: 0,
            dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            dayNamesShort: ['Вос','Пон' , 'Вто' , 'Сре' , 'Чет' , 'Пят' , 'Суб'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            monthNames: ['Январь', 'Февраль' , 'Март' , 'Апрель' , 'Май' , 'Июнь' , 'Июль' , 'Август' , 'Сентябрь','Октябрь','Ноябрь','Декабрь' ],
            monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек' ],
            today: 'Сегодня',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Неделя'
        };
   
    }


    private _getStatistics(date: Date, lengthCount: number): void {
        this.loading = true;
        let combined = forkJoin(
            this._getAmountStatistics(date, lengthCount),
            this._getOrdersCountStatistics(date, lengthCount)
        )
        this._subscription = combined.subscribe(() => {
            this.loading = false;
        })
    }

    private _getAmountStatistics(date: Date, lengthCount: number): Observable<void> {
        return this._statisticService.getStatistics(new Date(date), lengthCount, 'amount').pipe(
            map((data: ServerResponse<Array<AmountStatistics>>) => {
                console.log(data);
                this._amountStatistics = data.message.reverse();
                this._setChartData(this._amountStatistics, 'amount');
            })
        )
    }

    private _getOrdersCountStatistics(date: Date, lengthCount: number): Observable<void> {
        return this._statisticService.getStatistics(new Date(date), lengthCount, 'count').pipe(
            map((data: ServerResponse<Array<OrdersCountStatistics>>) => {
                this._ordersCountStatistics = data.message.reverse();
                this._setChartData(this._ordersCountStatistics, 'order');
            })
        )
    }


    public onChangeRange(event): void {
        console.log("eventyyy", event)
        if (event && event[0] && event[1]) {
            let daysCount = this._calcDayesCount(event[0], event[1]);
            this._getStatistics(event[1], daysCount);
        }
    }

    private _calcDayesCount(startDate: Date, endDate: Date): number {
        let start = new Date(this._datePipe.transform(startDate, 'MM/dd/yyyy'));
        let end = new Date(this._datePipe.transform(endDate, 'MM/dd/yyyy'));
        let timeDiff = Math.abs(end.getTime() - start.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays + 1;
    }

    private _setChartData(chartData, type: string): void {
        let changelabels: Array<string> = [];
        let changeValues: Array<number> = [];
        chartData.forEach((element, index) => {
            changelabels.push(element.date)
            if (type == 'order')
                changeValues.push(element.count);
            if (type == 'amount') {
                changeValues.push(element.sum);
            }
        })
        if (type == 'order') {
            this.ordersChartData = {
                labels: changelabels,
                datasets: [
                    {
                        label: 'Все заказы',
                        data: changeValues,
                        fill: true,
                        borderColor: '#D2B48C',
                        borderWidth: 2,
                        type: "line",
                        fillOpacity: .5
                    }
                ]
            }
        }
        if (type == 'amount') {
            this.amountChartData = {
                labels: changelabels,
                datasets: [
                    {
                        label: 'Итого',
                        data: changeValues,
                        fill: true,
                        borderColor: '#5F9EA0',
                        borderWidth: 2,
                        type: "line",
                        fillOpacity: .5
                    }
                ]
            }
        }
    }
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}