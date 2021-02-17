import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mercado-pago-redirect',
  templateUrl: './mercado-pago-redirect.component.html',
  styleUrls: ['./mercado-pago-redirect.component.scss']
})
export class MercadoPagoRedirectComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      console.log(query);
    });
  }

}
