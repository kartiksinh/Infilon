declare module "miragejs" {
  export function createServer(config: any): any;
  export class Model {
    static extend(...args: any[]): any;
  }
  export class Factory {
    static extend(...args: any[]): any;
  }
}
