export interface ContactForm {
  onSubmit: (formData: ContactFormData) => void;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}