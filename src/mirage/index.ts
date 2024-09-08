import { createServer, Model } from "miragejs";
// import { faker } from "@faker-js/faker";

export function makeServer() {
  return createServer({
    models: {
      user: Model,
    },

    seeds(server: any) {
      server.create("user", {
        id: "1",
        name: "Allen Doe",
        email: "allen.doe@example.com",
      });
      server.create("user", {
        id: "2",
        name: "Sam Sesadari",
        email: "sam.sesadari@example.com",
      });
      server.create("user", {
        id: "3",
        name: "Dwayne Parker",
        email: "dwayne.parker@example.com",
      });
      server.create("user", {
        id: "4",
        name: "Thomas Christian",
        email: "thomas.christian@example.com",
      });
      server.create("user", {
        id: "5",
        name: "Paul",
        email: "paul@example.com",
      });
      server.create("user", {
        id: "6",
        name: "Nicolas",
        email: "nicolas@example.com",
      });
      server.create("user", {
        id: "7",
        name: "Eddie",
        email: "eddie@example.com",
      });
      server.create("user", {
        id: "8",
        name: "Zac Efron",
        email: "zac.efron@example.com",
      });
      server.create("user", {
        id: "9",
        name: "Nick Jonas",
        email: "nick.jonas@example.com",
      });
      server.create("user", {
        id: "10",
        name: "Aaryabhatt",
        email: "aaryabhatt@example.com",
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/users", (schema: any) => {
        return schema.users.all();
      });

      this.post("/users", (schema: any, request: any) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.users.create(attrs);
      });

      this.put("/users/:id", (schema: any, request: any) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let user = schema.users.find(id);
        return user.update(newAttrs);
      });

      this.delete("/users/:id", (schema: any, request: any) => {
        let id = request.params.id;
        return schema.users.find(id).destroy();
      });
    },
  });
}
