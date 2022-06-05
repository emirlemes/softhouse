import Movie from "./movie";

export default class MovieResponse {
  page: number = 0;
  results: Array<Movie> = Array<Movie>();
  total_results: number = 0;
  total_pages: number = 0;
}

