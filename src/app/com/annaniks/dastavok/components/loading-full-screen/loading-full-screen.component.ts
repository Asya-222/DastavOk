import {Component,OnInit, Input} from '@angular/core';

@Component({
    selector: 'loading-full-screen',
    templateUrl: './loading-full-screen.component.html',
    styleUrls: ['./loading-full-screen.component.scss']
})

export class LoadingFullScreenComponent implements OnInit {
    @Input() loading: boolean;
    constructor(){

    }
    ngOnInit(){}

}