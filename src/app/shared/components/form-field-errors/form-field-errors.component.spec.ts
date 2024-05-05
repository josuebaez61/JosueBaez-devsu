import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldErrorsComponent } from './form-field-errors.component';

describe('FormFieldErrorsComponent', () => {
  let component: FormFieldErrorsComponent;
  let fixture: ComponentFixture<FormFieldErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldErrorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render error messages', () => {
    component.validationErrors = {
      required: true,
      minlength: {
        requiredLength: 6,
        actualLength: 3,
      },
    };
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('.app-form-field-errors');
    expect(span?.textContent).toEqual(
      'Este campo es requerido. Debe tener al menos 6 caracteres.'
    );
  });
});
