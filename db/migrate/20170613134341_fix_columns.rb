class FixColumns < ActiveRecord::Migration[5.1]
  def change
    rename_column :users, :token, :auth_token
  end
end
