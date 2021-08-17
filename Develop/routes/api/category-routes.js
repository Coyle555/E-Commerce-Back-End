const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const catData = await Category.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(catData)
  } catch (err) {
    res.status(500).json(err)
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const catID = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    })
    res.status(200).json(catID)
  } catch (err) {
    res.status(500).json(err)
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const catCreate = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(catCreate)
  } catch (err) {
    res.status(500).json(err)
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try{
    const catUpdate = await Category.update({
      where: {
        id: req.body.id
      }
    });
    res.status(200).json(catUpdate)
  } catch (err) {
    res.status(500).json(err)
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const catDelete = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(catDelete)
  } catch (err) {
    res.status(500).json(err)
  }
  
});

module.exports = router;
