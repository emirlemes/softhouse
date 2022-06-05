import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Movie, MovieResponse } from 'src/models';
import MovieDetails from 'src/models/movie-details';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private movieType$ = new BehaviorSubject<string>('1')

  constructor(private http: HttpClient) { }

  public getMovieType(): Observable<string> { return this.movieType$; }

  public setMovieType(type: string): void { this.movieType$.next(type) }

  getMoviesList(search?: string, page: number = 1): Observable<Array<Movie>> {
    let params = new HttpParams().set("language", 'en-US').set("include_adult", false).set("page", page);
    let urlPath = "/movie/top_rated"
    if (this.movieType$.value == '2') {
      urlPath = '/tv/top_rated'
    }
    if (search) {
      urlPath = "/search/movie"
      params = new HttpParams().set("language", 'en-US').set("include_adult", false).set("page", page).set("query", search);
      if (this.movieType$.value == '2') {
        urlPath = "/search/tv"
      }
    }

    return this.http.get<MovieResponse>(`${environment.BASE_URL}${urlPath}`,
      { params }).pipe(map<MovieResponse, Array<Movie>>(response => {
        response.results.map(movie => {
          if (this.movieType$.value == '2') {
            movie.title = movie.name
            movie.release_date = movie.first_air_date
            movie.original_title = movie.original_name
          }
          movie.poster_path = 'https://image.tmdb.org/t/p/w500' + movie.poster_path
        })
        return response.results
      }))
  }

  getMovieDetails(id: string): Observable<MovieDetails> {
    const url = this.movieType$.value == '2' ? '/tv/' : '/movie/';
    return this.http.get<MovieDetails>(`${environment.BASE_URL}${url}${id}?language=en-US`)
      .pipe(map(response => {
        response.backdrop_path = 'https://image.tmdb.org/t/p/w500' + response.backdrop_path
        if (this.movieType$.value == '2') {
          response.title = response.name
          response.release_date = response.first_air_date
          response.original_title = response.original_name
        }
        return response
      }))
  }
}
