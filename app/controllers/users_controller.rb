class UsersController < ApiController
  # skip_before_action :require_login, only: [:create]

  def create
    begin
      @user = User.new(user_params)
      @user.save
      render json: { token: @user.auth_token }
    rescue Exception
      puts "oh shit"
    end
  end
  
  private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
  
end

