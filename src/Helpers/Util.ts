export class Util {
    public static log( message: string ) {
        console.log( message );
    }

    public static error( message: string ) {
        throw message;
    }
}