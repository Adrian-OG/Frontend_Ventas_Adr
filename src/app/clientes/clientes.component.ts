import { Component, OnInit } from '@angular/core'
import { Cliente } from './cliente'
import { ClienteService } from './cliente.service'
import swal from 'sweetalert2'
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = []

  constructor(private clienteservice: ClienteService) {}

  ngOnInit(): void {
    this.clienteservice
      .getClientes()
      .subscribe((clientes) => (this.clientes = clientes))
  }

  delete(cliente: Cliente): void {
    swal
      .fire({
        title: 'Estas seguro?',
        text: '¿ Está seguro que desea eliminar este cliente ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí,Eliminar',
        cancelButtonText: 'No, Cancelar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.clienteservice
            .deleteCliente(cliente.idcliente)
            .subscribe((response) => {
              this.clientes = this.clientes.filter((cli) => cli !== cliente)
              swal.fire(
                'Cliente Eliminado',
                `Cliente ${cliente.nombre} eliminado con exito`,
                'success',
              )
            })
        }
      })
  }
}
