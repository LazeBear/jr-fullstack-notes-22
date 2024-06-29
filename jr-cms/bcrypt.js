const bcrypt = require('bcrypt');

const password = '123';

const hashed = bcrypt.hashSync(password, '$2b$10$3OcoPXBQwjBWjaQz.gsU6.');

console.log(hashed);

// $2b$12$YJND2wG56P/byTa/Pn6F2u1.OAqV1AbJqGtvaZ9TbpCh9MUzvPCda
// $2b$12$Cppa6oul0TzUMNihfnFUuOcsuBJglcx0R.fwIw1ZfksdAdfalxJcW

// $2b$10$3OcoPXBQwjBWjaQz.gsU6.
// $2b$10$3OcoPXBQwjBWjaQz.gsU6.zzEJxvjIBWG.hP6cdR4pM63auxcrvyi
// $2b$10$3OcoPXBQwjBWjaQz.gsU6.zzEJxvjIBWG.hP6cdR4pM63auxcrvyi
