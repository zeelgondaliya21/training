import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { __decorate } from 'tslib';

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
  taskCompleted(item : any){
    console.log('inside fun');
    console.log(item.class);
    if(item.class !='task-completed'){
      item.class = 'task-completed';
      console.log(item.class);
    }
    else{
      console.log(item.class)
      item.class= 'tast-incompleted';
      console.log(item.class);
    }
  }
}