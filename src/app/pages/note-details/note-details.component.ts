import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note: Note = new Note;
  //store note id
  noteId!: number;

  new?: boolean;

  constructor(private notesService: NotesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.note = new Note()

    //know which route has been chosen between new and edit

    this.route.params.subscribe((params: Params)=>{
      if(params.id) {
        this.note = this.notesService.get(params.id);
        this.noteId = params.id;
        this.new = false;
      } else{
        this.new = true;
      }
    })
  }

  onSubmit(form: NgForm) {
    // console.log(form)

    //create service to store notes array and manage it

    if(this.new){
      this.notesService.add(form.value);
      this.router.navigateByUrl('/');
    } else {
      this.notesService.update(this.noteId, form.value.title, form.value.body);
      this.router.navigateByUrl('/');
    }
  }

  cancel(){
    this.router.navigateByUrl("/")
  }

}
