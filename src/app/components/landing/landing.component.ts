import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public consArray;
  public prosArray;
  public activConsIndex = 0;
  public activProsIndex = 0;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
   this.httpService.getLists().subscribe(data => {
     this.consArray = data['cons'];
     this.prosArray = data['pros'];
   });
  }

  markAsActive(type, index){
    this[type] = index;
  }

  deleteItem(type, index){
    this[type].splice(index, 1);
    this.makeRequest();
  }

  addItem(type, value){
    this[type].push(value);
    this.makeRequest();
  }

  makeRequest(){
    let body = {
      pros: this.prosArray,
      cons: this.consArray,
    }
    this.httpService.updateList(body).subscribe(data => {
      this.consArray = data['cons'];
      this.prosArray = data['pros'];
    });
  }

}
