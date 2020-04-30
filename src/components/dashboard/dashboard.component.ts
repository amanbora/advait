import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Item } from '../../models/item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public currentUser: any = {};
  public itemlist: any = [];
  public flagSecondList = false;
  public newItem = new Item();

  constructor(private userService: UserService, private router: Router, private http: HttpClient) { }

  // @ts-ignore
  ngOnInit() {
    this.userService.getCurrentUser().then(profile => this.currentUser = profile)
      .catch(() => this.currentUser = {});

    this.http.get('assets/data/itemlist.json').subscribe(
      (data) => {
        console.log(data);
        this.itemlist = data['items'];
      });


    this.newItem.creator = this.currentUser.name;
    this.newItem.dateCreated = (new Date().getDate()).toString();
  }

  openSecondList(item){
    this.flagSecondList = true;
  }


  addNewItem(){
    this.itemlist.push(this.newItem);
  }


}
