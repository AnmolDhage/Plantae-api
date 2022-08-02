import express from "express"
import { updateUser, deleteUser, getUser, getUserById, addAddress, deleteAddress, addOrder, deleteOrder, updateAddress, updateUserPassword } from "../controllers/user.js"
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

//GET ALL
router.get("/", verifyAdmin, getUser)

//ADD ADDRESS
router.post("/address/:id", verifyUser, addAddress)

//DELETE ADDRESS
router.delete("/address/:userId/:addressId", verifyUser, deleteAddress)

//UPDATE ADDRESS
router.put("/address/:userId/:addressId", verifyUser, updateAddress)

//ADD Order
router.post("/order/:id", verifyUser, addOrder)

//DELETE Order
router.delete("/order/:userId/:orderId", verifyUser, deleteOrder)

export default router;