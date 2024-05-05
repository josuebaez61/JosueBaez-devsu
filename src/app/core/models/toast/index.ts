export type ToastSeverity = 'success' | 'error' | 'warning';

export type ToastMessage = {
  message?: string;
  severity?: ToastSeverity;
  duration?: number;
};
