import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todolist';
  list:any[]=[];
  addTaskFun(item:string){
    this.list.push({id:this.list.length,name:item});
  }
  removeTaskFun(id:number){
    this.list=this.list.filter(item=>item.id!==id);
  }
}
