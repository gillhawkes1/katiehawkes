export interface ContactForm {
  onSubmit: (formData: ContactFormData) => Promise<any> | false;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}