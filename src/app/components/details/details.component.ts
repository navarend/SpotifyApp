import { Component } from '@angular/core';
import { SpotifyService } from "../../services/spotify.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  idArtist: string="";
  infoArtist: any = {};
  artistName: string = "";
  loading: boolean;
  topTracks: any [] = [];

  constructor( private spotify: SpotifyService, private activatedRoute: ActivatedRoute, private router: Router ) {
    activatedRoute.params.subscribe( params => this.idArtist = params["id"] );
    this.GetArtist();
    this.GetTopTracks();
  }

  private GetArtist(){

    this.spotify.GetArtist(this.idArtist).subscribe( result => {
      this.infoArtist = result;
      this.artistName = this.infoArtist.name;
      this.loading= false;
    });
  }

  private GetTopTracks(){
   this.spotify.GetTopTracksArtist( this.idArtist ).subscribe( traks => this.topTracks = traks );
  }

  private GoToSearch(){
    this.router.navigate(['/search', this.artistName]);
  }

}
