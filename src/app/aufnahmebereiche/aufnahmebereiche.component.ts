import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LocalstorageService} from '../localstorage.service';
import {HttpClient} from '@angular/common/http';
import {Converter} from 'showdown';
import {AufnahmebereichModel} from './AufnahmebereichModel';

@Component({
  selector: 'app-aufnahmebereiche',
  templateUrl: './aufnahmebereiche.component.html',
  styleUrls: ['./aufnahmebereiche.component.scss']
})
export class AufnahmebereicheComponent implements OnInit, AfterViewInit {

  @ViewChild('aufnahmebereich') selectRef: ElementRef;
  private select: HTMLSelectElement;

  private aufnahmebereicheText: string;

  private readonly aufnahmebereiche: Array<AufnahmebereichModel> = [
    new AufnahmebereichModel(10, 'Portrait'),
    new AufnahmebereichModel(20, 'Pärchen'),
    new AufnahmebereichModel(30, 'Badebekleidung'),
    new AufnahmebereichModel(40, 'Dessous'),
    new AufnahmebereichModel(50, 'Keine Einschränkung')
  ];

  constructor(private localstorageService: LocalstorageService, private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('assets/aufnahmebereiche.markdown', {responseType: 'text'})
      .subscribe((markdown: string) => this.aufnahmebereicheText = new Converter().makeHtml(markdown), () =>
        this.aufnahmebereicheText = '<h2>Fehler beim laden der AUfnahmebereiche!</h2>');
  }

  ngAfterViewInit(): void {
    this.select = this.selectRef.nativeElement;

    const storedAufnahmebereich = this.localstorageService.getAufnahmebereich();
    const index = this.aufnahmebereiche.findIndex((obj, _) => obj.key === storedAufnahmebereich);
    if (index >= 0) {
      this.select.selectedIndex = index;
    }
  }

  aufnahmebereichChanged(): void {
    const selectedBereich = this.select.value;
    this.localstorageService.setAufnahmebereich(Number(selectedBereich));
  }
}
