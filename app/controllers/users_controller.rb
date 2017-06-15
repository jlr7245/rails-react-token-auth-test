class UsersController < ApiController
  before_action :require_login, except: [:create]

  def create
    begin
      @user = User.new(user_params)
      @user.save
      render json: { token: @user.auth_token }
    rescue Exception
      puts "oh shit"
    end
  end

  def show
    begin
      @user = User.find_by_auth_token(params[:id])
      render json: { user: { name: @user.name, email: @user.email } }
    rescue Exception
      puts Exception
    ensure
      
    end
  end
  
  
  private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
  
end

