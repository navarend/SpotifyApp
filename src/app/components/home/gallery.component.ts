import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent {

  @Input('songsInput') songs: any[] = [];
  constructor( private router: Router ) {
  }

  GetDetails( pItem: any ){
    console.log(pItem);
    let artistId;
    if( pItem.type === 'artist'){
      artistId = pItem.id;
    }else{
      artistId = pItem.artists[0].id;
    }
    this.router.navigate(['/details',artistId])
  }
}
