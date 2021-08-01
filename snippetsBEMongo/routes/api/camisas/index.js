const express = require('express');
const router = express.Router();
const {
  getAllCamisas, 
  getByTipo,
  getBySalesWithOperator,
  getBySalesRange
} = require('./camisas.model');

router.get(
  "/",
  async (req, res)=>{
    try{
      let rows = await getAllCamisas();
      res.status(200).json(rows);
    }catch(ex){
      res.status(500).json({"msg":"Error"});
    }
  }
);

router.get(
    "/bytipo/:tipo",
    async (req, res) => {
      try {
        let { tipo } = req.params;
        let rows = await getByTipo(tipo);
        res.status(200).json(rows);
      } catch (ex) {
        res.status(500).json({ "msg": "Error" });
      }
    }
);

router.get(
    "/bysales/:a/:ventas",
    async (req, res) => {
      try {
        let { ventas, a } = req.params;
        let _ventas = parseInt(ventas);
        let rows = await getBySalesWithOperator(_ventas, a);
        res.status(200).json(rows);
      } catch (ex) {
        res.status(500).json({ "msg": "Error" });
      }
    }
);

router.get(
    "/bysales/range/:ll/:ul/:ex",
    async (req, res) => {
      try {
        let { ll, ul, ex } = req.params;
        let _ll = parseInt(ll);
        let _ul = parseInt(ul);
        let _ex = parseInt(ex) && true;
        let rows = await getBySalesRange(_ll, _ul, _ex);
        res.status(200).json(rows);
      } catch (ex) {
        console.log(ex);
        res.status(500).json({ "msg": "Error" });
      }
    }
);

module.exports = router;