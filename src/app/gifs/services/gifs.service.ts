import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Gif, SearchGIFResponce } from "../interface/gifs.interface";

@Injectable({
    providedIn: 'root'
})
export class GifsService {

    private _apiKey: string = 'oVV7csESP2yMc61zlX8ybSekUnWJeepI';
    private _historial: string[] = []
    resultado: Gif[] = [];

    get historial() {
        return [...this._historial];
    }

    constructor(private http: HttpClient) { }

    buscarGifs(query: string = '') {
        query = query.trim().toLowerCase()
        if (!this._historial.includes(query)) {
            this._historial.unshift(query)
            this._historial = this._historial.splice(0, 10)
        }

        this.http.get<SearchGIFResponce>(`https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q=${query}&limit=10`)
            .subscribe(resp => {
                this.resultado = resp.data
            })

    }
}