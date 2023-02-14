import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editarea',
  templateUrl: './editarea.component.html',
  styleUrls: ['./editarea.component.css']
})
export class EditAreaComponent implements OnInit {

    isShift: boolean = false;
    text:string[] = [];

    constructor() { 
    }

    ngOnInit(): void {

        document.getElementById('Cursor')!.style.left = '0%';
        document.getElementById('Cursor')!.style.top = '37px';

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

            if(event.key == 'Control')
            {
                const Tmp = document.getElementById('Text')?.lastChild as object;
                console.log(Tmp);
            }

            if(event.key == 'Enter')
            {
                this.text.push('<br>');
                return;
            }

            if (event.key == 'Backspace')
            {
                this.text.pop();
                document.getElementById('Text')!.innerHTML = '';

                for(let x in this.text)
                {
                    document.getElementById('Text')!.innerHTML += this.text[x];
                }
            }

            else 
            {
                let character = event.key;

                this.text.push(character);

                document.getElementById('Text')!.innerHTML = '';

                for(let x in this.text)
                {
                    document.getElementById('Text')!.innerHTML += this.text[x];
                }
            }
        })
    }
}
