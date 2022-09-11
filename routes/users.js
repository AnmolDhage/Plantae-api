import express from "express"
import { updateUser, deleteUser, getUser, getUserById, addAddress, deleteAddress, addOrder, deleteOrder, updateAddress, updateUserPassword, updateDefaultAddress, addCartItem, deleteCartItem, getCartItems, countCartItem, addRecent } from "../controllers/user.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"
const router = express.Router();


//UPDATES
router.put("/:id", verifyUser, updateUser)

//UPDATE PASSWORD
router.put("/password/:id", verifyUser, updateUserPassword)

//DELETE

router.delete("/:id", verifyUser, deleteUser)

//GET
router.get("/:id", verifyUser, getUserById)


//GET CART COUNT
router.get("/cartCount/:id", verifyUser, countCartItem)

//GET ALL
router.get("/", verifyAdmin, getUser)

//ADD ADDRESS
router.post("/address/:id", verifyUser, addAddress)

//DELETE ADDRESS
router.delete("/address/:userId/:addressId", verifyUser, deleteAddress)

//UPDATE ADDRESS
router.put("/address/:userId/:addressId", verifyUser, updateAddress)

//UPDATE DEFAULT ADDRESS
router.put("/defaultaddress/:userId/:addressId", verifyUser, updateDefaultAddress)

//ADD ORDER
router.post("/order/:id", verifyUser, addOrder)

//DELETE ORDER
router.delete("/order/:userId/:orderId", verifyUser, deleteOrder)

//ADD CART ITEM
router.post("/cart/:id", verifyUser, addCartItem)

//DELETE CART ITEM
router.delete("/cart/:userId/:cartId", verifyUser, deleteCartItem)

// GET Cart Items
router.get("/cart/:user_id", verifyUser, getCartItems);


// ADD RECENT
router.post("/addRecent/:user_id", verifyUser, addRecent);


export default router;