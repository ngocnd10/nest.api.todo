import { ClassConstructor, plainToClass } from 'class-transformer';

export class MapHelper {
  static mapToDTO<T, V>(clas: ClassConstructor<T>, plain: V): T {
    return plainToClass(clas, plain, { excludeExtraneousValues: true });
  }

  static mapToDTOs<T, V>(clas: ClassConstructor<T>, plain: V[]): T[] {
    return plainToClass(clas, plain, { excludeExtraneousValues: true });
  }
}
