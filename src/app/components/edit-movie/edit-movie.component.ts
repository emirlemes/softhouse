import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from 'src/models';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {
  form!: UntypedFormGroup;
  title: string = '';

  constructor(private fb: UntypedFormBuilder, private dialogRef: MatDialogRef<EditMovieComponent>, @Inject(MAT_DIALOG_DATA) public data: Movie) {
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.form = this.fb.group({
      overview: [this.data.overview, []],
      title: [this.data.title, []],
      original_title: [this.data.original_title, []],
      release_date: [this.data.release_date, []],
      poster_path: [this.data.poster_path, []],
    })
  }

  download() {
    let file = new Blob([JSON.stringify(this.data)], { type: '.json' });
    let a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = this.data.title + '.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  save() {
    const updatedObject = { ...this.data, ...this.form.value };

    this.dialogRef.close(updatedObject);
  }

  close() {
    this.dialogRef.close();
  }

}
