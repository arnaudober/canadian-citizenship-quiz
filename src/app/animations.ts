import {animate, query, stagger, style, transition, trigger} from '@angular/animations';


export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(10px)'}),
    animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({opacity: 0, transform: 'translateY(-10px)'}))
  ])
]);

export const optionAnimation = trigger('optionAnimation', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(20px)'}),
    animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
  ])
]);

export const staggerOptions = trigger('staggerOptions', [
  transition('* => *', [
    query(':enter', [
      style({opacity: 0, transform: 'translateY(20px)'}),
      stagger('100ms', [
        animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
      ])
    ], {optional: true})
  ])
]);

