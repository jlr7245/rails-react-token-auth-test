class UsersController < ApiController
  before_action :require_login, except: [:create]

  def create
    begin
      @user = User.new(user_params)
      @user.save
      render json: { token: @user.auth_token }
    # TODO: error handling
    rescue Exception
      puts "oh shit"
    end
  end

  def show
    begin
      # request is made to `/user/AUTH_TOKEN`
      # TODO: fix that
      @user = User.find_by_auth_token(params[:id])
      # don't want to send back the whole user
      render json: { user: { name: @user.name, email: @user.email } }
    # TODO: error handling
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

