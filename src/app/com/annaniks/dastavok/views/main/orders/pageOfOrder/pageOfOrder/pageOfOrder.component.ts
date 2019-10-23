import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OrdersService } from "../../orders.service";
import { OneOrder, ServerResponse, AddressForShowOrder, StatusOfOrderByOrderId } from "../../../../../models/models";
import { MatDialog } from "@angular/material";
import { ConfirmForChangeOrderPlaceModal } from "../../../../../modals";
import { PageOfOrderService } from "../pageOfOrder.service";
declare var google: any;
@Component({
    selector: 'page-of-order',
    templateUrl: './pageOfOrder.component.html',
    styleUrls: ['./pageOfOrder.component.scss']
})
export class PageOfOrderComponent implements OnInit {
    images: any[];
    public orderGoods: Array<object>
    public map;
    public loading: boolean = false;
    private marker;
    public latLng: any;
    private addressInfo: AddressForShowOrder
    public order: OneOrder;
    public orderId: string;
    public orderStatus: string;
    constructor(@Inject('BASE_URL') public baseUrl, private _activatedRoute: ActivatedRoute, private _ordersService: OrdersService, private _router: Router, private _pageOfOrderService: PageOfOrderService, private dialog: MatDialog) {
        this._checkOrderStatus()
    }
    ngOnInit() {



    }

    private _checkOrderStatus(): void {
        this._activatedRoute.params.subscribe((params: StatusOfOrderByOrderId) => {
            this.getOrder(params.orderId)
            this.orderId = params.orderId;
            this.orderStatus = params.orderStatus

        })
    }
    public getOrder(id: string) {
        this._ordersService.getOrder(id).subscribe((data: ServerResponse<OneOrder>) => {
            this.order = data.message
            this.orderGoods = data.message.goods;
            var contentString = '<div id="content">' +
                '<div id="bodyContent" style="margin-top: 20px">' +
                '<p><b style="font-weight: bold">Client: </b>' + data.message.client.clientname + '</p>' +
                '</div>' +
                '<div id="bodyContent">' +
                '<p><b style="font-weight: bold">Phone number: </b> ' + data.message.client.clientphonenumber + '</p>' +
                '</div>' +
                '</div>';
            this._initMap({ lat: data.message.address.lat, lng: data.message.address.lng }, { lat: data.message.client.clientaddress[0].lat, lng: data.message.client.clientaddress[0].lng }, contentString)

        })
    }
    public _initMap(corrdinates, coordinatesOfClient, contentString, zoom = 8) {
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: zoom,
            center: corrdinates
        });
        this.marker = new google.maps.Marker({
            position: corrdinates,
            map: this.map
        })
        let marker1 = new google.maps.Marker({
            position: coordinatesOfClient,
            map: this.map
        })
        marker1.addListener('mouseover', function () {
            infowindow.open(this.map, marker1);

            marker1.addListener('mouseout', function () {
                infowindow.close();
            });

        })
    }

    public changeOrder() {
        this.loading = true;
        let sendingStatus: string = 'start'
        if (this.orderStatus === 'start') {
            sendingStatus = 'accepted'
        } else if (this.orderStatus === 'accepted') {
            sendingStatus = 'maked'
        } else if (this.orderStatus === 'maked') {
            sendingStatus = 'onway'
        }
        this._pageOfOrderService.changeOrders(sendingStatus, this.orderId).subscribe((data: ServerResponse<string>) => {
            this._router.navigate([`/orders/${sendingStatus}/${this.orderId}`])
            this.loading = false;
        })
    }


    public openConfirmModalForChangeOrderPlace(): void {
        let dialogRef = this.dialog.open(ConfirmForChangeOrderPlaceModal, {
            width: '360px'
        })
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.changeOrder();

            }
        })
    }




}


