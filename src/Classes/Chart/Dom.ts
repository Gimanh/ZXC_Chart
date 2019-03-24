export class Dom {
    public static crEl(name: string): HTMLElement {
        return document.createElement(name)
    }

    public static addEv(el: HTMLElement, evName: string, func: () => void) {
        el.addEventListener(evName, func)
    }
}