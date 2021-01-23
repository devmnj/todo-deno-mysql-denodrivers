import db from "../config/database.ts";
export default {
  async index(ctx: any) {
    try {
      //NOTE Get all the documents
      const result = await db.client.query("SELECT * FROM todos");
      ctx.response.body = result;
      ctx.response.status = 201;
    } catch (error) {
      ctx.response.body = 'Some Error occurs ' + console.error();
      ctx.response.status = 401;
    }
  },
  async delete({ params, response }: { params: any, response: any }) {
    try {
      // NOTE using params

      const id = params.id;
      await db.client.execute('delete from todos where ??=?', ["id", id]).then((result) => {
        response.status = 200
        response.body = 'Entry deleted'
      }).catch((err) => {
        response.status = 400
        response.body = { error: err }
      })

    } catch (error) {
      response.status = 400
      response.body = { error: error }
    }
  }
  ,
  async update({ params, request, response }: { params: any, request: any, response: any }) {
    try {
      const id = params.id;
      const body = request.body({ type: "json" })
      const todo = await body.value;
      // NOTE Updating Collection
      await db.client.execute('update todos set ??=?,??=? where ??=?', ["item", todo.item, "description", todo.description, "id", id]).then(() => {
        response.status = 200
        response.body = 'Entery Updated'
      }).catch((e) => {
        response.status = 400
        response.body = { error: 'got an error' }

      })


    } catch (error) {
      response.status = 400
      response.body = { error: error }
    }
  },
  async findById({ params, response }: { params: any, response: any }) {
    try {
      const id = params.id;
      //NOTE Get a single entry
      const todos = await db.client.query('select * from todos where id=?', [id])
      response.status = 201
      response.body = todos

    } catch (error) {
      response.status = 400
      response.body = { error: error }
    }

  },
  async newTodo({ request, response }: { request: any, response: any }) {
    try {
      //NOTE Getting the body of the request
      const body = request.body({ type: "json" })
      const todo = await body.value;
      await db.client.execute('insert into todos (item,description)values(?,?)', [todo.item, todo.description]).then((model) => {
        response.status = 201
        response.body = model
      }).catch((error) => {
        console.log('caught errors while saving');

        response.body = { error: console.error };
        response.status = 401
      })
    } catch (error) {
      console.log(error);
    }
  },
   
}
