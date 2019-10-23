import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";

@Component({
    selector: 'order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})

export class OrderListComponent implements OnInit {

    @Output('paginate') private _paginateEvent: EventEmitter<object> = new EventEmitter<object>();
    @Input('paginator') public paginatorVisiblity: boolean = false;
    @Input('pageLength') public pageLength: number;
    
    public ifOrderListThereIs: boolean = false;
    public loading: boolean = false;
    @Input('count') public count: number;
    constructor() { }
    ngOnInit() { }

    public paginate(event: object): void {
        this._paginateEvent.emit(event);
        console.log("norva log erac eventy", event)
    }



}