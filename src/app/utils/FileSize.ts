export abstract class FileSize {
    constructor(protected readonly value: number) {
    }

    abstract toBytes(): number;
}

export class MegaBytes extends FileSize {

    toBytes(): number {
        return this.value * 1e6;
    }
}

export class KiloBytes extends FileSize {

    toBytes(): number {
        return this.value * 1e3;
    }
}

export class GigaBytes extends FileSize {

    toBytes(): number {
        return this.value * 1e9;
    }
}