import { NgModule } from '@angular/core';
import { Component, OnInit, Input} from '@angular/core';
import {HttpClient, HttpHandler} from '@angular/common/http';
import * as $ from 'jquery';

var toPX = require('to-px');



@Component({
  selector: 'app-editarea',
  templateUrl: './editarea.component.html',
  styleUrls: ['./editarea.component.css'],
  providers: [HttpClient]
})

export class EditAreaComponent implements OnInit {

    @Input()backgroundColor: string;
    

    isShift: boolean = false;
    text:string[] = [];

    textAreaHeight: number = 0;
    textAreaWidth: number = 0;
    cursorHeight: number = 0;
    numberOfLines: number = 0;
    http: HttpClient;

    setText = ()=>{

        let str = this.text.toString().replaceAll(',', '').replaceAll('comma', ',').slice(0, -1);
        
        $('#Text')!.html(str);

        if(this.text.at(-1) == undefined)
            $('#Text').attr('data-end', ' ')
        else if(this.text.at(-1) != '<br>')
            $('#Text').attr('data-end', String(this.text.at(-1)?.replace('comma', ',')))
        else
            $('#Text').attr('data-end', '');

    }

    addButttonHandlers(): void
    {

        // DOWNLOAD HANDLER
        $('#Buttons > button').on('click', ()=>{
            alert('DOWNLOAD');
            const appBlob = new Blob(this.text, {type: 'ocetet-stream'});

            const href = URL.createObjectURL(appBlob);
            
            const a = Object.assign(document.createElement('a'), {
                href: href, 
                style: 'display: none',
                download: 'text.txt'
            });

            document.body.append(a);
            a.click();
            a.remove();

        });


        //LOAD HANDLER
        $('#Buttons > input').on('change', (event)=>{

            let data = ((event!.target as HTMLInputElement)!.files as FileList)[0];
            let formData= new FormData();
            formData.append('givenFile', data);
            let Request = new XMLHttpRequest();
            
            Request.open('POST', 'http://localhost:80/load_file.php');

            try{
                Request.send(formData);
            }
            
            catch {
                console.log("HTTP POST REQUEST ERROR");
            }

            Request.onload = () => {
                let text = Request.responseText;

                for(let i = 0; i < text.length; i++)
                    this.text.push(text[i]);

                this.setText();
            };
             
            // console.log(formData);
            // console.log(this.http.post('http://localhost:80/load_file.php', formData));
        });
    }


    constructor(httpClient: HttpClient) { 
        this.http = httpClient;
        this.backgroundColor = 'red';
    }



    ngOnInit(): void {

        this.addButttonHandlers();

        this.textAreaHeight = toPX('75vh');
        console.log('textAreaHeight: ' + this.textAreaHeight);

        this.textAreaWidth = toPX('50vw');
        console.log('textAreaWidth: ' + this.textAreaWidth);

        $(window).on('resize', ()=>{
            this.textAreaHeight = toPX('75vh');
            this.textAreaWidth = toPX('50vw');
        })

        new ResizeObserver(()=>{console.log('resized')}).observe(document.getElementById('TextArea') as Element)


        $(document).on('keyup', (event)=>{
            if(event.key == 'Shift')
            {
                this.isShift = false;
            }
        });

        $(document).on('keydown', (event)=>{
            

            if(event.key == 'Shift')
            {
                this.isShift = true;
                return;
            }

            if(event.key == 'Control')
            {
                // console.log('text area height: ' + this.textAreaHeight + '\ntext area widht: ' + this.textAreaWidth);
                console.log(this.text);
                return;
            }

            if(event.key == 'Alt' || event.key == 'AltGraph' || event.key == 'Meta' || event.key == 'ContextMenu' || event.key == 'ArrowLeft' || event.key == 'ArrowRight')
            {
                return;
            }

            if(event.key == 'Enter')
            {

                if(this.cursorHeight + 16 >= this.textAreaHeight)
                    return;

                this.text.push('<br>');
                $('#TextArea').height(Number($('#TextArea').height()) + toPX('1.2em'));
            }

            else if (event.key == 'Backspace')
            {
                if(this.text.at(-1) == '<br>')
                {
                    this.numberOfLines--;
                    $('#TextArea').height(Number($('#TextArea').height()) - toPX('1.2em'));
                }
                else if(this.text.at(-2) == '<br>')
                {
                    this.text.pop();
                    $('#TextArea').height(Number($('#TextArea').height()) - toPX('1.2em'));
                }
                this.text.pop();
            }

            else 
            {
                if(this.cursorHeight + 16>= this.textAreaHeight)
                    return;

                let character = event.key;
                
                if(character == ',')
                    character = 'comma';

                this.text.push(character);
            }
            $('Text').html('');
            this.setText();
        })
    }
}
