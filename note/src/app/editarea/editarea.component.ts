import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editarea',
  templateUrl: './editarea.component.html',
  styleUrls: ['./editarea.component.css']
})
export class EditAreaComponent implements OnInit {

    isShift: boolean = false;

    constructor() { 
    }

    ngOnInit(): void {
        document.addEventListener('keyup', (event)=>{
            if(event.key == 'Shift')
            {
                this.isShift = false;
            }
        });

        document.addEventListener('keydown', (event)=>{
            

            if(event.key == 'Shift')
            {
                this.isShift = true;
                return;
            }

            if (event.key == 'Backspace')
            {
                document.getElementById('Text')!.innerHTML = document.getElementById('Text')!.innerHTML.slice(0, -1);
            }

            else 
            {

                let character = event.key;

                if(character >= 'a' && character <= 'z' && this.isShift)
                    character.toLocaleUpperCase();

                document.getElementById('Text')!.innerHTML = document.getElementById('Text')!.innerHTML.slice(0, -1);
                document.getElementById('Text')!.innerHTML += character + '|';

            }
        
            
        })

        document.getElementById('Text')!.innerHTML = '|';

    }

}
