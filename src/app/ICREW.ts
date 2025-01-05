


// Define Interfaces
export interface Deficiency {
  description: string;
}

export interface ComponentOne {
  name: string;
  deficiencies: string[];
}

export interface DataItem {
  description: string;
  components: ComponentOne[];
}