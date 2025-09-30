import creatUserTable from "../model/user.js";
import createProductTable from "../model/product.js"

console.log("[Initializing DB]")

  await  creatUserTable()
  await  createProductTable()

console.log("[DB initialized]: Task completed")

// }

// export default initDB
