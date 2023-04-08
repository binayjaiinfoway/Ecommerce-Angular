import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Service/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any = [];
  constructor(private productSvc: ProductService,
    private route:Router) { }
  ngOnInit(): void {
    // this.ShowProduct();
  }
  ShowProduct() {
    this.productSvc.GetProducts().subscribe((resp: any) => {
      console.log(resp);
      this.products = resp;
    })
  }
  SignOut(){
    localStorage.removeItem('/accessToken');
    this.route.navigate(['/login']);
  }

}
