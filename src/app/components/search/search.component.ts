import { Component } from '@angular/core';
import { SpotifyService } from "../../services/spotify.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  artistToSearch:string = "";
  artistFound: any[]=[];
  loading: boolean;
  hasAnError: boolean;
  messageError: string;

  constructor( private spotifyService: SpotifyService, private activateRoute: ActivatedRoute ) {
      this.hasAnError = false;
      this.artistToSearch ="";
      activateRoute.params.subscribe( params =>{
        this.artistToSearch = params['artist'];
        this.FindArtist();
      });
   }

   FindArtist(){
     if( this.artistToSearch !== undefined && this.artistToSearch.length > 0 ){
       this.loading= true;
       this.spotifyService.FindAndArtist(this.artistToSearch).subscribe( result => {
         this.artistFound = result;
         this.loading= false;
       }, ( serviceError => {
         this.loading= false;
         this.hasAnError = false;
         this.messageError = serviceError.error.error.message;
         if( this.messageError === 'Invalid access token' || this.messageError === 'The access token expired'){
           this.spotifyService.GetToken().then( newToken => {
             this.FindArtist();
           })
         }
       }));
     }
   }
}
