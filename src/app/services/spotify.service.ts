import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private token: string = "BQAocM7GibaWj-VokMtOuf1pg7ypw9XB1LP_PGqf124egmSY-prfwNHFqbRYaZIrVKwYj8VKHbNrEtZCL7Q";
  constructor( private httpClient: HttpClient ) { }

  private GetQuery( pQuery: string ){
    const url: string = `https://api.spotify.com/v1${ pQuery }`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ this.token }`
    });
    return this.httpClient.get(url, { headers });
  }

  GetNewRelases(){
   return this.GetQuery("/browse/new-releases").pipe(map( result =>  result['albums'].items ));
  }

  FindAndArtist(pArtist: string){
    return this.GetQuery(`/search?q=${ pArtist }&type=artist`).pipe( map( result => result['artists'].items ));
  }

  GetArtist( pId: string ){
    return this.GetQuery(`/artists/${ pId }`);
  }

  GetTopTracksArtist( pId: string ){
    return this.GetQuery(`/artists/${ pId }/top-tracks?country=US`).pipe( map( result => result['tracks'] ));
  }

  UpdateToken( pToken: string){
    this.token = pToken;
  }

  GetToken(){
    const clientId: string = "your clientId";
    const clientSecreted: string = "your clientSecreted";
    const url : string = `https://spotify-get-token.herokuapp.com/spotify/${ clientId }/${ clientSecreted }`;

    let promise = new Promise((resolve, reject) => {
      this.httpClient.get(url).subscribe( (token:any) =>{
        resolve( token.access_token );
        this.UpdateToken( token.access_token );
      });
    });
   return promise;
  }
}
