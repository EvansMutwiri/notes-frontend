import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      //entry anim
      transition('void => *', [
        //initial state
        style({
          height: 0,
          opacity:0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,

          //expand out padding properties due to browser bugs
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,

        }),
        //call animation function

        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*',
        })),
        //final state
        animate(68)
      ]),

      //delete card animation
      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.1)',
          opacity: 0.75
        })),

        animate('120ms ease-out', style({
          transform: 'scale(0.68',
          opacity: 0,
        })),

        //animate spacing

        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          'margin-bottom': '0',
        }))

      ])
      
    ]),

    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(60, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    // retrieve all notes from service
    this.notes = this.notesService.getAll();
  }

  deleteNote(id: number){
    // this.notesService.delete(id);

    this.notes.splice(id, 1);
  }

}
