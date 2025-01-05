import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Description {
  description: string;
  components: ComponentDetail[];
}

interface ComponentDetail {
  name: string;
  deficiencies: Deficiency[];
}

interface Deficiency {
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="form">
      <!-- Description Dropdown -->
      <label for="description">Description:</label>
      <select id="description" formControlName="description">
        <option *ngFor="let option of descriptions" [value]="option.description">{{ option.description }}</option>
      </select>

      <!-- Component Dropdown -->
      <label for="component">Component:</label>
      <select id="component" formControlName="component">
        <option *ngFor="let option of components" [value]="option.name">{{ option.name }}</option>
      </select>

      <!-- Deficiency Dropdown -->
      <label for="deficiency">Deficiency:</label>
      <select id="deficiency" formControlName="deficiency">
        <option *ngFor="let option of deficiencies" [value]="option.name">{{ option.name }}</option>
      </select>
    </form>
  `,
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      label {
        font-weight: bold;
      }
      select {
        padding: 8px;
        font-size: 1rem;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  descriptions: Description[] = [
    {
      description: 'Pump Float',
      components: [
        {
          name: 'Electrical and Electronics',
          deficiencies: [
            { name: 'Fluctuations' },
            { name: 'High Battery Voltage' },
            { name: 'Loss Communication' },
            { name: 'Low Battery Voltage' },
            { name: 'Sensor Voltage Fluctuation' },
            { name: 'Other' },
          ],
        },
        {
          name: 'Engine',
          deficiencies: [
            { name: 'High Engine Coolant Temp' },
            { name: 'Active SPN_FMI Code' },
            { name: 'Air Filter Restriction Sensor Issue' },
            { name: 'Coolant Temp Fluctuating' },
          ],
        },
      ],
    },
  ];
  components: ComponentDetail[] = [];
  deficiencies: Deficiency[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      description: [''],
      component: [{ value: '', disabled: true }], // Initially disabled
      deficiency: [{ value: '', disabled: true }], // Initially disabled
    });
  }

  ngOnInit(): void {
    this.form.get('description')?.valueChanges.subscribe(() => this.updateComponents());
    this.form.get('component')?.valueChanges.subscribe(() => this.updateDeficiencies());
  }

  updateComponents(): void {
    const selectedDescription = this.descriptions.find(
      (desc) => desc.description === this.form.get('description')?.value
    );
    this.components = selectedDescription?.components || [];

    // Enable or disable the component dropdown
    const componentControl = this.form.get('component');
    if (this.components.length) {
      componentControl?.enable();
    } else {
      componentControl?.disable();
    }

    componentControl?.reset(); // Reset the value when options change
    this.form.get('deficiency')?.reset(); // Reset deficiency control
    this.deficiencies = [];
  }

  updateDeficiencies(): void {
    const selectedComponent = this.components.find(
      (comp) => comp.name === this.form.get('component')?.value
    );
    this.deficiencies = selectedComponent?.deficiencies || [];

    // Enable or disable the deficiency dropdown
    const deficiencyControl = this.form.get('deficiency');
    if (this.deficiencies.length) {
      deficiencyControl?.enable();
    } else {
      deficiencyControl?.disable();
    }

    deficiencyControl?.reset(); // Reset the value when options change
  }
}
