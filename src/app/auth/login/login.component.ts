import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import * as fromApp from '../../app.reducer';
import { Recommendation } from './recommendation.model';
import { UIService } from 'src/app/shared/ui.service';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  articles : Article[];

  constructor(private authService: AuthService, public uiService: UIService, private store: Store<{ui: fromApp.State}>,
    private httpClient: HttpClient, private googleSheetsDbService: GoogleSheetsDbService) { }

  ngOnInit(): void {
    //let temp : Article[] = this.articles.filter( article => article["EXCLUIR?"] !== "X");

    this.store.subscribe( data => console.info("LoginComponent.ngOnInit() ", data) );

    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [ Validators.email, Validators.required ] }),
      password: new FormControl('', { validators: [ Validators.required ] }),
    });

    /*
    let nlu$: Observable<Recommendation> = this.getNLUResponse();
    nlu$.subscribe( ( recommendation ) => console.info( recommendation ) );
    */

    this.getGoogleSheet();
  }

  getGoogleSheet() {
    const allCharacters$: Observable<Article[]> = this.googleSheetsDbService.get<Article>('1TW3AifJuaZgCoIJChGrobuLhnBNeUefuHFFJZaRERp4', 1, articleAttributesMapping);
    allCharacters$
      .pipe( map( arts => arts.filter( article => article['EXCLUIR?'] !== "X" ) )  ) //
      .subscribe( data => {
        this.articles = data;
        console.log( data );
    });

  }

  onLogon() {
    console.log("LoginComponent.onLogon() ", this.loginForm);
    this.authService.login( {email: this.loginForm.value.email, password: this.loginForm.value.password } );
  }

  getNLUResponse() {
    //const headers = { 'Authorization': 'Bearer my-token' };
    const params: HttpParams = new HttpParams()
      .set('car', 'TORO')
      .set('text', 'A Toro é uma pickup ótima para quem roda muito e usa essencialmente no asfalto ou não enfrenta um off-road extremo. Como ela não é tão alta como as outras da categoria o vão-livre prejudica a eletrônica e acaba atrapalhando em um atoleiro.');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers':
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    });

		return this.httpClient.post<Recommendation>(
      //'https://cors-anywhere.herokuapp.com/https://node-red-desafio-8-jlsr-2020-09-13.mybluemix.net/api/recommend',
      '/ipa/recommend',
      {text:'O Argo 1.3 seduz pelo design, com belas linhas desenvolvidas pelo centro brasileiro de estilo da Fiat que remetem ao Tipo europeu, e até alguns modelos da Alfa Romeo, principalmente o hatchback Giulietta.',car: 'ARGO'},
      //{ headers }
    );
  }

  public getTimeStamp() {
    return new Date().toISOString();
  }
}

export const articleAttributesMapping = {
  "Nº do INFORME": "Nº do INFORME",
  'SEM.': 'SEM.',
  "Data informe": "DATA do INFORME",
  "POS. no INFORME": "POS. no INFORME",
  "ID": "ID",
  "EXCLUIR?": "EXCLUIR?",
};

/*
SEM.
Nº do INFORME
DATA do INFORME
POS. no INFORME
ID
EXCLUIR?	AUTORES	TÍTULO	PERIÓDICO / REPOSITÓRIO	DATA PUBL	URL	N	INDIVÍDUOS	CONDIÇÕES	EFEITOS	REFERÊNCIA (Vancouver)	NÍVEL de EVIDÊNCIA	TIPO de ESTUDO	ESPECIFICAÇÃO da TECNOLOGIA	SUMÁRIO dos ACHADOS	AVALIAÇÃO da QUALIDADE METODOLÓGICA	PAÍS	CASOS	ESCORE METODOLÓGICO	FAVORÁVEL / DESFAVORÁVEL	DIT
*/

export interface Article {
  "Nº do INFORME": number,
  'SEM.': number,
  "Data informe": Date,
  "POS. no INFORME": number,
  "ID": string,
  "EXCLUIR?": string,
}
