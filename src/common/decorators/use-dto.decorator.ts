import { Constructor } from 'src/types';

export function UseDto(dtoClass: Constructor): ClassDecorator {
  return (ctor) => {
    // FIXME make dtoClass function returning dto

    if (!(<unknown>dtoClass)) {
      throw new Error('UseDto decorator requires dtoClass');
    }

    ctor.prototype.dtoClass = dtoClass;
  };
}
