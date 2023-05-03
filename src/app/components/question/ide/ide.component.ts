import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.css'],
  host:{style:`
  width: 84%;
  margin-left: 8%;`}
})
export class IdeComponent  implements OnInit{
  la!:any
  ngOnInit(): void {
    this.la = this.route.snapshot.paramMap.get('la');
    const script = this.renderer.createElement('script');
    script.src = 'https://www.jdoodle.com/assets/jdoodle-pym.min.js';
    this.renderer.appendChild(document.head, script);
  }
constructor(private route:ActivatedRoute,private renderer: Renderer2){}
}
