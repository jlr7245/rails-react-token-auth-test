class TestController < ApiController
  before_action :require_login

  def index
    render json: {spots: "List of places to work in coffee shops"}
  end
  
end
