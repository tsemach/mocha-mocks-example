import { Database } from './database';

/**
 * @param target
 * @param propertyKey - function name that the decorator is wrap
 * @param descriptor - an object describe the decorator, decriptor.value is the function instance the decorator wrap
 * @returns none
 */
export function DBConnect() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // return function (propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        // console.log("Target, ", target)
        // console.log("propertyKey, ", propertyKey, typeof propertyKey)
        // console.log("descriptor, ", descriptor)
        // console.log("arargumentsgs, ", arguments)

        descriptor.value = async function (...args: any[]) {

          await Database.instance.connect()
          const result = await originalMethod.apply(this, args);
          await Database.instance.close()

          return result
        };

        return descriptor;
    }
}