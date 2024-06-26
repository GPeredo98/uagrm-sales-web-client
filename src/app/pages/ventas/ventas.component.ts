import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  ventas: any[] = [];
  nuevaVenta: any = {
    cliente: '',
    razon_social: '',
    nit: '',
    productos: []
  };

  constructor(
    private ventasService: VentasService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerVentas();
  }

  obtenerVentas(): void {
    this.ventasService.listarVentas().subscribe(response => {
      if (response.success) {
        this.ventas = response.data;
      } else {
        if (response.data.includes("Lost connection") || response.data.includes("server has gone away")) {
          this.obtenerVentas();
        }
      }
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'Save click') {
        // Aquí puedes llamar a un método para guardar la nueva venta
      }
    }, (reason) => {
      // Manejar el cierre del modal
    });
  }

  registrarVenta(venta: any) {
    this.ventasService.registrarVenta(venta).subscribe(response => {
      if (response.success) {
        this.ventas.push(response.data);
      } else {
        if (response.data.includes("Lost connection") || response.data.includes("server has gone away")) {
          this.registrarVenta(venta);
        }
      }
    });
  }
}
