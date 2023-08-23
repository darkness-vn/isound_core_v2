export function string(target: any, key: string) {
    console.log(`simpleDecorator called on ${key}`, target);
}

class ClassWithSimpleDecorator {
    @string
    public name: string = 'John';
  }