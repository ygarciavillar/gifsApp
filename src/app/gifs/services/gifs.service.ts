import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gif, SearchGIFResponce } from "../interface/gifs.interface";

@Injectable({
    providedIn: 'root'
})
export class GifsService {

    private _apiKey: string = 'oVV7csESP2yMc61zlX8ybSekUnWJeepI';
    private _baseURL: string = 'https://api.giphy.com/v1/gifs'
    private _historial: string[] = []
    resultado: Gif[] = [];

    get historial() {
        return [...this._historial];
    }

    constructor(private http: HttpClient) {
        this._historial = JSON.parse(localStorage.getItem('historial')!) || []
        this.resultado = JSON.parse(localStorage.getItem('resultado')!) || []
    }

    buscarGifs(query: string = '') {
        query = query.trim().toLowerCase()
        if (!this._historial.includes(query)) {
            this._historial.unshift(query)
            this._historial = this._historial.splice(0, 10)
            localStorage.setItem('historial', JSON.stringify(this._historial))
        }

        const params = new HttpParams()
            .set('api_key', this._apiKey)
            .set('limit', '10')
            .set('q', query)

        this.http.get<SearchGIFResponce>(`${this._baseURL}/search`, { params })
            .subscribe(resp => {
                this.resultado = resp.data
                localStorage.setItem('resultado', JSON.stringify(this.resultado))
            })

    }
}