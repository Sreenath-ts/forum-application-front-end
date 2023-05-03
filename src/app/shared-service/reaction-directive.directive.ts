import { Directive, ElementRef ,Input} from '@angular/core';

@Directive({
  selector: '[appReactionDirective]'
})
export class ReactionDirectiveDirective {

  constructor(private el: ElementRef) { }
  @Input('appReactionDirective') set toggleClass(value: any){
    console.log(value,'inside directive>>>>>>>>>><<<<<<<<<<<<<<<<<<...........................................................');
    
       var btn1 = document.getElementById('green'+value.ansId);
      var btn2 = document.getElementById('red'+value.ansId);


       

    if(value.re=='liked' ){
      if (btn2?.classList.contains('red')) {
        btn2.classList.remove('red');
      } 
     
      console.log('if..................................................................................................................directive');
      
      
        btn1?.classList.toggle('green')
      
       
      
      
      // btn1?.classList.toggle('green')
    // this.btn1?.classList.toggle('green');
    }else if(value.re=='disliked'){
     if (btn1?.classList.contains('green')) {
        btn1.classList.remove('green');
      } 
      console.log(btn2,'else....................................................................... directive')
    
        btn2?.classList.toggle('red');
      

     }
  }
}
