export class EventEmitter<T extends Record<string, any>> {
  private listeners: { [K in keyof T]?: Array<(data: T[K]) => void> } = {};
  private listeners_to_all: Array<(data: any) => void> = [];

  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (event == "*") {
      this.listeners_to_all.push(listener);
      return;
    }

    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event]!.filter(
      (l) => l !== listener
    );
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    this.listeners_to_all.forEach((listener) => listener(data));
    if (!this.listeners[event]) return;
    this.listeners[event]!.forEach((listener) => listener(data));
  }
}
