require 'active_record'

ActiveRecord::Base.logger = Logger.new(STDOUT)

class User < ActiveRecord::Base
end

ActiveRecord::Base.establish_connection(
    adapter:  'mysql2',
    host:     'localhost',
    username: 'root',
    password: '',
    database: 'ruby_test',
)

class CreateUsers < ActiveRecord::Migration[5.0]
  create_table :tokens do |t|
      t.column :name,  :string
      t.column :token, :string
      t.timestamps
  end
end