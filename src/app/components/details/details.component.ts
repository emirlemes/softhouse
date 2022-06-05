import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { MovieDetails } from 'src/models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  public movieRating = 0;
  public movieId: string = "0";
  public movie: MovieDetails | undefined;
  private routeSubs: Subscription | undefined;
  private movieSub: Subscription | undefined;
  constructor(
    private ActiveRoute: ActivatedRoute,
    private httpService: HttpService) { }

  ngOnInit(): void {
    this.routeSubs = this.ActiveRoute.params.subscribe(params => {
      this.movieId = params["id"]
      this.getMovieDetails(this.movieId)
    })
  }

  getMovieDetails(id: string): void {
    this.movieSub = this.httpService.getMovieDetails(id).subscribe((movieDetails: MovieDetails) => {
      this.movie = movieDetails;
      setTimeout(() => {
        this.movieRating = movieDetails.vote_average;
      }, 1000)
    })
  }

  getColor(value: number): string {
    if (value > 7.5) {
      return "#5ee432";
    } else if (value > 5) {
      return "#fffa50";
    } else if (value > 3) {
      return "#f7aa38";
    } else {
      return "#ef4655";
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubs) this.routeSubs.unsubscribe();
    if (this.movieSub) this.movieSub.unsubscribe();
  }
}
