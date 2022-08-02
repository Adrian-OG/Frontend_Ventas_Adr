import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Cliente } from './cliente'
import { ClienteService } from './cliente.service'
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  cliente: Cliente = new Cliente()

  titulo: String = 'Crear Cliente'

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.cargarCliente()
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id']
      if (id) {
        this.clienteService.getClientebyId(id).subscribe((cliente) => {
          this.cliente = cliente
        })
      }
    })
  }

  create(): void {
    //console.log('Este es el body : ', this.cliente)
    this.clienteService.createClientes(this.cliente).subscribe((json) => {
      this.router.navigate(['/clientes'])
      console.log()
      swal.fire(
        'Nuevo Cliente',
        ` El cliente ${json.nombre} ha sido creado con éxito ! `,
        'success',
      )
    })
  }

  update(): void {
    this.clienteService.updateCliente(this.cliente).subscribe((json) => {
      this.router.navigate(['/clientes'])
      swal.fire(
        'Cliente Actualizado',
        ` ${json.mensaje} : ${json.cliente.nombre}`,
        'success',
      )
    })
  }
}
