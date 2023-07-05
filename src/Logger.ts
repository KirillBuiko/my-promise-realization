export class Logger {
    private readonly domElement: HTMLElement | null;

    constructor(selector: string) {
        this.domElement = document.querySelector(selector);
    }

    print(message: string) {
        console.log(message);
        if(!this.domElement) return;
        this.domElement.innerText += message;
        this.domElement.insertAdjacentElement("beforeend", document.createElement('br'));
    }
}
