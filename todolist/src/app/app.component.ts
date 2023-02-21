import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';
  list:any[]=[];
  addTaskFun(item:string){
    this.list.push({id:this.list.length,name:item});
  }
  removeTask(id:number){
    this.list=this.list.filter(item=>item.id!==id);
  }
  removeAllTask(){
    this.list=this.list.filter(item=>item.id!==item.id);
  }
  completeAllTask(){
    
  }
}
