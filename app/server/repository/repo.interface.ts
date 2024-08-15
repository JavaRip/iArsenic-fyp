export interface Repository<T> {
    findById: (id: string) => Promise<T | null>;
    findAll?: () => Promise<T[]>;
    create?: (item: T) => Promise<T>;
    update?: (item: T) => Promise<T>;
    delete?: (id: string) => Promise<void>;
}
