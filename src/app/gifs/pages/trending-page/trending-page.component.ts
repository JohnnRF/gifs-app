import { AfterViewInit, Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';


@Component({
  selector: 'app-trending-page',
  standalone: true,
  // imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit { 
  
  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService)

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }

  }
  
}
