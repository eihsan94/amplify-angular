import {
  animate,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const bwFadeInOutAnimations = [
  trigger('fadeInOut', [
    state('inactive', style({
      opacity: 0
    })),
    state('active', style({
      opacity: 1
    })),
    transition('inactive=>active', [
      style({
        opacity: 0
      }),
      // animate(200)
      animate('100ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        keyframes(
          [
            style({opacity: 0, transform: 'translateY(10px)'}),
            style({opacity: 1, transform: 'translateY(0)'}),
          ]
        )
      )
    ]),
    transition('active=>inactive', [
      style({
        opacity: 0
      }),
      animate('100ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        keyframes(
          [
            style({opacity: 1, transform: 'translateY(0)'}),
            style({opacity: 0, transform: 'translateY(10px)'}),
          ]
        )
      )
    ]),
  ]),
];
