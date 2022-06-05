import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { Movie } from 'src/models';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditMovieComponent } from '../edit-movie/edit-movie.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movieType$: Observable<string>;
  public movieTypeLocal: string = '1';
  public page: number = 1;
  public movies: Array<Movie> = Array<Movie>();
  private routeSubs: Subscription | undefined;
  private moviesSubs: Subscription | undefined;


  constructor(
    private httpService: HttpService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog) {

    this.movieType$ = this.httpService.getMovieType();
  }

  ngOnInit(): void {
    this.movieType$.subscribe(type => { this.movieTypeLocal = type; });
    this.routeSubs = this.activeRoute.params.subscribe((params: Params) => {
      if (params['movie-search']) {
        this.searchMovies(params['movie-search'])
      } else {
        this.searchMovies()
      }
    })
  }

  searchMovies(search?: string): void {
    this.moviesSubs = this.httpService.getMoviesList(search, this.page).pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((response: Array<Movie>) => {
      if (this.page == 1) {
        this.movies = response; return;
      }
      this.movies.push(...(response));
    });
  }

  typeChange(type: string): void {
    this.httpService.setMovieType(type);
    this.page = 1;
    this.routeSubs = this.activeRoute.params.subscribe((params: Params) => {
      if (params['movie-search']) {
        this.searchMovies(params['movie-search'])
      } else {
        this.searchMovies()
      }
    })
  }

  openDialog(movie: Movie): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = movie

    const dialogRef = this.dialog.open(EditMovieComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: Movie) => {
      if (!result) return;
      const indexToReplace = this.movies.findIndex(x => x.id === result.id);

      this.movies.splice(indexToReplace, 1, result);
    });
  }

  loadMore(): void {
    this.page++;
    this.routeSubs = this.activeRoute.params.subscribe((params: Params) => {
      if (params['movie-search']) {
        this.searchMovies(params['movie-search'])
      } else {
        this.searchMovies()
      }
    })
  }

  openMovieDetails(id: number) {
    this.router.navigate(['details', id]);
  }

  download() {
    let file = new Blob([JSON.stringify(this.movies)], { type: '.json' });
    let a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = 'movies-collection.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  ngOnDestroy() {
    if (this.moviesSubs) {
      this.moviesSubs.unsubscribe();
    }
    if (this.routeSubs) {
      this.routeSubs.unsubscribe();
    }
  }

}
