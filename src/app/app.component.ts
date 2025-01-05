

import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import {Deficiency,ComponentOne,DataItem} from   './ICREW'
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule],
  // templateUrl: './app.component.html',
  templateUrl: './testone.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-angular-app';
  isModalOpen: boolean = false;


  openModal() {
    this.isModalOpen = true;
  }

  closeModal(event?: MouseEvent) {
    if (event) {
      const target = event.target as HTMLElement;
      if (target.classList.contains('modal')) {
        this.isModalOpen = false;
      }
    } else {
      this.isModalOpen = false;
    }
  }
  // Form group for the dropdown
  dropdownForm: FormGroup;

  // Data source with type safety
  data: DataItem[] = [
    {
      description: 'Pump Float',
      components: [
        {
          name: 'Electrical and Electronics',
          deficiencies: [
            'Fluctuations',
            'High Battery Voltage',
            'Loss Communication',
            'Low Battery Voltage',
            'Sensor Voltage Fluctuation',
            'Other'
          ]
        },
        {
          name: 'Engine',
          deficiencies: [
            'High Engine Coolant Temp',
            'Active SPN_FMI Code',
            'Air Filter Restriction Sensor Issue',
            'Coolant Temp Fluctuating'
          ]
        }
      ]
    }
  ];

  // Dropdown options with type safety
  components: ComponentOne[] = [];
  deficiencies: string[] = [];

  constructor(private fb: FormBuilder) {
    // Initialize the form using FormBuilder
    this.dropdownForm = this.fb.group({
      description: '',
      component: { value: '', disabled: true },
      deficiency: { value: '', disabled: true }
    });
  }

  // Handles the description dropdown change
  onDescriptionChange(): void {
    const selectedDescription = this.dropdownForm.get('description')?.value;

    // Find the corresponding data item
    const selectedItem = this.data.find(item => item.description === selectedDescription);

    if (selectedItem) {
      this.components = selectedItem.components;
      this.dropdownForm.get('component')?.enable();
    } else {
      this.components = [];
      this.dropdownForm.get('component')?.reset({ value: '', disabled: true });
    }

    // Reset deficiencies
    this.deficiencies = [];
    this.dropdownForm.get('deficiency')?.reset({ value: '', disabled: true });
  }

  // Handles the component dropdown change
  onComponentChange(): void {
    const selectedComponentName = this.dropdownForm.get('component')?.value;

    // Find the corresponding component
    const selectedComponent = this.components.find(comp => comp.name === selectedComponentName);

    if (selectedComponent) {
      this.deficiencies = selectedComponent.deficiencies;
      this.dropdownForm.get('deficiency')?.enable();
    } else {
      this.deficiencies = [];
      this.dropdownForm.get('deficiency')?.reset({ value: '', disabled: true });
    }
  }
}
