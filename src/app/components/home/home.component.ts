import { Component } from '@angular/core';
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  spotifyNewRelases:any[]=[];
  loading: boolean;
  hasAnError: boolean;
  messageError: string;

  constructor( private spotifyService: SpotifyService ) {
      this.LoadNewRelases();
   }

   private LoadNewRelases(){
     this.loading = true;
     this.hasAnError = false;
     this.spotifyService.GetNewRelases().subscribe( data => {
       this.spotifyNewRelases = data;
       this.loading= false;
     }, (serviceError => {
          this.loading= false;
          this.hasAnError = true;
          this.messageError = serviceError.error.error.message;
          if( this.messageError === 'Invalid access token' || this.messageError === 'The access token expired'){
            this.spotifyService.GetToken().then( newToken => {
              this.LoadNewRelases();
            })
          }
     }));
   }

}
