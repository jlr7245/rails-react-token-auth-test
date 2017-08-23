class UsersController < ApiController
  before_action :require_login, except: [:create]

  def create
      user = User.create!(user_params)
      render json: { token: user.auth_token }
    # TODO: error handling
    rescue Exception
      # TODO: better_errors gem
      puts "oh shit"
  end

  def index
    begin
      # request is made to `/user`
      # TODO: fix that
      user = User.find_by_auth_token!(request.headers[:token])
      # don't want to send back the whole user
      render json: { user: { name: user.name, email: user.email } }
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

