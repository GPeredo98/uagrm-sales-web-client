import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LayoutComponent } from './layout.component';
import { FormsModule } from '@angular/forms';
import { ToastsContainer } from 'src/app/components/toast-container/toast-container.component';
import { ProductosComponent } from '../productos/productos.component';
import { ClientesComponent } from '../clientes/clientes.component';
import { AlmacenesComponent } from '../almacenes/almacenes.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutComponent, ProductosComponent, ClientesComponent, AlmacenesComponent ],
      imports: [HttpClientTestingModule, FormsModule, ToastsContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(LayoutComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#header-title')?.textContent).toContain('TiluchiSoft ERP');
  });
});
