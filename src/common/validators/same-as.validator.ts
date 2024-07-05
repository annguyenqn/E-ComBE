import { registerDecorator, type ValidationOptions } from 'class-validator';

export function SameAs(
  property: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object, propertyName: string | symbol) {
    registerDecorator({
      name: 'sameAs',
      target: object.constructor,
      propertyName: propertyName as string,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value, args) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const [relatedPropertyName] = args!.constraints;

          return args?.object[relatedPropertyName as string] === value;
        },
        defaultMessage() {
          return '$property must match $constraint1';
        },
      },
    });
  };
}
