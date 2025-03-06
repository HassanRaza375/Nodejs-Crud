# Nodejs-Crud

Nodejs crud with MySql

# for migration

npx sequelize-cli init
npx sequelize-cli migration:generate --name <migration-name>
npx sequelize-cli migration:generate --name add-fields-to-users
npx sequelize-cli db:migrate

# to undo migration

npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all
