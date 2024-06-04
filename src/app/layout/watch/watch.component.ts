import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent {
  id: string = ''
  category: string = ''
  srcWatch: SafeResourceUrl  = ''

  constructor(
    private route: ActivatedRoute,private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.getWatch()
    console.log(this.category, '-----', this.id)
  }

  getWatch(){
    this.category = this.route.snapshot.paramMap.get('category') || ''
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if(this.category === 'movie'){
      const url = `https://multiembed.mov/?video_id=${this.id}&tmdb=1`;
      this.srcWatch = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }else if(this.category === 'tv'){
      const url = `https://multiembed.mov/?video_id=${this.id}&tmdb=1&s=1&e=2`
      this.srcWatch = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
