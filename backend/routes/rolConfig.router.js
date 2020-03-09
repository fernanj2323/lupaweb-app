const express = require('express');
const router = express.Router();
const rolConfig = require('../controllers/rolConfig.controller');

router.get('/', rolConfig.getRolConfigs);
router.get('/findbytype/:id', rolConfig.getRolsbyType);
router.post('/', rolConfig.createRolConfig);
router.get('/:id', rolConfig.getRolConfig);
router.put('/:id', rolConfig.editRolConfig );
router.delete('/:id', rolConfig.deleteRolConfig);

module.exports = router;