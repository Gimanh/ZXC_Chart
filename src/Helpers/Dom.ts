export class Dom {
    public static getElement( el: string | HTMLElement ): HTMLElement | null {
        if ( el instanceof Element ) {
            return el;
        }
        return document.querySelector( el );
    }

    public static createElement( type: string ): HTMLElement {

        return document.createElement(type);
    }

}