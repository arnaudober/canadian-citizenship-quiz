import {animate, query, stagger, style, transition, trigger} from '@angular/animations';


export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(20px) scale(0.98)'}),
    animate('400ms cubic-bezier(0.2, 0.8, 0.2, 1.0)', style({opacity: 1, transform: 'translateY(0) scale(1)'}))
  ])
]);

export const optionAnimation = trigger('optionAnimation', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(15px)'}),
    animate('400ms cubic-bezier(0.2, 0.8, 0.2, 1.0)', style({opacity: 1, transform: 'translateY(0)'}))
  ])
]);

export const staggerOptions = trigger('staggerOptions', [
  transition('* => *', [
    query(':enter', [
      style({opacity: 0, transform: 'translateY(15px)'}),
      stagger('80ms', [
        animate('400ms cubic-bezier(0.2, 0.8, 0.2, 1.0)', style({opacity: 1, transform: 'translateY(0)'}))
      ])
    ], {optional: true})
  ])
]);


