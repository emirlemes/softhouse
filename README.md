# Movie app

This app is made using free api for showing, searching movies
and tv shows. In the app you can make temporary changes to any
movie and download data for one or collection of movies.

You can also see information about rates, which can indicate
one of the main reasons to pick that Movie or TV Show.

Free api for getting data can be found on https://www.themoviedb.org/ 
where you can reqeuest api key to access data.




## Technologies

- Angular 14.0.0
    - @angular/material
    - @angualr/form (reactive forms)
    - ngx-toastr (api error notifications)



## Run Locally

Clone the project

```bash
  git clone https://github.com/emirlemes/softhouse.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Change API_KEY to real key in enviroment.ts file

```bash
   BASE_URL: 'https://api.themoviedb.org/3',
   API_KEY: 'API_KEY',
   production: false
```

Start the server

```bash
  npm run start
```


## Demo 

You can preview the app on the following link
https://emirlemes.github.io/softhouse/

