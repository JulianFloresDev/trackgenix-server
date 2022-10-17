import express from 'express';
import fs from 'fs';

const superAdmins = require('../data/super-admins.json');

const router = express.Router();

router.get('/:firstName', (req, res) => {
  const { firstName } = req.params;
  const foundSuperAdmins = superAdmins.filter((superAdmin) => superAdmin.firstName === firstName);
  if (foundSuperAdmins.length > 0) {
    res.status(200).json({ success: true, msg: 'Super Admin found successfully', data: foundSuperAdmins });
  } else {
    res.status(404).json({ success: false, msg: 'There is no super admin' });
  }
});

router.post('/', (req, res) => {
  const newSuperAdmin = req.body;
  newSuperAdmin.id = (superAdmins.length + 1).toString();
  superAdmins.push(newSuperAdmin);
  fs.writeFile('./src/data/super-admins.json', JSON.stringify(superAdmins, null, 2), (err) => {
    if (err) {
      res.status(400).json({
        success: false,
      });
      return;
    }
    res.status(201).json({
      success: true,
      msg: 'Super Admin created successfully',
      data: newSuperAdmin,
    });
  });
});

router.put('/:id', (req, res) => {
  const superAdminId = parseInt(req.params.id, 10);
  const superAdminToUpdate = superAdmins.find((superAdmin) => superAdmin.id === superAdminId);
  if (!superAdminToUpdate) {
    res.status(404).json({
      success: false,
      msg: 'There is no SuperAdmin with this id',
    });
  } else {
    if (req.body.first_name) {
      superAdminToUpdate.first_name = req.body.first_name;
    }
    if (req.body.last_name) {
      superAdminToUpdate.last_name = req.body.last_name;
    }
    if (req.body.email) {
      superAdminToUpdate.email = req.body.email;
    }
    if (req.body.password) {
      superAdminToUpdate.password = req.body.password;
    }
    if (req.body.user_name) {
      superAdminToUpdate.user_name = req.body.user_name;
    }
    fs.writeFile(
      'src/data/super-admins.json',
      JSON.stringify(superAdmins, null, 2),
      (err) => {
        if (err) {
          res.status(400).json({
            success: false,
          });
        } else {
          res.status(200).json({
            success: true,
            msg: 'Super Admin modified successfully',
          });
        }
      },
    );
  }
});

router.delete('/:id', (req, res) => {
  const superAdminId = parseInt(req.params.id, 10);
  const superAdminToDelete = superAdmins.find((superAdmin) => superAdmin.id === superAdminId);
  const filteredSuperAdmins = superAdmins.filter((superAdmin) => superAdmin.id !== superAdminId);
  if (superAdminToDelete) {
    fs.writeFile(
      'src/data/super-admins.json',
      JSON.stringify(filteredSuperAdmins, null, 2),
      (err) => {
        if (err) {
          res.status(400).json({
            success: false,
          });
        } else {
          res.status(200).json({
            success: true,
            msg: 'Super Admin deleted successfully',
          });
        }
      },
    );
  } else {
    res.status(404).json({
      success: false,
      msg: 'There is no Super Admin with this id',
    });
  }
});

export default router;