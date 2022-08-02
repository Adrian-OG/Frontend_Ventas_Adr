import { Injectable } from '@angular/core'
import { Cliente } from './cliente'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, Observable, catchError, throwError } from 'rxjs'
import Swal from 'sweetalert2'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private Url: string = 'http://localhost:4000/api/clientes'
  private httpHeaders = new HttpHeaders({ Content: 'application/json' })

  constructor(private http: HttpClient, private router: Router) {}

  getClientes(): Observable<Cliente[]> {
    return this.http
      .get<Cliente[]>(this.Url)
      .pipe(map((response) => response as Cliente[]))
  }
  createClientes(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.Url, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response: any) => response.cliente as Cliente),
        catchError((e) => {
          console.error(
            'este es error de create: ',
            e.error.mensaje,
            e.error.error,
          )
          Swal.fire(e.error.mensaje, e.error.error, 'error')
          return throwError(() => e)
        }),
      )
  }
  getClientebyId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.Url}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes'])
        console.error(e.error.mensaje)
        Swal.fire('Error al editar', e.error.mensaje, 'error')
        return throwError(() => e)
      }),
    )
  }

  updateCliente(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.Url}/ ${cliente.idcliente}`, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje)
          Swal.fire(e.error.mensaje, e.error.error, 'error')
          return throwError(() => e)
        }),
      )
  }
  deleteCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.Url}/${id}`).pipe(
      catchError((e) => {
        console.error(e.error.mensaje)
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(() => e)
      }),
    )
  }
}
