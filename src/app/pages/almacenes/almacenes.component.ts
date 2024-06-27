import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlmacenesService } from 'src/app/services/almacenes.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styleUrls: ['./almacenes.component.scss']
})
export class AlmacenesComponent {
  almacenes: any[] = [];
  cargandoDatos: boolean = true;
  creando: boolean = false;

  nuevoAlmacen: any = {};

  constructor(
    private almacenesService: AlmacenesService,
    private modalService: NgbModal,
    public toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.obtenerAlmacenes();
  }

  obtenerAlmacenes() {
    this.almacenesService.obtenerAlmacenes().subscribe(response => {
      this.almacenes = response;
      this.cargandoDatos = false;
    });
  }

  openModal(content: any) {
    this.nuevoAlmacen = {};
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'Save click') {
        // Aquí puedes llamar a un método para guardar el nuevo producto
      }
    }, (reason) => {
      // Manejar el cierre del modal
    });
  }

  crearAlmacen(cliente: any) {
    this.creando = true;
    this.almacenesService.crearAlmacen(cliente).subscribe(response => {
      this.obtenerAlmacenes();
      setTimeout(() => {
        this.modalService.dismissAll();
        this.toastService.show('Almacén registrado', { classname: 'bg-success text-light', delay: 3000 });
      }, 1000);
    }, error => {
      for (let key in error.error.errors) {
        error.error.errors[key].forEach((message: any) => {
            this.toastService.show(`${key}: - ${message}`, { classname: 'bg-danger text-light', delay: 3000 });
        });
      }
    }).add(() => {
      this.creando = false;
    });
  }

  eliminarAlmacen(cliente: any) {
    cliente.eliminando = true;
    this.almacenesService.eliminarAlmacen(cliente.id).subscribe(response => {
      this.obtenerAlmacenes();
      setTimeout(() => {
        this.toastService.show('Almacén eliminado', { classname: 'bg-success text-light', delay: 3000 });
      }, 1000);
    })
  }
}
