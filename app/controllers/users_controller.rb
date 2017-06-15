class UsersController < ApiController
  skip_before_action :require_login, only: [:create]

  def create
  end
  
  private
  def user_params
    params.require(:user).accept(:name, :email, :password)
  end
  
end

