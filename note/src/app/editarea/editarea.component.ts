import { Component, OnInit } from '@angular/core';
var toPX = require('to-px');

@Component({
  selector: 'app-editarea',
  templateUrl: './editarea.component.html',
  styleUrls: ['./editarea.component.css']
})
export class EditAreaComponent implements OnInit {

    isShift: boolean = false;
    text:string[] = [];

    textAreaHeight: number = 0;
    cursorHeight: number = 0;

    constructor() { 
    }



    ngOnInit(): void {

        // document.getElementById('Cursor')!.style.left = '0%';
        // document.getElementById('Cursor')!.style.top = '37px';

        this.textAreaHeight = toPX('75vh');
        alert(this.textAreaHeight);

        const setText = ()=>{

            for(let x = 0; x < this.text.length - 1; x++)
            {
                let textNode = document.getElementById("Text")?.lastChild as Node;

                if(textNode != null)
                {
                    let range = document.createRange() as Range;
                    range.selectNodeContents(textNode);
                    let rects = range.getClientRects();
                    
                    if(rects.length > 0)
                        this.cursorHeight = rects[0].y;
                }

                document.getElementById('Text')!.innerHTML += this.text[x];

            }

            if(this.text.at(-1) == undefined)
                document.getElementById('Text')!.setAttribute('data-end', ' ');
            else if(this.text.at(-1) != '<br>')
                document.getElementById('Text')!.setAttribute('data-end', String(this.text[this.text.length-1]));
            else
                document.getElementById('Text')!.setAttribute('data-end', '');


        }

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
                return;
            }

            if(event.key == 'Alt' || event.key == 'AltGraph' || event.key == 'Meta' || event.key == 'ContextMenu')
            {
                return;
            }

            if(event.key == 'Enter')
            {

                console.log(this.cursorHeight)
                if(this.cursorHeight >= this.textAreaHeight - 20)
                    return;

                this.text.push('<br>');
                return;
            }

            if (event.key == 'Backspace')
            {
                this.text.pop();
                document.getElementById('Text')!.innerHTML = '';


                setText();

            }

            else 
            {
                if(this.cursorHeight >= this.textAreaHeight - 4)
                    return;

                let character = event.key;
                this.text.push(character);

                document.getElementById('Text')!.innerHTML = '';

                setText();

            }
        })
    }
}
