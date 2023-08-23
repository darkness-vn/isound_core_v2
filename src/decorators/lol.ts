export function isString(target: any, key: string) {
    let val = target[key];
  
    const getter = function () {
      console.log(`Getting value: ${val}`);
      return val;
    };
  
    const setter = function (newValue: string) {
      console.log(`Setting value: ${newValue}`);
      if (typeof newValue !== "string") {
        throw new Error('Invalid value!');
      }
      val = newValue;
    };
  
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
    });
  }
  
  class MyClass {
    @isString
    public myNumber: number = 0;
  }