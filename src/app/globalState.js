class GlobalState {
  constructor() {
    this.state = {
      contacts: null,
    };
    this.listeners = [];
  }

  getState() {
    return this.state;
  }
  getContacts() {
    return this.state.contacts;
  }
  updateState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(arrListeners) {
    this.listeners = [...arrListeners];
  }
  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

const globalState = new GlobalState();
export default globalState;
