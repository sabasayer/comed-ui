export class Renderer {
  constructor(data, targetElement) {
    this.beforeRender();
    this.createProxy(data);
    this.targetElement = targetElement;
    this.render(targetElement);
  }

  beforeRender() {}

  createProxy(data) {
    this.data = new Proxy(data, {
      set: (target, prop, val, receiver) => {
        Reflect.set(target, prop, val, receiver);
        this.render(this.targetElement);
        return true;
      },
    });
  }

  createTemplate(data) {
    return ``;
  }

  registerEvents() {}

  render(targetElement) {
    targetElement.innerHTML = this.createTemplate(this.data);
    this.registerEvents();
  }
}
