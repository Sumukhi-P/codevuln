No issues to summarize. Here is the code with the identified issues fixed:


const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = config.MONGODB_URI;

router.post('/customers/register', async (req, res) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true
  }).catch(err => {
    console.log(err);
  });

  if (!client) {
    return res.json({ status: 'Error' });
  }

  const db = client.db(config.MONGODB_DB_NAME);
  const customers = db.collection('customers');

  let myobj = { name: req.body.name, address: req.body.address };
  
  try {
    await customers.insertOne(myobj);
    res.json({ 
      status: 'success',
      message: 'user inserted'
    });
  } catch (err) {
    throw err;
  } finally {
    db.close();
  }
});

router.post('/customers/find', async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const client = await MongoClient.connect(url, {
    useNewUrlParser: true
  }).catch(err => {
    console.log(err);
  });

  if (!client) {
    return res.json({ status: 'Error' });
  }

  const db = client.db(config.MONGODB_DB_NAME);
  const customers = db.collection('customers');

  try {
    const result = await customers.findOne({ name });
    res.json(result);
  } catch (err) {
    throw err;
  } finally {
    db.close();
  }
});

router.post('/customers/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      error: 'Email and password are required'
    });
  }

  const client = await MongoClient.connect(url, {
    useNewUrlParser: true    
  }).catch(err => {
    console.log(err);
  });

  if(!client) {
    return res.json({ status: 'Error' });
  }
  
  const db = client.db(config.MONGODB_DB_NAME);  
  const customers = db.collection('customers');

  try {
    const result = await customers.findOne({ 
      email,
      password 
    });
    
    res.json(result);
  } catch (err) {
    throw err;
  } finally {
    db.close();
  }
});

module.exports = router;