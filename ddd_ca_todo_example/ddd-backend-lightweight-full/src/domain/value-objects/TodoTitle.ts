import { validateTitle } from '@shared/index';

export class TodoTitle {
    readonly value: string;

    constructor(value: string) {
        const error = validateTitle(value);
        if (error) throw new Error(error);
        this.value = value.trim();
    }

    equals(other: TodoTitle): boolean {
        return this.value === other.value;
    }
}
