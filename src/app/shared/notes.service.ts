import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  //notes array

  notes: Note[] = new Array<Note>();

  constructor() { }

  //get methods
  getAll(){
    return this.notes;
  }
  get(id: number){
    return this.notes[id]; //index
  }

  //get note index ie id
  getId(note: Note){
    return this.notes.indexOf(note)
  }

  //add method to add note to notes array and return id
  add(note: Note){
    let newLength = this.notes.push(note);
    let index = newLength - 1;
    return index;
  }

  update (id: number, title: string, body: string){
    let note = this.notes[id];
    note.title = title;
    note.body = body;
  }
  delete(id: number){
    this.notes.slice(id, 1);
  }
}
